export const FooterComponent = {
    htmlImport : [
      `import React from "react";
      import "./footer.scss";
      const Footer = () => {
          return (
      `
    ],
    htmlEnd: [
      `  );
    };
    
    export default Footer;
      `
    ]
  
  }

export const TemplateComponent = {
  htmlImport : [
    `
    import React from "react";
    import "./template.scss";


    class Template extends React.Component {
      render (){
        return(
          <>
    `
  ],
  htmlEnd: [
    ` 
            </>
          );
        } 
      };
      export default Template;
    `
  ]

}