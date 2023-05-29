import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  user:User =new User()
  userInfForm !:FormGroup;
  id!: number;

constructor(
  private userService : UserService ,
  private userAuthService :UserAuthService,
  private formBuilder: FormBuilder ,
  private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.userInfForm=this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      adresse:['',Validators.required],
      image:['',Validators.required],
      phone:['',Validators.required],
      profile:['',Validators.required],
      role:['',Validators.required],
      email:['',Validators.required],
      uid:['',Validators.required],
      pin:['',Validators.required]

    });
    this.id = this.route.snapshot.params['id'];

    if(this.id!=999){
      this.userService.getUserById(this.id).subscribe((data:any)=>{
        console.warn(data)
        this.user=data;
        this.userInfForm.controls["firstname"].setValue(data.firstname+" "+data.lastname)
        this.userInfForm.controls["adresse"].setValue(data.adresse)
        this.userInfForm.controls["email"].setValue(data.email)
        this.userInfForm.controls["phone"].setValue(data.phone)
        this.userInfForm.controls["pin"].setValue(data.codePin)
        this.userInfForm.controls["uid"].setValue(data.codeUid)
        this.userInfForm.controls["role"].setValue(data.role)
        //this.userInfForm.controls["image"].setValue(data.image)
        this.userInfForm.controls["profile"].setValue(data.prof.nomProfile)
      })
    }else{
      let email= this.userAuthService.getEmail()
      this.userService.getUserByEmail(email).subscribe((data:any)=>{
        console.warn(data)
        this.user=data;
        this.userInfForm.controls["firstname"].setValue(data.firstname+" "+data.lastname)
        this.userInfForm.controls["adresse"].setValue(data.adresse)
        this.userInfForm.controls["email"].setValue(data.email)
        this.userInfForm.controls["phone"].setValue(data.phone)
        this.userInfForm.controls["pin"].setValue(data.codePin)
        this.userInfForm.controls["uid"].setValue(data.codeUid)
        this.userInfForm.controls["role"].setValue(data.role)
        //this.userInfForm.controls["image"].setValue(data.image)
        this.userInfForm.controls["profile"].setValue(data.prof.nomProfile)
      })
    }
  }








}
