import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/Service/user.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Departement } from 'src/app/model/Departement';
import { Profile } from 'src/app/model/Profile';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit{
  constructor(private userService: UserService,
    private router: Router) { }

    ngOnInit(): void {
      this.getUsers();
    }

    users :User[] = [
    {id_user: 1n, user_name: 'Hydrogen',adresse:'rue pelastine',code:'IT', email: "aaa@aaa.com",image:'Engineering',login:"ana", password: '55487961', phone: '55487961',role:'D/U',depar:new Departement(),prof:new Profile()},
    {id_user: 2n, user_name: 'Hydrogen',adresse:'rue pelastine',code:'IT', email: "aaa@aaa.com",image:'Engineering',login:"ana", password: '55487961', phone: '55487961',role:'D/U',depar:new Departement(),prof:new Profile()},
  ];

  addData() {
    this.router.navigate(['/addUser']);
  }
  MenageProfile(){
  this.router.navigate(['/']);

}

  private getUsers(){
    this.userService.getUsersList().subscribe(data => {
      this.users = data;
    });
  }

  updateUser(id: bigint){
    this.router.navigate(['updateUser', id]);
  }

  deleteUser(id: bigint){
    this.userService.deleteUser(id).subscribe( data => {
      console.log(data);
      this.getUsers();
    })
  }

  fileDownload(){
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'User Data',
      useBom: true,
      headers: ['id_user','user_name','adresse','code','email','image','login', 'password', 'phone','role']
    };

    new ngxCsv(this.users, "Users", options);

  }



}
