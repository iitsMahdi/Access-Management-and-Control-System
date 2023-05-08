import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserAuthService } from '../Service/user-auth.service';
import { UserService } from '../Service/user.service';
import { User } from '../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  file!:File;
  registerForm !:FormGroup;
  user: User = new User();

  constructor(private router: Router,private formBuilder: FormBuilder,private userService :UserService , private userAuthService:UserAuthService) { }

  ngOnInit(): void {

    this.registerForm=this.formBuilder.group({
      fname:['',Validators.required],
      lname:['',Validators.required],
      email:['',
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],

      password:['',Validators.required],
      role:['',Validators.required],
  });
}
get primEmail(){
	return this.registerForm.get('email')?.invalid
  }


register(){
  this.user.firstname=this.registerForm.value.fname
  this.user.lastname=this.registerForm.value.lname
  this.user.email=this.registerForm.value.email
  this.user.password=this.registerForm.value.password
  this.user.role=this.registerForm.value.role
  const newUser = {
    firstname: this.registerForm.value.fname,
    lastname: this.registerForm.value.lname,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password,
    role: this.registerForm.value.role // assign the selected role value to the role field
  };

  this.userService.register(this.registerForm.value.role,newUser).subscribe(()=>{
    console.log(this.user)
    console.log("registration done !!");
    this.router.navigate([''])
  },
  (error) => {
    console.log(error);
  }

  )
}

}
