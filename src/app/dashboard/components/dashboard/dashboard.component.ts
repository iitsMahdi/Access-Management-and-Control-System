import { Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Message } from 'src/app/model/message';
import { NgToastService } from 'ng-angular-popup';
import { WebSocketService } from 'src/app/Service/web-socket.service';
import { SharedService } from 'src/app/Service/shared.service';
import { EventService } from 'src/app/Service/event.service';
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
  messages : Message[]=[]
  entry_alarm:number=0
  Entry_Close:number=0
  Exist_Open:number=0
  Close_Exit:number=0
  Intrusion_Alarm:number=0
  Stayed_On:number=0
  Tailing_Alarm:number=0
  Reverse_Alarm:number=0

  other_alarm:number=0;
  yesterday:any = new Date();
  y:any
  y1:any
  y2:any
  y3:any
  y4:any
  y5:any
  constructor(
      private websocketService: WebSocketService,
      private shared:SharedService,
      private toast:NgToastService,
      private enventService:EventService
      ) {
  }
  async ngOnInit() {

    try {
      const counts = await Promise.all([
        this.enventService.count("Entry_Open"),
        this.enventService.count("Entry_Close"),
        this.enventService.count("Exist_Open"),
        this.enventService.count("Close_Exit"),
        this.enventService.count("Intrusion_Alarm"),
        this.enventService.count("Stayed_On"),
        this.enventService.count("Tailing_Alarm"),
        this.enventService.count("Reverse_Alarm"),
      ]);
      this.dataI = counts.map(count => count ?? 0);
      console.log(this.dataI)

    } catch (error) {
      console.error(error);
    }
    this.createPieChart()
    this.updateChartData(this.pie, this.dataI, 0);
      //this.updateChartData(this.pie, this.data, 0);

      /* this.websocketService.connect().subscribe(
      (message: any) => {
        this.updateChartData(this.chart, message, 0);
        this.updateChartData(this.doughnut,res.slice(0,5), 0);
      },
      (error:any) => {
        console.error('WebSocket error:', error);
      }
    );*/

    let alarmes = this.shared.getVariable()
    console.log(alarmes)
    if(alarmes.length>0){
    try{
      for (let index = 0; index < alarmes.length; index++) {
        console.log(alarmes[index].data.etatevt)
        if(alarmes[index].data.etatevt=="Entry_open"){
          this.entry_alarm++
        }else if(alarmes[index].data.etatevt=="Entry_Close"){
          this.Entry_Close++
        }else if(alarmes[index].data.etatevt=="Exist_Open"){
          this.Exist_Open++
        }else if(alarmes[index].data.etatevt=="Close_Exit"){
          this.Close_Exit++
        }else if(alarmes[index].data.etatevt=="Intrusion_Alarm"){
          this.Intrusion_Alarm++
        }else if(alarmes[index].data.etatevt=="Stayed_On"){
          this.Stayed_On++
        }else if(alarmes[index].data.etatevt=="Tailing_Alarm"){
          this.Tailing_Alarm++
        }else if(alarmes[index].data.etatevt=="Reverse_Alarm"){
          this.Reverse_Alarm++
        }
        else{
          this.other_alarm++
        }
      }
      this.data=this.updateWSAlarm()
      this.updateChartData(this.pie, this.data, 0);
    }catch (error) {
      console.error(error);
    }}


    this.createChart();
    this.CreatelineChart()
/*
    this.websocketService.connect().subscribe(
      (message: any) => {
        console.log('Received message:', message);
        this.toast.warning({detail:"New Event",summary:message.data.etatevt,duration:500})
        if(message.etatevt=="Entry_open"){
          this.entry_alarm++
        }else if(message.etatevt=="other"){
          this.other_alarm++
        }
        this.data=this.updateWSAlarm()
        this.updateChartData(this.pieChart, this.data, 0);
      },
      (error:any) => {
        console.error('WebSocket error:', error);
      }
    );*/
  }

updateWSAlarm(){
  const arr:Number[]=[this.entry_alarm,this.Entry_Close,this.Exist_Open,this.Close_Exit,this.Intrusion_Alarm,this.Stayed_On,this.Tailing_Alarm,this.Reverse_Alarm,];
  return arr
}
  createChart(){
    const now = new Date();
    const today=now.toLocaleDateString();
    this.yesterday = new Date();
    this.y =this.yesterday.setDate(this.yesterday.getDate() - 1)
    this.y1 =this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.y2 =this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.y3 =this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.y4 =this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.y5 =this.yesterday.setDate(this.yesterday.getDate() - 1);
    console.log(this.yesterday + " "+this.y)
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [this.y5, this.y4, this.y3,this.y2,this.y1,this.y,today],
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92','574', '573'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17','0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
  createPieChart(){
    this.pie = new Chart('MyChart2',{
    type: 'pie',
    data: {
      datasets: [{
        data: [1,1,1,1,1,1,1,1],
        backgroundColor: ['Red', 'Pink','Green','Yellow','Orange','Blue', 'Purple','Grey'],
        label: 'Event'
      }],
      labels: ['Entry_Open','Entry_Close','Exist_Open','Close_Exit','Intrusion_alarm','Stayed_On','Tailing_Alarm','Reverse_Alarm']
    }
  })
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
        ],
      },
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
    console.log("hedhi data to update " + data)
    if (chart && chart.data) { // check if chart and chart.data are defined
      chart.data.datasets[dataSetIndex].data = data;
      chart.update();
    }
  }


}
