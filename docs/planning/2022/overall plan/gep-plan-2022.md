# Geppetto 2022

## Just capturing ideas as of 11-28-2021

### Go live

Need to go live with what you have:

- Angular screen creation
- React screen creation - this can be designated as ALPHA
- NodeJS Microservices
- Github actions for AWS deployment
- Sample applications
  - Tickets
  - ElectricGlide - eCommerce sample

## Concepts for work after we go live

### Charging for OPS support

We already have the basis for auto deployment to Fargate what we need

- Require the ability to programmatically track usage per APP - we can then charge a percentage above what the cloud provider charges for added support
- Deploy to other clouds aka:  Azure and Google

### Shareable features

- provides another avenue for revenue through charging a yearly fee for the feature or support
- architecture that allows for the addition of features library to the generator
  - gepTagManager, gepFileManager, gepForums, gepInventory, gepShoppingCart

### Connector library

 The difference  between connectors and features is that features add functionality whereas a connector simply executes the APIs exposed
 In a sense you always need a connector before you start to create a feature that involves data from sources outside of the your application

- Connector Library
  - SalesForce
  - Keka
  - for an example list of a connector library see [Power Apps Connector list](https://docs.microsoft.com/en-us/connectors/connector-reference/)


### Government data as features

Create features that have government data that can be as easily integrated  into Geppetto applications
This will give Angular, React and Node developers the ability to add government data and visualizations into their apps

- example: [USAFACTS](https://usafacts.org/)
- sources:
  - [Data.gov](https://www.data.gov/developers/apis)
  - [CKAN Platform](https://ckan.org/)

### Approval Workflows

- [JotFrom Approvals](https://www.jotform.com/help/432-a-general-approach-on-building-an-approval-process-workflow/)
See:
  - [jointjs](https://www.jointjs.com/) - this looks like the best to start with since you can start with Open Source version and then go to pay 
  - [bpmn-js](https://www.npmjs.com/package/bpmn-js)
  - [list of various](https://medium.com/@ramkumariyer/workflow-making-software-in-javascript-html5-for-angular-developers-cbf87b2a0538)