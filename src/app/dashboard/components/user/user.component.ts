import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/Service/user.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Departement } from 'src/app/model/Departement';
import { Profile } from 'src/app/model/Profile';
import { UserAuthService } from 'src/app/Service/user-auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit{

  users :User[] = [];
  search:any;
  p:number=1;
  roless = this.userAuthService.getRoles()

  constructor(private userService: UserService,
    private router: Router,private userAuthService:UserAuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  Search(){
    if(this.search == ""){
      this.ngOnInit()
    }else{
      this.users = this.users.filter( res => {
        return (res.firstname.toLowerCase().match(this.search.toLowerCase()) ||
                res.lastname.toLowerCase().match(this.search.toLowerCase()) ||
                res.email.toLowerCase().match(this.search.toLowerCase())||
                res.id.toString().toLowerCase().match(this.search.toLowerCase())
        );
      })
    }
  }

  addData() {
    this.router.navigate(['/addUser']);
  }
  MenageProfile(){
    this.router.navigate(['/']);
  }

  private getUsers(){
    this.userService.getUsersList().subscribe(data => {
      this.users = data;
      console.log(this.users)
    });
  }



  updateUser(id: bigint){
    this.router.navigate(['updateUser', id]);
  }
  deleteUser(id: bigint){
    this.userService.deleteUser(id,this.roless).subscribe( () => {
      console.log("deleted");
      this.getUsers();
      window.location.reload();
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
      headers: ['id','firstname','lastname','email','password','','', '', '','','email','phone','image','code']
    };

    new ngxCsv(this.users, "Users", options);

  }



}
