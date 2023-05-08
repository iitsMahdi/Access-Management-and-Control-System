import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/Service/departement.service';
import { ProfileService } from 'src/app/Service/profile.service';
import { Departement } from 'src/app/model/Departement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-dept',
  templateUrl: './update-dept.component.html',
  styleUrls: ['./update-dept.component.css']
})
export class UpdateDeptComponent implements OnInit {

  depForm!: FormGroup;
  dept: Departement = new Departement();

  prt:any
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private departementService: DepartementService,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: { id: bigint }
  ) { }

  ngOnInit(): void {
    this.depForm = this.formBuilder.group({
      nom_dep: ['', Validators.required],
    });
    console.log(this.data.id)

    this.departementService.getDepById(Number(this.data.id)).subscribe(data => {
      //this.porte = data;
      console.log(data.nomDep)
      this.prt=data
      this.depForm.controls["nom_dep"].setValue(data.nomDep)
    }, error => {
    console.log('fail')
    console.log(error)});
  }

  goToProfileList() {
    this.router.navigate(['/alldepartements']);
  }

  onSubmit() {
    this.dept.nomDep = this.depForm.value.nom_dep;
    this.departementService.updateDep(this.data.id,this.dept).subscribe(
      data =>{
        this.goToProfileList();
        console.log("updated")
      },
      error => console.log(error));
    console.log(this.dept);
  }
}
