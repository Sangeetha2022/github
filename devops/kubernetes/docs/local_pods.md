# Geppetto Application Local Setup<br/>
   In here we will see how to setup geppetto application in local.(minikube)

# Content
1. [Prerequisites](#prerequisites)
1. [Telemetry](#telemetry)
1. [App-Db](#app-db)
1. [App-Pod](#app-pod)
1. [Generator-Pod](#generator-pod)
1. [System-Entry-Pod](#system-entry-pod)
1. [Devops-db](#devops-db)
1. [Devops](#devops)


# Prerequisites<br/> 
  [Kubernetes Setup](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/docs/Kubernetes_setup.md)<br/> 
  Knowledge on Dev-Ops, Docker, containers. <br/> 
  Download the repo and have the YAML files in your working directry. <br/> 
  Create Namespace for kubernetes to maintain the resources in seperate namespace.
  
        $ kubectl create namespace gep-dev-201902

# Telemetry<br/> 

The Telemetry Pod consists of EFK(Elasticsearch + Fluentd + Kibana), Vault and Prometheus.


 # Prometheus
   
   An open-source monitoring system with a dimensional data model, flexible query language, efficient time series database and modern alerting approach.
   
   To create clusterRole config [prometheus-clusterRole.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/telimetry-pod/prometheus-clusterRole.yaml)
   
     $ kubectl create -f prometheus-clusterRole.yaml
     
   To create a config Map [prometheus-config-map.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/telimetry-pod/prometheus-config-map.yaml)
   
     $ kubectl create -f prometheus-config-map.yaml

# Vault
   
   Vault is a tool for securely accessing secrets. A secret is anything that you want to tightly control access to,such as API keys, passwords, certificates, and more. Vault provides a unified interface to any secret while providing tight access control and recording a detailed audit log.
   
   ![Vault](https://github.com/GeppettoSoftware/geppettotest/blob/dev/devops/kubernetes/docs/images/Vault.png?raw=true"Vault")
   
   Run this file to create deployment for vault [telemetry-deployment.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/telimetry-pod/telimetry-deployment.yaml)
   
      $ kubectl create -f telemetry-deployment.yaml
      
   Run this file to create the service [telemetry-service.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/telimetry-pod/telimetry-deployment.yaml)
       
      $ kubectl create -f telimetry-service.yaml

   You can get the telimetry running port in minikube,

      $ kubectl get service --namespace=gep-dev-201902

   Access the vault in browser and load the secrets needed for the mongo db.

   ![vault-data](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/docs/images/vault-secret.png?raw=true"vault-data")
  
  # App-Db<br/> 

   The App-DB Pod consists of Database needed for the Geppetto-app.
   
   To Deploy the App-Db-Pod DB:
   
   To create persistance-volume(pv) for the DB [mongo-pv.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/app-db-pod/mongo-pv.yaml)
   
     $ kubectl create -f mongo-pv.yaml

   Create persistance-volume-claim(pvc) for the DB [mongo-pvc.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/app-db-pod/mongo-pvc.yaml)
   
     $ kubectl create -f mongo-pvc.yaml

   Create deployment [dev-ops-db-deployment.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/app-db-pod/dev-ops-db-deployment.yaml)
   
     $ kubectl create -f app-db-deployment.yaml
   
   Create service [dev-ops-db-service.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/app-db-pod/dev-ops-db-service.yaml)
   
     $ kubectl create -f app-db-service.yaml
      
   Now the App-DB-Pod is up and running.

   # App-Pod<br/> 
   
   To Deploy the App-Pod:

   Create deployment [app-deployment.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/app-pod/app-deployment.yaml)
   
     $ kubectl create -f app-deployment.yaml
 
   Create service [app-service.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/app-pod/app-service.yaml)
   
     $ kubectl create -f app-service.yaml
      
   Now the App-Pod is up and running.

   To check the logs of the container,

   ![app-pod-logs](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/docs/images/app-pod-logs.png?raw=true"app-pod-logs")

   # Generator-Pod<br/> 
   
   To Deploy the Generator-Pod:

   Create persistent volume claim(pvc) [generated-code-pvc.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/generator-pod/generated-code-pvc.yaml)
   
     $ kubectl create -f generated-code-pvc.yaml

   Create deployment [generator-deployment.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/generator-pod/generator-deployment.yaml)
   
     $ kubectl create -f generator-deployment.yaml
 
   Create service [generator-service.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/system-entry-pod/generator-service.yaml)
   
     $ kubectl create -f generator-service.yaml
      
   Now the Generator-Pod is up and running.

  # System-Entry-Pod<br/> 
   
   To Deploy the System-Entry-Pod:

   Create deployment [system-entry-deployment.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/system-entry-pod/system-entry-deployment.yaml)
   
     $ kubectl create -f app-deployment.yaml
 
   Create service [system-entry-service.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/system-entry-pod/system-entry-service.yaml)
   
     $ kubectl create -f app-service.yaml
      
   Now the system-entry-Pod is up and running.
  
# DevOps-DB<br/> 

   The DevOps DB Pod consists of Database needed for the DevOps, currently it has Postgres DB for the SonarQube.
   
   To Deploy the DevOps DB:
   
   create PersistanceVolume for the DB [sonar-pv-postgres.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/dev-ops-db/sonar-pv-postgres.yaml)
   
     $ kubectl create -f sonar-pv-postgres.yaml 
   
   create deployment:[dev-ops-db-deployment.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/dev-ops-db/dev-ops-db-deployment.yaml)
   
     $ kubectl create -f dev-ops-db-deployment.yaml
 
   create service:[dev-ops-db-service.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/dev-ops-db/dev-ops-db-service.yaml)
   
     $ kubectl create -f dev-ops-db-service.yaml
      
   Now the DevOps DB Pod is up and running.   
   
# DevOps<br/> 

  DevOps is a software development methodology that combines software development with information technology operations to shorten the systems development life cycle while delivering features, fixes, and updates frequently in close alignment with business objectives.
  
  The DevOps Pod consists of number of containers: Jenkins, Nexus, Sonarqube, Rancher .
  
  NOTE: Before DevOps we need to setup DevOps DB.
  
 ### Jenkins:
  Jenkins helps to automate the non-human part of the software development process, with continuous integration and facilitating technical aspects of continuous delivery.
  
 ### Nexus:
  The best way to organize, store, and distribute software components.
 
 ### SonarQube:
  SonarQube is an open-source platform developed by SonarSource for continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities.
  
  To Deploy all the three containers in one Pod:

     we need create a kubernetes deployment with the file [dev-ops-deployment.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/dev-ops/dev-ops-deployment.yaml)
  
     $ kubectl create -f dev-ops-deployment.yaml
   
  To expose this containers we need to create a kubernetes service [dev-ops-service.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/local/dev-ops/dev-ops-service.yaml)
     
     $ kubectl create -f dev-ops-service.yaml
  
  Now the DevOps will be up and running in our kubernetes Cluster.
  
  To check services in browser(or you can get the services directly through rancher):
  
     $ kubectl get svc --namespace=gep-dev-201902
  
  this command will get the services from the kubernetes and note the port of your service you wanted to access.
  
     $ minikube ip
  
  if you use the ip with the port you can access the services in the browser.

# Telemetry<br/> 

   The Telemetry Pod consists of EFK(Elasticsearch + Fluentd + Kibana), Vault and Prometheus.
   
   To create a namespace for this telemetry pods run this file [kube-logging.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/feature/deployment-manager/devops/kubernetes/telimetry-pod/EFK/kube-logging.yaml)
   
     $ kubectl create -f kube-logging.yaml     
         
   You can then confirm that the Namespace was successfully created:
   
     $ kubectl get namespaces
         
   # EFK  
   
   Elasticsearch is a real-time, distributed, and scalable search engine which allows for full-text and structured search, as well as analytics. It is commonly used to index and search through large volumes of log data, but can also be used to search many different kinds of documents.
   
   Elasticsearch is commonly deployed alongside Kibana, a powerful data visualization frontend and dashboard for Elasticsearch. Kibana allows you to explore your Elasticsearch log data through a web interface, and build dashboards and queries to quickly answer questions and gain insight into your Kubernetes applications.
   
   Fluentd to collect, transform, and ship log data to the Elasticsearch backend. Fluentd is a popular open-source data collector that we'll set up on our Kubernetes nodes to tail container log files, filter and transform the log data, and deliver it to the Elasticsearch cluster, where it will be indexed and stored.
         
   To create the persistent volume run this file [elasticsearch_pv.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/dev/devops/kubernetes/telimetry-pod/EFK/elasticsearch_pv.yaml)
   
     $ kubectl create -f elasticsearch_pv.yaml
         
   Run this file is to create elasticsearch deployment [elasticsearch_stateset.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/dev/devops/kubernetes/telimetry-pod/EFK/elasticsearch_statefulset.yaml)
   
     $ kubectl create -f elasticsearch_stateset.yaml
             
   Run this file to create elasticsearch service [elasticsearch_svc.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/dev/devops/kubernetes/telimetry-pod/EFK/elasticsearch_svc.yaml)
   
     $ kubectl create -f elasticsearch_svc.yaml
    
   To deploy the Kibana, run this file [kibana.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/dev/devops/kubernetes/telimetry-pod/EFK/kibana.yaml)
   
     $ kubectl create -f kibana.yaml
     
   After elasticsearch and kibana is set need to connect to fluentd for container logs,

   To deploy the fluentd,run this file [fluentd.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/dev/devops/kubernetes/telimetry-pod/EFK/fluentd.yaml)
   
     $ kubectl create -f fluentd.yaml
     
   ![Kibana](https://github.com/GeppettoSoftware/geppettotest/blob/dev/devops/kubernetes/docs/images/kibana.png?raw=true"Kibana")   
   
   Now,EFK is up and running.
  
   
