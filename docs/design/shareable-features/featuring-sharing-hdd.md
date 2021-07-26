# Geppetto Reusable Features design

The purpose of this document is to describe the components and interactions of the Geppetto Reusable and Sharable Features, henceforth **GRSF** sub system

## Definition and Intended use

- What is a reusable feature?
  A reusable feature is a piece of function that can be shared/reused between projects

- Intended Use

The intended use of the **GRSF** is to alow developers that are NOT part of the Geppetto development team to contribute components/features that can be incorporated into the generated applications.

The applications/features that are "contributed" must adhere to the same overall structure of a Geppetto generated application. In other words, the contributed feature must be a MicroServices based application and support the same client libraries that a standard Geppetto generated application uses. At the time of this writing, June 2021, Geppetto applications only support Angular for their UI needs, thus the contributed features must be Angular based.

In the same vein, Geppetto apps only support NodeJs for the backend, that means that the contributed features must also be written to using Typescript and Express.

### Examples

- file management (file uploads/downloads)
- notifications
- payments (stripe, braintree, square)
- Wcmx - wordpress
