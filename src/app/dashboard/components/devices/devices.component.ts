import { Component } from '@angular/core';
import { DialgAddProfileComponent } from '../addForm/dialg-add-profile/dialg-add-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Contoller } from 'src/app/model/Conroller';
import { Reader } from 'src/app/model/Reader';
import { Router } from '@angular/router';
import { Departement } from 'src/app/model/Departement';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {

  constructor(
    private router: Router) { }
controllers:Contoller[]=[
  {id_cont:0n,nom_controlleur:"Select departement",status:"Connected",dept:new Departement()},
  {id_cont:1n,nom_controlleur:"C1",status:"Connected",dept:new Departement()},
  {id_cont:2n,nom_controlleur:"C2",status:"Connected",dept:new Departement()}
];

readers:Reader[]=[
  {id_lecteur:0n,ip_adresse:"192.168.0.1"},
  {id_lecteur:1n,ip_adresse:"192.168.0.1"},
  {id_lecteur:2n,ip_adresse:"192.168.0.1"},
]

dev:string='';
selectChange(event : any){
  this.dev=event.target.value;
}
addData() {
  this.router.navigate(['/addDevice']);
}
MenageProfile(){
this.router.navigate(['/']);

}



updateDoor(id: bigint){
  this.router.navigate(['updateDoor', id]);
}

deleteDoor(id: bigint){

  }


fileDownload(){


}


}
