# High Level Design for the Geppetto Expense Manager

The purpose of the Expense Manager is to manage a users or organizations purchases in Geppetto
a purchase can include but not limited to the following:

- Cloud Expenses for an application
- Development services
- UX services
- Sharable Features
- Consulting services
- License Fees
- Reseller Fees for components (CKEditor, HyCharts, etc)

As with all things Geppetto, the system will be based on a MicroService Architecture that will rely on other components to achieve the desired functionality

## Phased Approach

At the time of the start of this effort (circa late April 2022) the only chargeable Geppetto component/service was the auto deploy of a generated application to the AWS cloud.

Given the limited scope available at the start of development, the Expense Manager will mostly be a wrapper that calls the MicroService responsible for capturing the charges incurred by an application that is deployed to AWS.

### Phase One - Cloud Expenses

#### STEP ONE - Modify User Entity in Geppetto System

Update the User.ts to include the following:
{
    "organization" : "by default their email-id",
    "sub-org-one"  : "by default N/A",
    "sub-org-two"  : "by default N/A",
    "sub-org-three"  : "by default N/A",
    "sub-org-n"     :  "what ever string the user wants",
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

#### STEP TWO - Add User section in Geppetto UI

The user should be able to modify their password as well their avatar/picture and any other pertinent personal information such as payment method

In the image below the User Name should be accessible from the menu item located at the far right of the Geppetto Header - in the image image below it is missing
![Missing User Icon/Name](./images/missing%20user%20section.png)


### STEP THREE  - Create User screen

### STEP FOUR - Modify UserManager

### STEP N (TBD) - work on Cloud expense manager
