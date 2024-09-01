pipeline {
    agent any

    environment {
        REGISTRY = "your-docker-registry"
        REPOSITORY = "chat-app"
        BACKEND_IMAGE = "${REGISTRY}/${REPOSITORY}/backend"
        FRONTEND_IMAGE = "${REGISTRY}/${REPOSITORY}/frontend"
        KUBE_CONFIG = credentials('your-kubeconfig')
    }

    stages {
        stage('Build Backend') {
            steps {
                script {
                    docker.build(BACKEND_IMAGE, './backend')
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.build(FRONTEND_IMAGE, './frontend')
                }
            }
        }

        stage('Push Backend') {
            steps {
                script {
                    docker.image(BACKEND_IMAGE).push()
                }
            }
        }

        stage('Push Frontend') {
            steps {
                script {
                    docker.image(FRONTEND_IMAGE).push()
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withKubeConfig([credentialsId: KUBE_CONFIG]) {
                        sh 'kubectl apply -f kubernetes/'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
