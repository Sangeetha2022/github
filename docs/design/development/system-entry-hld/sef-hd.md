# System Entry Feature (**SEF**) High Level Design

The purpose of this document is to describe the components and interactions of the Geppetto System Entry Feature

## System Entry Feature (**SEF**)

The System entry Feature, henceforth **SEF**, is the first system component/feature responsible for processing and displaying information for a Geppetto Generated application after successful user authentication.

The picture below shows the high level **SEF** components and their interaction

![SEF High Level Components](./images/system-entry-high-level-components.jpg 'SEF High Level Components')

## System Entry Micro Service

The heart of the **SEF** is the SystemEntryMS and its relationship with its Primary and Secondary Entities.

### SystemEntryMS - Primary Entity

The usage of Primary and Secondary Entity within the **SEF** and specifically within the **SystemEntryMS** are **NOT** the typical usage for a Geppetto generated application.

By default the Primary Entity of the **SystemEntryMS** is the User entity. The author is aware that this is a violation of the MicroService architecture pattern followed by Geppetto generated applications. However, it is a special case since **SystemEntryMS** will **NOT** access the data repository/table/collection for the User entity.

The User entity is needed strictly for generation purposes to facilitate potential uses cases needed by a component that needs to interact with User information.

### SystemEntryMS - Secondary Entities

The **SystemEntryMS** can have 1 to N secondary entities. In the context of **SystemEntryMS** the secondary entities are used to identify which other MicroServices are needed in order to provide the information required of the **SEF**, specifically the system landing page which is the first page/screen that a user is presented after successful authentication.

The typical usage for the secondary entities is when the application needs to show a dashboard that is composed of data obtained from multiple sources/MicroServices.

**OJO ADD A PICTURE OF WHAT YOU MEAN BY A DASHBOARD**

## Typical use case/ user experience

Please note that the **SEF** must always be part of the standard Geppetto generated application, thus when a Geppetto user creates a project, byt default the **SEF** should appear as one of the default features, containing the Primary Entity of User and a Landing Screen which is described below.

### Default use case

By default if a Geppetto user creates a project an immediately generates it, the SEF should be generated by default with a screen that has two labels to welcome the user to the application, for example: **Welcome: James T Kirk**

In the example above the word **"Welcome"** is a label that is not bound simply hard coded in the GJS component, whereas the name **"James T Kirk"** are three (3) labels that are bound to the User entity which is the Primary entity for the **SEF**

### Typical use case

As envisioned the **SEF** would allow the Geppetto user the ability to access the screen designer and drag and drop UI elements that would be bound to the Secondary entities within the system most typically this UI elements would be a graph and or a table

**NOTE FOR DAN: COPY PASTE IMAGES FROM THE WORK THAT AJIT HAS DONE**

## SEF Generation

this is a placeholder to discuss with the team - question do we need a SefGenManager that is callled seperatedly from the other managers?

### Backend Generation - SefBackEndGenManager

### Front End Generation - SefGenFrontEndManager

