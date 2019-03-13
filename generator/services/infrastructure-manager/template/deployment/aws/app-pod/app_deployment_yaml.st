app_deployment_yaml(project_name) ::= <<
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: $project_name$-app
  namespace: $project_name$
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: $project_name$-app
    spec:
      containers:
        - name: node-container
          imagePullPolicy: Always
          image: tharanirajan/$project_name$-app:2.0
          ports:
            - name: http-port
              containerPort: 3000
          env:
            - name: $project_name$-app-db
              value: $project_name$-app-db
            - name: VAULT_API
              value: "http://vault.$project_name$.svc.cluster.local:8200"  
>>