import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylesService {

  constructor() { }

  addStyleManager(editor, styleLanguage) {
    const styleManager = editor.StyleManager.getSectors();
    editor.on('load', function () {

      styleManager.reset(), styleManager.add(styleLanguage);

    });
  }
}
