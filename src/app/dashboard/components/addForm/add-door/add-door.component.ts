import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoorService } from 'src/app/Service/door.service';
import { Contoller } from 'src/app/model/Conroller';
import { Departement } from 'src/app/model/Departement';
import { Porte } from 'src/app/model/Porte';
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
    {id_cont:0n,nom_controlleur:"Select departement",status:"Connected",dept:new Departement()},
    {id_cont:0n,nom_controlleur:"C1",status:"Connected",dept:new Departement()},
    {id_cont:0n,nom_controlleur:"C2",status:"Connected",dept:new Departement()},
  ];

  constructor(private router: Router,private formBuilder: FormBuilder,private doorService : DoorService) {}

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
/*
  onSubmit(){
    alert(this.doorForm.value.name +"\n" +
          this.doorForm.value.type +"\n" +
          this.cont

        );
  }
*/
  saveDoor():void{
    this.porte.nom_porte=this.doorForm.value.name;
    this.porte.type=this.doorForm.value.type;
    this.doorService.createDoor(this.porte).subscribe( data =>{
      console.log(data);
      this.goToDoorList();
    },
    error => console.log(error));
  }

  goToDoorList(){
    this.router.navigate(['/alldoor']);
  }

  onSubmit(){
    console.log(this.porte);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'User added successfully',
      showConfirmButton: false,
      timer: 1500
    })
    this.saveDoor();
  }
}
