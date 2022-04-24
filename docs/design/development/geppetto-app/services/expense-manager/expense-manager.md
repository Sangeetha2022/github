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

#### STEP ONE

Update the User.ts to include the following:
{
    "organization" : "by default their email-id",
    "sub-org-one"  : "by default N/A",
    "sub-org-two"  : "by default N/A",
    "sub-org-three"  : "by default N/A",
    "sub-org-n"     :  "what ever string the user wants"
}

#### STEP TWO

