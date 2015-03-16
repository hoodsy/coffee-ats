#!/bin/bash

DEPLOY_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
bash $DEPLOY_DIR/deploy-common.sh

# start the server
gulp serve:dist:proxy:nosync
