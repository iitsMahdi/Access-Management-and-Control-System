import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

constructor(private userService : UserService ,
  private userAuthService :UserAuthService){}
  ngOnInit(): void {
    let email= this.userAuthService.getEmail()
    this.userService.getUserByEmail(email).subscribe((data:any)=>{
      console.warn(data.firstname)
    })
  }








}
