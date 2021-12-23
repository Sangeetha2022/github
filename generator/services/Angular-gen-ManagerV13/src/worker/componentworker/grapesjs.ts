
export class grapesjsGjscomponents{
    public cssData:string='';
    //For grapesjs version v0.16.27
    grapesjs_V01627(gjsStyles){
        gjsStyles.forEach(element => {    
            if (Object.keys(element).includes('style') && Object.keys(element).includes('selectors')) {
                element.selectors.forEach((selector, index) => {
                    if((selector.name).includes('template')){
                        this.cssData += '#' + selector.name;
                    }
                    else{
                        this.cssData += '.' + selector.name;
                    }
           
                    if (element.selectors.length - 1 === index) {
                        this.cssData += ' {';
                        const styleArray: string[] = Object.keys(element.style);
                        console.log("styleArray is",styleArray);
                        styleArray.forEach(style => {
                            this.cssData += style + ':' + element.style[style] + ';\n'
                            console.log("inside styleArray is",this.cssData);
                        });
                    }
                });
                this.cssData += '}';
            }
        });
      return this.cssData;
    }

    //For grapesjs version v0.17.29
    grapesjs_V01729(gjsStyles){
        gjsStyles.forEach(element => {
            if (Object.keys(element).includes('style') && Object.keys(element).includes('selectors')) {
                element.selectors.forEach((selector, index) => {
                    if(selector.name){
                        console.log("inside selector -->");
                        
                        this.cssData += '.' + selector.name;
                        console.log("inside selector --> css data",this.cssData);
                        
                    }
                    else if(!selector.name){
                        this.cssData += '#' + selector.split('#')[1];
                        if(this.cssData.includes('en:;')){
                            console.log("inside en:;");
                            this.cssData= this.cssData.replace('en:;', '');
                        }
                    //    else if(this.cssData.includes('__: 1;')){
                    //        console.log("inside __: 1;");
                           
                    //         this.cssData= this.cssData.replace('__: 1;', '');
                    //     }
                        //this.cssData += this.cssData.replace('en:;', ' ')
                        console.log("inside selector not name --> css data",this.cssData);
                    }
                    if (element.selectors.length - 1 === index) {
                        this.cssData += ' {';
                        const styleArray: string[] = Object.keys(element.style);
                        //console.log("styleArray is",styleArray);
                        styleArray.forEach(style => {
                            this.cssData += style + ':' + element.style[style] + ';\n'
                            //console.log("inside styleArray is",this.cssData);
                        });
                    }
                });
                this.cssData += '}';
            }
        });
        return this.cssData;
    }

    //For grapesjs older version v0.16.22
    grapesjs_V01622(gjsStyles){
        gjsStyles.forEach(element => {
            if (Object.keys(element).includes('style') && Object.keys(element).includes('selectors')) {
                element.selectors.forEach((selector, index) => {
                    this.cssData += '.' + selector.name;
                    if (element.selectors.length - 1 === index) {
                        this.cssData += ' {';
                        const styleArray: string[] = Object.keys(element.style);
                        styleArray.forEach(style => {
                            this.cssData += style + ':' + element.style[style] + ';\n'
                        });
                    }
                });
                this.cssData += '}';
            }
        });
        return this.cssData;
    }


}

