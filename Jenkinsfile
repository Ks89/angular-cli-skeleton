node {
    def nodeHome = tool name: 'node-8.4.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

    stage('check tools') {
        sh "node -v"
        sh "npm -v"
    }

    stage('checkout') {jen
        checkout scm
    }

    stage('npm install') {
        sh "npm install"
    }

    stage('unit tests') {
        sh "ng test --watch false"
    }

    stage('protractor tests') {
        sh "npm run e2e"
    }
}
