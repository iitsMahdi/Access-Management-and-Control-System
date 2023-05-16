import { WebSocketService } from 'src/app/Service/web-socket.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message';
import { NgToastService } from 'ng-angular-popup';
import { SharedService } from 'src/app/Service/shared.service';
import { ClientService } from 'src/app/Service/client.service';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements  OnInit{
  messages : Message[]=[]
  msg:any={ "etatevt": "Entry_open", "dateevnt": "05/05/2023", "idevent": "1", "idporte": "5" }

  constructor(
    private websocketService: WebSocketService,
    private toast:NgToastService,
    private shared : SharedService,
    private clientServ:ClientService
  ) { }


  ngOnInit(): void {

    this.websocketService.connect("websocket").subscribe(
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

  public sendMessage(): void {
    this.websocketService.sendMessage(this.msg);
  }

  stopWebSocket(): void {
    this.websocketService.close()
  }
  clear(){
    for (let index = 0; index < this.messages.length; index++) {
      delete this.messages[index]

    }
  }
  fileDownload(){}
}





