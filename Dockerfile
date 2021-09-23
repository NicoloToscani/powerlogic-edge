#Choose Base Image : alpine
#mmckay 01/11/2021 use updated base image: node.js 15.5.1, alpine 3.12.1+ due to vulnerabilities in prior versions
#FROM node:8.10.0-alpine
FROM node:15.5.1-alpine3.12

# Create app directory
WORKDIR ~/app/

# Copy dependecies json 
COPY app/package*.json ./

# Install dependencies which are not mentioned in the json file
#mmckay 01/11/2021 use python3 because alpine 3.12 does not include python2
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python3 && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps

# Install json dependencies
RUN npm install jsmodbus &&\
    npm install readline && \
    npm install net && \
    npm install os

# Bundle app source
COPY app/ .

# Start application
CMD [ "node", "powerlogic.js" ]

