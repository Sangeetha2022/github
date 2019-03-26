sonar_pvc_postgres_yaml(project_name) ::= <<
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
