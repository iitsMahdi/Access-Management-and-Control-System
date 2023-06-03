import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { DoorService } from 'src/app/Service/door.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { UserService } from 'src/app/Service/user.service';
import { Contoller } from 'src/app/model/Controller';
import { Porte } from 'src/app/model/Porte';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControllerService } from 'src/app/Service/controller.service';
import { WaveshareService } from 'src/app/Service/waveshare.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.css']
})
export class DoorsComponent implements OnInit{

  doorForm !:FormGroup;
  cardNumber!: string;
  porte: Porte = new Porte();
  doorStatus:any
nbb:any
  deptss:any
  contss:any
  constructor(
    private doorService: DoorService,
    private router: Router,
    private userAuthService:UserAuthService,
    private modalService: NgbModal,
    private contService : ControllerService,
    private formBuilder: FormBuilder,
    private wavesService : WaveshareService,

    ) { }
roless=this.userAuthService.getRoles()
    ngOnInit(): void {
      this.doorForm=this.formBuilder.group({
        name:['',Validators.required],
        number:['',Validators.required],
        type:['',Validators.required],
        Controller:['',Validators.required],
        Wave:['',Validators.required]
      });

      this.getDoors()
      this.getConts()
      this.getWaves()


    }

    getConts(){
      this.contService.getContList().subscribe((data)=>{
        this.contss=data;
        console.log(data)
      })
    }
    waves:any
    getWaves(){
      this.wavesService.getWaveList().subscribe((data)=>{
        this.waves=data;
        console.log(data)
      })
    }

    cont:string='';
    selectChangeCont(event : any){
      this.cont=event.target.value;
        this.doorService.getDoorCnt(Number(this.cont)).subscribe((data:any)=>{
          this.doorStatus=data
          console.warn(data)
        })

    }


    wv:string='';
    selectChangeWave(event : any){
      this.wv=event.target.value;
    }

    type:string='';
    selectChangeType(event : any){
      this.type=event.target.value;
    }
    doors :any;


  addData() {
    this.router.navigate(['/addDoor']);
  }
  MenageProfile(){
  this.router.navigate(['/']);
  }

  getDoors(){
    this.doorService.getDoorsList().subscribe((data:any)=>{
    this.doors=data;
    console.log(data)
    })
  }

  updateDoor(id: bigint){
    let role=this.userAuthService.getRoles();
    if (role.includes("user")){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    }else{
      this.router.navigate(['updateDoor', id]);

    }
  }

  deleteDoor(id: bigint){
    let role=this.userAuthService.getRoles();
    if (role.includes("user")){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    }else{

    Swal.fire({
      title: 'Are you sure?',
      text: "Would you like to delete it!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result:any) => {
      if (result.isConfirmed) {
    this.doorService.deleteDoor(id,this.roless).subscribe((response:any)=>{
      Swal.fire(
        'Deleted!',
        'Door '+id+' has been deleted.',
        'success'
      )
      this.router.navigate(['/alldoors']);
      window.location.reload();
    },
    (error) => {
      console.log(error);
    }
    )
  }

  })}
  }

  fileDownload(){
  }
  BefOpen(cont:any){
    let role=this.userAuthService.getRoles();
    if (role.includes("user")){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    }else{
      this.open(cont)
    }
  }


  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				//this.closeResult = `Closed with: ${result}`;
        this.onSubmit()
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("form failed")
			},
		);
	}


  saveDoor():void{
    this.porte.nomPorte=this.doorForm.value.name;
    this.porte.type=this.type;
    if(this.type=="Porte_Principal"){
      this.nbb=1
    }else{
      this.nbb=2
    }
    this.porte.numPorte=this.doorForm.value.number;
    const contObs = this.contService.getContById(Number(this.cont))
    const waveObs = this.wavesService.getWaveById(this.wv)
    forkJoin([contObs,waveObs]).subscribe(([contData,waveData]) => {
      this.contService.verifCont(contData.idCont,this.nbb).subscribe((check:any)=>{
        if (check){
          this.porte.cntrl=contData;
          this.porte.wsh=waveData
          console.log(waveData)
          if (!waveData.prt){
          this.doorService.createDoor(this.porte).subscribe( data =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Door added successfully',
              showConfirmButton: false,
              timer: 1500
            });
            this.goToDoorList();
            window.location.reload()
          },
          error => console.log(error));
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Choose another Waveshare!'
          })
        }
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Choose another Controller(Max)'+contData.nbrPorte+" door !"
          })
        }
      },
      error => console.log(error));
    });

  }

  goToDoorList(){
    this.router.navigate(['/alldoors']);
  }

  onSubmit(){
    console.log(this.porte);
    this.saveDoor();
  }
  upData:any
  openUpdate(content: any, id: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.update(id)
      },
      (reason) => {
        console.log("form failed");
        this.doorForm.reset();

      }
    );

    this.doorService.getDoorById(id).subscribe(
      (data) => {
        this.doorForm.patchValue({
          name: data.nomPorte,
          type: data.type,
          number: data.numPorte,
          Controller:data.cntrl.idCont,
          Wave:data.wsh.adresse
        });
        this.upData=data
      },
      (error) => {
        console.log(error);
      }
    );
  }
  update(id:any){
    this.porte.nomPorte=this.doorForm.value.name;
    this.porte.type=this.doorForm.value.type;
    this.porte.numPorte=this.doorForm.value.number;

    this.doorService.getDoorById(id).subscribe(
      (data) => {
        const contObs = this.contService.getContById(data.cntrl.idCont)
        const waveObs = this.wavesService.getWaveById(data.wsh.adresse)

        forkJoin([contObs,waveObs]).subscribe(([contData,waveData]) => {
          this.porte.cntrl=contData;
          this.porte.wsh=waveData
          console.warn(this.porte)
          this.doorService.updateDoor(id, this.porte).subscribe(data =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Door added successfully',
              showConfirmButton: false,
              timer: 1500
            });
            this.goToDoorList();
            window.location.reload()
          },
          error => console.log(error));

        });
      },
      (error) => {
        console.log(error);
      }
    );


  }

}
