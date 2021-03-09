import { Component, OnInit, Input } from '@angular/core';
import { TemplateManagerService } from './template-manager.service';

@Component({
  selector: 'app-template-manager',
  templateUrl: './template-manager.component.html',
  styleUrls: ['./template-manager.component.scss']
})
export class TemplateManagerComponent implements OnInit {

  @Input() projectId: string;
  logId = sessionStorage.getItem('LogId');

  constructor(private templateManagerService: TemplateManagerService) { }

  ngOnInit() {
    console.log('PROJECT ID---->>>>', this.projectId);
  }
  modifyTemplate() {
    this.templateManagerService.getProjectTemplate(this.projectId, this.logId).subscribe(response => {
      console.log('TEMPLATE RESPONSE---->>>>', response);
    });
  }
}
