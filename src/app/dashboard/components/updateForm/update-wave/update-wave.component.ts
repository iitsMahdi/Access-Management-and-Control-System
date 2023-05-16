import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControllerService } from 'src/app/Service/controller.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { DoorService } from 'src/app/Service/door.service';
import { ReaderService } from 'src/app/Service/reader.service';
import { WaveshareService } from 'src/app/Service/waveshare.service';
import { Waveshare } from 'src/app/model/Waveshare';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-wave',
  templateUrl: './update-wave.component.html',
  styleUrls: ['./update-wave.component.css']
})
export class UpdateWaveComponent  implements OnInit {

  waveForm!:FormGroup;
  sevedWaveShare: Waveshare = new Waveshare();
  id!:number;


  ngOnInit(): void {
     this.waveForm=this.formBuilder.group({
      name:['',Validators.required],
      status:['',Validators.required],
      adresse:['',Validators.required],
    });

    this.id = this.route.snapshot.params['id'];
    this.waveService.getWaveById(this.id).subscribe((data)=>{
        console.log("cont")
        console.log(data)
        this.waveForm.controls["status"].setValue(data.status)
        this.waveForm.controls["adresse"].setValue(data.adresse)

      },
        error => console.log(error)
    );

  }

  constructor(
    private router: Router,
    private waveService:WaveshareService,
    private formBuilder: FormBuilder,private route: ActivatedRoute
  ){}
  goToDeviceList(){
    this.router.navigate(['/alldevices']);
  }
    saveWave(){
    //this.sevedWaveShare.nomWave=this.waveForm.value.name;
    this.sevedWaveShare.adresse=this.waveForm.value.adresse;
    this.sevedWaveShare.status=this.waveForm.value.status;
    this.waveService.updateWave(this.id,this.sevedWaveShare).subscribe( (data) =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Waveshare updated successfully',
        showConfirmButton: false,
        timer: 1500
      });

      console.log(data);
      this.goToDeviceList();
    },
    error => console.log(error));
  }

    onSubmit(){

      this.saveWave()


}
}
