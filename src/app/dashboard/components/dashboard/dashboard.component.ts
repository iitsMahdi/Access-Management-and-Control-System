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
  public chart: any;
  public pieChart: any;
  pie:any
  lineChart: any;
  messages : Message[]=[]
  entry_alarm:number=0
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
  ngOnInit(): void {

    this.enventService.count("Entry_open")
      .then((count: number) => {
        this.entry_alarm = count;
        console.log(this.entry_alarm);
        this.data.push(count)
      })
      .catch((error) => {
        console.error(error);
      });

      this.enventService.count("Entry_Close")
      .then((count: number) => {
        this.other_alarm = count;
        console.log(this.other_alarm);
        this.data.push(count)
      })
      .catch((error) => {
        console.error(error);
      });
      console.warn(this.data)

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
    for (let index = 0; index < alarmes.length; index++) {
      console.log(alarmes[index].data.etatevt)
      if(alarmes[index].data.etatevt=="Entry_open"){
        this.entry_alarm++
      }else{
        this.other_alarm++
      }

      this.data=this.updateWSAlarm()
      this.updateChartData(this.pie, this.data, 0);
    }

    this.createChart();
    this.createPieChart()
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
  const arr:Number[]=[this.entry_alarm,this.other_alarm];
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
    console.warn(this.data)
    this.pie = new Chart('MyChart2',{
    type: 'pie',
    data: {
      datasets: [{
        data: this.data,
        backgroundColor: ["red","orange"],
        label: 'Dataset 1'
      }],
      labels: ['Entry_Onpe','other']
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

  updateChartData(chart:any, data:any, dataSetIndex:any){
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
}


}
