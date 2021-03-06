# Getting Started

## Local Installation

## Pre requisites

The Geppetto application requires the following:

| Component        | Type/Version                      |
| -------------    | :-----------:                     |
| Computer Memory  | 16 GB                             |
| Computer OS      | Ubuntu 20.x/Mac 11.5.x            |
| Git              | 2.30.x (or latest)                |
| Github           | sign up on web                    |
| Docker           | 20.10.x                           |
| Docker-compose   | 1.29.x                            |
| NVM              | latest version for github         |
| Node             | 14.17.5                           |
| NPM              | 7.20.x                            |
| Angular-cli      | 12.1.3                            |
| VS Code          | July 2021 (version 1.59) or above |

---
&nbsp;
&nbsp;

## Step by Step Installation

&nbsp;
&nbsp;


### Step one

- Github 
  - [Sign up](https://github.com/)


### Step two

- Git
  - [Install Git on Ubuntu](https://linuxconfig.org/how-to-install-git-on-ubuntu-20-04-lts-focal-fossa-linux)

### Step three

- VS Code
  - [Install VS Code](https://linuxize.com/post/how-to-install-visual-studio-code-on-ubuntu-20-04/)
  - Install VS Code extensions
    - [Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
    - [Markdown](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
      - [How to use Markdown](https://thisdavej.com/build-an-amazing-markdown-editor-using-visual-studio-code-and-pandoc/)
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
    - [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
    - [Vs Code Icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
    - [Angular Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)

### Step four

- Docker
  - [How to Install Docker On Ubuntu 20.04 LTS Focal Fossa](https://www.youtube.com/watch?v=aMKUuaga85A)
    1. once docker is installed execute this command: $~~$ ***sudo usermod -aG docker $USER***
    2. close all apps including the terminal
    3. shutdown the machine
    4. restart the machine and open a terminal issue this command: $~~~$ ***docker ps -a***
    5. if your screen looks like the image below docker is successfully installed on your machine 
    ![alt text](./images/test-docker-success.png "docker success")

## Step five

- Install Curl
  - [Installing Curl on Ubuntu](https://www.cyberciti.biz/faq/how-to-install-curl-command-on-a-ubuntu-linux/)

### Step Five

- Install Docker Compose
  - [How to Install docker-compose](
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)

### Step six

- NVM
  - [Installing NVM](https://github.com/nvm-sh/nvm#install--update-script)
  - [Verify NVM Installation](https://github.com/nvm-sh/nvm#verify-installation)

### Step seven

- Node
  - [Install via NVM](https://github.com/nvm-sh/nvm#usage)
  - Example for node version 14.17.5 the command is: ***nvm install 14.17.5***
  - Validate Node version
    - run this command: ***node --version***

### Step eight

- Upgrade NPM

  - Type this command: ***npm $~~$ install $~~$-g $~~$ npm@latest***
  - Verify NPM version
    - Type this command:$~~$ ***npm $~~$--version*** $~~$you should see "7.21.0"
  
### Step nine

- Angular
  - [Install a specific Angular version](https://www.npmjs.com/package/@angular/cli)
    - Type this command: $~~$ ***npm install -g @angular/cli@12.1.3***

### Step ten

- Clone from Github:
&nbsp;

***Command:***$~$ ***git clone*** $~$ https://github.com/dan-castillo/geppettotest.git

### Step eleven

- Start the app
  - Mac users see below
  - Navigate to /geppettotest/devops/docker-compose
  - issue the following command: ***bash $~~$ geppetto_compose.sh $~~$ -c***
&nbsp;
  - MAC users please note: you must increase the memory allocated to docker to 12 GB before starting the system
    - Allocate more memory (RAM) to docker on a MAC
      - on the Docker Desktop dashboard click on the gear symbol upper right hand
&nbsp;
&nbsp;
       ![alt text](./images/docker-settings.png "change docker settings")
&nbsp;
&nbsp;
    - Increase the memory allocated to docker
     ![alt text](./images/docker-memory-resources.png "change docker settings")





## Testing local installation - Create and Generate and Application


Camunda issue
curl -i -X POST -H "Content-Type: multipart/form-data" -F "data=@../../application/services/Camunda/Gep_authorize.dmn" -F "deployment-name=gep_authorize" -F "enable-duplicate-filtering=true" -F "deploy-changed-only=true" http://localhost:8080/engine-rest/deployment/create