# High Level Design for the Geppetto Expense Manager

The purpose of the Expense Manager is to manage a users or organizations purchases in Geppetto
a purchase can include but not limited to the following TYPES:

- Cloud Expenses for an application
- Development services
- UX services
- Sharable Features
- Consulting services
- License Fees
- Reseller Fees for components (CKEditor, HyCharts, etc)

As with all things Geppetto, the system will be based on a MicroService Architecture that will rely on other components to achieve the desired functionality

## Phased Approach

At the time of the start of this effort (circa late April 2022) the only chargeable Geppetto component/service is the auto deploy of a generated application to the AWS cloud.

Given the limited scope available at the start of development, the Expense Manager will mostly be a wrapper that calls the MicroService responsible for capturing the charges incurred by an application that is deployed to AWS.

### Phase One - Cloud Expenses

#### STEP ONE - Expense Manager Entity and MicroService

To start the Expense Manager Entity will conform to the structure described below. The MicroService will be generated by Geppetto and conform to the standard Geppetto structure of Controller, Service and Dao layers.    

{
    "purchase-type" : "see start of HLD for various types"
    "type-source-id" : "this is the ID for the geppetto microservice manager that handles this type of expense"
    "date-of-purchase" : "the date it was bought"
    "purchase-name" : "the name",
    "purchase-description" : "jdhajsdfjasdla",
    "payment-info" :
    {
        "payment-amount" : "",
        "payment-currency" : "",
    },
    "purchase-entitlement" :
    {
        "duration" : "monthly&consumption, yearly, monthly, one-time",
        "entitlement-start-date" : "a date",
        "entitlement-end-date" : "a date",
        "allowed-consumption" : ""
    },
    "gep-reserve-tags" :
    [
        {
            "gep-reserve-tag-one" : "Typically the app ID",
            "tag-id" : "gep-exp-mgr-38034",
            tag-description" : "application description"
        },
        {
            "tag-name" : ""gep-reserve-tag-two",
            "tag-id" : "gep-exp-mgr-98034",
            tag-description" : "TBD"
        },
        {
            "tag-name" : ""gep-reserve-tag-three",
            "tag-id" : "gep-exp-mgr-8438034",
            "tag-description" : "TBD"
        }

    ],
    "user-defined-tags" :
    [
        {
            "tag-name" : "hfgahjsd",
            "tag-id" : "38034",
            tag-description" : "hq90kasdcj0ru0ur"
        },
        {
            "tag-name" : "hfgahjsd",
            "tag-id" : "38034",
            "tag-description" : "hq90kasdcj0ru0ur"
        },
        {
            "tag-name" : "hfgahjsd",
            "tag-id" : "38034",
            "tag-description" : "hq90kasdcj0ru0ur"
        }

    ]
}

#### STEP TWO - Modify User Entity in Geppetto System

Update the User.ts to include the following:    
    
{
    "organization": "by default their email-id",
    "org-user-type": " "org admin, sub-org-admin, developer, standard user",
    "sub-org-one": "by default N/A",
    "sub-org-two": "by default N/A",
    "sub-org-three": "by default N/A",
    "sub-org-n":  "what ever string the user wants",
    "payment-info:{
        "billing-status":{
            "active": "true",
            "start-date": "date client gave consent to start billing",
            "stop-date": "date client withdrew consent for billing"
        },
        "type":  "credit-card,invoice,wire",
        "credit-card": {
            "number": "767283647826347627",
            "expiration": "12/2022",
            "CVV": "635 or 7272 for AMEX"
        },
        "invoice": {
            "section-one": "sample I don't know what this",
            "section-two": "sample I don't know what this",
            "section-three": "sample I don't know what this",
            "terms": "30 days net or 90 days net"
        },
        "wire-transfer": {
            "section-one": "sample I don't know what this",
            "section-two": "sample I don't know what this",
            "section-three": "sample I don't know what this"
        }

    }
}

#### STEP THREE - Add User section in Geppetto UI

The user should be able to modify their password as well their avatar/picture and any other pertinent personal information such as payment method

In the image below the User Name should be accessible from the menu item located at the far right of the Geppetto Header - in the image image below it is missing
![Missing User Icon/Name](./images/missing%20user%20section.png)

### STEP FOUR  - Create User screen

### STEP FIVE - Modify UserManager

### STEP N (TBD) - work on Cloud expense manager