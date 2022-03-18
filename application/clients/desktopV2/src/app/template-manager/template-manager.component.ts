import { Component, OnInit, Input } from '@angular/core';
import { TemplateManagerService } from './template-manager.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { TemplateScreenService } from '../template-screen/template-screen.service';


@Component
({
  selector: 'app-template-manager',
  templateUrl: './template-manager.component.html',
  styleUrls: ['./template-manager.component.scss']
})

export class TemplateManagerComponent implements OnInit 
{
  @Input() projectId: string='';
  logId = sessionStorage.getItem('LogId');
  displayTemplateModel:String='none';
  gepTemplates: any = [];
  gepTempImages:any=[];
  templateObj= 
  {
    app_ui_template: '',
    app_ui_template_id: '',
    app_ui_template_name: ''
  };

  constructor(private templateManagerService: TemplateManagerService,private spinner: NgxSpinnerService,
              private router: Router,private templateScreenService:TemplateScreenService) { }

  ngOnInit() 
  {
      this.getAllTemplates();
  }
  modifyTemplate() 
  {
    this.spinner.show();
    this.templateManagerService.getProjectTemplate(this.projectId, this.logId).subscribe(response => 
    {
      this.spinner.hide();
      if (response && response.body && response.body.length > 0) 
      {
        console.log("response on modify button click:",response);
        this.router.navigate(['/desktopscreen'], 
        {
          queryParams: 
          {
            'project-template-id': response.body[0]._id
          }
        });
      }
    });
  }

  createTemplate()
  {
    this.router.navigate(['/desktopscreen']);
  }

  changeTemplate()
  {
    this.displayTemplateModel = 'block';
  }

  onCloseHandled()
  {
    this.displayTemplateModel = 'none';
  }

  //Getting All UserTemplates
  getAllTemplates() 
  {
    this.spinner.show();
    this.templateScreenService.getAllTemplates(this.logId).subscribe(gepTemp => 
    {
      console.log('gepTemp', gepTemp);
      this.spinner.hide();
      this.gepTemplates = gepTemp.body;
      this.gepTempImages = this.gepTemplates.template_image;
    },
    error => 
    {
        console.log('Check the browser console to see more info.', 'Error!');
    });
  }

  //To View the selected Template on window
  onPreviewClick(template:any) 
  {
    if (template.name) 
    {
      window.open(`assets/templates/${template.name.split(' ').join('-').toLowerCase()}/index.html`);
    }
  }

  //Get the Selected Template and Storing to Template details to Template Object
  onTemplateSelect(template:any) 
  {
    this.templateObj = 
    {
      app_ui_template: template.name,
      app_ui_template_id: template._id,
      app_ui_template_name: template.template_name
    };
    console.log("templateObj:",this.templateObj);
    this.closeTemplateModal();
  }

  closeTemplateModal() 
  {
    this.displayTemplateModel = 'none';
  }
}