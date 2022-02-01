# Assignments for Geppetto Reusable Features work

Please note that this file serves to inform the team of their individual assignments at the start of the ***GFC*** work. The assignments below are not an exhaustive set and it is expected that changes and additions will be made as the work progresses/evolves.

## Harish

- Goal:
Tech lead/coordinate the overall effort and code the ***SharedFeaturesGenManager***
  - STEP ONE: using Geppetto create/generate the base for "SharedFeaturesManager" which Gayathri will use to get the list of shared features, give the generated code to Imran/Naveen
  - STEP TWO: using Geppetto generate ***SharedFeaturesGenManager*** - this will be your main component to work with
  - NOTE: for both steps above you will need to create TWO features and TWO entities in order to force the generation. The entity will be based on the ***GFC** file, to start only add the basic information see below for the basic info. You will have to give the entities different names and have the developers change the name to be the same for each of the services.
  - BASIC INFO:
    - "feature-name": "gepItemTagsManager",
    - "sharing-visibility-status": "admin",
    - "type": "external,
    - "last-modified-date": "01-20-2022",
    - "description": "\"The geppetto ItemTagsManager manages tags for entities\"",
    - "author-email": "gepinfo@gmail.com",
    - "author-name": "Harish Sundhar",
    - "organization": "com.geppettosoftware.0001",
    - "icon-location": "/xx/ff/ggg/file-manager.png",

## Imran/Naveen
  
Together work on ***SharedFeaturesManager***

### Imran

- Goal:
Upload and process all of the ***GFC*** files from the "shared-features" folder this is the process that initializes the shared features in a Geppetto installation
  - STEP ONE: "SharedFeaturesManager" scans the "shared-features" folder/directory and starts to process the ***GFC*** files that are located.
      NOTE: this must be designed with care as only new or updated ***GFC*** files are updated/inserted in to DB

### Naveen

- Goal:
 Provide the information needed by Geppetto for the shared features process.
  - STEP ONE: using the code that Harish provides for the "SharedFeaturesManager" hard code information that Gayathri needs for the Geppetto side
  - STEP TWO: take the ***GFC*** file for ***gepItemTagsManager*** and add the information in the file to the entity/mongoose model given by Harish for the "SharedFeaturesManager", the model will be the basis for all CRUD operations needed by the component that Gayathri is creating for the front end

### Gayathri

- Goal:
Create the UI for the ***GFC***
  - STEP ONE: add html/css from Ajith
  - STEP TWO: call the ***SharedFeaturesManager*** to obtain the information about the features
  - NOTES: To start the list will be hard coded
