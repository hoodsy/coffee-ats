# clear the git repo—there shouldn't be any changes here
git reset --hard HEAD
# pull the latest changes.
git pull origin master

#install global deps
npm install -g bower gulp

# remove old installed deps
rm -rf node_modules
rm -rf app/bower_components

# install deps. exit if it fails
tmpdir=$(mktemp -d -t ats.XXXX)
npm install --ignore-scripts --cache=$tmpdir
rc=$?;
rm -rf $tmpdir
if [[ $rc != 0 ]]; then
    echo 'npm install failed.';
    exit $rc;
fi

#install bower deps
bower install --allow-root
rc=$?;
if [[ $rc != 0 ]]; then
    echo 'bower install failed.';
    exit $rc;
fi

# override config on Docker
if [[ "$DOCKERHOST" ]]; then
    echo "Overriding with DOCKERHOST"
    sed -i "s/localhost/$DOCKERHOST/" config.json
fi

# build
gulp build
rc=$?;
if [[ $rc != 0 ]]; then
    echo 'gulp build failed.';
    exit $rc;
fi

# start the server
npm start
