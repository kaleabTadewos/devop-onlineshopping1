node {
  def project = 'concise-hue-278020' 
  def appName = 'onlineshopping-service'
  def nameSpace='onlineshopping'
  def cluster='onlineshopping-cluster'
  def region='us-east1-d'
  def feSvcName = "PROJECT-${appName}"
  def imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.5"
  
  checkout scm
 // stage 'Build image'
  //stage('Initialize'){
    //    def dockerHome = tool 'my-docker'
      //  env.PATH = "${dockerHome}/bin:${env.PATH}"
  //}

  sh("docker build -t ${imageTag} .")

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


