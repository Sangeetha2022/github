import { Component, OnInit, Input } from '@angular/core';
import { TemplateManagerService } from './template-manager.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-manager',
  templateUrl: './template-manager.component.html',
  styleUrls: ['./template-manager.component.scss']
})
export class TemplateManagerComponent implements OnInit {

  @Input() projectId: string;
  logId = sessionStorage.getItem('LogId');

  constructor(
    private templateManagerService: TemplateManagerService, 
    private spinner: NgxSpinnerService,
    private router: Router,
    ) { }

  ngOnInit() {
  }
  modifyTemplate() {
    this.spinner.show();
    this.templateManagerService.getProjectTemplate(this.projectId, this.logId).subscribe(response => {
      this.spinner.hide();
      if (response && response.body && response.body.length > 0) {
        this.router.navigate(['/desktopscreen'], {
          queryParams: {
            'project-template-id': response.body[0]._id
          }
        });
      }
    });
  }
}
