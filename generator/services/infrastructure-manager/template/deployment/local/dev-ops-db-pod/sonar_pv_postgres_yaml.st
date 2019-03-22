sonar_pv_postgres_yaml(project_name) ::= <<
kind: PersistentVolume
apiVersion: v1
metadata:
  name: $project_name$-dev-ops-postgres-pv
  labels:
    type: local
spec:
  capacity:
    storage: 8Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/postgresql/
>>       
