import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/model/User';
import { DepartementService } from 'src/app/Service/departement.service';
import { ProfileService } from 'src/app/Service/profile.service';
import { UserService } from 'src/app/Service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  file!:File;
  userForm !:FormGroup;
  id!: number;
  user: User = new User();
  departements:any
  profiles:any
  userr: User = new User();

  constructor(private deptService: DepartementService,private profService:ProfileService,private userService:UserService ,private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  this.userForm=this.formBuilder.group({
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    adresse:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
    phone:['',Validators.required],
    pin:['',Validators.required],
    card:['',Validators.required],
    profile:['',Validators.required],
    department:['',Validators.required],
    role:['',Validators.required],

    });

    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(
      (data:any) => {
      this.user = data;
      console.log(data)
      this.userForm.controls["firstname"].setValue(data.firstname)
      this.userForm.controls["lastname"].setValue(data.lastname)
      this.userForm.controls["adresse"].setValue(data.adresse)
      this.userForm.controls["email"].setValue(data.email)
      this.userForm.controls["password"].setValue(data.password)
      this.userForm.controls["phone"].setValue(data.phone)
      this.userForm.controls["pin"].setValue(data.code)
      this.userForm.controls["department"].setValue(data.depar)
    },
      (error) => {
        console.log(error)
        console.log("failed")
      }
    );

      this.getDepatement();
      this.getProfiles()
  }

  getDepatement(){
    this.deptService.getDepList().subscribe((data)=>{
      this.departements=data;
      console.log(data);
    })}
    getProfiles(){
      this.profService.getProfilesList().subscribe((data)=>{
        this.profiles=data
        console.log(this.profiles)
      })
    }

  onChangeimg(event:any){
    this.file=event.target.files[0];
  }

  profile:string='';
  selectChangeProfile(event : any){
    this.profile=event.target.value;
  }

  departement:string='';
  selectChangeDep(event : any){
    this.departement=event.target.value;
  }

  role:string='';
  selectChangeRole(event : any){
    this.role=event.target.value;
  }

  updateUser(){
    this.userr.firstname=this.userForm.value.firstname;
    this.userr.lastname=this.userForm.value.lastname;
    this.userr.adresse=this.userForm.value.adresse;
    this.userr.email=this.userForm.value.email;
    this.userr.image=this.file.name;
    this.userr.password=this.userForm.value.password;
    this.userr.phone=this.userForm.value.phone;
    this.userr.code=this.userForm.value.pin;
    this.userr.role=this.role;

    const deptObs = this.deptService.getDepById(Number(this.departement));
    const profObs = this.profService.getProfById(Number(this.profile));
    forkJoin([deptObs, profObs]).subscribe(([deptData, profData]) => {
      this.userr.depar = deptData;
      this.userr.prof = profData;
      console.log(deptData, profData);
      console.log("User");
      console.log(this.userr);
      this.userService.updateUser(this.id, this.userr).subscribe(data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.goToUserList();
      },
      error => console.log(error));
    });
  }

  onSubmit(){
    this.updateUser()
  }

  goToUserList(){
    this.router.navigate(['/alluser']);
  }
}
