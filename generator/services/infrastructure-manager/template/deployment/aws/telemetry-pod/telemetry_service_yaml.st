telemetry_service_yaml(project_name) ::= <<
apiVersion: v1
kind: Service
metadata:
  name: $project_name$-telemetry
  labels:
    app: $project_name$-telemetry
  namespace: $project_name$  
spec:
  type: NodePort
  ports:
    - name: vault
      targetPort: 8200
      port: 8200
  selector:
    app: $project_name$-telemetry
>>    