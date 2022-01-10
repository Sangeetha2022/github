import { Injectable } from '@angular/core';
import { CommandService } from '../Commands/command.service';

@Injectable
({
  providedIn: 'root'
})

export class PanelService 
{
  constructor(private commandService:CommandService) { }

  //Add savebutton in panel
  addSaveButton(editor:any) 
  {
    editor.Panels.addButton('options', 
    {
      id: 'save-page',
      className: 'fa fa-save btn-save',
      command: 'save-page',
      attributes: 
      {
        title: 'Save'
      }
    });
    this.commandService.addSaveCommand('save-page', editor);
  }

  //Add cancelbutton in panel
  addCancelButton(editor:any) 
  {
    editor.Panels.addButton('options', 
    {
      id: 'cancel-page',
      className: 'fa fa-close',
      command: 'cancel-page',
      attributes: 
      {
        title: 'cancel'
      }
    });
    this.commandService.addCancelCommand('cancel-page', editor);
  }
}
