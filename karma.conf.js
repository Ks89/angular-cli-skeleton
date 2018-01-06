/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const os = require('os');

console.log(`Starting Karma with isCI=${!!isCI()}`);

function isCI() {
  return process.env.CI || process.env.APPVEYOR || process.env.TRAVIS || process.env.JENKINS || process.env.CIRCLECI;
}

function getBrowsers() {
  if (process.env.CI) {
    if (process.env.APPVEYOR) {
      // variable defined by APPVEYOR itself
      // only for AppVeyor
      return ['Chrome', 'Firefox' /*, 'IE'*/];
    } else if (process.env.TRAVIS) {
      // variable defined by TRAVIS itself
      return ['ChromeHeadless', 'Chrome', 'Firefox'];
    } else if (process.env.CIRCLECI) {
      // variable defined by CIRCLECI itself
      return ['ChromeHeadless', 'Chrome', 'Firefox'];
    } else if (process.env.JENKINS) {
      // var that you must define in you server with Jenkins
      return ['ChromeHeadless', 'Firefox'];
    }
  } else {
    switch (os.platform()) {
      case 'win32': // Windows
        return ['ChromeHeadless', 'Chrome', 'Firefox', 'IE' /*,'Edge'*/];
      case 'darwin': // macOS
        return ['ChromeHeadless', 'Chrome', 'Firefox', 'Safari'];
      default:
        // other (linux, freebsd, openbsd, sunos, aix)
        return ['ChromeHeadless', 'Chrome', 'Firefox'];
    }
  }
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-edge-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher'),
      require('karma-safari-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-coverage'),
      require('karma-mocha-reporter'),
      require('karma-sonarqube-unit-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    angularCli: {
      environment: 'dev'
    },

    /*
     * when angular-cli's coverage is enabled
     * - mocha is used to show mocha results in console (ps you cannot add both progress and mocha at the same time)
     * - coverage is used to show coverage result in console
     * - coverage-istanbul is recommended by angular-cli and used to emit html and lcov
     * - sonrqube is used to build the report used by SonarQube
     * when is disabled
     * - progress is an alternative of mocha (default and recommended by angular-cli
     * - kjhtml is used to show karma progress inside the browser
     *
     */
    reporters: config.angularCli && config.angularCli.codeCoverage ? ['mocha', 'coverage', 'coverage-istanbul', 'sonarqubeUnit'] : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: getBrowsers(),
    singleRun: false,

    // required by coverage-istanbul
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },

    // required by karma-coverage to show code coverage in console
    coverageReporter: {
      type: 'text-summary'
    },

    sonarQubeUnitReporter: {
      sonarQubeVersion: '5.x',
      outputFile: 'reports/ut_report.xml',
      overrideTestDescription: true,
      testPath: 'src',
      testFilePattern: '.spec.ts',
      useBrowserName: false
    },

    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          ' --remote-debugging-port=9222'
        ]
      }
    },

    // For AppVeyor and TravisCI to prevent timeouts
    browserNoActivityTimeout: 60000
  });
};
