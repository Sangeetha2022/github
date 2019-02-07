![Logo](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/docs/GeppettoIcon.png?raw=true"Logo")

# Kubernetes<br/>
   In here we will see how to Setup Kubernetes in local with minikube and setup the necessary pods for the local development.

# Content
1. [Prerequisites](#prerequisites)
1. [Kubernetes Setup](#kubernetes-setup)
1. [Local Pods Setup](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/docs/local_pods.md)


# Prerequisites<br/> 
   [Docker](https://docs.docker.com/install/) <br/> 
   [Virtual Machine](https://www.virtualbox.org/wiki/Downloads) <br/> 
   [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) <br/> 
   [Kubernetes CLI](https://kubernetes.io/docs/tasks/tools/install-kubectl/) <br/> 
  
  
# Kubernetes Setup
  The Kubernetes is an open source containers orchestration tool,i.e ability to deploy, scale, and operate with multiple containers from one place.
  
### Setting up Kubernetes:<br/>
  To run Kubernetes first you need to setup a VM usng the following command
   
    $ sudo apt install virtualbox virtualbox-ext-pack 
            
  After this need to install Minikube which runs Kubernetes in your local machine.
 
    $ curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.31.0/minikube-linux-amd64 && chmod +x  minikube && sudo cp minikube /usr/local/bin/ && rm minikube
    $ minikube start
            
 Once your setuped with minikube need to install kubectl which is the Kubernetes CLI:

    $ sudo apt-get update && sudo apt-get install -y apt-transport-https
    $ curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
    $ echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
    $ sudo apt-get update
    $ sudo apt-get install -y kubectl

 Thats it! Now you have setuped Kubernetes.
 
  to check the node is configured with kubernetes using command:
  
     $ kubectl get nodes
     
  you will get the minikube node.
   

  Now we can open the Minikube Dashboard using:
     
     $ minikube dashboard
  
  you can able to see browser opens with the minikube Kubernetes Dashboard.  
