#!/bin/bash

#
# This script builds ATS and places the built artifacts in S3.
#
# You have to have the aws command line tool install, which you can get by
# running `sudo pip install awscli`. The awscli tool then needs to be
# configured to use the Coffee AWS account, which you can do by running
# `aws configure` and pasting in the credentials (on Google Drive).
#

for program in gulp aws; do
    if ! type $program >/dev/null; then
        echo "Missing dependency: $program. Quitting."
        exit 1
    fi
done

BUILDS_TO_KEEP=3
BUCKET_NAME="coffee-static"
ROOT_DIR=$(dirname $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ))

function usage {
    echo "Deploy to S3"
    echo "Options:"
    echo "  -h, --help       Print this message"
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
    gulp clean
    gulp build
    aws s3 sync --delete shell-dist s3://$BUCKET_NAME/release
    aws s3 cp --recursive s3://$BUCKET_NAME/release s3://$BUCKET_NAME/$(date "+%Y_%m_%d_%H_%M_%S")
}

while [[ "$#" -ge 1 ]]; do
    key="$1"

    case $key in
        -h | --help)
        usage
        exit
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
