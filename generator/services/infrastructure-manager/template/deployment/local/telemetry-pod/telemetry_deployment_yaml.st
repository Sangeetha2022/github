
telemetry_deployment_yaml(project_name) ::= <<
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: $project_name$-telemetry
  name: $project_name$-telemetry
  namespace: $project_name$
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: $project_name$-telemetry
    spec:
      containers:
      - name: vault-container
        image: vault
        ports:
        - containerPort: 8200
          name: vaultport
          protocol: TCP
        securityContext:
         capabilities:
           add:
             - IPC_LOCK
        env:
        - name: VAULT_DEV_ROOT_TOKEN_ID
          value: vault-$project_name$
>>          