import * as st from 'stringtemplate-js';

export class FormService {

    sampleform = {
        "header": {},
        "button": {},
        "input": []
    }
    templatePath = '../../template'
    Formcomponent(value, callback) {
        let keys = Object.keys( value.elements );

        /* The code below is used only to add header to sampleform header object */
        this.sampleform.header = value.elements[keys[0]];

        /* The code below is used only to add button text name to sampleform button object */
        this.sampleform.button = value.elements[keys[3]];

        /* The code below is used only to push the input element to sampleform input array this creates 
        the input box for each element */
        this.sampleform.input.push(value.elements[keys[1]]);
        this.sampleform.input.push(value.elements[keys[2]]);

        let generateComponent = st.loadGroup(require(this.templatePath + `/Form_stg`));
        let formHTML = generateComponent.render('Form', [this.sampleform]);
        callback(formHTML);
    }
}