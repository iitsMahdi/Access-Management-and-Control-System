import { Component } from '@angular/core';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent {


  dev:string='';
  selectChange(event : any){
    this.dev=event.target.value;
  }
}
