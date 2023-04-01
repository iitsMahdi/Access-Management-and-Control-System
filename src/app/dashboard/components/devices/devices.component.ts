import { Component } from '@angular/core';
import { DialgAddProfileComponent } from '../addForm/dialg-add-profile/dialg-add-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {

constructor(private matDialog : MatDialog){}

  openDialog(){
    this.matDialog.open(DialgAddProfileComponent,{
      width:'350px',
    })
  }
}
