values_yaml(object) ::= <<
# Default values for $object.project_name$.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

app:
  prefix: $object.project_name$
  namespace: $object.project_name$

logging:
  namespace: $object.project_name$-logging

service:
  type: NodePort
  appbuilderType: NodePort

  apigateway:
    name: apigateway
    type: NodePort
    port: 3000  
    targetPort: 3000
    nodePort: 31234
  camunda:
    name: camunda
    type: NodePort
    port: 3008
    targetPort: 3008
  authproxy:
    name: authproxy
    type: NodePort
    port: 3009
    targetPort: 3009
  security:
    name: securitymanager
    type: NodePort
    port: 3007
    targetPort: 3007
  admin:
    name: adminmanager
    type: NodePort
    port: 3010
    targetPort: 3010
  mongo:
    name: mongo
    type: NodePort
    port: 27017
    targetPort: 27017
  desktop:
    name: desktop
    type: NodePort
    port: 80
    targetPort: 80
  camundapod:
    name: camundapod
    type: NodePort
    port: 8080
    targetPort: 8080
$if(object.custom_node)$$object.custom_node:{custom_node | 
$\ $$\ $$custom_node.name$: 
    name: $custom_node.name$
    type: NodePort
    port: $custom_node.port$
    targetPort: $custom_node.port$
};separator="\n"$$endif$

deployment:
  defaultImagePullPolicy: IfNotPresent
  customImagePullPolicy: Always
  apigateway:
     name: apigateway
     image: geppettotest/$object.project_name$-apigateway:1.0
  mongo:
     name: mongo
     image: mongo:3.2   
  camunda:
     name: camunda
     image: geppettotest/default-camunda:1.0
  authproxy:
     name: authproxy
     image: geppettotest/default-authproxy:1.0
  security:
     name: securitymanager
     image: geppettotest/default-securitymanager:1.0
  admin:
     name: adminmanager
     image: geppettotest/default-adminmanager:1.0
  desktop:
     name: desktop
     image: geppettotest/$object.project_name$-desktop:1.0
$if(object.custom_node)$$object.custom_node:{custom_node | 
$\ $$\ $$custom_node.name$: 
    name: $custom_node.name$
    image: geppettotest/$object.project_name$-$custom_node.name$:1.0
};separator="\n"$$endif$
  camundapod:
     name: camundapod
     image: camunda/camunda-bpm-platform

config:
  vault:
    rootToken: vault-$object.project_name$-2019

persistentVolume:
  mongo:
    storage: 5Gi  

persistentVolumeClaim:
  mongo:
    storage: 5Gi

ingress:
  enabled: false
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  hosts:
    - host: chart-example.local
      paths: []

  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
>>