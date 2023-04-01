import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { Contoller } from 'src/app/model/Conroller';
import { Departement } from 'src/app/model/Departement';
import { Porte } from 'src/app/model/Porte';
import { Profile } from 'src/app/model/Profile';
import { User } from 'src/app/model/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-door',
  templateUrl: './add-door.component.html',
  styleUrls: ['./add-door.component.css']
})
export class AddDoorComponent implements OnInit{

  file!:File;
  doorForm !:FormGroup;
  cardNumber!: string;

  controllers:Contoller[]=[
    {idCont:0,nomCont:"Select departement",status:"Connected"},
    {idCont:1,nomCont:"C1",status:"Connected"},
    {idCont:2,nomCont:"C2",status:"Connected"},
  ];

/*
  readonly URL="http://localhost:8080";
  readonly ENDPOINT="/addUser";*/

  constructor(private router: Router,private formBuilder: FormBuilder , private http:HttpClient,private userService: UserService,) {}

  porte: Porte = new Porte();


  ngOnInit(): void {

    this.doorForm=this.formBuilder.group({
      name:['',Validators.required],
      type:['',Validators.required],
    });
  }

  cont:string='';
  selectChangeCont(event : any){
    this.cont=event.target.value;
  }

  role:string='';
  selectChangeRole(event : any){
    this.role=event.target.value;
  }

  onSubmit(){
    alert(this.doorForm.value.name +"\n" +
          this.doorForm.value.status +"\n" +
          this.cont

        );
  }
}
