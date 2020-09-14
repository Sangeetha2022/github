swagger(details, servers, tags, paths, components) ::= <<
---
openapi: 3.0.0
info:$if(details.version)$
   version: $details.version$$endif$$if(details.projectName)$
   title: $details.projectName$ open api specification$endif$$if(details.featureName)$
   description: $details.featureName$ API$endif$$if(details.termsOfService)$
   termsOfService: $details.termsOfService$$endif$$if(details.contactName)$
   contact:
      name: $details.contactName$$endif$$if(details.contactEmail)$
      email: $details.contactEmail$$endif$$if(details.contactUrl)$
      url: $details.contactUrl$$endif$$if(details.licenseName)$
   license:
      name: $details.licenseName$$endif$$if(details.licenseUrl)$
      url: $details.licenseUrl$$endif$
servers:
   $if(servers)$$servers:{name |$if(name.url)$
   - url: $name.url$$endif$$if(name.description)$
     description: $name.description$$endif$};separator="\n"$$endif$
tags:
$if(tags)$$tags:{tag |$if(tag.name)$
- name: $tag.name$$endif$$if(tag.description)$
  description: $tag.description$$endif$$if(tag.externalDocs)$
  externalDocs:$if(tag.externalDocs.url)$
   - url: $tag.externalDocs.url$$endif$$tag.externalDocs.description$
     description: $tag.externalDocs.description$$endif$};separator="\n"$$endif$
paths:
   $if(paths)$$paths:{path |$if(path.endpoint)$
   "$path.endpoint$":$endif$$if(path.method)$
      $path.method$:$endif$
         tags:$if(path.tags)$
         - $path.tags$$endif$$if(path.description)$
         description: $path.description$$endif$$if(path.operationId)$
         operationId: $path.operationId$$endif$
         $if(path.parameters)$$path.parameters:{param |$if(param.requestBody)$
         requestBody:$if(param.content)$
            content:
               $param.content$:$endif$$if(param.schema)$
                  $param.schema$:$endif$$if(param.ref)$
                     $param.ref$: "$param.reference$"$endif$$endif$$if(param.in)$
         $if(path.parameters)$
         parameters:$endif$
         - in: "$param.in$"$if(param.description)$
           description: "$param.description$"$endif$$if(param.name)$
           name: "$param.name$"$endif$$if(param.required)$
           required: $param.required$$endif$$if(param.schema)$
           $param.schema$:$endif$$if(param.ref)$
            $param.ref$: "$param.reference$"$endif$$endif$};separator="\n"$$endif$
         $if(path.responses)$
         responses:$endif$
            $if(path.responses)$$path.responses:{response |$if(response.statuscode)$
            '$response.statuscode$':$endif$$if(response.description)$
               description: $response.description$$endif$$if(response.content)$
               content:
                  $response.content$:$endif$};separator="\n"$$endif$};separator="\n"$$endif$
components:
   schemas:
      $if(components)$$components:{component |$if(component.name)$
      $component.name$:$endif$$if(component.type)$
         type: $component.type$$endif$
         properties:
            $if(component.field)$$component.field:{field | $if(field.name)$
            $field.name$:$endif$$if(field.data_type)$
               type: "$field.data_type$"$endif$$if(field.description)$
               description: $field.description$$endif$};separator="\n"$$endif$};separator="\n"$$endif$
>>