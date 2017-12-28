#!/usr/bin/env bash

# build documentation
#echo "pm run docs on $TRAVIS_OS_NAME"
npm run docs:typedoc

echo "pm run compodoc on $TRAVIS_OS_NAME"
npm run docs:compodoc

# send test coverage to codeclimate.com
echo "npm run codeclimate on $TRAVIS_OS_NAME"
npm run codeclimate

# send test coverage to coveralls.io
echo "npm run coveralls on $TRAVIS_OS_NAME"
npm run coveralls

# send test data to sonarcloud.io
echo "run analyze:sonar:ci on $TRAVIS_OS_NAME"
npm run analyze:sonar:ci
