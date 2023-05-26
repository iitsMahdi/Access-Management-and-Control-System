import { WebSocketService } from 'src/app/Service/web-socket.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message';
import { NgToastService } from 'ng-angular-popup';
import { SharedService } from 'src/app/Service/shared.service';
import { ClientService } from 'src/app/Service/client.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterEV } from 'src/app/model/FilterEv';
import { EventService } from 'src/app/Service/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements  OnInit{
  [x: string]: any;
  messages : Message[]=[]
  socketMessages : Message[]=[]
  msg:any={ "etatevt": "Stayed_On", "dateevnt": "05/05/2023", "idevent": "1", "idporte": "5","departement":"Informatique" ,"timeevnt":"10:12:09","prt":"Porte_I1"}
  closeResult!:string
  filterForm !:FormGroup;
  savedFilter:FilterEV=new FilterEV()
  i: number = 0;
  Evt:any[]=["Intrusion_Alarm","Stayed_On","Tailing_Alarm","Reverse_Alarm"]

  constructor(
    private websocketService: WebSocketService,
    private toast:NgToastService,
    private shared : SharedService,
    private clientServ:ClientService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private eventService:EventService,

    ) { }


  ngOnInit(): void {
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
    this.filterForm=this.formBuilder.group({
      dateDeb:['',Validators.required],
      dateFin:['',Validators.required],
      timeDeb:['',Validators.required],
      timeFin:['',Validators.required],
      typeEV:['',Validators.required]
    });

    this.getTodayEvent();
    this.websocketService.connect("websocket/client1").subscribe(
      (message: any) => {
          const msg = {type: 'msg', data: message};
          console.log('Received message:', msg);
          Toast.fire({
            icon: 'info',
            title: 'New Event '+message.etatevt
          })

          //this.toast.warning({detail:"New Event",summary:message.etatevt,duration:1500})
          this.socketMessages.unshift(msg);
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

  evFilter:string='';
  selectChangeEv(event : any){
    this.evFilter=event.target.value;
  }

  stopWebSocket(): void {
    this.websocketService.close()
  }
  clear() {
    this.messages.splice(0, this.messages.length);
    this.socketMessages.splice(0, this.socketMessages.length);
  }
  fileDownload(){}

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				//this.closeResult = `Closed with: ${result}`;
        this.onSubmit()
        this.filterForm.reset()
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("form failed")
        this.filterForm.reset()

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
  onSubmit() {
    let monthDeb: any;
    let monthFin: any;
    let dayDeb: any;
    let dayFin: any;

    if ((!this.filterForm.value.dateDeb && this.filterForm.value.dateFin) || (this.filterForm.value.dateDeb && !this.filterForm.value.dateFin)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You should select both dates!'
      });
    } else if ((!this.filterForm.value.timeDeb && this.filterForm.value.timeFin) || (this.filterForm.value.timeDeb && !this.filterForm.value.timeFin)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You should select both times!'
      });
    } else {
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
    }

    if (!this.filterForm.value.timeDeb && !this.filterForm.value.timeFin) {
      this.savedFilter.timeDeb = null;
      this.savedFilter.timeFin = null;
    } else if (this.filterForm.value.timeDeb && this.filterForm.value.timeFin) {
      this.savedFilter.timeDeb = this.filterForm.value.timeDeb + ':00';
      this.savedFilter.timeFin = this.filterForm.value.timeFin + ':00';
    } else {
      this.savedFilter.timeDeb = this.filterForm.value.timeDeb;
      this.savedFilter.timeFin = this.filterForm.value.timeFin;
    }

    if (!this.evFilter) {
      this.savedFilter.typeEv = null;
    } else {
      this.savedFilter.typeEv = this.evFilter;
    }

    console.log(this.savedFilter);
    this.eventService.getFilterEV(this.savedFilter).subscribe((ev: any) => {
      console.log(ev);
      this.clear();
      for (let i = 0; i < ev.length; i++) {
        const msg = { type: 'msg', data: ev[i] };
        this.messages.push(msg);
      }
    });
  }

  getTodayEvent(){
    this.eventService.getAttEventToday().subscribe((evt:any)=>{
      console.log(evt)
      for (let i = 0; i < evt.length; i++) {
        const msg = {type: 'msg', data: evt[i]};
        this.messages.push(msg)
      }
      this.messages.reverse()
    })

  }
}





