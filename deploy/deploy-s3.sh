#!/bin/bash

#
# This script builds ATS and places the built artifacts in S3.
#
# You have to have the aws command line tool install, which you can get by
# running `sudo pip install awscli`. The awscli tool then needs to be
# configured to use the Coffee AWS account, which you can do by running
# `aws configure` and pasting in the credentials (on Google Drive).
#
# You'll might also need to configure aws to be able to use cloudfront:
#   aws configure set preview.cloudfront true
#

for program in gulp aws; do
    if ! type $program >/dev/null; then
        echo "Missing dependency: $program. Quitting."
        exit 1
    fi
done

INVALIDATE=true
BUILDS_TO_KEEP=3
BUCKET_NAME="coffee-static"
CLOUDFRONT_DISTRIBUTION_ID="E1NTALWNUOGHGR"
ROOT_DIR=$(dirname $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ))

function usage {
    echo "Deploy to S3"
    echo "Options:"
    echo "  -h, --help             Print this message"
    echo "  -n, --no-invalidate    Don't invalidate the Cloudfront cache"
}

function cleanup_old_builds {
    builds=$(aws s3 ls s3://$BUCKET_NAME | grep "PRE" | grep -Eo "[0-9_]+" | sort -r)
    count=1
    for b in $builds; do
        if [[ "$count" -gt "$BUILDS_TO_KEEP" ]]; then
            aws s3 rm --recursive s3://$BUCKET_NAME/$b
        fi
        (( count++ ))
    done
}

function build_and_deploy {
    # build ATS
    gulp clean
    gulp build

    date=$(date "+%Y_%m_%d_%H_%M_%S")

    # Sync dist folder to release folder
    aws s3 sync --delete --acl public-read shell-dist s3://$BUCKET_NAME/release

    # Archive the release
    aws s3 cp --recursive --acl private s3://$BUCKET_NAME/release s3://$BUCKET_NAME/$date

    # Invalidate the existing index.html
    if $INVALIDATE; then
        aws cloudfront create-invalidation \
            --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
            --invalidation-batch '{"Paths":{"Quantity":1,"Items":["/index.html"]},"CallerReference":"'"$date"'"}'
    fi
}

while [[ "$#" -ge 1 ]]; do
    key="$1"

    case $key in
        -h | --help)
        usage
        exit
        ;;

        -n | --no-invalidate)
        INVALIDATE=false
        ;;

        *)
        echo "Unkown option: $1"
        usage
        exit 1
        ;;
    esac
    shift
done

pushd $ROOT_DIR
build_and_deploy
cleanup_old_builds
popd
