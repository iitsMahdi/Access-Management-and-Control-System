import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ControllerService } from 'src/app/Service/controller.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { DoorService } from 'src/app/Service/door.service';
import { WaveshareService } from 'src/app/Service/waveshare.service';
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
  contss:any
  constructor(
    private contService : ControllerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private doorService : DoorService,
    private wavesService : WaveshareService
    ) {}

  porte: Porte = new Porte();

  ngOnInit(): void {
    this.doorForm=this.formBuilder.group({
      name:['',Validators.required],
      type:['',Validators.required],
      Controller:['',Validators.required],
      number:['',Validators.required],
      Wave:['',Validators.required]
    });
    //this.getDepts()
    this.getConts()
    this.getWaves()
  }

  getConts(){
    this.contService.getContList().subscribe((data)=>{
      this.contss=data;
      console.log(data)
    })
  }
  waves:any
  getWaves(){
    this.wavesService.getWaveList().subscribe((data)=>{
      this.waves=data;
      console.log(data)
    })
  }

  cont:string='';
  selectChangeCont(event : any){
    this.cont=event.target.value;
  }

  wv:string='';
  selectChangeWave(event : any){
    this.wv=event.target.value;
  }

  type:string='';
  selectChangeType(event : any){
    this.type=event.target.value;
  }

  saveDoor():void{
    this.porte.nomPorte=this.doorForm.value.name;
    this.porte.type=this.type;
    this.porte.numPorte=this.doorForm.value.number;
    const contObs = this.contService.getContById(Number(this.cont))
    const waveObs = this.wavesService.getWaveById(this.wv)

    forkJoin([contObs,waveObs]).subscribe(([contData,waveData]) => {
      this.porte.cntrl=contData;
      this.porte.wsh=waveData
      console.log(waveData)
      if (!waveData.prt){
      this.doorService.createDoor(this.porte).subscribe( data =>{
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
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Choose another Waveshare!'
      })
    }
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
