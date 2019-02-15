import { Injectable } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(
    private location: Location
  ) { }

  addSaveCommand(commandName, editor, saveURL) {
console.log('entering into add save command' , saveURL)
    editor.Commands.add(commandName, {
      run: function (e, n) {
        editor.StorageManager.get('remote').set({ urlStore: saveURL });
        n.set('active', 0);
        editor.store();
      }
    });

  }

  addCancelCommand(commandName, editor) {
    const previousPageRoute = this.location;
    editor.Commands.add(commandName, {
      run: function (e, n) {
        n.set('active', 0);
        previousPageRoute.back();
        // window.history.go(-1);
      }
    });

  }
}
