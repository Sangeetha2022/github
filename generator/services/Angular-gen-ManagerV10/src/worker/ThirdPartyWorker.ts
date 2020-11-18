import { Constant } from "../assets/Constant";

export class ThirdPartyWorker {
    setSpecialEvents($this) {
        if ($this.screenInfo['special-events'].length > 0) {
            $this.screenInfo['special-events'].forEach(elementObj => {
                switch (elementObj.type) {
                    case Constant.MODAL_SPECIALEVENT_NAME:
                        const modalDependencies = componentDependency.component.find(x => x.name === Constant.GP_MODAL_POPUP);
                        this.specialEventHtml(elementObj, modalDependencies, $this);
                        this.specialEventTsFile(elementObj, modalDependencies, $this);
                        this.specialEventModule(elementObj, modalDependencies, $this);
                        break;
                    default:
                        break;
                }
            });
        }
    }

}