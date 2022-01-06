export class DataBinding {
    // setDataBinding(entityDetails, tagName) {
    //     const variableTemp = {
    //         entityId: '',
    //         entityName: '',
    //         fields: []
    //     }
    //     console.log('identified entity index are -----  ', entityDetails, ' ---tagname---  ', tagName, '-----strtstring---', this.startString);
    //     const entityObject = this.entities.find(x => x._id == entityDetails.entityId);
    //     console.log('entities object are ----------  ', entityObject);
    //     console.log('entities entityDetails are ----------  ', entityDetails);
    //     if (entityObject) {
    //         if (this.dynamicdropdowntype === 'dynamicdropdown-type') {
    //             console.log('------------dynamic dropdown startstringvalue----------', this.startString);
    //             if (this.startString.includes('ng-select')) {
    //                 this.startString += ` bindLabel="${entityDetails.fields.name.replace(' ', '')}" bindValue="${entityDetails.fields.name.replace(' ', '')}" [items]= "itemArray" [(ngModel)]="${entityObject.name.replace(' ', '')}.${entityDetails.fields.name.replace(' ', '')}" [ngModelOptions]="{standalone: true}"`;
    //             }
    //             else {
    //                 this.startString += ` [(ngModel)]="${entityObject.name.replace(' ', '')}.${entityDetails.fields.name.replace(' ', '')}" [ngModelOptions]="{standalone: true}"`;
    //             }
    //         }
    //         else {
    //             this.startString += ` [(ngModel)]="${entityObject.name.replace(' ', '')}.${entityDetails.fields.name.replace(' ', '')}" [ngModelOptions]="{standalone: true}"`;
    //         }
    //         const variableObject = this.tsComponent.variableList.find(x => x.entityId == entityDetails.entityId);
    //         console.log('variableList ------>>>>  ', variableObject);
    //         console.log('startString ---ngModels--->>>>  ', this.startString);
    //         if (variableObject) {
    //             console.log('---------------coming in the if condition of variable list---',entityDetails);
    //             variableObject.fields.push(entityDetails.fields.name);
    //         } else {
    //             console.log('---------------coming in the else condition of variable list---',entityDetails);
    //             variableTemp.entityId = entityDetails.entityId;
    //             variableTemp.entityName = entityObject.name;
    //             variableTemp.fields.push(entityDetails.fields.name);
    //             this.tsComponent.variableList.push(variableTemp);
    //         }
    //     }
    // }
}