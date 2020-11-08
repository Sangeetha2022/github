export class PopupModal {
    checkPopupModal() {
        const screenIndex = this.generatedSpecialEventScreens.findIndex(x => x.screenId == this.screenInfo._id);
        console.log('check popupmodal generatedSpecialEventScreens -2--- ', this.generatedSpecialEventScreens, ' --screenIndex--  ', screenIndex);
        if (screenIndex > -1) {
            const modalComponent = componentDependency.component.find(x => x.name === Constant.GP_MODAL_POPUP);
            // HTML
            this.startTag.unshift(`<div *ngIf="${modalComponent.componentDynamicVariable.popupModalName}" id="popupModal" class="modal" tabindex="-1" role="dialog" style="display: block">
          <div class="modal-dialog modal-md" role="dialog">
            <div class="modal-content">`);
            this.startTag.push(`<div class="modal-footer">
              <div class="form-group">
                <button type="button" class="btn button-create" (click)="${modalComponent.componentDynamicVariable.submitMethodName}()">ok</button>
                <button type="button" class="btn button-close" (click)="${modalComponent.componentDynamicVariable.cancelMethodName}()">cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>`);
            // TS
            this.tsComponent.variableList.push(`@Input() ${modalComponent.componentDynamicVariable.popupModalName} = false`);
            this.tsComponent.variableList.push(`@Output() ${modalComponent.componentDynamicVariable.popupDataName} = new EventEmitter()`);
            this.tsComponent.variableList.push(`@Output() ${modalComponent.componentDynamicVariable.cancelPopupName} = new EventEmitter()`);
            // TS METHOD
            // component methods
            const methods = modalComponent.componentDependedMethod.filter(x =>
                x.name === modalComponent.componentDynamicVariable.submitMethodName ||
                x.name === modalComponent.componentDynamicVariable.cancelMethodName)
            const temp = methods.map(({ method }) => method);
            this.tsComponent.elementDependedMethod = this.tsComponent.elementDependedMethod.concat(temp.join('\n'));
        }
    }
}