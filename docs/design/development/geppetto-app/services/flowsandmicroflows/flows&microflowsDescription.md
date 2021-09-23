# Flows & Microflows:
- The flows are important criteria in the geppetto which helps in the generating the code for example a CRUD operation (Create,Read,Update,Delete) for your frontend and backend code.

- The flows are given by geppetto and they are loaded from the seed manager service and Flow manager service. The Flow manager service is where the flow related the operations are done.
- Also whenever a flow is added to a project inside a feature we are also capturing the flows in the projectflows and projectflowcomponents from the flow_manager service.

So for each flow getting added for feature we add those in flow related information in the projectflows and projectflowcomponents.

### ProjectFlows:
The projectflows is what captures the flow details like the
- flowname,
- description,
- flowtype,
- Type,
- actiononData
and these are the same fields in the flows table also.

## ProjectFlowComponents:
- The projectflowcomponents collections captures the 
- microflows id array which stores the - - microflows uniqueid
- connector
- name, what type of microflow component 
- label like(dao or controller or service) and
- type which mentions whether it is backend or Frontend.
- sequenceId which determines which comes first in a hierarchy way and the 
- devlanguage and devFramework which stores whether it is Node or Angular.



> Note: The microflows is  a child table of Flow when a Flow is added to a feature the microflow is what is used to generate that selected flow based on the sequenceId which is the hierarchy of generating the code in the subsequent file.

## ProjectFlowcomponents & Connectors:
- The connectors is what we say as external api which can be included into Geppetto Flow. Connectors can be added to a flow by the user if they want to have their own api endpoint integrated to any flows in geppetto and based on the api endpoint response we get we create an entity. And when upon generation of code we check whether the flows have a connector added and so we add the connectors endpoint api for the flow method in the generated code. 

- Upon adding a connector to a flow we create a record for the connectors table. The created connector is then added in the connectors array in the projectflowcomponents which inturn is been used in the generation.
 
- The generation of the Flows are handled in the subsequent code generation managers. At the time of this writing (early December 2020) the only production level Generation managers are Nodegen Manager and Angular gen Manager. We also have in development, ReactGenManager, and AndroidNativeGenManager.







## Nodegen Manager:
- In the Nodegen Manager the flows and microflows are used for generating the code for the flows which are done in the worker folder.

- The common worker file is used to generate the default file like dockerfile,server.ts file,package.json file, winston logger file, tsconfig file for the node.

- The controller worker file is used to construct the object which are all needed for creating a controller file

- The service worker file is used to construct the objects which are all needed for creating a service file.

- The Dao worker file is used to construct the object which are all needed for creating a dao file.

## AngularGenManager:
- In the Angulargen Manager constructs the screens it also generates the flows and microflows for the angular components file.

- The ComponentWorker,Flowcomponetworker,Flowserviceworker is the what uses the flows and microflows to add the create or search flow in the component.ts file of the angular generation.

## FlowManager:

- To make any changes for the flow or projectflow or projectflowcomponent you can change in the Flowmanager service.

## MicroFlowManager:

- To make any changes for the microflowmanager you can change in the Microflowmanager service.

