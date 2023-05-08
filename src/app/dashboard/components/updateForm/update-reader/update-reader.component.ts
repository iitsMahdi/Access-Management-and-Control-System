import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DoorService } from 'src/app/Service/door.service';
import { ReaderService } from 'src/app/Service/reader.service';
import { Reader } from 'src/app/model/Reader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-reader',
  templateUrl: './update-reader.component.html',
  styleUrls: ['./update-reader.component.css']
})
export class UpdateReaderComponent implements OnInit {

  readerForm !:FormGroup;
  doors:any
  id!:number;
  savedReader: Reader = new Reader();

  constructor(
    private router: Router,
    private readerService : ReaderService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private doorService : DoorService,

  ){}

  ngOnInit(): void {
    this.readerForm=this.formBuilder.group({
      ip:['',Validators.required],
      door:['',Validators.required],
    });
    this.getDoors()
    this.id = this.route.snapshot.params['id'];
    this.readerService.getReaderById(this.id).subscribe((data:Reader)=>{
      console.log(data)
      this.readerForm.controls["ip"].setValue(data.ipAdresse)

    })
  }


  getDoors(){
    this.doorService.getDoorsList().subscribe((data)=>{
      this.doors=data;
      console.log(data)

    })
  }
  doorS:string='';
  selectChangeDoor(event : any){
    this.doorS=event.target.value;
  }
  goToDeviceList(){
    this.router.navigate(['/alldevices']);
  }
  updateReader():void{
    this.savedReader.ipAdresse=this.readerForm.value.ip;
    //getting the door (id selected option)
    const doorObs = this.doorService.getDoorById(Number(this.doorS))
    forkJoin([doorObs]).subscribe(([doorData]) => {
      this.savedReader.prt=doorData;
      console.log(doorData);

      this.readerService.updateReader(this.id,this.savedReader).subscribe( data =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Reader updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(data);
        this.goToDeviceList();
      },
      error => console.log(error));
    });
    this.goToDeviceList()
  }

  onSubmit(){
    this.updateReader();
  }

}
