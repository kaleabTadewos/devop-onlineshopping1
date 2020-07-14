node {
  checkout scm
  
  stage 'Stop and remove previous created image'
  sh("docker stop demo-api || true && docker rm demo-api || true")
  stage 'build new docker image'
  sh("docker build -t demo-api:${BUILD_NUMBER} .")
  stage 'run docker container on host machine'
  sh("docker run -d -p 3000:3000 --name=demo-api demo-api:${BUILD_NUMBER}")
}
