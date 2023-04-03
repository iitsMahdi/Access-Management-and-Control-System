import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/Service/departement.service';
import { ProfileService } from 'src/app/Service/profile.service';
import { Departement } from 'src/app/model/Departement';
import { Profile } from 'src/app/model/Profile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-dept',
  templateUrl: './add-dept.component.html',
  styleUrls: ['./add-dept.component.css']
})
export class AddDeptComponent implements OnInit {

  depForm!: FormGroup;
  dept: Departement = new Departement();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private departementService: DepartementService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.depForm = this.formBuilder.group({
      nom_dep: ['', Validators.required],
    });
  }

  saveDep() {
    this.dept.nom_departement = this.depForm.value.nom_dep;
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtbUBtbSIsImlhdCI6MTY4MDUyMDgzMywiZXhwIjoxNjgwNTIyMjczfQ.e0lxzTHJkbGyPzdBSa4U5OYP3059BUIz7FQAVK_mJgU';
    this.departementService.createDep(token, this.dept).subscribe(data => {
      console.log('created');
      console.log(data);
      this.goToProfileList();
    });
  }

  goToProfileList() {
    this.router.navigate(['/alldept']);
  }

  onSubmit() {
    console.log(this.dept);
    this.saveDep();
    /*Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Departement added successfully',
      showConfirmButton: false,
      timer: 1500
    });*/
  }
}
