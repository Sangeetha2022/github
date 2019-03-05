elasticsearch_svc_yaml(project_name) ::= <<
kind: Service
apiVersion: v1
metadata:
  name: elasticsearch
  namespace: $project_name$-logging
  labels:
    app: elasticsearch
spec:
  type: LoadBalancer
  selector:
    app: elasticsearch
  ports:
    - port: 9200
      name: rest
    - port: 9300
      name: inter-node
>>