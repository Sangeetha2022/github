elasticsearch_pv_yaml(project_name) ::= <<
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data
  namespace: $project_name$-logging
  labels:
    app: elasticsearch
spec:
  accessModes: [ "ReadWriteOnce" ]
  resources:
    requests:
      storage: 100Gi
>>
