# Reference Data and its use in Geppetto

## What is Reference data

Reference data is data that provide context to an Entity. 

Please note that Reference Data is itself discreet and separate Entities.

A formal definition for Reference data can be found ins wikipedia here: [Reference Data](https://en.wikipedia.org/wiki/Reference_data)

## Reference Data example

In order to describe what Reference Data is and how it is implemented in Geppetto we will use the process of creating or opening a bank account.

When you go to a bank and ask to open an Account the banker or website will ask you, what type of account do you want to open?

**The Account Type is an example of Reference Data.**

What you are doing is opening or creating an account but the bank offers different types of accounts with different benefits and costs. Which account you open/create is up to the account holder or account user.

## How is Reference data managed in Geppetto

Reference data in Geppetto is managed via the concept of Secondary Entities.

Continuing with our bank account example, if we wanted to create a Microservice and an HTML/screen to create, edit, or search for a bank account we would create a Feature with a Primary Entity of "Account" and and a Secondary Entity of "AccountType".

Please note that the "Accountype" is an Entity that can and must have its own Microservice in order to add, edit, search and delete "AccountType" to the system/database.

### How is Reference Data Represented on a UI HTML Page?

Typically Reference Data is shown to the user as a dropdown or pick list that allow the user to select which Reference Data to add to the Entity that they are creating.

Continuing with our bank account example, the "thing/entity" that you are trying to create is an "Account", but you need to add to the "Account" record what "AccountType" you want to create/open. **The "AccountType" would be shown to the user via a dropdown or pick list**


### Dropdown or pick list types

In any system there is usually more than one type of dropdown, in Geppetto we have three types.

- Simple/Hard Coded
  - this is where the values in the dropdown are added in the Screen Designer while the user is creating the screen.

- Dynamic 1
  - this is when the data is maintained by a microservice and it is its own entity in the system.
  - visually this dropdown only shows one value/description and looks like a traditional dropdown.

- Dynamic 2
  - this is exactly the same as Dynamic 1 from a data perspective as it has its own entity and microservices
  - the difference is that this dropdown is a popup model that displays a grid when the user clicks on the button to show it
  - the Dynamic 2 "drop down" allow the user to "see" more than one piece of information for the reference data
  - typically this type of visualization is needed when you have to show multiple columns to the user so that they can understand which value to select
