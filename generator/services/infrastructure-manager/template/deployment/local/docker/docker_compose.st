docker_compose(projectdetails,uuid) ::= <<
version: "3.8"
services:
  mongo:
    image: geppettotest/mongo-local:april2020
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

  camunda:
    image: geppettodistribution/camunda-local:Jan2021
    container_name: camunda-$uuid$
    ports:
      - "0000:8080"

  authproxy:
    build: ../../../application/services/default_services/authproxy
    image: authproxy-$uuid$
    container_name: authproxy-$uuid$
    ports:
      - "0000:8001"
    env_file: .env
    depends_on:
      - mongo
      - camunda

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

  securitymanager:
    build: ../../../application/services/default_services/securitymanager
    image: securitymanager-$uuid$
    container_name: securitymanager-$uuid$
    ports:
      - "0000:8003"
    env_file: .env
    depends_on:
      - mongo
      - camunda

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
};separator="\n"$$endif$

volumes:
  $projectdetails.project_name$-volume:
    driver: local

>>