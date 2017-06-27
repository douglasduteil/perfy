FROM node:8

RUN mkdir -p /home/travis/build/
WORKDIR /home/travis/build/
COPY . .

RUN npm install -g npm
RUN npm install
RUN npm run bootstrap
