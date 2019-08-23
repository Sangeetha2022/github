export const component = [
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
    {
        name: 'ag-grid-angular',
        htmlDependencies: [
            '#agGrid',
            'style="width: 100%; height: 100%;"',
            'id="myGrid"',
            'class="ag-theme-balham"',
            `[columnDefs]="columnDefs"`,
            `[pagination]="true"`,
            `[paginationPageSize]="paginationPageSize"`,
            `[defaultColDef]="defaultColDef"`,
            `[rowData]="rowData"`,
            `(gridReady)="onGridReady($event)"`,
            `domLayout='autoHeight'`
        ],
        componentVariableList: [
            `gridApi`,
            `gridColumnApi`,
            `defaultColDef = { editable: false, sortable: true, resizable: true, filter: true }`,
            `paginationPageSize = 10`,
            `rowData: any = []`
        ],
        componentDynamicVariable: {
            columnDefName: 'columnDefs'
        },
        componentDependedMethod: [
            {
                name: 'gridReady',
                method: `onGridReady(params) {\nthis.gridApi = params.api;\nthis.gridApi.sizeColumnsToFit();\nthis.gridColumnApi = params.columnApi;\n}`},
            {
                name: 'textSearch',
                method: `onFilterTextBoxChanged(event) {\nthis.gridApi.setQuickFilter(event.target.value);\n}`}
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
            `@import "~ag-grid-community/dist/styles/ag-grid.css";`,
            `@import "~ag-grid-community/dist/styles/ag-theme-balham.css";`
        ],
        packageDependencyList: [
            `"ag-grid-angular": "~21.1.0",`,
            `"ag-grid-community": "~21.1.1",`
        ]

    }
]