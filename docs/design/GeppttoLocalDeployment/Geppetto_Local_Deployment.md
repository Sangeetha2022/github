# Geppetto Deployments in local machine by using docker-compose

## First local machine has the basic stuff like node, angular CLI, docker, and docker-compose 

    Require         | Version
   ----------       | ----------------
   * Docker         | version 20.10.2
   * Docker-compose | version 1.28.2
   * Node           | version 10.19.0
   * Angular-cli    | version 11.2.11


* Once your machine has installed all requirements  you are able to run the Geppetto application in your local machine by using docker-compose.

* Now clone the application,

git clone https://*********************/geppettotest.git


* For Geppetto, you have generated the project and should be pushed to GitHub, for these you need to give your Github details in the Vault.

* First, we need to create GitHub PAT, 


### Please follow the below steps

* Click **setting** in the drop-down.


![1g](https://user-images.githubusercontent.com/71403617/116858822-a3142400-ac1c-11eb-9503-f9d1d8a23223.png)




* In the Settings, you can view the **Developer setting** and click it.


![2g](https://user-images.githubusercontent.com/71403617/116858959-dd7dc100-ac1c-11eb-9257-d6420fa219ba.png)





* Here You can view **Personal access Token** and click it then click **Generate new token** in the right corner side.


![3g](https://user-images.githubusercontent.com/71403617/116859000-ea9ab000-ac1c-11eb-9b31-6769974269e3.png)




* After you add **Note:(any name)** and click the following checkboxes.


![4g](https://user-images.githubusercontent.com/71403617/116859050-fedead00-ac1c-11eb-9033-50ea55280c6d.png)




* Finally, click the **Generate Token** on the same page. Placed at the bottom of the page.


![5g](https://user-images.githubusercontent.com/71403617/116859061-030aca80-ac1d-11eb-8f82-f8db17207a15.png)




* Now you can get a New **Personal access Token** like this


![6g](https://user-images.githubusercontent.com/71403617/116859068-056d2480-ac1d-11eb-8a60-0044bcd2ef33.png)


* Please copy the Personal access token


**Reference to create Personal access token.**

https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token


Now make on terminal,

  **cd geppettotest/devops/docker-compose/** 

* Make run the below command, we have a script file for automation that will run the docker-compose and all its required things to deploy it.

  **bash geppetto_compose.sh  -c** 

* Once all bash actions are done now run the below command.

  **docker ps -a** 

* Check all docker containers are up.

## After all containers are up you need to check the Gep_authorize.dmn file placed in camunda.

Put [localhost:8080/camunda-welcome/index.html](http://localhost:8080/camunda-welcome/index.html)

* Hit the above URL in the browser, you can view a page like this.


![7g](https://user-images.githubusercontent.com/71403617/116859076-08681500-ac1d-11eb-99d4-9331fa459eb6.png)



* Click **Cockpit** in the browser and log in.


![8g](https://user-images.githubusercontent.com/71403617/116859102-161d9a80-ac1d-11eb-84ed-31d45b71cc37.png)


### Username: demo,  Password: demo ##

* Click **More** dropdown in the browser and select **Deployments.**


![9g](https://user-images.githubusercontent.com/71403617/116859104-174ec780-ac1d-11eb-8172-881f24daca5e.png)



* You can able to see  **Gep_authorize.dmn**


![10g](https://user-images.githubusercontent.com/71403617/116859106-17e75e00-ac1d-11eb-9f39-45349d47f621.png)



## Adding credentials to Vault:

* Put [localhost:8200](http://localhost:8200) in the browser and the token is **vault-geppetto-2021**


![11g](https://user-images.githubusercontent.com/71403617/116859108-187ff480-ac1d-11eb-9e9e-ad87c7872858.png)



* Now click **Enable new engine** in the right side corner.


![12g](https://user-images.githubusercontent.com/71403617/116859112-19188b00-ac1d-11eb-897e-42bf2a3e8b25.png)



* Click the **KV** and click the **Next** button.


![13g](https://user-images.githubusercontent.com/71403617/116859115-19b12180-ac1d-11eb-87d1-296e1a00fa57.png)



* Click **Method Options.**


* Change the **version from 2 to 1.**


![14g](https://user-images.githubusercontent.com/71403617/116859118-1ae24e80-ac1d-11eb-9c1b-c2e12fe52a4f.png)



* And click the **Enable Engine** button.


![15g](https://user-images.githubusercontent.com/71403617/116859129-203f9900-ac1d-11eb-9572-a22f6338b874.png)



* Click **Create secret** button to add the GitHub secret.


![16g](https://user-images.githubusercontent.com/71403617/116859132-20d82f80-ac1d-11eb-9c7f-7b1ce2a85eeb.png)




* Click the **JSON** button and give this path.  **/kubernetes/sourcecode/github** to Path for this secret.

* Add your Github credentials in the **JSON file**.

         "gitEmail": "your email",
         "gitPassword": "your git personal access token",
         "gitUsername": "your user name"

![17g](https://user-images.githubusercontent.com/71403617/116859133-2170c600-ac1d-11eb-84d2-ebea7cc14a53.png)


* Click the **save** button and you have saved your GitHub credentials.


* Put [localhost:5050](http://localhost:5050) in your browser and you can able to view **GEPPETTO** .


![18g](https://user-images.githubusercontent.com/71403617/116859136-22095c80-ac1d-11eb-9772-aec009992f7e.png)



* Then click the **SignIn**  button, and give your Email and Password(**make sure the given password must be 8 characters and must have an Uppercase, Lowercase, and a Special character**) and then click the **New User** button you like below.


![19g](https://user-images.githubusercontent.com/71403617/116859137-233a8980-ac1d-11eb-94b0-ee113bc34cd1.png)



* Give your First Name and Last Name and then click the **Login** button.It will take you Geppetto Dashboard. Now you can able to create Project.


![20g](https://user-images.githubusercontent.com/71403617/116859139-246bb680-ac1d-11eb-89d1-31355d5929ff.png)


**Note: When you generate the application via Geppetto, that code is pushed to your GitHub.**




