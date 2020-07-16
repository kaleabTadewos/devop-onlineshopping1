node {
  def project = 'concise-hue-278020' 
  def appName = 'onlineshopping-service'
  def nameSpace='onlineshopping'
  def cluster='onlineshopping-cluster'
  def region='us-east1-d'
  def feSvcName = "PROJECT-${appName}"
  def imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.5"

agent {
    kubernetes {
      label 'sample-app'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: cd-jenkins
  containers:
  - name: golang
    image: golang:1.10
    command:
    - cat
    tty: true
  - name: gcloud
    image: gcr.io/cloud-builders/gcloud
    command:
    - cat
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat
    tty: true
"""
}
  }

  stages {
    stage('Test') {
      steps {
        container('golang') {
          sh """
            ln -s `pwd` /go/src/sample-app
            cd /go/src/sample-app
            go test
          """
        }
      }
    }
    stage('Build and push image with Container Builder') {
      steps {
        container('gcloud') {
          sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${IMAGE_TAG} ."
        }
      }
    }


  checkout scm
 // stage 'Build image'
 // sh("docker build -t ${imageTag} .")
 
  stage 'Run node tests'
  //sh("docker run ${imageTag} node test")
  stage 'Skipping node tests'
  stage 'Push image to registry'
  sh("gcloud docker -- push ${imageTag}")
  stage "Deploy Application"
  switch (env.BRANCH_NAME) {
  case "master":
  sh("kubectl get ns onlineshopping || kubectl create ns onlineshopping")
  sh("sed -i.bak 's#gcr.io/gcr-project/sample:1.0.0#${imageTag}#' ./k8s/${nameSpace}/*.yaml")
  sh("kubectl --namespace=${nameSpace} apply -f k8s/services/")
  sh("kubectl --namespace=${nameSpace} apply -f k8s/${nameSpace}/")
  }
  
}
}


