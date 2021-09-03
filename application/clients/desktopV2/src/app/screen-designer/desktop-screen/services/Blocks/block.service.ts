import { Injectable } from '@angular/core';
import { TraitsService } from '../Traits/traits.service';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private traitService:TraitsService) { }
  addHeadingTag(editor:any) {
    editor.BlockManager.add('heading', {
      id:'Heading',
      label:'Heading',
      category: 'Basic',
      content: `
      <div>
      <h1>Heading Tag<h2>
      </div>
      `,
      draggable: true,
      removable: true,
      attributes: {
        class:'fa fa-header'
      },
    });
  }

  addCKeditor5(editor:any) {
    // working fine
    editor.BlockManager.add('ckeditor', {
      id: 'ckeditor',
      label: `<div>
      <img src="./assets/images/ckeditor.svg"/>
      <div class="my-label-block mt-1">CkEditor</div>
    </div>`,
      category: 'Basic',
      content: `
      <div style="padding-top: 10px;padding-right: 2px;padding-left: 2px;padding-bottom: 10px">
      <span id="ckeditorspan" style="display: unset;" data-gjs-type="ckeditor5">
      <textarea name="content" id="ckeditortextarea">This is some sample content.</textarea>
      </span>
      </div>
      `,
      draggable: true,
      removable: true
    });
    this.traitService.addCKEditorTraits(editor, 'ckeditor5');
  }
}
