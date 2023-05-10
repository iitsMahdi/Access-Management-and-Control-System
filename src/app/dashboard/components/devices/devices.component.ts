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

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  controllers:any
  readers:any
  roless = this.userAuthService.getRoles()
  waves:any

  constructor(
    private router: Router,
    private controllerService :ControllerService,
    private readerService : ReaderService,
    private userAuthService : UserAuthService,
    private waveService:WaveshareService
    ) { }
  ngOnInit(): void {
    this.getController();
    this.getReaders();
    this.getWaveshares()
  }


dev:string='Reader';
selectChange(event : any){
  this.dev=event.target.value;
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
    this.waves=data
    console.log(data)
  })
}


updateCont(id: bigint){
  this.router.navigate(['updateCont', id]);
}
updateRea(id: bigint){
  this.router.navigate(['updateRea', id]);
}

updateWave(id:bigint){
  this.router.navigate(['updateWave', id]);
}
deleteCont(id: bigint){
  this.controllerService.deleteCont(id,this.roless).subscribe(()=>{
    console.log('deleted')
   // window.location.reload();

  }
  )
}
deleteRea(id: bigint){
  this.readerService.deleteReader(id,this.roless).subscribe(()=>{
    console.log('deleted')
    window.location.reload();

  }
  )
}
deleteWave(id: bigint){
  this.waveService.deleteWave(id,this.roless).subscribe(()=>{
    console.log('deleted')
    window.location.reload();
  }
  )
}
}
