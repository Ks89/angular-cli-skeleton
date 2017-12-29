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

    stage('npm build dev') {
        sh "npm run build:dev"
    }

    stage('npm build prod') {
        sh "npm run build:prod"
    }

    stage('npm test') {
        sh "npm run test:ci"
    }

    stage('npm e2e') {
        sh "npm run e2e:ci"
    }
}
