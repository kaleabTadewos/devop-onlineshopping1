FROM node:10
MAINTAINER kaleab <tadewoskaleab@gmail.com>
WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY . /app/
CMD ["npm", "start"]
EXPOSE 3000
