import { Component, OnInit } from '@angular/core';
import { DialgAddProfileComponent } from '../addForm/dialg-add-profile/dialg-add-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Contoller } from 'src/app/model/Controller';
import { Reader } from 'src/app/model/Reader';
import { Router } from '@angular/router';
import { Departement } from 'src/app/model/Departement';
import { ReaderService } from 'src/app/Service/reader.service';
import { ControllerService } from 'src/app/Service/controller.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { DoorService } from 'src/app/Service/door.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { WaveshareService } from 'src/app/Service/waveshare.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Porte } from 'src/app/model/Porte';
import { Waveshare } from 'src/app/model/Waveshare';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  controllers:any
  readers:any
  roless = this.userAuthService.getRoles()
  waves:any[]=[]


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
    private controllerService :ControllerService,
    private readerService : ReaderService,
    private userAuthService : UserAuthService,
    private waveService:WaveshareService,
    private modalService: NgbModal,
    private DepService : DepartementService,
    private doorService : DoorService,
    private contService : ControllerService,
    private formBuilder: FormBuilder,

    ) { }
  ngOnInit(): void {
    this.readerForm=this.formBuilder.group({
      ip:['',[Validators.required, this.ipAddressValidator()]],
      door:['',Validators.required],
      status:['',Validators.required],

    });
    this.contForm=this.formBuilder.group({
      name:['',Validators.required],
      status:['',Validators.required],
      dep:['',Validators.required],
      Adresse:['',[Validators.required, this.ipAddressValidator()]],
      sn:['',Validators.required],

    });
    this.waveForm=this.formBuilder.group({
      nameWave:['',Validators.required],
      status:['',Validators.required],
      adr:['',Validators.required],
    });

    this.getDepartement()
    this.getDoors()
    this.getController();
    this.getReaders();
    this.getWaveshares()
  }

  ipAddressValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const ipAddressPattern = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const ipAddress = control.value;

      if (!ipAddressPattern.test(ipAddress)) {
        return { invalidIpAddress: true };
      }

      return null;
    };
  }


dev:string='Reader';
selectChange(event : any){
  this.dev=event.target.value;
}

stat:string='';
selectChangeStat(event : any){
  this.stat=event.target.value;
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

addData() {
  this.router.navigate(['/addDevice']);
}
MenageProfile(){
this.router.navigate(['/']);
}


fileDownload(){
}

getReaders(){
  this.readerService.getReaderList().subscribe((data)=>{
    this.readers=data;
    console.log(data)
  })
}

getController(){
  this.controllerService.getContList().subscribe((data)=>{
    this.controllers=data;
    console.log(data)

  })
}

getWaveshares(){
  this.waveService.getWaveList().subscribe((data)=>{
    let i=0
    while (data.length !=0) {
      if(data[i].prt){
        this.waves.push(data[i])
      }
      i++
    }
    console.log(this.waves)
  })
}


updateCont(id: bigint){
  let role=this.userAuthService.getRoles();
  if (role.includes("user")){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You don't have access to do that"
    })
  }else{
    this.router.navigate(['updateCont', id]);
  }
}
updateRea(id: bigint){
  let role=this.userAuthService.getRoles();
  if (role.includes("user")){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You don't have access to do that"
    })
  }else{
    this.router.navigate(['updateRea', id]);
  }
}

updateWave(id:bigint){
  let role=this.userAuthService.getRoles();
  if (role.includes("user")){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You don't have access to do that"
    })
  }else{
    this.router.navigate(['updateWave', id]);
  }
}
deleteCont(id: bigint){
  let role=this.userAuthService.getRoles();
  if (role.includes("user")){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You don't have access to do that"
    })
  }else{

  Swal.fire({
    title: 'Are you sure?',
    text: "Would you like to delete it!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result:any) => {
    if (result.isConfirmed) {
  this.controllerService.deleteCont(id,this.roless).subscribe(()=>{
    console.log('deleted')
    Swal.fire(
      'Deleted!',
      'Controller '+id+' has been deleted.',
      'success'
    )
    window.location.reload();
  },
  (error:any) => {
    console.error('WebSocket error:', error);
  }
  )
}

})
  }
}
deleteRea(id: bigint){
  let role=this.userAuthService.getRoles();
  if (role.includes("user")){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You don't have access to do that"
    })
  }else{

  Swal.fire({
    title: 'Are you sure?',
    text: "Would you like to delete it!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result:any) => {
    if (result.isConfirmed) {
  this.readerService.deleteReader(id,this.roless).subscribe(()=>{
    console.log('deleted')
    Swal.fire(
      'Deleted!',
      'Reader '+id+' has been deleted.',
      'success'
    )
    window.location.reload();
  },
  (error:any) => {
    console.error('WebSocket error:', error);
  }
  )
}

})
  }
}


deleteWave(id: bigint){
  let role=this.userAuthService.getRoles();
  if (role.includes("user")){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You don't have access to do that"
    })
  }else{
    Swal.fire({
      title: 'Are you sure?',
      text: "Would you like to delete it!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.waveService.deleteWave(id,this.roless).subscribe(()=>{
          Swal.fire(
            'Deleted!',
            'Waveshare '+id+' has been deleted.',
            'success'
          )
          window.location.reload();
        },
        (error:any) => {
          console.error('WebSocket error:', error);
        }
        )
    }

    })
  }
}

BefOpen(cont:any){
  let role=this.userAuthService.getRoles();
  if (role.includes("user")){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You don't have access to do that"
    })
  }else{
    this.open(cont)
  }
}

open(content:any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      //this.closeResult = `Closed with: ${result}`;
      this.onSubmit()
    },
    (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("form failed")

    },
  );
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
  this.savedCont.status=this.stat;
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
}
saveReader():void{
  this.savedReader.ipAdresse=this.readerForm.value.ip;
  this.savedReader.etatLecteur=this.stat;
  const doorObs = this.doorService.getDoorById(Number(this.doorS))
  forkJoin([doorObs]).subscribe(([doorData]) => {
    this.savedReader.prt=doorData;
    console.log(doorData);
    const objectCount = Object.keys(doorData.lecteur).length;
    if(objectCount<2){
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
        window.location.reload()
      },
      error => console.log(error));
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Door have already 2 Reader !!"
      })
    }
    });

}
saveWave(){
  this.sevedWaveShare.nameDevice=this.waveForm.value.nameWave;
  this.sevedWaveShare.adresse=this.waveForm.value.adr;
  this.sevedWaveShare.status=this.stat;
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
