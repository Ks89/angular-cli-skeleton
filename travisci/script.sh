#!/usr/bin/env bash

# run debug build
echo "npm run debug build on $TRAVIS_OS_NAME"
npm run build:dev

# clean before the real production build
npm run clean

# run production build
echo "npm run production build on $TRAVIS_OS_NAME"
npm run build:prod

# run production build + Server Side Rendering
echo "npm run production build + ssr on $TRAVIS_OS_NAME"
npm run build:ssr

# run test
echo "npm run test on $TRAVIS_OS_NAME"
xvfb-run -a npm run test:ci

sleep 5

# update webdriver to be able to run e2e tests
npm run webdriver:update

# here you must have ./dist folder with your app built thanks to: npm run build:prod

sleep 5

echo "npm run e2e on $TRAVIS_OS_NAME"
xvfb-run -a npm run e2e:ci
