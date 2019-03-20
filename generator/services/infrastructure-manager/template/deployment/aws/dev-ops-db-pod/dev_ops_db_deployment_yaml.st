dev_ops_db_deployment_yaml(project_name) ::= <<
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: $project_name$-dev-ops-db
  namespace: $project_name$
spec:
  replicas: 1
  template:
    metadata:
      name: $project_name$-dev-ops-db
      labels:
        name: $project_name$-dev-ops-db
    spec:
      containers:
        - name: sonar-postgres-container
          imagePullPolicy: Always
          image: postgres:latest
          env:
            - name: POSTGRES_PASSWORD
              value: $project_name$
            - name: POSTGRES_USER
              value: sonar
            - name: POSTGRES_DB
              value: sonar  
          ports:
            - containerPort: 5432
              name: postgres-port
          volumeMounts:
            # This name must match the volumes.name below.
            - name: sonar-postgres-data
              mountPath: /var/postgresData
      volumes:
        - name: sonar-postgres-data
          persistentVolumeClaim:
            claimName: $project_name$-dev-ops-postgres-pvc
>>