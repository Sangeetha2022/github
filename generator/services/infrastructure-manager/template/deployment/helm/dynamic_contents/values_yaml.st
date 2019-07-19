values_yaml(project_name) ::= <<
# Default values for $project_name$.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

app:
  prefix: $project_name$
  namespace: $project_name$

service:
  type: NodePort
  appbuilderType: NodePort

  apigateway:
    name: apigateway
    type: NodePort
    port: 3000  
    targetPort: 3000
    nodePort: 30000
  camunda:
    name: camunda
    type: NodePort
    port: 3008
    targetPort: 3008
    nodePort: 30008
  authproxy:
    name: authproxy
    type: NodePort
    port: 3009
    targetPort: 3009
    nodePort: 30009
  security:
    name: security
    type: NodePort
    port: 3007
    targetPort: 3007
    nodePort: 30007
  admin:
    name: admin
    type: NodePort
    port: 3010
    targetPort: 3010
    nodePort: 30010
  mongo:
    name: mongo
    type: NodePort
    port: 27017
    targetPort: 27017
    nodePort: 30027
  desktop:
    name: desktop
    type: NodePort
    port: 80
    targetPort: 80
    nodePort: 32000

deployment:
  defaultImagePullPolicy: IfNotPresent
  customImagePullPolicy: Always
  apigateway:
     name: apigateway
     image: $project_name$-apigateway:1.0
  mongo:
     name: mongo
     image: mongo:3.2   
  camunda:
     name: camunda
     image: $project_name$-camunda:1.0
  authproxy:
     name: authproxy
     image: $project_name$-authproxy:1.0
  security:
     name: security
     image: $project_name$-security:1.0
  admin:
     name: admin
     image: $project_name$-admin:1.0
  desktop:
     name: desktop
     image: $project_name$-desktop:1.0

config:
  vault:
    rootToken: vault-$project_name$-2019

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