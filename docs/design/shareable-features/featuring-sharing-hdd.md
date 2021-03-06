# Geppetto Reusable Features design

The purpose of this document is to describe the components and interactions of the Geppetto Reusable and Sharable Features sub system, henceforth **GRSF**

## Definition and Intended use

- What is a reusable feature?

  A reusable feature is a piece of functionality that can be shared/reused between projects

- Intended Use

The intended use of the **GRSF** is to create a framework that permits the addition of functionality to Geppetto generated applications. Once the **GRSF** framework is used any developer outside of the core Geppetto team will be able to contribute components/features that can be incorporated into the generated applications.

The components/features that are "contributed" must adhere to the same overall structure of  Geppetto generated applications. In other words, the contributed feature must be a MicroServices based application and support the same client libraries that a standard Geppetto generated application uses. At the time of this writing, 2021, Geppetto applications only support Angular for their UI needs, thus the contributed features must be Angular based.

In the same vein, Geppetto apps only support NodeJs for the backend, that means that the contributed features must also be written using Typescript and Express.

In order to make it easier to adhere to the base requirements, described above, it is expected that any developer wishing to contribute a component/feature would start their development by using Geppetto to generate the base application and then add the desired feature to the generated application. In this manner the contributing developer would have the confidence that the based requirements are met.

As the **GRSF** evolves it is intended to support the use of other development languages and frameworks for extending Geppetto generated applications. For example as Geppetto generated applications start to support [Micro-Frontends](https://martinfowler.com/articles/micro-frontends.html) the **GRSF** would allow Feature components to be built in other frameworks such as React or View. Given that Geppetto already supports a Microservices architecture, permitting features to use languages and frameworks other than NodeJS and Express would not be too complex an engineering hurdle to achieve.

___

### Examples of Reusable Features

- File management (file uploads/downloads)
- Geppetto Tag Manager - manages tags for entities using this feature significantly reduces the complexity of a Generated application
- Notifications - permits for emailing, testing, posting on Twitter
- Payments (stripe, braintree, square)
- Blockchain integrator
- Blockchain Auditor - maybe this is a shareable app that allows for reading a block chain and highlighing which participants in the chain did NOT do what they were suppose to do - maybe this is like BPM for Block chain?
- Wcmx - grapesjs - simple content management leveraging GrapesJS
- Wcmx - wordpress - headless use of content management system

___

## High level components

For the remainder of this document we will use the ***gepItemTagsManager*** feature to describe the architecture and components of the ***GRSF***

### Seed Directory Structure

Text files compose the heart of all software. In order for the **GRSF** to perform its function, all Shareable Features must be added to a Geppetto deployment/installation  following a strict directory file structure.
When a new Feature needs to be added to a Geppetto instance, the process starts with an Administrator copying the files that make up the shared component and adding them in the file structure shown below.

#### Overall Directory Structure

- generator
  - seed
    - shared-features
      - feature-name-one
      - feature-name-two
      - gepItemTagsManager
      - feature-name-N

In the case of our example ***gepItemTagsManager*** the administrator would place the files in the folder named ***gepItemTagsManager***

#### Individual Feature directory structure

It must be noted that the developer of the ***gepItemTagsManager*** must also follow a strict directory structure in the building of their component. At this point the reader may be tempted to think that asking the component developer to conform to a strict directory structure may be arbitrary and restrictive, we will deal with this issue at later time and show that conforming to the structure is relatively simple and allows for future growth in the component being shared.

![gepItemTagsManager Directory Structure](./images/gepItemTagsManager-directory-structure.png 'Feature Directory Structure')

___

### The Geppetto Feature Config (***GFC***) File

The ***GFC*** file captures the meta data for the component being shared. An example of the ***GFC*** can be found [here](./sample-gepFeatureConfig.json)
It is imperative that the ***GFC*** for a shared component be placed in the root directory of the component. Using ***gepItemTagsManager***  as our example its ***GFC*** would be placed in the folder named "gepItemTagsManager". For a complete description of the components that make up the ***GFC*** [see: Geppetto Feature Config Details](./gfc-file-details.md).

The ***GFC*** is the basis for the Entity for the microservices that will perform the processes needed to add and generate a shared feature.

___

### Shared Features Manager

The Shared Features Manager is a Geppetto microservice that manages the ***GFC*** files for all shared components in a Geppetto installation.
All the high level information and functions of the Shared Feature Manager are:

- Microservice name: SharedFeaturesManager
- Requirements:
  - initializeALL - reads all ***GFC*** files for all components and inserts data into DB
  - initalizeOne - reads one ***GFC** file and inserts data into DB
  - initilaizeSeveral - reads more than one ***GFC*** files and inserts data into DB
  - getall - returns information contained in ***GFC*** DB for all Features with pagination
  - getOne - returns information for one ***GFC*** file in the DB

___

### Sharable Features UI

The UI for the Shared Features Manager can be seen in the images below - The idea is to have a "library" if ready made features that the user would simply select to add to their project

### Feature Library Picker

![Feature Library](./images/feature-library-picker.png)

### Feature Admin in Generated Applications

It is expected that each sharable feature will probably need a certain amount of configuration that can only be done by the admin of the generated apps. The picture below shows a sample of the admin screen in a generated application with sample sharable features

![Feature Library](./images/feature-admin.png)

### Shared Features Generation Manager

- Microservice name: SharedFeaturesGenManager
- Requirements:
generates/copies the files for a shared feature for the project being generated taking into consideration the metadata that is needed to interact with the generated application. The most basic example of the metadata that needs to be handled is any updates needed to the Admin area/screen of the generated application. Using our sample feature ***gepItemTagsManager*** the ***SharedFeaturesGenManager*** would need to add the "pill/image" for ***gepItemTagsManager*** to the Admin screen of the generated application since only Admins are allowed to manage (created/update/delete) "Tags"

