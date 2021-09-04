import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// @ts-ignore
import grapesjs from 'node_modules/grapesjs';
import { ProjectComponentService } from 'src/app/project-component/project-component.service';
import { BlockService } from './services/Blocks/block.service';
import { PanelService } from './services/Panels/panel.service';
import { TraitsService } from './services/Traits/traits.service';
@Component({
  selector: 'app-desktop-screen',
  templateUrl: './desktop-screen.component.html',
  styleUrls: ['./desktop-screen.component.scss']
})
export class DesktopScreenComponent implements OnInit {
  editor: any;
  screenType: String='';
  feature_id: String='';
  project_id: String='';
  screen_id: String='';
  traitsName: String='';
  isTemplateEdit:boolean=false;
  logId: any = sessionStorage.getItem('LogId');
  dataBindingTypes: any[] = [];
  projectTemplateId:any;
 
  constructor(private activatedRoute:ActivatedRoute,private blockservice:BlockService,private panelService:PanelService,
    private projectComponentService:ProjectComponentService,private traitService:TraitsService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.featureId !== undefined && params.featureId !== null) {
        this.feature_id = params.featureId;
      }
      if (params.projectId !== undefined && params.projectId !== null) {
        this.project_id = params.projectId;
      }
      if (params.screenId !== undefined && params.screenId !== null) {
        this.screen_id = params.screenId;
      }
      if (params.screenType !== undefined && params.screenType !== null) {
        this.screenType = params.screenType;
      }
    });
    const plugins = ['grapesjs-preset-webpage','gjs-plugin-ckeditor'];
    const updateParams = {
      method: 'PATCH'
    };
       // desktop plugins
       grapesjs.plugins.add('desktop-plugin', function (editor:any, options:any) {
        console.log('desktop plugins editor are --11-- ', editor);
        console.log('desktop plugins options are --22-- ', options);
        editor.getConfig().deviceManager.devices = [
          { name: 'Desktop', width: '' },
          { name: 'Tablet', width: '768px', widthMedia: '992px' },
          { name: 'Mobile landscape', width: '568px', widthMedia: '768px' },
          { name: 'Mobile portrait', width: '320px', widthMedia: '480px' }
        ];
      });
      // mobile plugin
      grapesjs.plugins.add('mobile-plugin', function (editor:any, options:any) {
        console.log('mobile plugins editor are --11-- ', editor);
        console.log('mobile plugins options are --22-- ', options);
        const desktopButton = editor.Panels.removeButton(
          'devices-c',
          'set-device-desktop'
        );
        const tabletButton = editor.Panels.removeButton(
          'devices-c',
          'set-device-tablet'
        );
        const mobileButton = editor.Panels.getButton(
          'devices-c',
          'set-device-mobile'
        );
        console.log('desktop button plugin adding ----- ', desktopButton);
        console.log('tabletButton button plugin adding ----- ', tabletButton);
        console.log('mobileButton button plugin adding ----- ', mobileButton);
        console.log(
          'mobileButton button plugin adding ---22-- ',
          editor.Panels.getPanelsEl()
        );
        console.log(
          'mobileButton button plugin adding ---33-- ',
          editor.Panels.getPanel('devices-c')
        );
        mobileButton.set('active', 1);
      });
      if (this.screenType === 'mobile') {
        plugins.push('mobile-plugin');
      }
      
      this.editor = grapesjs.init({
        container: '#editor-c',
        height: '110%',
        showDevices: 0,
        showOffsets: 1,
        avoidInlineStyle: 1,
        avoidDefaults: 1,
        clearStyles: 1,
        exportWrapper: 1,
        allowScripts: 1,
        plugins: plugins,
        pluginsOpts: {
          'grapesjs-preset-webpage': {
          },
        },
        assetManager: {
          assets: [
           
          ],
          uploadText: 'Drop files here or click to upload',
        },
        styleManager: {
          //To avoid duplicate stylemanager values
          clearProperties: true,
        }
      });
      this.addCustomBlocks();
      this.panelManager();
  }

  //To add Custom Blocks
  addCustomBlocks() {
    this.blockservice.addHeadingTag(this.editor);
    this.blockservice.addCKeditor5(this.editor);
  }

  //Function Contains custom buttons in panels
  panelManager() {
    this.panelService.addSaveButton(this.editor);
    this.panelService.addCancelButton(this.editor);
  }


}
