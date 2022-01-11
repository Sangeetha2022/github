import React from "react";
import "./authorization.scss";


class Authorization extends React.Component{
    render () {
        return (
            <>
            <div className="styles">
                <h1>
                    Authorization
                </h1>
            </div>
            <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Page</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> </td>
                            <td>
                                <select className="form-control">
                                    <option> </option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="form">
                    <button type="button" className="btn btn-primary">Save</button>
                </div>
            </>
        );
    }
}

export default Authorization;