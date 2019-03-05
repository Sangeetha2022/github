mongo_pvc_yaml(project_name) ::= <<
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: $project_name$-app-mongo-data
  namespace: $project_name$
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
>>