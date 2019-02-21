app_db_service_yaml(project_name) ::= <<
apiVersion: v1
kind: Service
metadata:
 labels:
   name: $project_name$-app-db
 name: $project_name$-app-db
 namespace: $project_name$
spec:
 type: NodePort
 ports:
 - name: mongo-db
   port: 27017
   targetPort: 27017
 selector:
   name: $project_name$-app-db
>>   