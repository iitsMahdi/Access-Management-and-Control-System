import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { forkJoin } from 'rxjs';
import { ClientService } from 'src/app/Service/client.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { DoorService } from 'src/app/Service/door.service';
import { ProfileService } from 'src/app/Service/profile.service';
import { SharedService } from 'src/app/Service/shared.service';
import { UserService } from 'src/app/Service/user.service';
import { WebSocketService } from 'src/app/Service/web-socket.service';
import { User } from 'src/app/model/User';
import { Message } from 'src/app/model/message';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent {
  messages : Message[]=[]

  constructor(
    private websocketService: WebSocketService,
    private toast:NgToastService,
    private shared : SharedService,
    private clientServ:ClientService
  ) { }


  ngOnInit(): void {

    //this.messages=this.shared.getVariable()
    this.clientServ.connect("websocket/client1").subscribe(
      (message: any) => {
          const msg = {type: 'msg', data: message};
          console.log('Received message:', msg);
          this.toast.warning({detail:"New Event",summary:msg.data.etatevt,duration:1500})
          this.messages.push(msg);
          //this.shared.setVariable(msg);
      },
      (error:any) => {
        console.error('WebSocket error:', error);
      }
    );

  }

  fileDownload(){}

}
