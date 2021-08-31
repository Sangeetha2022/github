import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import * as constant from '../../../assets/data/constant.json';

// @ts-ignore
import grapesjs from 'node_modules/grapesjs';
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
  isTemplateEdit:boolean=false;
  projectTemplateId:any;
 
  constructor(private activatedRoute:ActivatedRoute) { }

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
      // if (params['project-template-id']) {
      //   this.isTemplateEdit = true;
      //   this.projectTemplateId = params['project-template-id'];
      //   this.getProjectTemplate(this.projectTemplateId);
      // }
    });
    const plugins = ['grapesjs-preset-webpage'];
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
        height: '100%',
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
            isDev: 0,
            fonts: [],
         // unsplash: constant['unsplash'],
          //  assetIcons: constant['assets'],
            updateParams: updateParams,
            labelTop: 'Top',
            labelRight: 'Right',
            labelBottom: 'Bottom',
            labelLeft: 'Left',
            labelWidth: 'Width',
            labelStyle: 'Style',
            labelColor: 'Fill Color',
            labelBorder: 'Border',
            labelBorderRadius: 'Border Radius',
            labelBackground: 'Background',
            labelShadow: 'Shadow',
            labelBoxShadow: 'Box Shadow',
            labelXpos: 'Offset X',
            labelYpos: 'Offset Y',
            labelBlur: 'Blur',
            labelSpread: 'Spread',
            labelShadowType: 'Shadow Type',
            labelTextShadow: 'Text Shadow',
            labelImage: 'Image',
            labelRepeat: 'Repeat',
            labelPosition: 'Position',
            labelAttachment: 'Attachment',
            labelSize: 'Size',
            labelExtra: 'Extra',
            labelOpacity: 'Opacity',
            labelBurgerMenu: 'Burger Menu',
            labelFont: 'Font',
            labelSlider: 'Slider',
            labelInputGroup: 'Input group',
            labelFormGroup: 'Form group',
            labelSelectOption: 'Select Option',
            labelSelect: 'Select',
            labelOptions: 'Options',
            labelOption: 'Option',
            labelMessage: 'Message',
            labelTextarea: 'Textarea',
            labelSend: 'Send',
            labelButton: 'Button',
            labelCheckbox: 'Checkbox',
            labelRadio: 'Radio',
            labelMethod: 'Method',
            labelAction: 'Action',
            labelFormActionPlh: '(default Grapedrop)',
            labelName: 'Name',
            labelFormNamePlh: 'eg. Top Form',
            labelState: 'State',
            labelStateNormal: 'Normal',
            labelStateSuccess: 'Success',
            labelStateError: 'Error',
            labelMsgSuccess: 'Thanks! We received your request',
            labelMsgError:
              'An error occurred on processing your request, try again!',
            labelPublish: 'Publish',
            labelTemplate: 'Template',
            labelTemplatePage: 'page',
            labelDataBind: 'Data Binding',
            labelDeleteAsset: 'Delete Asset',
            labelAreYouSureAsset:
              'This operation can&#039;t be undone. Are you sure?',
            labelCancel: 'Cancel',
            labelConfirm: 'Confirm'
          }
        },
        assetManager: {
          assets: [
           
          ],
        }
      });
  }

}
