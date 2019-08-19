import { Component, OnInit } from '@angular/core';
import { TemplateScreenService } from './template-screen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenDesignerService } from '../screen-designer/screen-designer.service';
import { ProjectsService } from '../projects/projects.service';

@Component({
  selector: 'app-template-screen',
  templateUrl: './template-screen.component.html',
  styleUrls: ['./template-screen.component.scss']
})
export class TemplateScreenComponent implements OnInit {

  gepTemplates: any = [];
  project_id: any;
  gepTempImages: any = [];
  selected: Boolean = false;
  selectedIndex: any = [];
  unSelectedIndex: any = [];
  selectedTemplate: any = [];
  projectTemp: any = [];
  projectTempId: any;
  constructor(
    private templateScreenService: TemplateScreenService,
    private route: ActivatedRoute,
    private screenDesignerService: ScreenDesignerService,
    private projectsService: ProjectsService,
    private router: Router,

  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.project_id = params.projectId;
    });
    this.getAllGepTemplates();
    // this.getScreenByProjectId();
  }

  getAllGepTemplates() {
    this.templateScreenService.getAllTemplates().subscribe(gepTemp => {
      this.gepTemplates = gepTemp;
      this.gepTempImages = this.gepTemplates.template_image;
      this.screenDesignerService.getScreenByProjectId(this.project_id).subscribe(projScreen => {
        this.projectTemp = projScreen;
        this.projectTempId = projScreen[0]._id;
        this.selectedIndex = [];
        this.gepTemplates.forEach((element, index) => {
          if (element.name === projScreen[0].screenName) {
            this.selectedIndex.push(index);
            this.selected = true;
            // this.selectedTemplate = template;
          } else {
            this.selected = false;
          }
        });
      });
    });
  }

  ShowSelected(template, index, screenId) {
    this.selectedIndex = [];
    this.gepTemplates.forEach(element => {
      if (element.name === template.name) {
        this.selectedIndex.push(index);
        this.selectedTemplate = template;
        delete this.selectedTemplate._id;
        delete this.selectedTemplate.date;
        delete this.selectedTemplate.__v;
        this.projectTemp[0].screenName = this.selectedTemplate.name;
        this.projectTemp[0]['gjs-assets'] = this.selectedTemplate['gjs-assets'];
        this.projectTemp[0]['gjs-css'] = this.selectedTemplate['gjs-css'];
        this.projectTemp[0]['gjs-styles'] = this.selectedTemplate['gjs-styles'];
        this.projectTemp[0]['gjs-html'] = this.selectedTemplate['gjs-html'];
        this.projectTemp[0]['gjs-components'] = this.selectedTemplate['gjs-components'];
        this.projectTemp[0]['stylesheets'] = this.selectedTemplate['stylesheets'];
        this.projectTemp[0]['scripts'] = this.selectedTemplate['scripts'];
        this.projectTemp[0]['css-guidelines'] = this.selectedTemplate['css-guidelines'];
        const projetData = {
          app_ui_template: this.selectedTemplate.name,
          app_ui_template_img: this.selectedTemplate.template_image[0].image
        };
        this.screenDesignerService.updateScreen(this.projectTempId, this.projectTemp[0]).subscribe(updateScreen => {
          localStorage.setItem('stylesheets', JSON.stringify(this.projectTemp[0]['stylesheets']));
          localStorage.setItem('scripts', JSON.stringify(this.projectTemp[0]['scripts']));
          localStorage.setItem('css_guidelines', JSON.stringify(this.projectTemp[0]['css-guidelines']));
        });
        this.projectsService.updateProjectById(this.project_id, projetData).subscribe(updateProj => {

        });
      } else {
        this.selected = false;
      }
    });
  }

}
