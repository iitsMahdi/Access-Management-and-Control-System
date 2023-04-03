import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/Service/departement.service';
import { Departement } from 'src/app/model/Departement';
import { AddDeptComponent } from '../addForm/add-dept/add-dept.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.css']
})
export class DepartementsComponent implements OnInit{
  constructor(private deptService: DepartementService,private matDialog : MatDialog,
    private router: Router) { }

    ngOnInit(): void {
    }

    dept :Departement[] = [
    {id_dep: 1n, nom_departement: 'Hydrogen'},
    {id_dep: 2n, nom_departement: 'Hydrogen'},
    {id_dep: 3n, nom_departement: 'Hydrogen'},
  ];

  openDialog(){
    this.matDialog.open(AddDeptComponent,{
      width:'350px',
    })
  }
  MenageProfile(){
  this.router.navigate(['/']);

}



  updatedept(id: bigint){
    this.router.navigate(['updateUser', id]);
  }

  deletedept(id: bigint){

    }


  fileDownload(){


  }



}
