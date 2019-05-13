import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.component.html',
  styleUrls: ['./profilesettings.component.scss']
})
export class ProfilesettingsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private profileservice: UserService, private route: Router) { }

  public id: any;
  public Userobject = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'role': {},
    'id': '',
    'username': ''
  };
  public roles: any[] = [];
  public rolechange: any;

  ngOnInit() {
    this.Queryparams();
  }

  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.Userdetails();
  }

  Userdetails() {
    this.profileservice.Getuser(this.id).subscribe(data => {
      const user = data.body;
      this.Userobject.firstname = user.firstname;
      this.Userobject.lastname = user.lastname;
      this.Userobject.email = user.email;
      this.Userobject.role = user.role.role;

      this.profileservice.Getroles().subscribe(roledata => {
        this.roles = roledata.body;
        console.log('-------roles----->>>>', this.Userobject.role);
        const index = this.roles.findIndex(x => x.role === this.Userobject.role);
        console.log('-------indexvalue-----', index);
        if (index > -1) {
          this.roles.splice(index, 1);
        }
        console.log('-------roles--array--->>>>', this.roles);
      }, error => {
        console.error('error:', error);
      });
    }, error => {
      console.error('error:', error);
    });
  }

  onChange(event) {
    this.rolechange = '';
    console.log('selected  event---->>>', event);

    const updaterole = this.roles.find(x => x.role === event);

    console.log('------roledetails---->>>>', updaterole);

    this.rolechange = updaterole;
  }

  Updateuser() {
    this.Userobject.role = this.rolechange;
    this.Userobject.id = this.id;
    this.Userobject.username = this.Userobject.email;
    console.log('---------updateuserdetails-----', this.Userobject);
    this.profileservice.Updateuser(this.Userobject).subscribe(data => {
      this.route.navigate(['admin']);
    }, error => {
      console.error('error:', error);
    });
  }
}
