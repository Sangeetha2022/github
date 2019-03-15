import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.scss']
})
export class FeatureDetailsComponent implements OnInit {
  screen = [ "Ticket Creation","Ticket Details"]
  columnDefs: any = [];
  columnFeatureDefs: any = [];
  rowFlowCompData: any = [];
  rowSelection: String;
  defaultColDef: any;
  showFeatureFlow: boolean;
  showFeatureFlowComponent: boolean;
  rowData: any = [];
  selectedFeatureFlow:any =[];
  gridApi;
  gridColumnApi;
  constructor() { 
    this.columnDefs = [
      {
        headerName: 'Name', field: 'name',
        checkboxSelection: true
      },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Action', field: 'action_on_data' }
    ];
    this.columnFeatureDefs = [
      {
        headerName: 'Name', field: 'name',
        checkboxSelection: true
      },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Description', field: 'description' },
    ];
    this.rowSelection = 'single';
    this.rowData = [
      {name:"CreateTicket",label:"create ticket",description: "create the ticket",action_on_data:"CreateTicket"},
      // {name:"EditTicket",label:"edit ticket",description: "edit the ticket",action_on_data:"EditTicket"},
      // {name:"DeleteTicket",label:"delete ticket",description: "delete the ticket",action_on_data:"DeleteTicket"},
      // {name:"GetAllTicket",label:"get ticket",description: "get all the ticket",action_on_data:"GetAllTicket"},
    ];

    this.rowFlowCompData = [
      {name:"saveTicketController",label:"save ticket contoller",description: "controller for save ticket"},
      {name:"saveTicketService",label:"save ticket service",description: "service for save ticket"},
      {name:"saveTicketDao",label:"save ticket dao",description: "dao for save ticket"},
    ];
    this.defaultColDef = {
      enableValue: true,
    };
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
  showFlow(){
    this.showFeatureFlow = true;
  }

  onSelectionChanged() {
    this.selectedFeatureFlow = this.gridApi.getSelectedRows();

    if (this.selectedFeatureFlow.length !== 0) {
      this.showFeatureFlowComponent = true;
    }
  }

}
