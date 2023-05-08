import { Component } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-sidenavwrapper',
  templateUrl: './sidenavwrapper.component.html',
  styleUrls: ['./sidenavwrapper.component.css']
})
export class SidenavwrapperComponent {
  isExpanded: boolean = true;
  target!:string;
  constructor(private userService : UserService) {}
  ok():void{

  }
  logOut(){
    console.log('disconnected')
    this.userService.logoutUser();
  }
  set(ch:string){
    this.target=ch
  }
}
