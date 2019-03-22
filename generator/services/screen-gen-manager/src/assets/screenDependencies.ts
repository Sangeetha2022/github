export const ang7Dependency = [
    {
        type: `grid`,
        html: '',
        component: {
            dependency: [{
                name: `GridOptions`,
                path: `ag-grid-community`
            }],
            variable: [
                `gridOptions: GridOptions`,
                `defaultColDef: { editable: boolean; sortable: boolean; filter: boolean; }`,
                `gridApi: any`,
                `gridColumnApi: any`
            ],
            constructorparams: [],
            constructormethod: [],
            init: [
                `this.gridOptions = <GridOptions>{}`,
            ],
            method: [``]
        },
        module: {
            dependency: [{
                name: `AgGridModule`,
                path: `ag-grid-angular`
            }],
            importname: [
                `AgGridModule.withComponents()`
            ],
            servicename:[]
        },
        angularjson: {
            styles: [`./node_modules/ag-grid-community/dist/styles/ag-grid.css`,
                  './node_modules/ag-grid-community/dist/styles/ag-theme-balham.css'],
            scripts: []
        },
        package: {
            dependency: [{
                name: `ag-grid-angular`,
                version: `20.1.0`
            }, {
                name: `ag-grid-community`,
                version: `20.1.0`
            }]
        }
    }
]