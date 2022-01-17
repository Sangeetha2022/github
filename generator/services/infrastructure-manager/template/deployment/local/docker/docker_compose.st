docker_compose(projectdetails,uuid) ::= <<
version: "3.8"
services:
  mongo:
    image: geppettotest/mongo-local:sept2021
    container_name: mongo-$uuid$
    restart: unless-stopped
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - $projectdetails.project_name$-volume:/data/db
    ports:
      - "27018:27017"
    healthcheck:
      test: echo 'db.runCommand({serverStatus:1}).ok' | mongo admin -u root -p root --quiet | grep 1
      interval: 10s
      timeout: 10s
      retries: 5
      start_period: 40s
    logging:
      driver: "fluentd"
      options:
        fluentd-address: localhost:24224
        fluentd-async-connect: "true"
        tag: fluent
    
  vault:
    image: vault
    container_name: vault-$uuid$
    ports:
      - "8200:8200"
    environment:
        VAULT_SERVER: "http://127.0.0.1:8200"
        VAULT_DEV_ROOT_TOKEN_ID: vault-geppetto-2021
    cap_add:
      - IPC_LOCK
    logging:
      driver: "fluentd"
      options:
        fluentd-address: http://127.0.0.1:24224
        fluentd-async-connect: "true"
        tag: fluent

  camunda:
    image: geppettodistribution/camunda-local:Jan2021
    container_name: camunda-$uuid$
    ports:
      - "0000:8080"
    logging:
      driver: "fluentd"
      options:
        fluentd-address: http://127.0.0.1:24224
        fluentd-async-connect: "true"
        tag: fluent

  authproxy:
    build: ../../../application/services/default_services/authproxy
    image: authproxy-$uuid$
    container_name: authproxy-$uuid$
    ports:
      - "0000:8001"
    env_file: .env
    depends_on:
      - mongo
      - gcam
      - camunda
    logging:
      driver: "fluentd"
      options:
        fluentd-address: http://127.0.0.1:24224
        fluentd-async-connect: "true"
        tag: fluent

  securitymanager:
    build: ../../../application/services/default_services/securitymanager
    image: securitymanager-$uuid$
    container_name: securitymanager-$uuid$
    ports:
      - "8003:8003"
    env_file: .env
    depends_on:
      - mongo
      - camunda
    logging:
      driver: "fluentd"
      options:
        fluentd-address: http://127.0.0.1:24224
        fluentd-async-connect: "true"
        tag: fluent

  systemcredentialmanager:
    build: ../../../application/services/default_services/systemcredentialmanager
    image: systemcredentialmanager-$uuid$
    container_name: systemcredentialmanager-$uuid$
    ports:
      - "8005:8005"
    env_file: .env
    depends_on:
      - mongo
      - vault
    logging:
      driver: "fluentd"
      options:
        fluentd-address: http://127.0.0.1:24224
        fluentd-async-connect: "true"
        tag: fluent

  camundaservice:
    build: ../../../application/services/default_services/camunda
    image: camundaservice-$uuid$
    container_name: camundasvc-$uuid$
    ports:
      - "8002:8002"
    env_file: .env
    depends_on:
      - mongo
      - camunda
      - securitymanager
    logging:
      driver: "fluentd"
      options:
        fluentd-address: http://127.0.0.1:24224
        fluentd-async-connect: "true"
        tag: fluent
  
  gepfilemanager:
    build: ../../../application/services/default_services/gepfilemanager
    image: gepfilemanager-$uuid$
    container_name: gepfilemanager-$uuid$
    ports:
      - "3015:3015"
    env_file: .env
    depends_on:
      - mongo
    logging:
      driver: "fluentd"
      options:
        fluentd-address: http://127.0.0.1:24224
        fluentd-async-connect: "true"
        tag: fluent

  gcam:
    build: ../../../application/services/default_services/gcam
    image: gcam-$uuid$
    container_name: gcam-$uuid$
    ports:
      - "8007:8007"
    env_file: .env
    depends_on:
      - mongo
      - vault
    logging:
      driver: "fluentd"
      options:
        fluentd-address: http://127.0.0.1:24224
        fluentd-async-connect: "true"
        tag: fluent
     

  apigateway:
    build: ../../../application/services/custom_services/apigateway
    image: apigateway-$uuid$
    container_name: apigateway-$uuid$
    ports:
      - "8000:8000"
    env_file: .env
    depends_on:
      - camunda
      - camundaservice
      - authproxy
      - securitymanager
      - systemcredentialmanager
    logging:
      driver: "fluentd"
      options:
        fluentd-address: http://127.0.0.1:24224
        fluentd-async-connect: "true"
        tag: fluent

  elasticsearch:
    image: elasticsearch:7.16.2
    container_name: elasticsearch-$uuid$
    restart: always
    environment:
      - cluster.name=elasticsearch
      - node.name=elasticsearch
      - discovery.seed_hosts=elasticsearch
      - cluster.initial_master_nodes=elasticsearch
      - bootstrap.memory_lock=true # along with the memlock settings below, disables swapping
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m" # minimum and maximum Java heap size, recommend setting both to 50% of system RAM
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 262144 # maximum number of open files for the Elasticsearch user, set to at least 65536 on modern systems
        hard: 262144
    volumes:
      - elasticsearch:/usr/share/elasticsearch/data
    expose:
      - 9200
    ports:
      - 9200:9200
      - 9600:9600 # required for Performance Analyzer

  kibana:
    image: kibana:7.16.2
    container_name: kibana-$uuid$
    restart: always
    ports:
      - 5601:5601
    expose:
      - "5601"
    environment:
      ELASTICSEARCH_URL: http://elasticsearch:9200
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200

  fluentd:
    image: fluentd-$uuid$
    build: ../../../application/services/default_services/fluentd/fluend
    volumes:
      - ../../../application/services/default_services/fluentd/conf:/fluentd/etc
    links:
      - "elasticsearch"
    restart: always
    container_name: fluentd-$uuid$
    ports:
      - "24224:24224"
      - "24224:24224/udp"

$if(projectdetails.custom_node)$$projectdetails.custom_node:{custom_node | 
$\ $$\ $$\ $$\ $$\ $$\ $- $custom_node.name$
};separator=""$$endif$


$if(projectdetails.custom_node)$$projectdetails.custom_node:{custom_node | 
$\ $$\ $$custom_node.name$: 
    build: ../../../application/services/custom_services/$custom_node.name$
    image: $custom_node.name$-$uuid$
    container_name: $custom_node.name$-$uuid$
    ports: 
      - $custom_node.port$:$custom_node.port$
    env_file: .env
    depends_on:
      - mongo
    logging:
      driver: "fluentd"
      options:
        fluentd-address: http://127.0.0.1:24224
        fluentd-async-connect: "true"
        tag: fluent
};separator="\n"$$endif$

volumes:
  $projectdetails.project_name$-volume:
    driver: local
  elasticsearch:

>>