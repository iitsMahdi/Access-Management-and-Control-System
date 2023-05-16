import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/Service/client.service';
import { Client3Service } from 'src/app/Service/client3.service';
import { HistoriqueService } from 'src/app/Service/historique.service';
import { SharedService } from 'src/app/Service/shared.service';
import { WebSocketService } from 'src/app/Service/web-socket.service';
import { FilterEV } from 'src/app/model/FilterEv';
import { Message } from 'src/app/model/message';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
  [x: string]: any;
  messages : Message[]=[]
  socketMessages : Message[]=[]
  msg:any={ "idhis": "9", "date": "05/05/2023", "idevent": "1", "time": "17:10:57","Departement":"Informatique" ,"cause":"testC","etat":"testEtat","nomporte":"Door1"}
  closeResult!:string
  filterForm !:FormGroup;
  savedFilter:FilterEV=new FilterEV()


  constructor(
    private wsClient3 : Client3Service,
    private toast:NgToastService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private histService:HistoriqueService
    ) { }


  ngOnInit(): void {
    this.filterForm=this.formBuilder.group({
      dateDeb:['',Validators.required],
      dateFin:['',Validators.required],
      timeDeb:['',Validators.required],
      timeFin:['',Validators.required],
      typeEV:['',Validators.required]
    });

    //this.getTodayEvent()

    this.wsClient3.connect("websocket/client3").subscribe(
      (message: any) => {
          const msg = {type: 'msg', data: message};
          console.log('Received message:', msg);
          this.toast.warning({detail:"New Event",summary:msg.data.etatevt,duration:1500})
          this.socketMessages.push(msg);
          //this.shared.setVariable(msg);
      },
      (error:any) => {
        console.error('WebSocket error:', error);
      }
    );
  }
  public sendMessage(): void {
    this.wsClient3.sendMessage(this.msg);
  }

  stopWebSocket(): void {
    this.wsClient3.close()
  }
  clear() {
    this.messages.splice(0, this.messages.length);
    this.socketMessages.splice(0, this.socketMessages.length);
  }
  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				//this.closeResult = `Closed with: ${result}`;
        console.log("form submitted")
        //this.onSubmit()
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("form failed")

			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  onSubmit(){
    if((this.filterForm.value.dateDeb && !this.filterForm.value.dateFin ) ||(!this.filterForm.value.dateDeb && this.filterForm.value.dateFin ) ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You Should select the two Dates!'
      })
    }else if((this.filterForm.value.timeDeb && !this.filterForm.value.timeFin ) ||(!this.filterForm.value.timeDeb && this.filterForm.value.timeFin ) ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You Should select the two Times!'
      })
    }else{
      if(!this.filterForm.value.dateFin && !this.filterForm.value.dateFin){
        this.savedFilter.dateDeb=""
        this.savedFilter.dateFin=""
      }else{
        let dd=this.filterForm.value.dateDeb.year+"-"+this.filterForm.value.dateDeb.month+"-"+this.filterForm.value.dateDeb.day
        let df=this.filterForm.value.dateFin.year+"-"+this.filterForm.value.dateFin.month+"-"+this.filterForm.value.dateFin.day
        this.savedFilter.dateDeb=dd
        this.savedFilter.dateFin=df
      }
      if(this.filterForm.value.timeDeb && this.filterForm.value.timeFin){
        this.savedFilter.timeDeb=this.filterForm.value.timeDeb+":00"
        this.savedFilter.timeFin=this.filterForm.value.timeFin+":00"
      }else{
        this.savedFilter.timeDeb=this.filterForm.value.timeDeb
        this.savedFilter.timeFin=this.filterForm.value.timeFin
      }
      this.savedFilter.typeEv=this.filterForm.value.typeEV
      console.log(this.savedFilter);
/*
      this.histService.getFilterHist(this.savedFilter).subscribe((ev:any)=>{
        console.log(ev)
        this.clear();
        for (let i = 0; i < ev.length; i++) {
          const msg = {type: 'msg', data: ev[i]};
          this.messages.push(msg)
        }
      })*/
    }
  }

  getTodayEvent(){
    this.histService.getHistToday().subscribe((evt:any)=>{
      console.log(evt)
      for (let i = 0; i < evt.length; i++) {
        const msg = {type: 'msg', data: evt[i]};
        this.messages.push(msg)
      }
    })

  }


}
