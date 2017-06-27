FROM debian:latest


# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update the repository sources list
# and install dependencies
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get -y autoclean

USER root
ENV HOME /root
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v8

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

RUN source $NVM_DIR/nvm.sh
RUN nvm install $NODE_VERSION
RUN nvm alias default $NODE_VERSION
RUN nvm use default

RUN mkdir -p /home/travis/build/
WORKDIR /home/travis/build/
COPY . .

RUN node -v
RUN npm -v
RUN npm install -g npm
RUN npm install
RUN npm run bootstrap
