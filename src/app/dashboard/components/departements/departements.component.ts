import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/Service/departement.service';
import { Departement } from 'src/app/model/Departement';
import { AddDeptComponent } from '../addForm/add-dept/add-dept.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UpdateDeptComponent } from '../updateForm/update-dept/update-dept.component';
import { UserAuthService } from 'src/app/Service/user-auth.service';

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.css']
})
export class DepartementsComponent implements OnInit{
  depts:any;
  role=this.userAuthService.getRoles()

  constructor(private deptService: DepartementService,
    private matDialog : MatDialog,
    private router: Router,
    private userAuthService:UserAuthService
    ) { }


    ngOnInit(): void {
      this.getDepatement();
    }

  getDepatement(){
    this.deptService.getDepList().subscribe((data)=>{
      this.depts=data;
      console.log(data);
    })
  }

  openDialog(){
    this.matDialog.open(AddDeptComponent,{
      width:'350px',
    })
  }
  openDialogUp(id: bigint){
    this.matDialog.open(UpdateDeptComponent,{
      width:'350px',
      data: { id: id }
    })
  }
  MenageProfile(){
  this.router.navigate(['/']);

}
  updatedept(id: bigint){
    this.router.navigate(['updateDep', id]);
  }


  deletedept(id: bigint){
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
    this.deptService.deleteDep(id,this.role).subscribe((response:any)=>{
      console.log(response);
      this.router.navigate(['/alldepartements']);
      window.location.reload();
    },
    (error) => {
      console.log(error);
 }
  )
}

})
}
  fileDownload(){


  }



}
