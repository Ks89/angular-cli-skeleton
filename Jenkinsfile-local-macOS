
node {
    def nodeHome = tool name: 'node-8.4.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}:${nodeHome}/bin:${env.PATH}"

    stage('check tools') {
        echo env.PATH
        sh "node -v"
        sh "npm -v"
        sh "npm i -g @angular/cli"
    }

    stage('checkout') {
        checkout scm
    }

    stage('npm install') {
        sh "npm install"
    }

    stage('npm run build dev') {
        sh "npm run build:dev"
    }

    stage('npm clean') {
        sh "npm run clean"
    }

    stage('npm run build prod') {
        sh "npm run build:prod"
    }

    stage('npm run build ssr') {
        sh "npm run build:ssr"
    }

    stage('npm test') {
        sh "npm run test:ci"
    }

    stage('npm e2e') {
        sh "npm run e2e:ci"
    }

    stage('npm typedoc') {
        sh "npm run docs:typedoc"
    }

    stage('npm compodoc') {
        sh "npm run docs:compodoc"
    }
}
