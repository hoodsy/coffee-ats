# pull the latest changes.
git pull origin master

# install deps. exit if it fails
npm cache clean
rm -rf node_modules
npm install
rc=$?;
if [[ $rc != 0 ]]; then
    echo 'npm install failed.';
    exit $rc;
fi

# start the server
npm install
