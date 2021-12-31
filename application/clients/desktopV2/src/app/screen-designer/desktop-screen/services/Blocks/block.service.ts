import { Injectable } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { TraitsService } from '../Traits/traits.service';

@Injectable
({
  providedIn: 'root'
})
export class BlockService 
{
  constructor(private traitService:TraitsService) { }

  addHeadingTag(editor:any) 
  {
    editor.BlockManager.add('heading', 
    {
      id:'Heading',
      label:'Heading',
      category: 'Basic',
      content: `<div>
                  <h1>Heading Tag</h1>
                </div>`,
      draggable: true,
      removable: true,
      attributes: 
      {
        class:'fa fa-header'
      }
    });
  }

  addCKeditor5(editor:any) 
  {
    // working fine
    editor.BlockManager.add('ckeditor', 
    {
      id: 'ckeditor',
      label: `<div>
                <img src="./assets/images/ckeditor.svg"/>
                   <div class="my-label-block mt-1">CkEditor</div>
              </div>`,
      category: 'Basic',
      content: `<div style="padding-top: 10px;padding-right: 2px;padding-left: 2px;padding-bottom: 10px">
                  <span id="ckeditorspan" style="display: unset;" data-gjs-type="ckeditor5">
                     <textarea name="content" id="ckeditortextarea">This is some sample content.</textarea>
                  </span>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.addCKEditorTraits(editor, 'ckeditor5');
  }

  addDynamicDropdown(editor:any) 
  {
    editor.BlockManager.add('dynamicDropdown', 
    {
      id: 'dynamicDropdown',
      label: `\n  <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n
             <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,
              16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero">
             </path> \n
             <polygon class="gjs-block-svg-path" transform="translate(18.500000,12.000000) scale(1, -1) translate(-18.500000, -12.000000)"
              points = "18.5 11 20 13 17 13"> </polygon>\n
             </svg>\n  <div class="gjs-block-label"> Dynamic Dropdown </div>`,
      category: 'Special',
      content: `<div  style="padding-top:0px; padding-right: 0px; padding-left: 0px; padding-bottom: 0px">
                   <select data-gjs-type="dynamicdropdown-type">
                     <option value="1">1</option>
                   </select>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.dynamicDropdownTraits(editor, 'dynamicdropdown-type');
  }

  addTagManager(editor:any) 
  {
    editor.BlockManager.add('tagmanager', 
    {
      id: 'tagmanager',
      label: `\n  <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n
              <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,
               16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero">
              </path> \n
              <polygon class="gjs-block-svg-path" transform="translate(18.500000,12.000000) scale(1, -1) translate(-18.500000, -12.000000)"
               points = "18.5 11 20 13 17 13"> </polygon>\n
              <rect class="gjs-block-svg-path" x="4" y="11.5" width ="11" height="1"></rect>\n
              </svg>\n  
              <div class="gjs-block-label"> Tag Manager </div>`,
      category: 'Special',
      content: `<div  style="padding-top:0px; padding-right: 0px; padding-left: 0px; padding-bottom: 0px">
                  <select data-gjs-type="tagmanager">
                    <option value="1">1</option>
                  </select>
                </div>`,
      draggable: true,
      removable: true
    });
  }

  addMultiSelectDropdown(editor:any) 
  {
    editor.BlockManager.add('multiselect', 
    {
      id: 'multiselect',
      label:'Multi-select Dropdown',
      category: 'Special',
      content: `<div data-gjs-type="multiselect" style="padding-top: 10px;padding-right: 2px;padding-left: 2px;padding-bottom: 10px">
                     <div id="mySelect" style="width: auto; height: 25%"></div>
                </div>`,
      draggable: true,
      removable: true,
      attributes:{class:'fa fa-tasks'}
    });
  }

  addSpecialCharts(editor:any) 
  {
    editor.BlockManager.add('highcharts', 
    {
      id: 'highcharts',
      label: ` <div class="gjs-block-label"> High charts </div>`,
      category: 'Extra',
      content: `<div style="padding-top: 10px;padding-right: 2px;padding-left: 2px;padding-bottom: 10px">
                  <div id="highchart4" data-gjs-type="highcharts-type" style="width:100%; height:400px;"></div>
                </div>`,
      draggable: true,
      removable: true,
      attributes:
      {
        class:'fa fa-bar-chart'
      }
    });
    this.traitService.addHighChartTraits(editor, 'highcharts-type');
  }

  addAgGrid(ds:any) 
  {
    // editor ag-grid custom blocks added
    ds.editor.BlockManager.add('agGrid', 
    {
      id: 'agGrid',
      label: 'AgGrid',
      category: 'Basic',
      attributes: 
      {
        class: 'fa fa-table'
      },
      content: `<div data-gjs-type="grid-type" style="padding-top: 10px;padding-right: 2px;padding-left: 2px;padding-bottom: 10px">
                   <div id="myGrid" style="width: auto; height: 25%" class="ag-theme-alpine"></div>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.addGridTraits(ds, 'grid-type');
  }

  addUpload(editor:any)
  {
    // editor upload custom blocks added
    editor.BlockManager.add('upload',
    {
      id: 'upload',
      label: 'upload',
      category: 'Basic',
      attributes:
      {
        class: 'fa fa-paperclip'
      },
      content: `<div style="color:#d983a6;display:inline-block;vertical-align:top;padding:10px;max-width:100%;">
                <button data-gjs-type="upload"><i class="fa fa-paperclip" aria-hidden="true"></i>
                </button>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.addUpload(editor, 'upload');
  }

  addDownload(editor:any)
  {
    // editor upload custom blocks added
    editor.BlockManager.add('download',
    {
      id: 'download',
      label: 'download',
      category: 'Basic',
      attributes:
      {
        class: 'fa fa-download'
      },
      content: `<div style="color:#d983a6;display:inline-block;vertical-align:top;padding:10px;max-width:100%;">
                <button data-gjs-type="download"><i class="fa fa-download" aria-hidden="true"></i>
                </button>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.addDownload(editor, 'download');
  }
}
