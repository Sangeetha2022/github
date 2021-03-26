# System Entry Feature (**SEF**) High Level Design

The purpose of this document is to describe the components and interactions of the Geppetto System Entry Feature

## System Entry Feature (**SEF**)

The System entry Feature, hencenforth **SEF**, is the first system component/feature responsible for processing and displaying information for a Gepppetto Generated application after successfull user authentication.

The picture below shows the high level **SEF** components and their interaction

![SEF High Level Components](./images/system-entry-high-level-components.jpg 'SEF High Level Components')

## System Entry Micro Service

The heart of the **SEF** is the SystemEntryMS and its relationship with its Primary and Secondary Entities.

### SystemEntryMS - Primary Entity

The usage of Primary and Secondary Entity within the **SEF** and specifically within the **SystemEntryMS** are **NOT** the typical usage for a Geppetto generated application.

By default the Primary Entity of the **SystemEntryMS** is the User entity. The author is aware that this is a violation of the MicroSerice arhcitecture pattern followed by Geppetto generated applications. However, it is a special case since **SystemEntryMS** will **NOT** access the data repository/table/collection for the User entity.

The User entity is needed strictly for generation purposes to facilitate potential uses cases needed by a component that needs to intearct with User information.

### SystemEntryMS - Secondary Entities

The **SystemEntryMS** can have 1 to N secondary entities. In the context of **SystemEntryMS** the secondary entities are used to indentify which other microservices are needed in order to provide the information required of the **SEF**, specifically the system landing page which is the first page/screen that a user is presented after successfull authentication.

The typical usage for the secondary entities is when the appplication needs to show a dashboard that is composed of data obtained from multiple sources/MicroServices.
