import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoorService } from 'src/app/Service/door.service';
import { Contoller } from 'src/app/model/Conroller';
import { Departement } from 'src/app/model/Departement';
import { Porte } from 'src/app/model/Porte';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-door',
  templateUrl: './update-door.component.html',
  styleUrls: ['./update-door.component.css']
})
export class UpdateDoorComponent implements OnInit{

  file!:File;
  doorForm !:FormGroup;
  cardNumber!: string;
  id!: number;

  controllers:Contoller[]=[
    {id_cont:0n,nom_controlleur:"Select departement",status:"Connected",dept:new Departement()},
    {id_cont:0n,nom_controlleur:"C1",status:"Connected",dept:new Departement()},
    {id_cont:0n,nom_controlleur:"C2",status:"Connected",dept:new Departement()},
  ];

  constructor(private router: Router,private formBuilder: FormBuilder,private doorService : DoorService,private route: ActivatedRoute) {}

  porte: Porte = new Porte();

  ngOnInit(): void {

    this.doorForm=this.formBuilder.group({
      name:['',Validators.required],
      type:['',Validators.required],
    });

    this.id = this.route.snapshot.params['user_id'];

    this.doorService.getDoorById(this.id).subscribe(data => {
      this.porte = data;
    }, error => console.log(error));

  }

  cont:string='';
  selectChangeCont(event : any){
    this.cont=event.target.value;
  }
/*
  onSubmit(){
    alert(this.doorForm.value.name +"\n" +
          this.doorForm.value.type +"\n" +
          this.cont

        );
  }
*/

  goToDoorList(){
    this.router.navigate(['/alldoor']);
  }

  onSubmit(){
    this.doorService.updateDoor(this.id, this.porte).subscribe( data =>{
      this.goToDoorList();
    }
    , error => console.log(error));
  }


}
