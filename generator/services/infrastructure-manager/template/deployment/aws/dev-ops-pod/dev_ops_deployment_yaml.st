dev_ops_deployment_yaml(project_name) ::= <<
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: $project_name$-dev-ops
  namespace: $project_name$
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: $project_name$-dev-ops
    spec:
      containers:
        - name: jenkins-container
          imagePullPolicy: Always
          image: tharanirajan/gep-jenkins:1.0
          env:
            - name: JAVA_OPTS
              value: -Djenkins.install.runSetupWizard=true
          ports:
            - name: http-port
              containerPort: 8080
            - name: jnlp-port
              containerPort: 50000
          volumeMounts:
            - name: jenkins-data
              mountPath: /var/jenkins_home             
        - name: nexus-container 
          imagePullPolicy: Always
          image: sonatype/nexus3 
          resources:
            limits:
              memory: "4Gi"
              cpu: "1000m"
            requests:
              memory: "2Gi"
              cpu: "500m"
          ports:
            - name: http-port
              containerPort: 8081
          volumeMounts:
            - name: nexus-data
              mountPath: /nexus-data
        - name: sonarqube-container
          image: sonarqube:latest
          args:
            - -Dsonar.web.context=/sonar
          env:
            - name: SONARQUBE_JDBC_PASSWORD
              value: T@ng3456
            - name: SONARQUBE_JDBC_URL
              value: jdbc:postgresql://$project_name$-dev-ops-db:5432/sonar
          ports:
            - containerPort: 9000
              name: sonarqube                                
      volumes:
        - name: jenkins-data
          emptyDir: {}
        - name: nexus-data
          emptyDir: {}  
>>