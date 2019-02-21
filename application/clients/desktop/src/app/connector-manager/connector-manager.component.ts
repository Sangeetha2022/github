import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Connector } from '../component-flows/interface/connector';
import { ModalService } from '../_services';

@Component({
  selector: 'app-connector-manager',
  templateUrl: './connector-manager.component.html',
  styleUrls: ['./connector-manager.component.scss']
})

export class ConnectorManagerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private modalService: ModalService) { }

  connector: Connector = {
    id: '',
    name: '',
    description: '',
    url: '',
    properties: []
  }

  connectorForm: FormGroup;
  properties: FormArray;
  private fieldArray: Array<any> = [];
  showModal: String = 'none';

  ngOnInit() {
    this.generateForm();
  }

  openModal = (id: string) => {
    this.modalService.open(id);
  }

  closeModal = (id: string) => {
    this.modalService.close(id);
  }

  addProperties(): void {
    this.properties = this.connectorForm.get('properties') as FormArray;
    this.properties.push(this.createProp());
  }

  generateForm() {
    this.connectorForm = this.formBuilder.group({
      name: '',
      description: '',
      url: '',
      properties: this.formBuilder.array([this.createProp()])
    })
  }

  createProp(): FormGroup {
    return this.formBuilder.group({
      key: '',
      value: ''
    });
  }

}
