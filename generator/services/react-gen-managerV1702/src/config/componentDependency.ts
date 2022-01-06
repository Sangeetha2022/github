import { Constant } from "./Constant";

export const component = [
    // ADDED ROUTER
    {
        name: 'router',
        componentDependencies: [
            {
                dependencyName: 'Router',
                dependencyPath: '@angular/router'
            }
        ],
        componentConstructor: [
            {
                variableName: 'router',
                dependencyName: 'Router'
            }
        ]
    },
    // ADDED ACTIVATEDROUTE
    {
        name: 'activatedRoute',
        componentDependencies: [
            {
                dependencyName: 'ActivatedRoute',
                dependencyPath: '@angular/router'
            }
        ],
        componentConstructor: [
            {
                variableName: 'activatedRoute',
                dependencyName: 'ActivatedRoute'
            }
        ]
    },
    // ADDED CKEDITOR
    {
        name: 'ckeditor',
        htmlDependencies: [`[editor]='Editor'`],
        componentVariableList: [`Editor = ClassicEditor`],
        componentDependencies: [
            {
                dependencyName: '* as ClassicEditor',
                dependencyPath: '@ckeditor/ckeditor5-build-classic'
            }
        ],
        module: {
            dependencies: [
                {
                    dependencyName: 'CKEditorModule',
                    dependencyPath: '@ckeditor/ckeditor5-angular'
                }
            ],
            imports: [
                'CKEditorModule'
            ]
        },
        packageDependencyList: [
            `"@ckeditor/ckeditor5-angular": "~1.1.0",`,
            `"@ckeditor/ckeditor5-build-classic": "~12.3.1",`
        ]
    },
    // ADDED AG-GRID
    {
        name: 'ag-grid-react',
        htmlDependencies: [
            `columnDefs={this.state.colDefs} `,
            `pagination={true} `,
            `defaultColDef={{sortable: true, filter: true }} `,
            `rowData={this.state.rowData} `,
        ],
        componentVariableList: [
            `gridApi: any`,
            `gridColumnApi: any`,
            `rowSelection = 'single'`,
            `defaultColDef = { editable: false, sortable: true, resizable: true, filter: true }`,
            `paginationPageSize = 10`,
            `rowData: any = []`
        ],
        componentDynamicVariable: {
            gridApiName: 'gridApi',
            columnDefName: 'columnDefs'
        },
        componentDependedMethod: [
            {
                name: 'gridReady',
                method: `onGridReady(params) {\nthis.gridApi = params.api;\nthis.gridApi.sizeColumnsToFit();\nthis.gridColumnApi = params.columnApi;\n}`
            },
            {
                name: 'textSearch',
                method: `onFilterTextBoxChanged(event) {\nthis.gridApi.setQuickFilter(event.target.value);\n}`
            }
        ],
        module: {
            dependencies: [
                {
                    dependencyName: 'AgGridModule',
                    dependencyPath: 'ag-grid-angular'
                }
            ],
            imports: [
                'AgGridModule'
            ]
        },
        styles: [
            `import { AgGridColumn, AgGridReact } from 'ag-grid-react';`,
            `@import "ag-grid-community/dist/styles/ag-grid.css";`,
            `@import "ag-grid-community/dist/styles/ag-theme-material.css";`
        ],
        packageDependencyList: [
            `"ag-grid-react": "~25.3.0",`,
            `"ag-grid-community": "~25.3.0",`
        ]

    },
    // ADDED BOOTSTRAP TABLE
    {
        name: 'bootstrap-table',
        htmlDependencies: [
            ` *ngFor="let values of rowData`,
            `| slice: (page-1) * paginationPageSize :(page-1) * paginationPageSize + paginationPageSize"`,        
        ],
        bootstrapTable:
            `<div class="tableBg">
            <table id="table" class="table table-bordered  table-striped table-curved"
            data-show-header="true"
            data-pagination="true" data-id-field="name">
            <thead class="table table-hover">
                <tr>
                    <th *ngFor="let column of columnDefs">
    {{column.headerName}}
                    </th>
                </tr>
            </thead>
            <tbody class="table-design" *ngIf="rowData.length==0">
                <td style="text-align: center;" colspan="5">No Data Found</td>
            </tbody>
            <tbody class="table-design" *ngIf="rowData.length>0">`,
        paginationSection: `<div class="bottomPage">
        <div class="text-right">
        <ngb-pagination class="d-flex justify-content-start"
            [(page)]="page"
            [maxSize]="5" [rotate]="true" [pageSize]="paginationPageSize"
            [collectionSize]="rowData.length" [boundaryLinks]="true"></ngb-pagination>
    </div></div>
    <div id="myGrid" class=""></div>`,
    },
    // ADDED MODAL
    {
        name: 'modal',
        htmlDependencies: [
            '[isPopupModal]="isPopupModal"',
            '(popupData)="popupData($event)"',
            '(cancelPopup)="cancelPopup($event)"'
        ],
        componentVariableList: [
            `isPopupModal = false`,
        ],
        componentDynamicVariable: {
            popupModalName: 'isPopupModal',
            popupDataName: 'popupData',
            cancelPopupName: 'cancelPopup',
            submitMethodName: 'submit',
            cancelMethodName: 'cancel',
            eventName: 'event'
        },
        componentDependedMethod: [
            {
                name: 'popupData',
                method: `popupData(event) {\nthis.isPopupModal = event.isPopupModal;\n}`
            },
            {
                name: 'cancelPopup',
                method: `cancelPopup(event) {\nthis.isPopupModal = event;\n}`
            },
            {
                name: 'submit',
                method: `submit() {\nthis.popupData.emit({ ${Constant.POPUP_DATA_VARIABLENAME}: this.gridApi.getSelectedRows()[0], isPopupModal: false });\n}`
            },
            {
                name: 'cancel',
                method: `cancel(event) {\nthis.cancelPopup.emit(false);\n}`
            }
        ]
    }
]
export const moduleHeaders = [
    { importName: 'FormsModule, ReactiveFormsModule', importPath: '@angular/forms' }
];
export const agGridComponents = [
    "gridApi: any;",
    "gridColumnApi: any;",
    "rowSelection = 'single';",
    "defaultColDef = { editable: false, sortable: true, resizable: true, filter: true };",
    "paginationPageSize = 10;",
    "rowData: any = [];"
];
export const onGridReady = [`this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridColumnApi = params.columnApi;`
];
export const bootstrapComponents = [
    "paginationPageSize = 10;",
    "page=1;",
    "rowData: any = [];"
];
export const queryParamSubscribe = [
    "this.activatedRoute.queryParams.subscribe(params => { ",
    "this.queryId = params.id;",
    "this.GpGetNounById();",
    "});"
];
export const onSelectionChangedBody = [
    'const selectedRows = this.gridApi.getSelectedRows();',
    'this.GpRoute(selectedRows[0]._id);'
];
export const onSelectionChangedBody_bootstrap = [
    'this.GpRoute(values._id);'
];
export const gpSearchBody = [
    'const temp = [];',
    'const objectKeyPair = Object.entries(paramName);',
    'objectKeyPair.forEach((element, index) => {',
    'if (element[1]) {',
    'temp.push(`${element[0]}=${element[1]}`);',
    '}',
    '});'
];
export const constructorObj = [
    {
        className: 'SharedService',
        objectName: 'sharedService'
    },
    {
        className: 'HttpClient',
        objectName: 'http'
    }
];