#!/usr/bin/env bash

# clean before the real production build
npm run clean

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
npm run build:prerender

# run test
echo "npm run test on $TRAVIS_OS_NAME"
npm run test:ci
npm run e2e:ci
