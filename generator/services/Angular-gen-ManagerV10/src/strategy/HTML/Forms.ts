export class Forms {
    formGeneration(formData, stylesData, screenName) {
        if (formData.components !== undefined) {
            formData.components.forEach(component => {
                if (component.classes !== undefined) {
                    component.classes.forEach(classData => {
                        console.log('class data for the component===============>>', classData);
                    })
                }
                if (component.components !== undefined) {
                    component.components.forEach((childComponentData, index) => {
                        console.log(' --child components-- data ', index, childComponentData);
                        if (childComponentData.classes !== undefined) {
                            childComponentData.classes.forEach((childComponentClassData, index) => {
                                console.log('childComponentClassData ==========>>',index, childComponentClassData)
                                let childComponentClassDataObject = childComponentClassData;
                            })
                        }
                    });
                }
                if (component.attributes !== undefined) {
                    let componentAttributes = component.attributes;
                    console.log('componentAttributes -------------->>', componentAttributes);
                }
            });
        }
    }
}