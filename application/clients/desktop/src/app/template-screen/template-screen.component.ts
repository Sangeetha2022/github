import { Component, OnInit } from '@angular/core';
import { TemplateScreenService } from './template-screen.service';

@Component({
  selector: 'app-template-screen',
  templateUrl: './template-screen.component.html',
  styleUrls: ['./template-screen.component.scss']
})
export class TemplateScreenComponent implements OnInit {

  gepTemplates: any = [];
  gepTempImages: any = [];
  selected: Boolean = false;
  selectedIndex: any = [];
  unSelectedIndex: any = [];
  selectedTemplate: any = [];
  constructor(private templateScreenService: TemplateScreenService) {
  }

  ngOnInit() {
    this.getAllGepTemplates();
  }

  getAllGepTemplates() {
    this.templateScreenService.getAllTemplates().subscribe(gepTemp => {
      this.gepTemplates = gepTemp;
      this.gepTempImages = this.gepTemplates.template_image;
    });
  }

  ShowSelected(template, index) {
    this.selectedIndex = [];
    this.gepTemplates.forEach(element => {
      if (element.name === template.name) {
        this.selectedIndex.push(index);
        this.selectedTemplate = template;
      } else {
        this.selected = false;
      }
    });
  }

}
