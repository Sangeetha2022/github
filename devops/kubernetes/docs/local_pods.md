# Kubernetes Pods for Development<br/>
   In here we will see how to containerize development apps, dev-ops and deploy them in kubernetes.

# Content
1. [Prerequisites](#prerequisites)
1. [DevOps-DB](#devops-db)
1. [DevOps](#devops)
1. [Telemetry](#telemetry)


# Prerequisites<br/> 
  [Kubernetes Setup](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/docs/Kubernetes_setup.md) <br/> 
  Knowledge on Dev-Ops, Docker, containers.
  
  
# DevOps-DB<br/> 
   The DevOps DB Pod consists of Database needed for the DevOps, currently it has Postgres DB for the SonarQube.
   
   To Deploy the DevOps DB:
   
   createe PersistanceVolume for the DB
   
     $ kubectl create -f sonar-pv-postgres.yaml
   
   create deployment:
   
     $ kubectl create -f dev-ops-db-deployment.yaml
 
   create service:
   
     $ kubectl create -f dev-ops-db-service.yaml
      
   Now the DevOps DB Pod is up and running.   
  
  
# DevOps<br/> 
  DevOps is a software development methodology that combines software development with information technology operations to shorten the systems development life cycle while delivering features, fixes, and updates frequently in close alignment with business objectives.
  
  The DevOps Pod consists of number of containers: Jenkins, Nexus, Sonarqube, Rancher and Jmeter.
  
  NOTE: Before DevOps we need to setup DevOps DB.
  
 ### Jenkins:
  Jenkins helps to automate the non-human part of the software development process, with continuous integration and facilitating technical aspects of continuous delivery.
  
 ### Nexus:
  The best way to organize, store, and distribute software components.
 
 ### SonarQube:
  SonarQube is an open-source platform developed by SonarSource for continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities.
  
  To Deploy all the three containers in one Pod:
     we need create a kubernetes deployment with the file [dev-ops-deployment.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/dev/devops/kubernetes/dev-ops/dev-ops-deployment.yaml)
  
     $ kubectl create -f dev-ops-deployment.yaml
   
  To expose this containers we need to create a kubernetes service [dev-ops-service.yaml](https://github.com/GeppettoSoftware/geppettotest/blob/dev/devops/kubernetes/dev-ops/dev-ops-service.yaml)
     
     $ kubectl create -f dev-ops-service.yaml
  
  Now the DevOps will be up and running in our kubernetes Cluster.


# Telemetry<br/> 
   The Telemetry Pod consists of EFK(Elasticsearch + Fluentd + Kibana), Vault and Prometheus.
   
   To create a namespace for this telemetry pods run this file [kube-logging.yaml](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/telimetry-pod/kube-logging.yaml)
   
     $ kubectl create -f kube-logging.yaml     
         
   You can then confirm that the Namespace was successfully created:
   
     $ kubectl get namespaces
         
   # EFK  
   
   Elasticsearch is a real-time, distributed, and scalable search engine which allows for full-text and structured search, as well as analytics. It is commonly used to index and search through large volumes of log data, but can also be used to search many different kinds of documents.
   
   Elasticsearch is commonly deployed alongside Kibana, a powerful data visualization frontend and dashboard for Elasticsearch. Kibana allows you to explore your Elasticsearch log data through a web interface, and build dashboards and queries to quickly answer questions and gain insight into your Kubernetes applications.
   
   Fluentd to collect, transform, and ship log data to the Elasticsearch backend. Fluentd is a popular open-source data collector that we'll set up on our Kubernetes nodes to tail container log files, filter and transform the log data, and deliver it to the Elasticsearch cluster, where it will be indexed and stored.
         
   To create the persistent volume run this file [elasticsearch_pv.yaml](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/telimetry-pod/elasticsearch_pv.yaml)
   
     $ kubectl create -f elasticsearch_pv.yaml
         
   Run this file is to create elasticsearch deployment [elasticsearch_stateset.yaml](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/telimetry-pod/elasticsearch_statefulset.yaml)
   
     $ kubectl create -f elasticsearch_stateset.yaml
             
   Run this file to create elasticsearch service [elasticsearch_svc.yaml](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/telimetry-pod/elasticsearch_svc.yaml)
   
     $ kubectl create -f elasticsearch_svc.yaml
    
   To deploy the Kibana, run this file [kibana.yaml](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/telimetry-pod/kibana.yaml)
   
     $ kubectl create -f kibana.yaml
     
   After elasticsearch and kibana is set need to connect to fluentd for container logs,

   To deploy the fluentd,run this file [fluentd.yaml](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/telimetry-pod/fluentd.yaml)
   
     $ kubectl create -f fluentd.yaml
     
   ![Kibana](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/docs/images/kibana.png?raw=true"Kibana")   
   
   Now,EFK is up and running.
  
   # Prometheus
   
   An open-source monitoring system with a dimensional data model, flexible query language, efficient time series database and modern alerting approach.
   
   To create clusterRole config [prometheus-clusterRole.yaml](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/telimetry-pod/prometheus-clusterRole.yaml)
   
     $ kubectl create -f prometheus-clusterRole.yaml
     
   To create a config Map [prometheus-config-map.yaml](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/telimetry-pod/prometheus-config-Map.yaml)
   
     $ kubectl create -f prometheus-config-map.yaml
   
   # Vault
   
   Vault is a tool for securely accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, certificates, and more. Vault provides a unified interface to any secret while providing tight access control and recording a detailed audit log.
   
   ![Vault](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/docs/images/Vault.png?raw=true"Vault")
   
   Run this file to create deployment for vault [telemetry-deployment.yaml](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/telimetry-pod/telemetry-deployment.yaml)
   
      $ kubectl create -f telemetry-deployment.yaml
      
   Run this file to create the service [telemetry-service.yaml](https://github.com/TharaniRajan/Geppetto-local-K8s/blob/master/telimetry-pod/telimetry-service.yaml)
       
      $ kubectl create -f telimetry-service.yaml