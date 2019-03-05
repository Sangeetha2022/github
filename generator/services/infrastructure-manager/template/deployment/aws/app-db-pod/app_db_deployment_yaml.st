app_db_deployment_yaml(project_name) ::= <<
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: $project_name$-app-db
  namespace: $project_name$
spec:
  replicas: 1
  template:
    metadata:
      labels:
        name: $project_name$-app-db
    spec:
      containers:
        - name: mongo-container
          imagePullPolicy: Always
          image: mongo:3.2
          ports:
            - name: http-port
              containerPort: 27017
          volumeMounts:
            - name: mongo
              mountPath: /data/db
      volumes:
        - name: mongo
          persistentVolumeClaim:
            claimName: $project_name$-app-mongo-data
>>
