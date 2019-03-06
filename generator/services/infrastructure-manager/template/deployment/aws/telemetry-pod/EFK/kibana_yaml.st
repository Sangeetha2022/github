kibana_yaml(project_name) ::= <<
apiVersion: v1
kind: Service
metadata:
  name: kibana
  namespace: $project_name$-logging
  labels:
    app: kibana
spec:
  type: LoadBalancer
  ports:
  - port: 5601
  selector:
    app: kibana
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kibana
  namespace: $project_name$-logging
  labels:
    app: kibana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kibana
  template:
    metadata:
      labels:
        app: kibana
    spec:
      containers:
      - name: kibana
        image: docker.elastic.co/kibana/kibana-oss:6.4.3
        resources:
          limits:
            cpu: 1000m
          requests:
            cpu: 100m
        env:
          - name: ELASTICSEARCH_URL
            value: http://elasticsearch.$project_name$-logging.svc.cluster.local:9200/
        ports:
        - containerPort: 5601
>>