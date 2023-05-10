import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ControllerService } from 'src/app/Service/controller.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { Contoller } from 'src/app/model/Controller';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-controller',
  templateUrl: './update-controller.component.html',
  styleUrls: ['./update-controller.component.css']
})
export class UpdateControllerComponent implements OnInit {
  contForm !:FormGroup;
  depts:any
  id!:number;
  cont:Contoller = new Contoller()

    constructor(
    private router: Router,
    private DepService : DepartementService,
    private contService : ControllerService,
    private formBuilder: FormBuilder,
    private http : HttpClient,private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.contForm=this.formBuilder.group({
      name:['',Validators.required],
      status:['',Validators.required],
      dep:['',Validators.required],
    });

    this.id = this.route.snapshot.params['id'];
    this.contService.getContById(this.id).subscribe((data)=>{
        this.cont=data;
        console.log("cont")
        console.log(data)
        this.contForm.controls["name"].setValue(data.nomCont)
        this.contForm.controls["status"].setValue(data.status)

      },
        error => console.log(error)
    );

    this.getDepartements()
  }

  departement:string='';
  selectChangeDep(event : any){
    this.departement=event.target.value;
  }

  getDepartements(){
    this.DepService.getDepList().subscribe((data)=>{
      this.depts=data;
      console.log(data)

    })
  }

  goToDeviceList(){
    this.router.navigate(['/alldevices']);
  }

  UpdateCont(){
    this.cont.nomCont=this.contForm.value.name;
    this.cont.status=this.contForm.value.status;
    const deptObs = this.DepService.getDepById(Number(this.departement))
    forkJoin([deptObs]).subscribe(([deptData]) => {
      this.cont.dept=deptData;
      console.log(deptData);

      this.contService.updateCont(this.id,this.cont).subscribe( data =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Controller added successfully',
          showConfirmButton: false,
          timer: 1500
        });

        console.log(data);
        this.goToDeviceList();
      },
      error => console.log(error));
    });
  }


  onSubmit(){
    this.UpdateCont()
  }
}
