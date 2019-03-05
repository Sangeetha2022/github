system_entry_deployment_yaml(project_name) ::= <<
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: $project_name$-system-entry
  namespace: $project_name$
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: $project_name$-system-entry
    spec:
      containers:
        - name: nginx-container
          imagePullPolicy: IfNotPresent
          image: ram2010/$project_name$-grapesjs:1.0
          ports:
            - name: http-port
              containerPort: 80
>>