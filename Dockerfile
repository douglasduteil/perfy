FROM node:8

RUN mkdir -p /home/travis/build/

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json package-lock.json lerna.json /tmp/
RUN find . -regex '^./packages/\w+/package\(-lock\)?.json' -type f -exec cp -a --parents '{}' /tmp/ \;

RUN mkdir -p /tmp/packages/@types
COPY packages/@types /tmp/packages/@types/

RUN cd /tmp && ls
RUN cd /tmp && ls packages
RUN cd /tmp && ls packages/cli
RUN cd /tmp && npm install
RUN cd /tmp && npm run bootstrap
RUN cp -a /tmp/node_modules /home/travis/build/
RUN cp -a --parents /tmp/packages/*/node_modules /home/travis/build/


# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /home/travis/build/

COPY . .

