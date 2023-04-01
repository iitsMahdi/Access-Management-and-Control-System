import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/User';
import Swal from 'sweetalert2';
import {UserService} from '../Service/user.service'
import { UserAuthService }from '../Service/user-auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  file!:File;
  loginForm !:FormGroup;
  user: User = new User();



  constructor(private router: Router,private formBuilder: FormBuilder,private userService :UserService , private userAuthService:UserAuthService) { }

  ngOnInit(): void {

    this.loginForm=this.formBuilder.group({
      password:['',Validators.required],
      login:['',Validators.required],
  });
}

onSubmit(){
  console.log (this.loginForm.value);//.login + " "+ this.loginForm.value.password);
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Loged in to your account successfully',
    showConfirmButton: false,
    timer: 1500
  })
  this.router.navigate(['/dashboard']);
}

login(loginForm: FormGroup) {
  console.log(loginForm.value)

  this.userService.login(loginForm.value).subscribe(
    (response: any) => {
      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setToken(response.jwtToken);

      const role = response.user.role[0].roleName;
      if (role === 'Admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/user']);
      }
    },
    (error) => {
      console.log(error);
    }
  );
}


}
