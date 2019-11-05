// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-coverage'),
      require('karma-mocha-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
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
    reporters: config.angularCli && config.angularCli.codeCoverage ? ['mocha', 'coverage', 'coverage-istanbul'] : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless', 'Chrome'],
    singleRun: false,

    // required by coverage-istanbul
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },

    // required by karma-coverage to show code coverage in console
    coverageReporter: {
      type: 'text-summary'
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
          ' --remote-debugging-port=9222',
        ]
      }
    },

    // For AppVeyor and TravisCI to prevent timeouts
    browserNoActivityTimeout: 60000
  });
};
