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
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data:Number[]=[]
  dataI:Number[]=[]
  public chart: any;
  public pieChart: any;
  pie:any
  lineChart: any;
  chart2:any
  messages : Message[]=[]
  message$ = new Subject<Message[]>();
  yesterday:any = new Date();
  y:any
  y1:any
  y2:any
  y3:any
  y4:any
  y5:any
  alarmes:any
  hist:any
  accUsers:any[]=[]
  dates:any[]=[]
  denUsers:any[]=[]
  depts:any[]=[]
  denByDep:any[]=[]
  chDM!: FormGroup;

  constructor(
      private websocketService: WebSocketService,
      private clientServ:ClientService,
      private shared:SharedService,
      private toast:NgToastService,
      private enventService:EventService,
      private histService:HistoriqueService,
      private clientAcc : ClientAccService,
      private depService:DepartementService,
      private wsClient3 : Client3Service,
      private formBuilder: FormBuilder
      ) {
  }
  async ngOnInit() {
    this.chDM = this.formBuilder.group({
      nom_dep: ['', Validators.required],
      month:['', Validators.required]
    });

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
      console.error(error);
    }
    this.createPieChart()
    this.updateChartData(this.pie, this.dataI, 0);


    //uPdate Pie Chart from webSocket
    this.clientServ.connect("websocket/client1").subscribe(
      (message: any) => {
          const msg = {type: 'msg', data: message};
          console.log('Received message:', msg);
          if(message.etatevt=="Intrusion_Alarm"){
            if (typeof this.dataI[0] === 'number'){
              this.dataI[0]++;
            }
          }else if(message.etatevt=="Stayed_On"){
            if (typeof this.dataI[1] === 'number'){
              this.dataI[1]++;
            }
          }else if(message.etatevt=="Tailing_Alarm"){
            if (typeof this.dataI[2] === 'number'){
              this.dataI[2]++;
            }
          }else if(message.etatevt=="Reverse_Alarm"){
            if (typeof this.dataI[3] === 'number'){
              this.dataI[3]++;
            }
          }
          this.updateChartData(this.pie, this.dataI, 0);
          this.toast.warning({detail:"New Event",summary:msg.data.etatevt,duration:1500})
      },
      (error:any) => {
        console.error('WebSocket error:', error);
      }
    );
/*************************************************************************************************************************/
      //Init of Bar chart


      try{
        this.histService.getHistList().subscribe((data:any)=>{
          this.hist=data
          console.log(this.hist)
          for (let index = 0; index < data.length; index++) {
              this.dates.push(data[index].date)
              this.accUsers.push(data[index].acc)
              this.denUsers.push(data[index].den)
          }
          this.reverseDates()
          this.reverseUsers()
          console.log(this.dates)
          this.createChart();
        })
      }catch (error) {
        console.error(error);
      }
      //uPdate Bar Chart from webSocket
      /*this.reverseUsers()
      this.clientAcc.connect("websocket/client3").subscribe(
        (message: any) => {
          const msg = {type: 'msg', data: message};
          console.log('Received message:', msg);
          if(msg.data=="true"){
            this.accUsers[6]++
          }else{
            this.denUsers[6]++
          }
          this.updateChartData(this.chart, this.accUsers, 0);
          this.updateChartData(this.chart, this.denUsers, 1);
        },
        (error:any) => {
          console.error('WebSocket error:', error);
        }
      );*/
/*************************************************************************************************************************/
        //Init of Bar2 chart
        try {
          this.depService.getDepList().subscribe((data: any[]) => {
            this.depts = data.map((dep) => dep.nomDep);
            const observables = this.depts.map((dep) => this.histService.getDenByDep(dep));
            forkJoin(observables).subscribe((deniedData: any[]) => {
              this.denByDep = deniedData;
              this.createChart2();
            });
          });
        } catch (error) {
          console.error(error);
        }
      //uPdate Bar Chart from webSocket
      this.wsClient3.connect("websocket/client3").subscribe(
        (message: any) => {
            const msg = {type: 'msg', data: message};
            if (message.etat=="accès refusé"){
              let dep=message.Departement
              let IndexDep=this.depts.indexOf(dep)
              this.denByDep[IndexDep]++
            }
            this.updateChartData(this.chart2, this.denByDep, 0);
        },
        (error:any) => {
          console.error('WebSocket error:', error);
        }
      );
/*************************************************************************************************************************/
      //Init of Bar chart
      /*try{
        let monthIndex: number = new Date().getMonth();
        let deppp=this.depts[0]
        this.histService.getByDepMonth(deppp,monthIndex).subscribe((data:any)=>{
          for (let index = 0; index < data.length; index++) {
              this.dates.push(data[index].date)
              this.denUsers.push(data[index].den)
          }
          this.reverseDates()
          this.reverseUsers()
          console.log(this.dates)
          this.createChart();
        })
      }catch (error) {
        console.error(error);
      }*/


      /* this.websocketService.connect().subscribe(
      (message: any) => {
        this.updateChartData(this.chart, message, 0);
        this.updateChartData(this.doughnut,res.slice(0,5), 0);
      },
      (error:any) => {
        console.error('WebSocket error:', error);
      }
    );*/
    this.CreatelineChart()
  }

  reverseDates(){
    return this.dates.reverse()
  }
  reverseUsers(){
    this.accUsers.reverse()
    this.denUsers.reverse()
  }

  /*** Firs Bar chart (den per day+dep) ****/
  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.dates,
	       datasets: [
          {
            label: "Denied Users",
            data: this.denUsers,
            backgroundColor: 'limegreen',
            barThickness: 40 // Set the desired bar width here

          }
        ]
      },
      options: {
        aspectRatio:1.5
      }

    });
  }
  /*** Firs Bar chart (den per dep) ****/
  createChart2(){
    this.chart2 = new Chart("MyChart4", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.depts,
	       datasets: [
          {
            label: "Denied Users",
            data:this.denByDep,
            backgroundColor: 'limegreen',
            barThickness: 40 // Set the desired bar width here
          }
        ]
      },
      options: {
        aspectRatio:1.5
      }

    });
  }



  createPieChart(){
    this.pie = new Chart('MyChart2',{
    type: 'pie',
    data: {
      datasets: [{
        data: [],
        backgroundColor: ['Red', 'Pink','Green','Yellow'],
        label: 'Event'
      }],
      labels: ['Intrusion_alarm','Stayed_On','Tailing_Alarm','Reverse_Alarm']
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
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Sell per week',
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
            data: [0, 59, 80, 0, 56, 55, 0, 10, 5, 50, 10, 15],
            spanGaps: false,
          },
        ]
      },
      options: {
        aspectRatio:1.5
      }
    });
  }


  addData(chart:any, label:any, data:any) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset:any) => {
        dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart:any) {
      chart.data.labels.pop();
      chart.data.datasets.forEach((dataset:any) => {
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

  updateChangedChartData(chart: any, data: any,dates:any, dataSetIndex: any) {
    if (chart && chart.data) { // check if chart and chart.data are defined
      chart.data.datasets[dataSetIndex].data = data;
      chart.data.labels=dates
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

  updAcc(){
    let data=[1,2,3,4,5,6,7]
    this.updateChartData(this.chart, data, 0);
  }
  updDen(){
    let data=[12,24,3,4,5,6,7]
    this.updateChartData(this.chart, data, 1);
  }
  departement:any='';
  selectChangeDep(event : any){
    this.departement=event.target.value;
  }
  month:any='';
  selectChangeMonth(event : any){
    this.month=event.target.value;
    console.warn(this.month)
    console.warn(this.departement)
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

  affDepM(){
    console.log(this.departement)
    console.log(this.month)

  }

}
