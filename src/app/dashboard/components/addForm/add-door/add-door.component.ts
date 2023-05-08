import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ControllerService } from 'src/app/Service/controller.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { DoorService } from 'src/app/Service/door.service';
import { Contoller } from 'src/app/model/Controller';
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

  deptss:any

  constructor(private contService : ControllerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private doorService : DoorService,
    private deptsService : DepartementService
    ) {}

  porte: Porte = new Porte();

  ngOnInit(): void {

    this.doorForm=this.formBuilder.group({
      name:['',Validators.required],
      type:['',Validators.required],
      Departement:['',Validators.required]
    });
    this.getDepts()
  }

  getDepts(){
    this.deptsService.getDepList().subscribe((data)=>{
      this.deptss=data;
      console.log(data)
    })
  }

  dep:string='';
  selectChangeCont(event : any){
    this.dep=event.target.value;
  }
  type:string='';

  selectChangeType(event : any){
    this.type=event.target.value;
  }

  saveDoor():void{
    this.porte.nomPorte=this.doorForm.value.name;
    this.porte.type=this.type;

    const deptObs = this.deptsService.getDepById(Number(this.dep))
    forkJoin([deptObs]).subscribe(([depData]) => {
      this.porte.dep=depData;
      console.log(depData);

      this.doorService.createDoor(this.porte).subscribe( data =>{
        console.log(this.porte)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Door added successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.goToDoorList();
      },
      error => console.log(error));
    });

  }

  goToDoorList(){
    this.router.navigate(['/alldoors']);
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
