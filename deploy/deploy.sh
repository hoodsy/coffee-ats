# clear the git repo—there shouldn't be any changes here
git reset --hard HEAD
# pull the latest changes.
git pull origin master

#install global deps
npm install -g bower gulp

# install deps. exit if it fails
rm -rf node_modules
npm install --ignore-scripts --cache=$(mktemp -d -t ats.XXXX)
rc=$?;
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

gulp build
rc=$?;
if [[ $rc != 0 ]]; then
    echo 'gulp build failed.';
    exit $rc;
fi

# start the server
npm start
