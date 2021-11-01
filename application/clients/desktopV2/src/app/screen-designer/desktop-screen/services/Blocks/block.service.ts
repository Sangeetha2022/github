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
  addSpecialCharts(editor:any) {
    editor.BlockManager.add('highcharts', {
      id: 'highcharts',
      // tslint:disable-next-line:max-line-length
      label: ` <div class="gjs-block-label"> high charts </div>`,
      category: 'Extra',
      content: `<div style="padding-top: 10px;padding-right: 2px;padding-left: 2px;padding-bottom: 10px">
      <div id="highchart4" data-gjs-type="highcharts-type" style="width:100%; height:400px;"></div>
      </div>`,
      draggable: true,
      removable: true,
      attributes:{
        class:'fa fa-bar-chart'
      }
    });
    this.traitService.addHighChartTraits(editor, 'highcharts-type');
  }
}
