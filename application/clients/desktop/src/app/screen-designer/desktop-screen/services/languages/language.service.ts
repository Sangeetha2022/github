import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  setBlockLanguage(editor, langArray) {
    langArray.forEach(element => {
      editor.BlockManager.get(element.id).set({ label: element.label });
    });
  }
}
