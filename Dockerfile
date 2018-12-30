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

# prerequisites for node bindings
# RUN apt-get install build-essential
RUN yarn global add node-gyp

ADD . /app

# add node bindings
# RUN yarn add node-postal

WORKDIR /app/server
CMD [ "yarn", "start" ]

RUN echo "alias l=\"ls -laF --color\"" >> ~root/.bashrc
RUN echo "alias ..=\"cd ..\"" >> ~root/.bashrc
# CMD [ "bash" ]

# TODO dockerignore e.g. Dockerfile itself