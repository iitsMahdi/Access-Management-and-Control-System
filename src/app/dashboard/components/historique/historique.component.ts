import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { ngxCsv } from 'ngx-csv';
import { ClientService } from 'src/app/Service/client.service';
import { Client3Service } from 'src/app/Service/client3.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { HistoriqueService } from 'src/app/Service/historique.service';
import { SharedService } from 'src/app/Service/shared.service';
import { WebSocketService } from 'src/app/Service/web-socket.service';
import { filterEV1 } from 'src/app/model/FilterEV1';
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
  savedFilter:filterEV1=new filterEV1()
  depts:any

  constructor(
    private wsClient3 : Client3Service,
    private toast:NgToastService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private histService:HistoriqueService,
    private DepService:DepartementService
    ) { }


  ngOnInit(): void {
    this.filterForm=this.formBuilder.group({
      dateDeb:['',Validators.required],
      dateFin:['',Validators.required],
      timeDeb:['',Validators.required],
      timeFin:['',Validators.required],
      etat:['',Validators.required],
      dep:['',Validators.required]
    });
    this.getDepartement()
    this.getTodayHist()

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: '',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    /*this.wsClient3.connect("websocket/client3").subscribe(
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
    );*/
    this.connectWS()
  }

  connectWS(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: '',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    //window.location.reload()
    this.wsClient3.connect("websocket/client3").subscribe(
      (message: any) => {
          const msg = {type: 'msg', data: message};
          Toast.fire({
            icon: 'info',
            title: 'New Event '+message.etat
          })
          console.log('Received message:', msg);
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

  departement:string='';
  selectChangeDep(event : any){
    this.departement=event.target.value;
  }


  getDepartement(){
    this.DepService.getDepList().subscribe((data)=>{
      this.depts=data;
      console.log(data)
    })
  }
  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				//this.closeResult = `Closed with: ${result}`;
        //console.log("form submitted")
        this.onSubmit()
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
    let monthDeb: any;
    let monthFin: any;
    let dayDeb: any;
    let dayFin: any;

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
    }else {
      if (!this.filterForm.value.dateDeb && !this.filterForm.value.dateFin) {
        this.savedFilter.dateDeb = null;
        this.savedFilter.dateFin = null;
      } else {
        monthDeb = this.filterForm.value.dateDeb?.month.toString().padStart(2, '0');
        monthFin = this.filterForm.value.dateFin?.month.toString().padStart(2, '0');
        dayDeb = this.filterForm.value.dateDeb?.day.toString().padStart(2, '0');
        dayFin = this.filterForm.value.dateFin?.day.toString().padStart(2, '0');

        const dd = this.filterForm.value.dateDeb?.year + '-' + monthDeb + '-' + dayDeb;
        const df = this.filterForm.value.dateFin?.year + '-' + monthFin + '-' + dayFin;

        this.savedFilter.dateDeb = dd;
        this.savedFilter.dateFin = df;
      }
      if (!this.filterForm.value.timeDeb && !this.filterForm.value.timeFin){
        this.savedFilter.timeDeb=null
        this.savedFilter.timeFin=null
      }else if(this.filterForm.value.timeDeb && this.filterForm.value.timeFin){
        this.savedFilter.timeDeb=this.filterForm.value.timeDeb+":00"
        this.savedFilter.timeFin=this.filterForm.value.timeFin+":00"
      }else{
        this.savedFilter.timeDeb=this.filterForm.value.timeDeb
        this.savedFilter.timeFin=this.filterForm.value.timeFin
      }
      if(!this.filterForm.value.etat){
        this.savedFilter.etat=null
      }else{
        this.savedFilter.etat=this.filterForm.value.etat
      }
      if(!this.departement){
        this.savedFilter.dep=null
      }else{
        this.savedFilter.dep=this.departement

      }
      console.log(this.savedFilter);

      this.histService.getFilterHist(this.savedFilter).subscribe((ev:any)=>{
        console.log(ev)
        this.clear();
        for (let i = 0; i < ev.length; i++) {
          const msg = {type: 'msg', data: ev[i]};
          this.messages.push(msg)
        }
      })
    }
  }

  getTodayHist(){
    this.histService.getHistToday().subscribe((evt:any)=>{
      console.log(evt)
      for (let i = 0; i < evt.length; i++) {
        const msg = {type: 'msg', data: evt[i]};
        this.messages.push(msg)
      }
    })

  }
  fileDownload(){
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'History Data',
      useBom: true,
      headers: ["History'ID", "Date", "Time", "Door","Departement","Event'ID","Etat","Cause"]
    };

    let t1:any=[]
    let t2:any=[]

    for (let index = 0; index < this.socketMessages.length; index++) {
      t1.push(this.socketMessages[index].data)
    }
    for (let index = 0; index < this.messages.length; index++) {
      t2.push(this.messages[index].data)
    }
     let mergedTableData = [...t1, ...t2];

    new ngxCsv(mergedTableData, "History", options);
  }

}
