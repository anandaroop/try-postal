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

WORKDIR /

RUN echo "alias l=\"ls -laF --color\"" >> ~root/.bashrc
RUN echo "alias ..=\"cd ..\"" >> ~root/.bashrc
CMD [ "bash" ]
