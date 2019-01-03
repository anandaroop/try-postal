FROM node:8.15

# prerequisites for building
RUN apt-get install curl autoconf automake libtool pkg-config

# build libpostal
RUN git clone https://github.com/openvenues/libpostal
WORKDIR libpostal
RUN ./bootstrap.sh
RUN ./configure --datadir=/data
RUN make -j4
RUN make install
RUN ldconfig

# set up app dir
RUN mkdir -p /app/server
WORKDIR /app/server

# build node_modules directly into the image
COPY server/package.json /app/server/package.json
COPY server/yarn.lock /app/server/yarn.lock
RUN yarn global add node-gyp
RUN yarn install

# copy source over, but without ignored paths such as node_modules
COPY . /app

# build the CRA app
WORKDIR /app/client
RUN yarn install
RUN yarn run build
RUN rm -rf node_modules
RUN mv ./build ../server/public

# start server
WORKDIR /app/server
CMD [ "yarn", "start" ]

# debug
# RUN echo "alias l=\"ls -laF --color\"" >> ~root/.bashrc
# RUN echo "alias ..=\"cd ..\"" >> ~root/.bashrc
# CMD [ "bash" ]
