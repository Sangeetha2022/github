dev_ops_service_yaml(project_name) ::= <<
apiVersion: v1
kind: Service
metadata:
  name: $project_name$-dev-ops
  namespace: $project_name$
spec:
  type: LoadBalancer
  ports:
  - name: jenkins
    port: 8080
    targetPort: 8080
  - name: nexus
    port: 8081
    targetPort: 8081
  - name: sonarqube
    port: 9000
    targetPort: 9000
  selector:
    app: $project_name$-dev-ops
>>