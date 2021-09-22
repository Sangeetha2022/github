## Background/Definition:
GpApprovals is the first attempt at using the Geppetto concepts of Flow, Microflows, Features, Entities, Screens, and RBAC, to create a feature that provides the end user a frequently used functionality, that of a ticket approval system.

In an approval system the fundamental logic that is being performed is the approval of an Entity. 

The GpApprovals feature approaches the solution to ticket approvals by focusing on the values assigned to one property/field of the Entity.

The Entity can have any number of Entity properties/fields but it MUST contain one property/field named “statuses”  which is of type “text”.

Note: status is a reserved word in Geppetto Entity Manager!

## Feature Components
#### Entity
Can have 1 - N fields/properties one of which must be “status” field of type “text”

#### Authorization/RBAC

The solution must have one group, ideally it should be called “approvers” but it can be named anything as long as it is applied to the proper “screens”.

#### Screens

- Display all tickets  - filtered by userId
- Display all tickets - filtered by status = “submitted”
    - This screen can only be seen by the “approver” group
- Create a ticket
- Update a ticket
    - This is the standard update that we have in happy path
- Update ticket status
    - This screen allows the approver group to change the status of the tkt to “approve”, “reject”, or “return to requestor” 
        - The status can be changed by clicking the “approve button” or “reject button” or the “return to requestor” button


## New Concept: Modifiers ***please note for the first attempt in sprint 2 we will NOT use Modifiers ***

A modifier changes the behavior of a Flow by adding or changing the steps in a Microflow.

For the GpApprovals features we need two modifiers one for modifying GpSearch and another for modifying the GpUpdate

The GpSearch modifier will be called `GpSearch-By` and will allow the screen creator while using the Geppetto screen designer to specify one or more values to search by without the need for the user at runtime having to supply a value to search by. 

The screen creator will create the modifier when they add a Flow to the load event of a screen.

The GpUpdate modifier will be called `GpUpdate-SpecificValues` and allows the screen creator to specify one or more values to update when a user does a GpUpdate. The screen creator will create the modifier when they add a Flow to the “onClick” event of the buttons that allow the approvers at runtime to “approve”, “reject”, or “return to requestor” the request/ticket (dan add a screenshot of the screen designer here)


Example of modifiers for GpApprovals

First example of  GpSearchBy - added to the GpSearch flow that is attached to the Display all tickets filtered by user ID - When this modifier is applied we have to add a step to the Microflow that handles the Search that allows us to:
Pull the user id from the call
Add the userID to search query

Second example of  GpSearchBy  - added to GpSearch flow that is attached to the Display all tickets filtered by status = "submitted" - When this modifier is applied we have to add a step to the Microflow that handles the Search that allows us to:
Add the “submitted” string to the search query before executing the GetAlll search



GpFlows & Microflows:
***I think Kishan wrote some of what’s below but I will modify now - 2/7/2021**
We can use this Flow manipulation to start to insert GpLogic flow ***

The modifier is really an example of Logix aka an If condition 

When we want to add modifiers to a microflow like GpSearch we need to add a record in the ProjectFlowcomponents microflow array. In the projectflowcomponents we need to add the new sequence number when a modifiers is added so upon code generation we can use the sequence number and add the modifiers in the generator. As the projectflowcomponents is what stores the details which are needed for generating a flows and which stores the microflows.

The MicroFlow and Flows are seed which is entirely used in geppetto So instead of manipulating them we are going to use the projectflow and projectflowcomponents which are basically Flows and Microflows.

You can refer this documentation
`https://docs.google.com/document/d/1RcO5-ZYfMUkkv6UQuIc4ht7jRFkuUUMo25IWEoq0gs8/edit#`