pipeline {
  agent {
    docker {
      image 'abhishekmaniyar3811/node-app-demo-2:latest'
      args '--user root -v /var/run/docker.sock:/var/run/docker.sock' // mount Docker socket to access the host's Docker daemon
    }
  }
  stages {
    stage('Checkout') {
      steps {
        sh 'echo passed'
      }
    }
    stage('Build and Test') {
      steps {
        sh 'npm run build'
      }
    }
  
    stage('Build and Push Docker Image') {
      environment {
        DOCKER_IMAGE = "abhishekmaniyar3811/node-app-demo-2:${BUILD_NUMBER}"
        REGISTRY_CREDENTIALS = credentials('docker-hub-creds')
      }
      steps {
        script {
            sh 'docker build -t ${DOCKER_IMAGE} .'
            def dockerImage = docker.image("${DOCKER_IMAGE}")
            docker.withRegistry('https://index.docker.io/v1/', "docker-hub-creds") {
                dockerImage.push()
            }
        }
      }
    }
    stage('Update Deployment File') {
        environment {
            GIT_REPO_NAME = "node-demo-deployment-3811"
            GIT_USER_NAME = "abhishekmaniy"
        }
        steps {
            withCredentials([string(credentialsId: 'githubtokennode2', variable: 'GITHUB_TOKEN')]) {
                sh '''
                    git config user.email "abhishekmaniyar502@gamil.com"
                    git config user.name "Abhishek3880"
                    BUILD_NUMBER=${BUILD_NUMBER}
                    sed -i "s/replaceImageTag/${BUILD_NUMBER}/g" k8s/node-demo-2/values.yml
                    git add .
                    git commit -m "Update deployment image to version ${BUILD_NUMBER}"
                    git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
                '''
            }
        }
    }
  }
}