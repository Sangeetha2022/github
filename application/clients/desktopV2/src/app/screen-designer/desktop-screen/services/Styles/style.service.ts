import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor() { }
  addStyleManager(editor:any, styleLanguage:any) {
    const styleManager = editor.StyleManager.getSectors();
    editor.on('load', function () {

      styleManager.reset(), styleManager.add(styleLanguage);

    });
  }
}
