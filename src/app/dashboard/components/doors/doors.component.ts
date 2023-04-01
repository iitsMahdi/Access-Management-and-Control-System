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
    {idPorte: 1n, nomPorte: 'Hydrogen',type:'rue pelastine'},
    {idPorte: 2n, nomPorte: 'Hydrogen',type:'rue pelastine'},
    {idPorte: 3n, nomPorte: 'Hydrogen',type:'rue pelastine'},
  ];

  addData() {
    this.router.navigate(['/addDoor']);
  }
  MenageProfile(){
  this.router.navigate(['/']);

}



  updateUser(id: bigint){
    this.router.navigate(['updateUser', id]);
  }

  deleteUser(id: bigint){

    }


  fileDownload(){


  }

}
