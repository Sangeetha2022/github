From node:10.14.2

# terraform
RUN apt-get update && apt-get install -y \
    wget \
    unzip nano \
  && rm -rf /var/lib/apt/lists/*

RUN wget --quiet https://releases.hashicorp.com/terraform/0.11.13/terraform_0.11.13_linux_amd64.zip \
  && unzip terraform_0.11.13_linux_amd64.zip \
  && mv terraform /usr/bin \
  && rm terraform_0.11.13_linux_amd64.zip


COPY . /clustermanager
WORKDIR /clustermanager 
RUN npm install
RUN npm i -g ts-node
CMD npm run prod