pipeline {
    agent any
       triggers {
        pollSCM "* * * * *"
       }
    stages {
        stage('Build Application') { 
            steps {
                echo '=== Building workoutplan Application ==='
                sh 'npm install' 
            }
        }
        stage('Test Application') {
            steps {
                echo '=== Testing workoutplan Application ==='
                sh 'npm install express'
                sh 'cp /tmp/.env' .
                sh 'node seeders/test.js'
            }
        }
        stage('Build Docker Image') {
            when {
                branch 'master'
            }
            steps {
                echo '=== Building workoutplan Docker Image ==='
                script {
                    app = docker.build("zisyang/workoutplan")
                }
            }
        }
        stage('Push Docker Image') {
            when {
                branch 'master'
            }
            steps {
                echo '=== Pushing workoutplan Docker Image ==='
                script {
                    GIT_COMMIT_HASH = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
                    SHORT_COMMIT = "${GIT_COMMIT_HASH[0..7]}"
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerHubCredentials') {
                        app.push("$SHORT_COMMIT")
                        app.push("latest")
                    }
                }
            }
        }
    }
}