sonar_pv_postgres_yaml(project_name) ::= <<
kind: PersistentVolume
apiVersion: v1
metadata:
  name: $project_name$-dev-ops-postgres-pv
  namespace: $project_name$
  labels:
    type: local
spec:
  capacity:
    storage: 8Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/postgresql/
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: $project_name$-dev-ops-postgres-pvc
  namespace: $project_name$
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  >>       
