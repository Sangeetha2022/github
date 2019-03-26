dev_ops_db_service_yaml(project_name) ::= <<
apiVersion: v1
kind: Service
metadata:
  labels:
    name: $project_name$-dev-ops-db
  name: $project_name$-dev-ops-db
  namespace: $project_name$
spec:
  type: NodePort
  ports:
    - name: sonar-postgres
      port: 5432
      targetPort: 5432
  selector:
    name: $project_name$-dev-ops-db
>>