FROM buildpack-deps:jessie


# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

USER root
ENV HOME /root
ENV NODE_VERSION v8

# setup the nvm environment
RUN git clone https://github.com/creationix/nvm.git $HOME/.nvm

RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

RUN mkdir -p /home/travis/build/
WORKDIR /home/travis/build/
COPY . .

RUN node -v
RUN npm -v
RUN npm install -g npm
RUN npm install
RUN npm run bootstrap
