import { Component, OnInit } from '@angular/core';
import { CreatetagsService } from './createtags.service';
import { Router } from '@angular/router';
import { ButtonRendererComponent } from './rendered/button-rendered/button-renderer.component';

@Component({
    selector: 'app-createtags',
    templateUrl: './createtags.component.html',
    styleUrls: ['./createtags.component.scss'],
})

export class CreatetagsComponent implements OnInit {
    frameworkComponents: { buttonRenderer: any; };
    public ItemTags: any = {
        created_date: '',
        created_by: '',
        last_modified_by: '',
        last_modified_date: '',
        name: '',
        description: '',
        itemtag: [],
    };
    public columnDefs: any;
    public rowData: any;
    public deleteById: any;
    public rowdata1: any;
    public allRowData: any;
    public gridApi: any;
    public gridColumnApi: any;
    params: any;
    btnClickedHandler: any;
    defaultColDef: { editable: boolean; sortable: boolean; filter: boolean; };
    public colDefs: any = [
        { headerName: 'name', field: 'name' },
        { headerName: 'description', field: 'description' }
    ];
    paginationPageSize:any = 10;
    page: any = 1;
    public getAllRowData: any[] = [];
    constructor(
        private createtagsService: CreatetagsService,
        private router: Router,
    ) {
        this.frameworkComponents = {
            buttonRenderer: ButtonRendererComponent,
        };
        this.columnDefs = [
            { 
                field: 'name',
                headerName: 'Name',
                width: 250, 
            },
            { 
                field: 'description',
                headerName: 'Description',
                width: 450,
            },
            {
                headerName: 'Action',
                width: 100,
                cellRenderer: 'buttonRenderer',
                editable: false,
                sortable: false,
                filter: false,
                cellRendererParams: {
                  onClick: this.removeRow.bind(this),
                  label: 'Remove'
                }
            }
        ];
        this.rowData = [];
        this.getAllRowData = [];
        this.rowdata1 = [];
        this.allRowData = [];
        this.defaultColDef = {
            editable: true,
            sortable: true,
            filter: true
        };
    }

    ngOnInit() {
        this.ItemTags.created_by = sessionStorage.getItem('email');
        this.GpGetAllValues();
    }


    onCellValueChanged(event:any) {
        const rowIndex = event.rowIndex;
        const currentEntity:any = [];
        this.gridApi.forEachNode(function (node: { data: { name: any; }; }, nodIndex: any) {
          if (nodIndex !== rowIndex) {
            currentEntity.push(node.data.name);
          }
        });
    }
    
    removeRow(e:any) {
        const rows = e.rowData;
        const selectedData = [
          rows
        ];
        const res = this.gridApi.updateRowData({ remove: selectedData });
      }

    GpCreate() {
        this.gridApi.forEachNode((node: { data: any; }) => this.rowdata1.push(node.data));
        console.log('row data', this.rowdata1);
        this.ItemTags.itemtag = this.rowdata1;
        console.log('final', this.ItemTags);
        this.createtagsService.GpCreate(this.ItemTags).subscribe(data => {
            this.ItemTags.name = '';
            this.ItemTags.description = '';
            this.rowData = [];
        },
            error => {
                console.log('Error', error);
            });
    }
    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridColumnApi = params.columnApi;
    }

    AddRows() {

        const rowta = {};
        this.gridApi.addItems([rowta]);
        this.gridApi.refreshView();

    }
    onDeleteRow() {
        const selectedData = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedData });
    }

    GpGetAllValues() {
        this.createtagsService.GpGetAllValues().subscribe(data => {
            this.getAllRowData = data;
            console.log('getalldata', this.getAllRowData);
        },
            error => {
                console.log('Error', error);
            });
    }

    onSelectionChanged(values:any) {
        console.log('getbyid', values._id);
        this.deleteById = values._id;
        this.GpRoute(values._id);
    }

    GpRoute(queryId:any) {
        console.log('update data', queryId);
        this.router.navigate(['./updatetags'], { queryParams: { 'id': queryId } })
        // this.createtagsService.GpGetNounById(queryId).subscribe(data => {
        //     console.log('update data', data);
        //     this.ItemTags = data;
        //     this.rowData = data.itemtag;
        // });
    }

}
