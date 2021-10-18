# High level design for Geppetto Identity and Authorization

## The main components

***NOTE this sub-system/component was previously called Geppetto Authentication and Authorization
as of 10/17/2021 it has been renamed to Geppetto Identity and Authorization***


1. Security Manager - handles authentication and JWT management
2. Authorization Proxy - handles authorization integration to Rules process
3. Geppetto Custom Authorization Manager
4. Camunda DMN Engine - performs the logic for authorization - not this is legacy and only to be used in special circumstances

![alt text](./images/geppetto-authentication-authorization-context.jpg)

## Security Manager

## Authorization Proxy

## Camunda DMN

## Authorization Manager in Generated applications

- [] what are the components involved? should they be in the Generator docs?
- lets create a context diagram of the components

### Getting started docs

-First Download the camunda
-To run the command in the terminal

./camunda-modeler


REFERENCE

https://docs.camunda.org/manual/7.15/reference/rest/

 

Dmn in the cloud

https://dmn.lab.camunda.com/

https://dmn.lab.camunda.com/examples/index.html


Start and setup

https://docs.camunda.org/manual/latest/user-guide/dmn-engine/

https://docs.camunda.org/get-started/dmn/



postman

https://docs.camunda.org/manual/7.15/reference/rest/decision-definition/post-evaluate/

