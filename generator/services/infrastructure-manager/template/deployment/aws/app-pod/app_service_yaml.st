app_service_yaml(project_name) ::= <<
apiVersion: v1
kind: Service
metadata:
  name: $project_name$-app
  namespace: $project_name$
spec:
  type: NodePort
  ports:
  - name: node-app
    port: 3000
    targetPort: 3000
  selector:
    app: $project_name$-app
>>