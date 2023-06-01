import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Message } from 'src/app/model/message';
import { NgToastService } from 'ng-angular-popup';
import { WebSocketService } from 'src/app/Service/web-socket.service';
import { SharedService } from 'src/app/Service/shared.service';
import { EventService } from 'src/app/Service/event.service';
import { ClientService } from 'src/app/Service/client.service';
import { Subject, forkJoin } from 'rxjs';
import { HistoriqueService } from 'src/app/Service/historique.service';
import { ClientAccService } from 'src/app/Service/client-acc.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { Client3Service } from 'src/app/Service/client3.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DeviceService } from 'src/app/Service/device.service';
import { Client2Service } from 'src/app/Service/client2.service';
import { UserService } from 'src/app/Service/user.service';
import { DoorService } from 'src/app/Service/door.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: Number[] = []
  dataI: Number[] = []
  public chart: any;
  public pieChart: any;
  pie: any
  lineChart: any;
  chart2: any
  messages: Message[] = []
  message$ = new Subject<Message[]>();
  nUser:any
  nDoor:any
  nDep:any
  nEv:any

  alarmes: any
  hist: any
  accUsers: any[] = []
  dates: any[] = []
  denUsers: any[] = []
  depts: any[] = []
  denByDep: any[] = []
  chDM!: FormGroup;
  idDep: any[] = []
  nb: any[] = []
  dd: any[] = []
  m:any
  j:any
  nbDis:number=0
  constructor(
    private websocketService: WebSocketService,
    private clientServ: ClientService,
    private shared: SharedService,
    private toast: NgToastService,
    private enventService: EventService,
    private histService: HistoriqueService,
    private clientAcc: ClientAccService,
    private depService: DepartementService,
    private wsClient3: Client3Service,
    private formBuilder: FormBuilder,
    private deviceService : DeviceService,
    private wsClient2: Client2Service,
    private userService:UserService,
    private doorService : DoorService
  ) {
  }
  async ngOnInit() {
    this.chDM = this.formBuilder.group({
      nom_dep: ['', Validators.required],
      month: ['', Validators.required]
    });

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

    this.userService.count().subscribe((data:number)=>{
      this.nUser=data
    })
    this.doorService.count().subscribe((data:number)=>{
      this.nDoor=data
    })
    this.depService.count().subscribe((data:number)=>{
      this.nDep=data
    })
    this.enventService.countE().subscribe((data:number)=>{
      this.nEv=data
    })


    /*************************************************************************************************************************/
    //Init of Pie chart
    try {
      const counts = await Promise.all([
        this.enventService.count("Intrusion_Alarm"),
        this.enventService.count("Stayed_On"),
        this.enventService.count("Tailing_Alarm"),
        this.enventService.count("Reverse_Alarm"),
      ]);
      this.dataI = counts.map(count => count ?? 0);
    } catch (error) {
      //console.error(error);
    }
    this.createPieChart()
    this.updateChartData(this.pie, this.dataI, 0);


    //uPdate Pie Chart from webSocket
    this.clientServ.connect("websocket/client1").subscribe(
      (message: any) => {
        const msg = { type: 'msg', data: message };
        console.log('Received message:', msg);
        Toast.fire({
          icon: 'info',
          title: 'New Event ' + message.etatevt
        })
        if (message.etatevt == "Intrusion_Alarm") {
          if (typeof this.dataI[0] === 'number') {
            this.dataI[0]++;
          }
        } else if (message.etatevt == "Stayed_On") {
          if (typeof this.dataI[1] === 'number') {
            this.dataI[1]++;
          }
        } else if (message.etatevt == "Tailing_Alarm") {
          if (typeof this.dataI[2] === 'number') {
            this.dataI[2]++;
          }
        } else if (message.etatevt == "Reverse_Alarm") {
          if (typeof this.dataI[3] === 'number') {
            this.dataI[3]++;
          }
        }
        this.updateChartData(this.pie, this.dataI, 0);
        this.toast.warning({ detail: "New Event", summary: msg.data.etatevt, duration: 1500 })
      },
      (error: any) => {
        console.error('WebSocket error:', error);
      }
    );
/*************************************************************************************************************************/
//Init LineChart
this.CreatelineChart()
  this.deviceService.getHistList().subscribe((data)=>{

     // console.error(data)
      for (let i = 0; i < data.length; i++) {
        this.dd.push(data[i].date)
        this.nb.push(data[i].diconnected)
      }
      for (let index = 0; index < this.nb.length; index++) {
        this.nbDis+=this.nb[index]
      }
      this.dd.reverse()
      this.nb.reverse()
      this.updateChangedChartData(this.lineChart,this.nb,this.dd,0)
    })

        //uPdate LineChart from webSocket
        this.wsClient2.connect("websocket/client2").subscribe(
          (message: any) => {
            //console.error(message)
            if (message.etat == "Connected") {
              if(message.PreviousDate[1]<=9){
                this.m="0"+message.PreviousDate[1]
              }
              if(message.PreviousDate[2]<=9){
                this.j="0"+message.PreviousDate[2]
              }
              let date = message.PreviousDate[0]+"-"+this.m+"-"+this.j
              console.warn(date)
              let Indexnb = this.dd.indexOf(date)
              console.warn(Indexnb)
              this.nb[Indexnb]--
              this.nbDis--
            }else{
              this.nb[6]++
              this.nbDis++
            }
         //   console.error(this.nb)
           // console.error(this.dd)
            this.updateChangedChartData(this.lineChart,this.nb,this.dd,0)
          },
          (error: any) => {
            console.error('WebSocket error:', error);
          }
        );
/*************************************************************************************************************************/
    //Init of Bar2 chart
    try {
      this.depService.getDepList().subscribe((data: any[]) => {
        this.depts = data.map((dep) => dep.nomDep);
        this.idDep = data.map((dep) => dep.idDep);
        const observables = this.depts.map((dep) => this.histService.getDenByDep(dep));
        forkJoin(observables).subscribe((deniedData: any[]) => {
          this.denByDep = deniedData;
          console.warn(this.denByDep)
          this.createChart2();
        });
      });
    } catch (error) {
      console.error(error);
    }
    //uPdate Bar Chart from webSocket
    this.wsClient3.connect("websocket/client3").subscribe(
      (message: any) => {
        const msg = { type: 'msg', data: message };
        if (message.etat == "accès refusé") {
          let dep = message.Departement
          let IndexDep = this.depts.indexOf(dep)
          this.denByDep[IndexDep]++
        }
        this.updateChartData(this.chart2, this.denByDep, 0);
      },
      (error: any) => {
        console.error('WebSocket error:', error);
      }
    );
    /*************************************************************************************************************************/
    //Init of Bar chart
    try {

      this.depService.getDepList().subscribe((dep: any) => {
        let dptss = dep
        let monthIndex: number = new Date().getMonth() + 1;
        let deppp = dep[0].idDep
        this.histService.getByDepMonth(monthIndex, deppp).subscribe(
          (data: any) => {
            for (let index = 0; index < data.length; index++) {
              this.dates.push(data[index].date)
              this.denUsers.push(data[index].den)
            }
            this.createChart();
          }
        )
      })
    } catch (error) {
      console.error(error);
    }

  }

  reverseDates() {
    return this.dates.reverse()
  }
  reverseUsers() {
    this.denUsers.reverse()
  }

  /*** Firs Bar chart (den per day+dep) ****/
  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.dates,
        datasets: [
          {
            label: "Denied Users",
            data: this.denUsers,
            backgroundColor: '#3fc3ee',
            barThickness: 17 // Set the desired bar width here

          }
        ]
      },
      options: {
        aspectRatio: 1.5,
        scales: {
          y: {
            ticks: {
              precision: 0, // Display whole numbers (integer values)
            },
          },
        },
      }

    });
  }
  /*** Firs Bar chart (den per dep) ****/
  createChart2() {
    this.chart2 = new Chart("MyChart4", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.depts,
        datasets: [
          {
            label: "Denied Users",
            data: this.denByDep,
            backgroundColor: '#3fc3ee',
            barThickness: 40 // Set the desired bar width here
          }
        ]
      },
      options: {
        aspectRatio: 1.5,
        scales: {
          y: {
            ticks: {
              precision: 0, // Display whole numbers (integer values)
            },
          },
        },
      }

    });
  }



  createPieChart() {
    this.pie = new Chart('MyChart2', {
      type: 'pie',
      data: {
        datasets: [{
          data: [],
          backgroundColor: ['Red', 'Pink', 'Green', 'Yellow'],
          label: 'Event'
        }],
        labels: ['Intrusion_alarm', 'Stayed_On', 'Tailing_Alarm', 'Reverse_Alarm']
      },
      options: {
        aspectRatio: 1.5,
      }
    });
  }

  CreatelineChart() {
    this.lineChart = new Chart('MyChart3', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Disconnected Device per week',
            //  lineTension: 0.2,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false,
          },
        ],
      },
      options: {
        aspectRatio: 2,
        scales: {
          y: {
            ticks: {
              precision: 0, // Display whole numbers (integer values)
            },
          },
        },
      },
    });
  }

  addData(chart: any, label: any, data: any) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart: any) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.pop();
    });
    chart.update();
  }

  updateChartData(chart: any, data: any, dataSetIndex: any) {
    if (chart && chart.data) { // check if chart and chart.data are defined
      chart.data.datasets[dataSetIndex].data = data;
      chart.update();
    }
  }

  updateChangedChartData(chart: any, data: any, dates: any, dataSetIndex: any) {
    if (chart && chart.data) { // check if chart and chart.data are defined
      chart.data.datasets[dataSetIndex].data = data;
      chart.data.labels = dates
      chart.update();
    }
  }

  setVariable(value: any) {
    this.messages.push(value);
    this.message$.next(this.messages); // emit the updated myVariable array
  }

  getVariable() {
    return this.message$; // return the Subject instead of the myVariable array
  }

  updAcc() {
    let data = [1, 2, 3, 4, 5, 6, 7]
    this.updateChartData(this.chart, data, 0);
  }
  updDen() {
    let data = [12, 24, 3, 4, 5, 6, 7]
    this.updateChartData(this.chart, data, 1);
  }
  departement: any = '';
  selectChangeDep(event: any) {
    this.departement = event.target.value;
  }
  month: any = '';
  selectChangeMonth(event: any) {
    this.month = event.target.value;
    console.warn(this.month)
    console.warn(this.departement)

    this.depService.getDepList().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].nomDep == this.departement) {
          try {
            let d: any[] = []
            let n: any[] = []

            this.histService.getByDepMonth(Number(this.month), data[i].idDep).subscribe((data: any) => {
              for (let index = 0; index < data.length; index++) {
                d.push(data[index].date)
                n.push(data[index].den)
              }
              console.warn(d)
              //this.updateChartData(this.chart, this.denUsers, 0);
              this.updateChangedChartData(this.chart, n, d, 0);
            })
          } catch (error) {
            console.error(error);
          }
        }
      }

    })

    /*
    try{
      let d:any[]=[]
      let n:any[]=[]

      this.histService.getByDepMonth(this.departement,Number(this.month)).subscribe((data:any)=>{
        for (let index = 0; index < data.length; index++) {
            d.push(data[index].date)
            n.push(data[index].den)
        }
        d.reverse()
        n.reverse()
        console.log(this.dates)
        //this.updateChartData(this.chart, this.denUsers, 0);
        this.updateChangedChartData(this.chart, n,d, 0);
      })
    }catch (error) {
      console.error(error);
    }*/

  }

  affDepM() {
    console.log(this.departement)
    console.log(this.month)

  }

}
