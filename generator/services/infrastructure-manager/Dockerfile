FROM ubuntu:16.04
RUN apt-get update
# RUN apt-get install locales

# # Set the locale
# RUN locale-gen en_US.UTF-8
# ENV LANG en_US.UTF-8
# ENV LANGUAGE en_US:en
# ENV LC_ALL en_US.UTF-8

# Install dependencies
# ENV DEBIAN_FRONTEND noninteractive
# RUN apt-get update
# RUN apt-get install -qq wget unzip build-essential cmake gcc libcunit1-dev libudev-dev curl vim
RUN apt-get install vim curl python-software-properties -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install nodejs -y

COPY . /infrastructuremanager
WORKDIR /infrastructuremanager 
RUN npm install
RUN npm i -g ts-node
CMD npm run dev