import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { UserService } from 'src/app/Service/user.service';
import { Porte } from 'src/app/model/Porte';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.css']
})
export class DoorsComponent implements OnInit{
  constructor(private userService: UserService,
    private router: Router) { }

    ngOnInit(): void {
    }

    doors :Porte[] = [
    {id_porte: 1n, nom_porte: 'Hydrogen',type:'rue pelastine'},
    {id_porte: 2n, nom_porte: 'Hydrogen',type:'rue pelastine'},
    {id_porte: 3n, nom_porte: 'Hydrogen',type:'rue pelastine'},
  ];

  addData() {
    this.router.navigate(['/addDoor']);
  }
  MenageProfile(){
  this.router.navigate(['/']);

}



  updateDoor(id: bigint){
    this.router.navigate(['updateDoor', id]);
  }

  deleteDoor(id: bigint){

    }


  fileDownload(){


  }

}
