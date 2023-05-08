import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/model/Profile';
import { DialgAddProfileComponent } from '../addForm/dialg-add-profile/dialg-add-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/Service/profile.service';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  profiles:any;

  constructor(private router: Router,private matDialog : MatDialog,private profileService: ProfileService ){}
  ngOnInit(): void {
    this.getProfiles()
  }

  openDialog(){
    this.matDialog.open(DialgAddProfileComponent,{
      width:'350px',
    })
  }

  getProfiles(){
    this.profileService.getProfilesList().subscribe(
      (data)=>{
        console.log(data)
        this.profiles=data
      }
      )
  }
}
