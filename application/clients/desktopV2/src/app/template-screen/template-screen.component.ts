import { Component, OnInit } from '@angular/core';
import {  NgxSpinnerService } from 'ngx-spinner';
import { TemplateScreenService } from './template-screen.service';

@Component({
  selector: 'app-template-screen',
  templateUrl: './template-screen.component.html',
  styleUrls: ['./template-screen.component.scss']
})
export class TemplateScreenComponent implements OnInit {

  gepTemplates: any = [];
  gepTempImages: any = [];
  logId = sessionStorage.getItem('LogId');
  constructor(private spinner:NgxSpinnerService,private templateScreenService:TemplateScreenService) { }

  ngOnInit(): void {
    this.getAllGepTemplates();
  }
  getAllGepTemplates() {
    this.spinner.show();
    this.templateScreenService.getAllTemplates(this.logId).subscribe(response => {
      this.spinner.hide();
      this.gepTemplates = response.body;
      this.gepTempImages = this.gepTemplates.template_image;
      // this.screenDesignerService.getScreenByProjectId(this.project_id, this.logId).subscribe(screenResponse => {
      //   this.projectTemp = screenResponse.body;
      //   this.projectTempId = this.projectTemp[0]._id;
      //   this.selectedIndex = [];
      //   this.gepTemplates.forEach((element, index) => {
      //     if (element.name === this.projectTemp[0].screenName) {
      //       this.selectedIndex.push(index);
      //       this.selected = true;
      //       // this.selectedTemplate = template;
      //     } else {
      //       this.selected = false;
      //     }
      //   });
      // });
    });
  }

}
