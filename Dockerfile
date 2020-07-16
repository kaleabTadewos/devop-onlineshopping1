FROM node:10
MAINTAINER kaleab <tadewoskaleab@gmail.com>
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN curl -fsSLO https://get.docker/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz
COPY . /app/
CMD ["npm", "start"]
EXPOSE 3000
