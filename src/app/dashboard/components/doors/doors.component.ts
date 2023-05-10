import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { DoorService } from 'src/app/Service/door.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { UserService } from 'src/app/Service/user.service';
import { Contoller } from 'src/app/model/Controller';
import { Porte } from 'src/app/model/Porte';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.css']
})
export class DoorsComponent implements OnInit{
  constructor(private doorService: DoorService,
    private router: Router,
    private userAuthService:UserAuthService
    ) { }
roless=this.userAuthService.getRoles()
    ngOnInit(): void {
      this.getDoors()
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
  type:string='';

  selectChangeType(event : any){
    this.type=event.target.value;
  }
  updateDoor(id: bigint){
    this.router.navigate(['updateDoor', id]);
  }

  deleteDoor(id: bigint){
    this.doorService.deleteDoor(id,this.roless).subscribe((response:any)=>{
      console.log(response);
      this.router.navigate(['/alldoors']);
      window.location.reload();

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Door Deleted successfully',
        showConfirmButton: false,
        timer: 1500
      });
    },
    (error) => {
      console.log(error);
    }
    )
    }


  fileDownload(){


  }

}
