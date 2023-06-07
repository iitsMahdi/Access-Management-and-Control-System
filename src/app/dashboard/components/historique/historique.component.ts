import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { EventService } from 'src/app/Service/event.service';
import { UserService } from 'src/app/Service/user.service';


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
  content !:Message;
  pdfContent : Message[]=[]
zeb !:string
  constructor(
    private wsClient3 : Client3Service,
    private toast:NgToastService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private histService:HistoriqueService,
    private DepService:DepartementService,
    private router: Router,
    private evntService : EventService
    ,private userserv:UserService

    ) { }


  ngOnInit(): void {
    this.filterForm=this.formBuilder.group({
      dateDeb:['',Validators.required],
      dateFin:['',Validators.required],
      timeDeb:['',Validators.required],
      timeFin:['',Validators.required],
      etat:['',Validators.required],
      dep:['',Validators.required],
      CIN:['',Validators.required]
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
      if(!this.filterForm.value.CIN){
        this.savedFilter.cin=null
      }else{
        this.savedFilter.cin=this.filterForm.value.CIN
      }
      console.log(this.savedFilter);

      this.histService.getFilterHist(this.savedFilter).subscribe((ev:any)=>{
        console.log(ev)
        this.clear();
        this.messages.splice(0, this.messages.length);
        for (let i = 0; i < ev.length; i++) {
          const msg = {type: 'msg', data: ev[i]};
          this.messages.push(msg)
        }
        this.generatePDFContent()
      })
    }
  }
/*
  generatePDFContent() {
    for (let index = 0; index < this.messages.length; index++) {
      const hist = this.messages[index];
      console.warn(hist)
      this.content=hist
      this.evntService.getEventEtat(hist.data.idEvent).subscribe(
        (data: string) => {
          this.content.data.idEvent=data;
          this.pdfContent.push(this.content);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
*/

generatePDFContent() {
  const requests = this.messages.map((hist) => {
    return new Promise((resolve, reject) => {
      this.evntService.getEventEtat(hist.data.idEvent).subscribe(
        (data: string) => {
          const modifiedContent = { ...hist }; // Create a copy of hist to avoid overwriting
          modifiedContent.data = { ...hist.data }; // Create a copy of data to avoid modifying the original object
          modifiedContent.data.idEvent = data;
          resolve(modifiedContent);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  });

  Promise.all(requests)
  .then((pdfContent) => {
    this.pdfContent = pdfContent as Message[];
  })
  .catch((error) => {
    console.error(error);
  });
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

  account(id:any){
    console.warn(id)
    this.router.navigate(['/account', id]);
  }
  startWs(){
    window.location.reload()
  }

  downloadPDF() {
    const hist = this.messages[0].data;
    const doc = new jsPDF();

    // Retrieve user data
    const getUserData = new Promise((resolve, reject) => {
      this.userserv.getUserById(hist.usr.id).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });

    // Generate PDF after user data is retrieved
    getUserData
      .then((userData: any) => {
        // Add content
        const content = 'User: ' + userData.firstname + ' ' + userData.lastname +
          '\nCIN: ' + userData.cin +
          '\nProfile: ' + userData.prof.nomProfile+
          "\nFiltred from : "+ this.savedFilter.dateDeb+ "\n              to : "+this.savedFilter.dateFin;
        doc.setFontSize(12);
        doc.text(content, 10, 20);

        // Add title
        const title = 'Time Attendance Report';
        const titleWidth = doc.getTextWidth(title);
        const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
        const titleY = 40;
        doc.setFontSize(18);
        doc.text(title, titleX, titleY);

        // Add image
        const imageSrc = '../../../assets/easy.png';
        const imageWidth = 30; // Adjust the width of the image as needed
        const imageHeight = 30; // Adjust the height of the image as needed
        const imageX = doc.internal.pageSize.getWidth() - imageWidth - 10; // Position from the right edge
        const imageY = 10; // Position from the top edge
        doc.addImage(imageSrc, 'PNG', imageX, imageY, imageWidth, imageHeight);

        // Add table
        (doc as any).autoTable({ html: '#pdf', theme: 'grid', startY: titleY + 20 });

        // Save the PDF
        doc.save('time_attendance_report.pdf');
      })
      .catch((error) => {
        console.error(error);
      });
  }








}

