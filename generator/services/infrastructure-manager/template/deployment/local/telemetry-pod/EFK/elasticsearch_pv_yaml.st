elasticsearch_pv_yaml(project_name) ::= <<
kind: PersistentVolume
apiVersion: v1
metadata:
  name: $project_name$-elasticsearch-data-pv
  labels:
    type: local
spec:
  capacity:
    storage: 50Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/elasticsearch/
>>