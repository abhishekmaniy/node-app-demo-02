pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'abhishekmaniyar3811/node-app-demo-2'
        DOCKER_CREDENTIALS_ID = 'docker-hub-creds'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/abhishekmaniy/node-app-demo-02.git', branch: 'main'
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'node index.js & sleep 5 && kill $!' // Runs app briefly to check if it starts
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    env.COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.IMAGE_TAG = "${DOCKER_IMAGE}:${COMMIT_HASH}"
                }
                sh 'docker build -t $IMAGE_TAG .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_TAG
                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Docker image built and pushed: ${IMAGE_TAG}"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
