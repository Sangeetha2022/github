import { Component, OnInit } from '@angular/core';
import { ManageRolesService } from './manageroles.service';
import { Constants } from '../config/Constant';

@Component({
  selector: 'app-manageroles',
  templateUrl: './manageroles.component.html',
  styleUrls: ['./manageroles.component.scss']
})
export class ManagerolesComponent implements OnInit {

  name = '';
  role = '';
  queryId: any;
  default_role = ["Admin", "User", "Guest"];
  custom_role = [];
  enablebutton: boolean = true;
  rolelist: any;

  constructor(private manageRolesService: ManageRolesService, private constants: Constants) { }

  ngOnInit() {
    this.getRoles();
  }

  save() {
    this.custom_role.push(this.name);
    this.enablebutton = true;
    let rolename = { "role": this.name }
    this.manageRolesService.post(this.constants.saverole, rolename).subscribe((data) => {
      this.getRoles();
    }, (error) => {
      console.log('Error in data save ---->>', error);
    });
    this.name = '';
  }

  remove(role) {
    this.manageRolesService.delete(this.constants.deleterole + '/' + role._id).subscribe((data) => {
      this.getRoles();
    }, (error) => {
      console.log('Error in data save ---->>', error);
    });
    // this.custom_role.splice(index, 1);
  }

  getInputValue(e) {
    var event = e;
    if (event.length > 0) {
      this.enablebutton = false;
    }
    else {
      this.enablebutton = true;
    }
    // var duplicatecheck = this.default_role.includes(event) || this.custom_role.includes(event);
    // if (duplicatecheck) {
    //   this.enablebutton = true;
    //   alert("Role already exist");
    // }
  }

  getRoles() {
    this.manageRolesService.get(this.constants.getallroles).subscribe((rolelist) => {
      this.rolelist = rolelist;
    }, (error) => {
      console.log('Error --->>>>>', error);
    });
  }
}
