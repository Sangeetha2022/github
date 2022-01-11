import React from 'react';
import render  from 'react-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class User extends React.Component<{}, any>{

    constructor(props:any) {
      super(props);

      this.state = {
          rowData: [],
          colDefs: [
              {field: 'make'},
              {field: 'model'},
              {field: 'price', editable: 'true'},
          ]
      }
  }

  componentDidMount() {
      fetch('https://www.ag-grid.com/example-assets/row-data.json')
          .then(result => result.json())
          .then(rowData => this.setState({rowData}))
  }

  render() {
      return (
          <div
              className="ag-theme-balham"
              style={{height: '200px', width: '600px'}}
          >
              <AgGridReact
                  pagination={true}
                  defaultColDef={{sortable: true, filter: true }}
                  rowData={this.state.rowData}                    
                  columnDefs={this.state.colDefs}
                  >

              {/* 
                  Recommended: use objects rather than declarative column definitions

                  <AgGridColumn field="make"></AgGridColumn>
                  <AgGridColumn field="model"></AgGridColumn>
                  <AgGridColumn field="price" editable= {true}></AgGridColumn>
                  */}
                  
              </AgGridReact>
          </div>
      );
  }
};

export default User;