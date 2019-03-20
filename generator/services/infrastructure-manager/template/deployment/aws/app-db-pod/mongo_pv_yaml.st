mongo_pv_yaml(project_name) ::= <<
kind: PersistentVolume
apiVersion: v1
metadata:
  name: $project_name$-app-mongo-data-pv
  labels:
    type: local
spec:
  capacity:
    storage: 8Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/mongo/
>>