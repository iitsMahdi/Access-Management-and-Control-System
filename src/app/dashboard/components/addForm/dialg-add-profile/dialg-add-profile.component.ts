import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Service/profile.service';
import { Profile } from 'src/app/model/Profile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialg-add-profile',
  templateUrl: './dialg-add-profile.component.html',
  styleUrls: ['./dialg-add-profile.component.css']
})
export class DialgAddProfileComponent implements OnInit {

  profileForm !:FormGroup;
  profile: Profile = new Profile();


constructor(private router: Router,private formBuilder: FormBuilder ,private profileService: ProfileService){}
ngOnInit(): void {

  this.profileForm=this.formBuilder.group({
    nom_profile:['',Validators.required],
  });
}


saveProfile(){

  this.profile.nom_profile=this.profileForm.value.nom_profile;
  this.profileService.createProfile(this.profile).subscribe(data =>{
    console.log(data)
    this.goToProfileList();
  })

}

goToProfileList(){
  this.router.navigate(['/allProfile']);
}

onSubmit(){
  console.log(this.profile)
  this.saveProfile();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Profile added successfully',
    showConfirmButton: false,
    timer: 1500
  })

}

}
