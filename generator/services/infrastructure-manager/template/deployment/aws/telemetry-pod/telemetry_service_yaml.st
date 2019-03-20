telemetry_service_yaml(project_name) ::= <<
apiVersion: v1
kind: Service
metadata:
  name: $project_name$-telimetry
  labels:
    app: $project_name$-telimetry
  namespace: $project_name$  
spec:
  type: NodePort
  ports:
    - name: vault
      targetPort: 8200
      port: 8200
  selector:
    app: $project_name$-telimetry
>>    