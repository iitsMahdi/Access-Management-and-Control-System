import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { Departement } from 'src/app/model/Departement';
import { User } from 'src/app/model/User';
import { Profile } from 'src/app/model/Profile';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  file!:File;
  userForm !:FormGroup;
  cardNumber!: string;

  departements:Departement[]=[
    {id_dep:0,nom_dep:"Select departement"},
    {id_dep:1,nom_dep:"Informatique"},
    {id_dep:2,nom_dep:"Finance"},
  ];

  profiles:Profile[]=[
    {id_profile:0,nom_profile:"Select profile"},
    {id_profile:1,nom_profile:"Ingénieur"},
    {id_profile:2,nom_profile:"Technicien"},
  ];
/*
  readonly URL="http://localhost:8080";
  readonly ENDPOINT="/addUser";*/

  constructor(private router: Router,private formBuilder: FormBuilder , private http:HttpClient,private userService: UserService,) {}

  user: User = new User();


  ngOnInit(): void {

    this.userForm=this.formBuilder.group({
      user_name:['',Validators.required],
      adresse:['',Validators.required],
      email:['',Validators.required],
      image:['',Validators.required],
      password:['',Validators.required],
      phone:['',Validators.required],
      login:['',Validators.required],
      pin:['',Validators.required],
      card:['',Validators.required],
      profile:['',Validators.required],
      department:['',Validators.required],
      role:['',Validators.required],

    });
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
/*
  onSubmit(){
    alert(this.userForm.value.adresse +"\n" +
          this.userForm.value.user_name +"\n" +
          this.userForm.value.email +"\n" +
          this.file.name +"\n" +
          this.profile+"\n" +
          this.departement+"\n" +
          this.userForm.value.password +"\n" +
          this.userForm.value.phone +"\n" +
          this.userForm.value.login +"\n" +
          this.role+"\n" +
          this.userForm.value.pin +"\n" +
          this.userForm.value.card +"\n"
        );
  }*/

  saveEmployee(){

    this.user.user_name=this.userForm.value.user_name;
    this.user.adresse=this.userForm.value.email;
    this.user.email=this.userForm.value.email;
    this.user.image=this.file.name;
    this.user.password=this.userForm.value.password;
    this.user.phone=this.userForm.value.phone;
    this.user.login=this.userForm.value.login;
    //this.user.code=this.userForm.value.pin;
    this.user.code=this.cardNumber;

    this.user.role=this.role;

    this.userService.createUser(this.user).subscribe( data =>{
      console.log(data);
      this.goToUserList();
    },
    error => console.log(error));
  }

  goToUserList(){
    this.router.navigate(['/alluser']);
  }

  onSubmit(){
    console.log(this.user);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'User added successfully',
      showConfirmButton: false,
      timer: 1500
    })
    this.saveEmployee();
  }

 /* @HostListener("input", ['$event.target'])
  onInput(event: HTMLInputElement) {
    const cardNumber= "0014246313"
    this.cardNumber = cardNumber;
    event.value = cardNumber; // update input field value
}*/
}
