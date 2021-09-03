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
    });
  }

}
