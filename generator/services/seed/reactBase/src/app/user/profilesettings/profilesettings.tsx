import React from "react";
import "./profilesettings.scss";

class ProfileSettings extends React.Component{
    render(){
        return(
            <div className="profileform">
                <form>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="label"><strong>First Name</strong></label>
                                <input type="text" className="form-control" placeholder="Firstname" name="firstname"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="label"><strong>Last Name</strong></label>
                                <input type="text" className="form-control" placeholder="Lastname" name="lastname"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="label"><strong>User Name</strong></label>
                                <input type="text" className="form-control" placeholder="Username" name="username"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="label"><strong>Password</strong></label>
                                <input type="text"  className="form-control" placeholder="Password" name="password"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="label"><strong>Email</strong></label>
                                <input type="email" className="form-control" placeholder="Email" name="email"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="label"><strong>Installer Token</strong></label>
                                <input type="text" className="form-control" placeholder="Installr Token" name="installrToken"/>
                            </div>
                        </div>
                        <div className="col-sm-6">

                        </div>
                        <div className="col-sm-6">
                            <button type="submit" className="btn btn-primary" >Save</button>&nbsp;&nbsp;
                            <button type="submit" className="btn btn-primary" >cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}