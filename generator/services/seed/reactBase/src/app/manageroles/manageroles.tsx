import React from "react";
import "./manageroles.scss";

export class Manageroles extends React.Component {
    render() {
        return(
            <>
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 div_width">
                    <div className="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                        <div className="form-group">
                            <label htmlFor="name" style={{color: "black"}}>Create Role</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter Role Name" />
                        </div>
                    </div>
                </div><div>
                    <button type="button" className="btn">
                        Add Role
                    </button>
                </div><table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Roles</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <button type="button">Remove Role</button>
                            </td>
                        </tr>
                    </tbody>
                </table></>

        );
    }
}

export default Manageroles;