import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/model/Profile';
import { DialgAddProfileComponent } from '../addForm/dialg-add-profile/dialg-add-profile.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {

  constructor(private router: Router,private matDialog : MatDialog){}
  profiles:Profile[]=[
    {id_profile:1,nom_profile:"Ingénieur"},
    {id_profile:2,nom_profile:"Technicien"},
  ];
  openDialog(){
    this.matDialog.open(DialgAddProfileComponent,{
      width:'350px',
    })
  }
}
