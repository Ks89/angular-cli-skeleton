#!/usr/bin/env bash

# build documentation
echo "npm run docs on $TRAVIS_OS_NAME"
npm run docs

# send test coverage to codeclimate.com
echo "npm run codeclimate on $TRAVIS_OS_NAME"
npm run codeclimate

# send test coverage to coveralls.io
echo "npm run coveralls on $TRAVIS_OS_NAME"
npm run coveralls
