
export class ComponentLifecycleWorker {

    setComponentLifeCycle($this) {
        $this.componentLifecycleInfo.forEach(lifecycleElement => {
            const flowObject = $this.flowList.find(x => x._id == lifecycleElement.flowId);
            if (flowObject) {
                $this.tsComponent.componentOnInit.push(`this.${lifecycleElement.flowName}()`)
                let flowTemp = {
                    _id: '',
                    name: '',
                    label: '',
                    description: '',
                    type: '',
                    actionOnData: '',
                    createWithDefaultActivity: '',
                    components: []
                };
                // if (flowObject && !this.tsComponent.flowMethod.find(x => x._id == flowObject._id)) {
                flowTemp = {
                    _id: flowObject._id,
                    name: flowObject.name,
                    label: flowObject.label,
                    description: flowObject.description,
                    type: flowObject.type,
                    actionOnData: flowObject.actionOnData,
                    createWithDefaultActivity: flowObject.createWithDefaultActivity,
                    components: []

                }

                // set component dependencies method and variable
                $this.setComponentDependencies(flowObject, flowTemp);


                // set services dependencies method and variable
                $this.setServiceDependencies(flowObject, flowTemp);

                // set component services api's
                $this.setEndPoints(flowObject);
            }
        })
    }
}