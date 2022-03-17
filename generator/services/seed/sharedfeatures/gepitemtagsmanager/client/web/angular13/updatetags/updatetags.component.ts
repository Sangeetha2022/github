import { Component, OnInit } from '@angular/core';
import { UpdatetagsService } from './updatetags.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ButtonRendererComponent } from './rendered/button-rendered/button-renderer.component';

@Component({
  selector: 'app-updatetags',
  templateUrl: './updatetags.component.html',
  styleUrls: ['./updatetags.component.scss']
})
export class UpdatetagsComponent implements OnInit {

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
    queryId: any;
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
    public getAllRowData: any;
    constructor(
        private UpdatetagsService: UpdatetagsService,
        private activatedRoute: ActivatedRoute,
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
        // this.GpGetAllValues();
        this.activatedRoute.queryParams.subscribe(params => { 
            this.queryId = params['id'];
            this.GpGetNounById();
        });
    }


    onCellValueChanged(event:any) {
        const rowIndex = event.rowIndex;
        this.gridApi.forEachNode( (node: { data: { name: any; }; }, nodIndex: any) => {
          if (nodIndex !== rowIndex) {
            this.rowData.push(node.data.name);
          }
        });
    }
    
    removeRow(e:any) {
        const rows = e.rowData;
        console.log('rowdata', rows);
        const selectedData = [
          rows
        ];
        console.log('slectedrow', selectedData);
        const res = this.gridApi.updateRowData({ remove: selectedData });
        console.log('changerow', res, this.rowData);
    }

    onDeleteRow() {
        const selectedData = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedData });
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


    GpGetNounById() {
        console.log('data come from gpid', this.queryId);
        this.UpdatetagsService.GpGetNounById(this.queryId).subscribe(data => {
            console.log('geta id', data)
            this.ItemTags = data;
            this.rowData = data.itemtag;
        },
        error => {
            console.log('Error', error);
        });
    }

    async GpUpdate() {
        let updateRowData: any[] = [];
        await this.gridApi.forEachNode((node:any) => {
            updateRowData.push(node.data);
        })
        this.ItemTags.itemtag = updateRowData;
        console.log('test in data ', this.ItemTags.itemtag);
        console.log('get an update----------------------', this.ItemTags, this.rowData);
        this.UpdatetagsService.GpUpdate(this.ItemTags).subscribe(data => {
            this.ItemTags.name = '';
            this.ItemTags.description = '';
            this.rowData = [];
        },
            error => {
                console.log('Error', error);
            });
    }

    GpDelete() {
        console.log('get an delete', this.ItemTags, this.queryId);
        this.UpdatetagsService.GpDelete(this.queryId).subscribe(data => {
            this.ItemTags.name = '';
            this.ItemTags.description = '';
            this.rowData = [];
        },
            error => {
                console.log('Error', error);
            });
    }
}
