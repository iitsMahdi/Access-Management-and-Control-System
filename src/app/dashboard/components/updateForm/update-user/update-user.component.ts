import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/model/Departement';
import { Profile } from 'src/app/model/Profile';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  file!:File;
  userForm !:FormGroup;
  id!: number;
  user: User = new User();

  departements:Departement[]=[
    {id_dep:0n,nom_departement:"Select departement"},
    {id_dep:1n,nom_departement:"Informatique"},
    {id_dep:2n,nom_departement:"Finance"},
  ];

  profiles:Profile[]=[
    {id_profile:0,nom_profile:"Select profile"},
    {id_profile:1,nom_profile:"Ingénieur"},
    {id_profile:2,nom_profile:"Technicien"},
  ];

  constructor(private userService:UserService ,private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

this.userForm=this.formBuilder.group({
      user_name:['',Validators.required],
      adresse:['',Validators.required],
      email:['',Validators.required],
      image:['',Validators.required],
      password:['',Validators.required],
      phone:['',Validators.required],
      login:['',Validators.required],
      pin:['',Validators.required],
      card:['',Validators.required],
      profile:['',Validators.required],
      department:['',Validators.required],
      role:['',Validators.required],

    });

    this.id = this.route.snapshot.params['user_id'];

    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    }, error => console.log(error));
  }

  onChangeimg(event:any){
    this.file=event.target.files[0];
  }

  profile:string='';
  selectChangeProfile(event : any){
    this.profile=event.target.value;
  }

  departement:string='';
  selectChangeDep(event : any){
    this.departement=event.target.value;
  }

  role:string='';
  selectChangeRole(event : any){
    this.role=event.target.value;
  }


  onSubmit(){
    this.userService.updateUser(this.id, this.user).subscribe( data =>{
      this.goToUserList();
    }
    , error => console.log(error));
  }

  goToUserList(){
    this.router.navigate(['/alluser']);
  }
}
