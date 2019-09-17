export const component = [
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
            `gridApi: any`,
            `gridColumnApi: any`,
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
            `@import "~ag-grid-community/dist/styles/ag-grid.css";`,
            `@import "~ag-grid-community/dist/styles/ag-theme-balham.css";`
        ],
        packageDependencyList: [
            `"ag-grid-angular": "~21.1.0",`,
            `"ag-grid-community": "~21.1.1",`
        ]

    },
    // ADDED
    {
        name: 'modal',
        htmlDependencies: [
            '[isPopupModal]="isPopupModal"',
            '(popupData)="popupData($event)"',
            '(cancelPopup)="cancelPopup($event)"'
        ],
        componentVariableList: [
            `isPopupModal=false`,
        ],
        componentDynamicVariable: {
            popupModalName: 'isPopupModal',
            popupDataName: 'popupData',
            cancelPopupName: 'cancelPopup',
            submitMethodName: 'submit',
            cancelMethodName: 'cancel'
        },
        componentDependedMethod: [
            {
                name: 'openModal',
                method: `openModal() {\nthis.isPopupModal = true;\n}`
            },
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
                method: `submit() {\nthis.popupData.emit({ data: this.gridApi.getSelectedRows(), isPopupModal: false });\n}`
            },
            {
                name: 'cancel',
                method: `cancel(event) {\nthis.cancelPopup.emit(false);\n}`
            }
        ]
    }
]