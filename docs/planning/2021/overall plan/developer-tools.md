# Developer Tools Track

## Generate Github Actions

- the actions allow for build and deployment of generated code
- developer provides access tokens
- only aws deployments to start
- expand to other clouds during the year (Google/Azure)

## Add advanced options to entity manager

- create interfaces
- Designate an entity as Base or Abstract classes
- Designate and entity to extend or implement another entity
- Allow for recursive/tree entities (see project monk work)

## One to Many Phase one

- addresses the aggregation at the api gateway layer
- pre-work for the UI/low code portion

## Add Authorization to APIs (Auth Z)

- you should be able to have granular authorization for data and API

## Add App Performance Monitoring

- Augment Prometheus with [New Relic](https://docs.newrelic.com/docs/browser/single-page-app-monitoring/get-started/introduction-single-page-app-monitoring)
  - make sure that you can swap out APM tools - add it to the Project Architecture  Section

## GepNotifications

- mailchimp, Twilo SMS, other notifications

### GepFileManager

- file upload/download to S3, DropBox, Drive, attached volume

## React

**maybe we just focus on 17.x since that has the hook system?**

- generate 16.x
- generate 17.x
- can we use Gatsby? for our WCMX implementation in React?
  - [Background Info](https://www.freecodecamp.org/news/why-you-should-use-gatsbyjs-to-build-static-sites-4f90eb6d1a7b/)
  
## GraphQL

- can this be added to all our generated MicroServices?

## Android Native

- Add the ability to generate and Android Native app the communicates with Firebase

## Support for other Databases

- AWS Dynamo

- Firebase - leverage the work being done by Manikandan but instead of using Firebase with Android use it with NodeJS

- MySql - leverage [Knex js](https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/) replace MongoGenManger with the addition of MySqlGenManager

- PostgresSQL- leverage [Knex js](https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/) replace MongoGenManger with the addition of  PostgresGenManager

## Solve the APiGateway Pattern Issue for large number of services

The ApiGateway pattern starts to break down when the number of Microservices exceeds thirty. The issue is that you start to have to many developers adding/modifying code in one component. Please note this is not an issue with runtime performance but with developer and tester productivity and an attempt to reduce complexity

- Implement Sagas Pattern
  - use  [Express Gateway](https://www.npmjs.com/package/express-gateway)
    - don't use Express Gateway project did - bite the bullet and use Kong
  - maybe do the gateway instead of the saga?
- Implement service mesh
  - Kong or Istio
    Kong looks better because it is both an API Gateway and a Mesh BUT this maybe a drawback see: [Gateway doing to much?](https://medium.com/dev-genius/microservices-design-api-gateway-pattern-980e8d02bdd5)

## Integrate with Cloud 9

- this will allow developers to not have to compile code locally
  - speed up compiles - as of 1/15/2021 - it takes 15 minutes to compile happy path on a laptop the first time
