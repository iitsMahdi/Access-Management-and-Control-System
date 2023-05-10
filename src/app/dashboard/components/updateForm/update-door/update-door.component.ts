import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ControllerService } from 'src/app/Service/controller.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { DoorService } from 'src/app/Service/door.service';
import { Contoller } from 'src/app/model/Controller';
import { Departement } from 'src/app/model/Departement';
import { Porte } from 'src/app/model/Porte';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-door',
  templateUrl: './update-door.component.html',
  styleUrls: ['./update-door.component.css']
})
export class UpdateDoorComponent implements OnInit{

  file!:File;
  doorForm !:FormGroup;
  cardNumber!: string;
  id!: number;
  deptss:any

  controllers:any

  constructor(
    private contService:ControllerService,
    private deptsService : DepartementService,
    private router: Router,
    private formBuilder: FormBuilder,
    private doorService : DoorService,
    private route: ActivatedRoute) {}

  porte: Porte = new Porte();
  prt :any
  ngOnInit(): void {
    this.doorForm=this.formBuilder.group({
      name:['',Validators.required],
      type:['',Validators.required],
      Departement:['',Validators.required]
    });
    this.getDepts()

    this.id = this.route.snapshot.params['id'];
    this.doorService.getDoorById(this.id).subscribe(data => {
      //this.porte = data;
      console.log(data)
      this.doorForm.controls["name"].setValue(data.nomPorte)
      this.doorForm.controls["type"].setValue(data.type)
    }, error => console.log(error));



  }
  getControllers(){
    this.contService.getContList().subscribe((data)=>{
      this.controllers=data;
      console.log(data)
    })
  }

  dep:string='';
  selectChangeCont(event : any){
    this.dep=event.target.value;
  }
  goToDoorList(){
    this.router.navigate(['/alldoors']);
  }
  type:string='';

  selectChangeType(event : any){
    this.type=event.target.value;
  }
  getDepts(){
    this.deptsService.getDepList().subscribe((data)=>{
      this.deptss=data;
      console.log(data)
    })
  }
  onSubmit(){
    this.porte.nomPorte=this.doorForm.value.name;
    this.porte.type=this.doorForm.value.type;


    const deptObs = this.deptsService.getDepById(Number(this.dep))
    forkJoin([deptObs]).subscribe(([depData]) => {
      this.porte.dep=depData;
      console.log(depData);

      this.doorService.updateDoor(this.id, this.porte).subscribe(data =>{
        console.log(this.porte)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Door updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.goToDoorList();
      },
      error => console.log(error));
    });
  }


}
