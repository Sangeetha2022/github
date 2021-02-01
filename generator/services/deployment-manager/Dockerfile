FROM node:14.11.0-alpine

# # terraform
# RUN apk update && apk upgrade && apk add ca-certificates && update-ca-certificates\
#     wget \
#     unzip \
#   && rm -rf /var/lib/apk/lists/*

# RUN wget --quiet https://releases.hashicorp.com/terraform/0.13.3/terraform_0.13.3_linux_amd64.zip \
#   && unzip terraform_0.13.3_linux_amd64.zip \
#   && mv terraform /usr/bin \
#   && rm terraform_0.13.3_linux_amd64.zip

COPY . /deploymentmanager
WORKDIR /deploymentmanager 
RUN npm install
RUN npm i -g ts-node
CMD npm run prod