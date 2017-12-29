
node {
    def nodeHome = tool name: 'node-8.4.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

    stage('check tools') {
        sh "node -v"
        sh "npm -v"
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
        sh "ng test --watch false"
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
