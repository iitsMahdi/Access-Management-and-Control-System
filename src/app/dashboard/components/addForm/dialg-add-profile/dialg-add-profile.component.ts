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
    NomProfile:['',Validators.required],
  });
}


saveProfile(){

  this.profile.nomProfile=this.profileForm.value.NomProfile;
  this.profileService.createProfile(this.profile).subscribe(data =>{
    console.log(data)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Profile added successfully',
      showConfirmButton: false,
      timer: 1500
    });
    this.goToProfileList();
    window.location.reload()

  })

}

goToProfileList(){
  this.router.navigate(['/allProfiles']);
}

onSubmit(){
  this.saveProfile();
}

}
