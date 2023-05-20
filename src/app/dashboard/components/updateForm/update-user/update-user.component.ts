import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/model/User';
import { DepartementService } from 'src/app/Service/departement.service';
import { DoorService } from 'src/app/Service/door.service';
import { ProfileService } from 'src/app/Service/profile.service';
import { UserService } from 'src/app/Service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {/*
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
  }*/


  file!:File;
  userInfForm !:FormGroup;
  userPrevForm !:FormGroup;
  userCredForm !:FormGroup;
  cardNumber!: string;
  departements:any;
  profiles:any
  portes:any
  selectedDoors: any[] = [];
  selectedDepts: any[] = [];
  selDr: any[] = [];
  step = 1;
  personal_step = false;
  address_step = false;
  education_step = false;
  idUser:any;
  user: User = new User();
  id!: number;

  constructor(
    private deptService: DepartementService,
    private profService:ProfileService,
    private router: Router,
    private formBuilder: FormBuilder ,
    private http:HttpClient,
    private userService: UserService,
    private doorServices : DoorService,
    private route: ActivatedRoute
    ) {}


  ngOnInit(): void {
    this.userInfForm=this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      adresse:['',Validators.required],
      image:['',Validators.required],
      phone:['',Validators.required],
      profile:['',Validators.required],
      role:['',Validators.required],
    });

    this.userPrevForm=this.formBuilder.group({
      department:['',Validators.required],
      porte:['',Validators.required],
    });

    this.userCredForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
      pin:['',Validators.required],
      card:['',Validators.required],
    });

    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(
      (data:any) => {
      //this.user = data;
      //console.log(data)
      this.userInfForm.controls["firstname"].setValue(data.firstname)
      this.userInfForm.controls["lastname"].setValue(data.lastname)
      this.userInfForm.controls["adresse"].setValue(data.adresse)
      this.userCredForm.controls["email"].setValue(data.email)
      this.userInfForm.controls["phone"].setValue(data.phone)
      this.userCredForm.controls["pin"].setValue(data.code)
      this.userCredForm.controls["card"].setValue(data.depar)
    },
      (error) => {
        console.log(error)
        console.log("failed")
      }
    );


    this.getDepatement();
    this.getProfiles()
  }

  next(){

    if(this.step==1){
          this.personal_step = true;
          if (this.userInfForm.invalid) {
            return
          }
          this.step++;
          this.saveUI();
    }

    else if(this.step==2){
        this.address_step = true;
        if (this.userPrevForm.invalid) {
          return
        }
        this.step++;
    }
  }

  previous(){
    this.step--
    if(this.step==1){
      this.address_step = false;
    }
    if(this.step==2){
      this.education_step = false;
    }
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
    getPortes(dep:any){
      this.doorServices.getDoorByDep(dep).subscribe((data)=>{
        this.portes=data
        console.log("liste des portes")
        console.log(data)
      })
    }
  onChangeimg(event:any){
    this.file=event.target.files[0];
  }

  profile:string='';
  selectChangeProfile(event : any){
    this.profile=event.target.value;
  }

  checkedDep:boolean=false
  depName:string=''
  isCheckboxChecked(event: any,dep:any) {
    console.log("haw id dep : "+dep.idDep)
    if (event.target.checked) {
      this.checkedDep=true
      this.depName=dep.nomDep
      console.log("raw khtar checkedDep")
      this.getPortes(dep.idDep);
      //this.selectedDepts.push(data);
    }
  }

  isDoorChecked(event:any,data:any){
    if (event.target.checked) {
      this.selectedDoors.push(data)
      console.log("raw zed "+data)
      console.log(this.selectedDoors)
    }
  }

  pin:boolean=false
  isPinSelected(event:any){
    if (event.target.checked) {
      this.pin=true
    }
  }

  selectChangeDr(event : any){
    this.selDr.push(event.target.value);
  }

  departement:string='';
  selectChangeDep(event : any){
    this.departement=event.target.value;
  }

  role:string='';
  selectChangeRole(event : any){
    this.role=event.target.value;
  }

  saveUI(){
    this.user.firstname=this.userInfForm.value.firstname;
    this.user.lastname=this.userInfForm.value.lastname;
    this.user.adresse=this.userInfForm.value.adresse;
    this.user.image=this.file.name;
    this.user.phone=this.userInfForm.value.phone;
    this.user.role=this.role;
    const profObs = this.profService.getProfById(Number(this.profile));
    forkJoin([profObs]).subscribe(([profData]) => {
      this.user.prof = profData;
    });
  }

  saveEmployee(){
    this.user.codeUid=this.userCredForm.value.card;
    this.user.codePin=this.userCredForm.value.pin;
    this.user.email=this.userCredForm.value.email;
    this.user.password=this.userCredForm.value.password
  }

  assignUser(){
    for (let i = 0; i < this.selectedDoors.length; i++) {
      this.userService.assignPortes(this.selectedDoors[i],this.id).subscribe(()=>{
        console.log("zedetlek lbibeeen lel user")
      },
      error =>
              console.log(error));
              console.log("erroor")

    }
  }
  postUser(){
    this.saveEmployee()
    console.log(this.user)
    console.log(this.selectedDoors)
    this.userService.updateUser(this.id,this.user).subscribe(data => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User Updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
      console.log(data);
      this.assignUser();
      this.goToUserList();
      return data
    },
    error => console.log(error));
  }

  goToUserList(){
    this.router.navigate(['/alluser']);
  }

  onSubmit(){
    this.postUser();
  }

}
