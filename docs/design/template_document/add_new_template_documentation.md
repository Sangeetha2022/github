# Add new template to geppetto
## Aim:
 This document for procedure of adding new template in geppetto application
geppetto can make different types of UI designs by user friendly designed template web pges and template screens.
## Requirements:
We need geppetto UI application and some node application server for adding the new template. what are the applications need to be list out below:

-Template html file

-UI
- geppetto Angular UI

-Backend
- template manager
- screen manager
- angular template managerv10

## Procedures:
-   To get the code from template html file
-   Place the code to screen designer and Save the screen
-   To create a new object in template array in template manager
-   Place the codes in template manager from saved screen data through the DB and save it.
-   delete the existing geppetto templates collection and re run the template manager service.
-   To add the customized html and css code in angular template managerv10
-   Make condition for adding condition for new template by with template name

### 1) To get the code from template html file
Copy the code from designed template html file this code also includes html and style tags. And also make sure the assets images are kept in the angular template managerv10.

### 2) Place the code to screen designer and Save the screen
place the whatever copied from the template html file
![screen-designer](https://user-images.githubusercontent.com/61690990/109115661-67b13100-7765-11eb-9690-e1ad142368e2.png)
select the import button then we can able see the template in screen designer
and save the template screen. It will store into the mongo db with screens collection. we can able to get the template data from here.

### 3) To create a new object in template array in template manager
Next step we gonna go to create a new object for adding new template in templates Array as same as from existing geppetto template, It includes gjs-components, gjs-html, gjs-css, gjs-assets, gjs-style etc.
![geppettotemplates](https://user-images.githubusercontent.com/61690990/109117922-a4caf280-7768-11eb-8b9d-32a30f28ff76.png)

    file path:/applcation/services/template-manager/src/assets/geppettoTemplate.ts
### 4) Place the codes in template manager from saved screen data through the DB and save it.
we need to place the codes in template manager from saved screen data such as gjs-html, gjs-css, gjs-assets, gjs-style etc.

![screensDB](https://user-images.githubusercontent.com/61690990/109118590-86b1c200-7769-11eb-8a32-578545aea36a.png)

### 5) Delete the existing geppetto templates collection and re run the template manager service.
Now we have new template object in template manager so next need to delete the geppetto templates table for existing templates and re run the template manager micro service
 It will automatically update with new template details in DB.
    ``Note:make sure template object flag is active``
![flag-name](https://user-images.githubusercontent.com/61690990/109133993-92a67f80-777b-11eb-9f84-303eef7b623b.png)

### 6) To add the customized html and css code in angular template managerv10
here only we need to add the customized html and css element for template screen, header and footer for template
It consumes separate folders and files for each templates
![separate](https://user-images.githubusercontent.com/61690990/109134360-f6c94380-777b-11eb-8792-e7c45de4444a.png)

### 7) Make condition for adding condition for new template by with template name
Next we make the condition based on the template name for generating the templates
such as
![condition](https://user-images.githubusercontent.com/61690990/109135041-aa323800-777c-11eb-8245-b6a5e7b7defe.png)
# Conclusion:
Finally we have added the new template to geppetto application, If you want to see the template in the dropdown during project creation, 
![oie_Z1bKMC3IzA1q](https://user-images.githubusercontent.com/61690990/109136219-e914bd80-777d-11eb-9cba-3ebc9e458271.png)
then you must add the flag is active in template object other wise not showed in the UI but it store into the Data Base.