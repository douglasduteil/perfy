FROM buildpack-deps:jessie

USER root
ENV HOME /home/travis
ENV NODE_VER v8

# setup the nvm environment
RUN git clone https://github.com/creationix/nvm.git $HOME/.nvm
RUN echo '\n#The Following loads nvm, and install Node.js which version is assigned to $NODE_ENV' >> $HOME/.profile
RUN echo '. ~/.nvm/nvm.sh' >> $HOME/.profile
RUN echo 'echo "Installing node@${NODE_VER}, this may take several minutes..."' >> $HOME/.profile
RUN echo 'nvm install ${NODE_VER}' >> $HOME/.profile
RUN echo 'nvm alias default ${NODE_VER}' >> $HOME/.profile
RUN echo 'echo "Install node@${NODE_VER} finished."' >> $HOME/.profile

RUN mkdir -p /home/travis/build/
WORKDIR /home/travis/build/
COPY . .

RUN npm install -g npm
RUN npm install
RUN npm run bootstrap

ENTRYPOINT ["/bin/bash", "--login", "-i", "-c"]
CMD ["bash"]
