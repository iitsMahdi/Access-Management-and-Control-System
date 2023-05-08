import { WebSocketService } from 'src/app/Service/web-socket.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message';
import { NgToastService } from 'ng-angular-popup';
import { SharedService } from 'src/app/Service/shared.service';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements  OnInit{
  messages : Message[]=[]
  msg:Message={type:"msg",data:{etatevt:"Entry_open",dateevnt:"05/05/2023",idevent:"1",idporte:"5"}}

  constructor(
    private websocketService: WebSocketService,
    private toast:NgToastService,
    private shared : SharedService
  ) { }


  ngOnInit(): void {
    this.messages=this.shared.getVariable()
    this.websocketService.connect().subscribe(
      (message: any) => {
        console.log('Received message:', message);
        this.toast.warning({detail:"New Event",summary:message.data.etatevt,duration:500})
        this.messages.push(message);
        this.shared.setVariable(message);
      },
      (error:any) => {
        console.error('WebSocket error:', error);
      }
    );
  }

  public sendMessage(): void {
    this.websocketService.sendMessage(this.msg);
  }

  fileDownload(){}
}





