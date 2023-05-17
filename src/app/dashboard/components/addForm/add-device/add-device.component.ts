import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControllerService } from 'src/app/Service/controller.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { DoorService } from 'src/app/Service/door.service';
import { ReaderService } from 'src/app/Service/reader.service';
import { Contoller } from 'src/app/model/Controller';
import { Departement } from 'src/app/model/Departement';
import { Porte } from 'src/app/model/Porte';
import { Reader } from 'src/app/model/Reader';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { Waveshare } from 'src/app/model/Waveshare';
import { WaveshareService } from 'src/app/Service/waveshare.service';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  depts:any
  doors:any
  readerForm !:FormGroup;
  contForm !:FormGroup;
  waveForm!:FormGroup;
  savedCont: Contoller = new Contoller();
  savedReader: Reader = new Reader();
  sevedWaveShare: Waveshare = new Waveshare();
  savedDoor:Porte = new Porte();
  savedDepartement!:Departement;


  constructor(
    private router: Router,
    private DepService : DepartementService,
    private doorService : DoorService,
    private contService : ControllerService,
    private readerService : ReaderService,
    private waveService:WaveshareService,
    private formBuilder: FormBuilder,
    private http : HttpClient
  ){}
  ngOnInit(): void {
    this.readerForm=this.formBuilder.group({
      ip:['',Validators.required],
      door:['',Validators.required],
      status:['',Validators.required],

    });
    this.contForm=this.formBuilder.group({
      name:['',Validators.required],
      status:['',Validators.required],
      dep:['',Validators.required],
      Adresse:['',Validators.required],
      sn:['',Validators.required],

    });
    this.waveForm=this.formBuilder.group({
      nameWave:['',Validators.required],
      status:['',Validators.required],
      adr:['',Validators.required],
    });

    this.getDepartement()
    this.getDoors()
  }

  dev:string='Reader';
  selectChange(event : any){
    this.dev=event.target.value;
  }

  getDepartement(){
    this.DepService.getDepList().subscribe((data)=>{
      this.depts=data;
      console.log(data)
    })
  }
  getDoors(){
    this.doorService.getDoorsList().subscribe((data)=>{
      this.doors=data;
      console.log(data)

    })
  }



  departement:string='';
  selectChangeDep(event : any){
    this.departement=event.target.value;
  }

  doorS:string='';
  selectChangeDoor(event : any){
    this.doorS=event.target.value;
  }
  goToDeviceList(){
    this.router.navigate(['/alldevices']);
  }
  saveController():void{
    this.savedCont.nomCont=this.contForm.value.name;
    this.savedCont.status=this.contForm.value.status;
    this.savedCont.ipAdresse=this.contForm.value.Adresse;
    this.savedCont.serial_Number=this.contForm.value.sn;

    const deptObs = this.DepService.getDepById(Number(this.departement))
    forkJoin([deptObs]).subscribe(([deptData]) => {
      this.savedCont.dept=deptData;
      console.log(deptData);
      this.contService.createCont(this.savedCont).subscribe( data =>{
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

    /*this.http.get<Departement>("http://127.0.0.1:8080/Departement/get/"+this.departement).subscribe(
    //this.DepService.getDepById(Number(this.departement)).subscribe(
      (data)=>
      {
        console.log(data)
        this.savedCont.dept=data;
      })
    console.log(this.savedCont)
    this.contService.createCont(this.savedCont).subscribe( data =>{

      console.log('added !!')
      this.goToDeviceList();
    },
    error => console.log(error));*/
  }
  saveReader():void{
    this.savedReader.ipAdresse=this.readerForm.value.ip;
    this.savedReader.etatLecteur=this.readerForm.value.status
    const doorObs = this.doorService.getDoorById(Number(this.doorS))
    forkJoin([doorObs]).subscribe(([doorData]) => {
      this.savedReader.prt=doorData;
      console.log(doorData);

      this.readerService.createReader(this.savedReader).subscribe( data =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Reader added successfully',
          showConfirmButton: false,
          timer: 1500
        });

        console.log(data);
        this.goToDeviceList();
      },
      error => console.log(error));
    });

  }
  saveWave(){
    this.sevedWaveShare.nameDevice=this.waveForm.value.nameWave;
    this.sevedWaveShare.adresse=this.waveForm.value.adr;
    this.sevedWaveShare.status=this.waveForm.value.status;
    this.waveService.createWave(this.sevedWaveShare).subscribe( (data) =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Reader added successfully',
        showConfirmButton: false,
        timer: 1500
      });

      console.log(this.sevedWaveShare);
      this.goToDeviceList();
    },
    error => console.log(error));
  }

  onSubmit(){
    if (this.dev == "Controller"){
      this.saveController();
    }else if (this.dev == "Reader"){
      this.saveReader();
    }else if (this.dev=="Waveshare"){
      this.saveWave()
    }

  }









}
