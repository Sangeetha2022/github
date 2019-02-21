system_entry_service_yaml(project_name) ::= <<
apiVersion: v1
kind: Service
metadata:
  name: $project_name$-system-entry
  namespace: $project_name$
spec:
  type: NodePort
  ports:
  - name: nginx-app
    port: 80
    targetPort: 80
  selector:
    app: $project_name$-system-entry
>>