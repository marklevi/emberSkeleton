#!/bin/bash
if [ -z $1 ];
then
  echo "not set"
  DEPLOY_ENV=dev
else
  echo $1
  DEPLOY_ENV=$1
fi

./node_modules/.bin/gulp publish --env $DEPLOY_ENV

