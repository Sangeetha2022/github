docker_compose(projectdetails) ::= <<
version: "3.8"
services:
  mongo:
    image: geppettotest/mongo-local:april2020
    container_name: mongo
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
    image: geppettotest/camunda-local:april2020
    container_name: camunda
    ports:
      - "8080:8080"

  authproxy:
    build: ../../../application/services/default_services/authproxy
    image: authproxy
    container_name: authproxy
    ports:
      - "3009:3009"
    env_file: ../../../application/services/.env
    depends_on:
      - mongo
      - camunda

  camundaservice:
    build: ../../../application/services/default_services/camunda
    image: camundaservice
    container_name: camundasvc
    ports:
      - "3008:3008"
    env_file: ../../../application/services/.env
    depends_on:
      - mongo
      - camunda

  securitymanager:
    build: ../../../application/services/default_services/securitymanager
    image: securitymanager
    container_name: securitymanager
    ports:
      - "3007:3007"
    env_file: ../../../application/services/.env
    depends_on:
      - mongo
      - camunda

  apigateway:
    build: ../../../application/services/custom_services/apigateway
    image: apigateway
    container_name: apigateway
    ports:
      - "3000:3000"
    env_file: ../../../application/services/.env
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
    image: $custom_node.name$
    container_name: $custom_node.name$
    ports: 
      - $custom_node.port$:$custom_node.port$
    env_file: ../../../application/services/.env
    depends_on:
      - mongo
};separator="\n"$$endif$

volumes:
  $projectdetails.project_name$-volume:
    driver: local

>>