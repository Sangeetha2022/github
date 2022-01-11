
export class GrapesjsComponents{
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

    //For grapesjs version v0.17.29
    grapesjs_V01729(gjsStyles){
        gjsStyles.forEach(element => {
            if (Object.keys(element).includes('style') && Object.keys(element).includes('selectors')) {
                element.selectors.forEach((selector, index) => {
                    if(selector.name){
                        this.cssData += '.' + selector.name;
                    }
                    else if(!selector.name){
                        this.cssData += '#' + selector.split('#')[1];
                    }
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

