import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/User';
import Swal from 'sweetalert2';
import {UserService} from '../Service/user.service'
import { UserAuthService }from '../Service/user-auth.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  file!:File;
  loginForm !:FormGroup;
  FPW !:FormGroup;
  user: User = new User();
  role!:any
  rls!:any
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService :UserService ,
    private userAuthService:UserAuthService,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.userAuthService.clear();
    console.log("role : "+this.userAuthService.getRoles())

    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required],
    });
    this.FPW=this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
    });
}

login(loginForm: FormGroup,rls:String) {

  console.log("role : "+this.userAuthService.getRoles())
  this.userService.login(loginForm).subscribe(
    (response: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Loged in to your account successfully',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(response);

      this.role = JSON.parse(atob(response.token.split('.')[1])).aud.toLowerCase()
      this.role=this.role.substring(1,this.role.length-1)
      this.userAuthService.setRoles(this.role);
      this.userAuthService.setToken(response.token);
      this.userAuthService.setEmail(this.loginForm.value.email);
      console.log("connected")
      console.log(this.role)
      if (this.role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/alluser']);
      }

    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong email or password!'
    })
      console.log(error);
    }
  );
}

getUserRole(loginForm:FormGroup):string{
  this.userService.getUserByEmail(loginForm.value.email).subscribe((data)=>{
    console.log("User reterned by Email : ")
    console.log(data)
    return data.role;
  },
  (error) => {

    console.log(error);
  })
  return "";
}

onSubmit(loginForm: FormGroup){
  //this.role=this.getUserRole(loginForm)
  this.login(loginForm,this.role)
}

open(content:any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      //this.closeResult = `Closed with: ${result}`;
      //this.onSubmit()
    },
    (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("form failed")
    },
  );
}

forgetPwd(){
  let email=this.FPW.value.email

  this.userService.getUserByEmail(email).subscribe((data:any)=>{
    if(data){

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email Invalid!'
    })
    }
  })

}

}
