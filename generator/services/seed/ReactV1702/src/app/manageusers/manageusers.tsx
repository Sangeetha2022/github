import React from "react";
import "./manageusers.scss";

export class Manageusers extends React.Component{
    render(){
        return(
            <>
            <div>
                <h1>Manage Users</h1>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <select className="form-control">
                                <option>

                                </option>
                            </select>
                        </td>
                        <td>
                            <button type="button">Save</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </>

        );
    }
}

export default Manageusers;