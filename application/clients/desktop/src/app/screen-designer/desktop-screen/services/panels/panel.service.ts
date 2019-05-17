import { Injectable } from '@angular/core';
import { CommandService } from '../commands/command.service';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(
    private commandService: CommandService
  ) { }

  addSaveButton(editor) {
    editor.Panels.addButton('options', {
      id: 'save-page',
      className: 'fa fa-save btn-save',
      command: 'save-page',
      attributes: {
        title: 'Save'
      }
    });
    this.commandService.addSaveCommand('save-page', editor);
  }

  addCancelButton(editor) {
    editor.Panels.addButton('options', {
      id: 'cancel-page',
      className: 'fa fa-close',
      command: 'cancel-page',
      attributes: {
        title: 'cancel'
      }
    });
    this.commandService.addCancelCommand('cancel-page', editor);
  }

}
