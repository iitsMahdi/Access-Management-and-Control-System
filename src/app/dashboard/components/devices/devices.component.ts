import { Component, OnInit } from '@angular/core';
import { DialgAddProfileComponent } from '../addForm/dialg-add-profile/dialg-add-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Contoller } from 'src/app/model/Controller';
import { Reader } from 'src/app/model/Reader';
import { Router } from '@angular/router';
import { Departement } from 'src/app/model/Departement';
import { ReaderService } from 'src/app/Service/reader.service';
import { ControllerService } from 'src/app/Service/controller.service';
import { DepartementService } from 'src/app/Service/departement.service';
import { DoorService } from 'src/app/Service/door.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { WaveshareService } from 'src/app/Service/waveshare.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Porte } from 'src/app/model/Porte';
import { Waveshare } from 'src/app/model/Waveshare';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  controllers: any
  readers: any
  roless = this.userAuthService.getRoles()
  waves: any[] = []


  depts: any
  doors: any
  readerForm !: FormGroup;
  contForm !: FormGroup;
  waveForm!: FormGroup;
  savedCont: Contoller = new Contoller();
  savedReader: Reader = new Reader();
  sevedWaveShare: Waveshare = new Waveshare();
  savedDoor: Porte = new Porte();
  savedDepartement!: Departement;

  constructor(
    private router: Router,
    private controllerService: ControllerService,
    private readerService: ReaderService,
    private userAuthService: UserAuthService,
    private waveService: WaveshareService,
    private modalService: NgbModal,
    private DepService: DepartementService,
    private doorService: DoorService,
    private contService: ControllerService,
    private formBuilder: FormBuilder,

  ) { }
  ngOnInit(): void {
    this.readerForm = this.formBuilder.group({
      NumL: ['', Validators.required],
      door: ['', Validators.required],
      status: ['', Validators.required],

    });
    this.contForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      dep: ['', Validators.required],
      Adresse: ['', [Validators.required, this.ipAddressValidator()]],
      sn: ['', Validators.required],
      number:['', Validators.required],

    });
    this.waveForm = this.formBuilder.group({
      nameWave: ['', Validators.required],
      status: ['', Validators.required],
      adr: ['', [Validators.required, this.ipAddressValidator()]],
    });

    this.getDepartement()
    this.getDoors()
    this.getController();
    this.getReaders();
    this.getWaveshares()
  }

  ipAddressValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const ipAddressPattern = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const ipAddress = control.value;

      if (!ipAddressPattern.test(ipAddress)) {
        return { invalidIpAddress: true };
      }

      return null;
    };
  }


  dev: string = 'Reader';
  selectChange(event: any) {
    this.dev = event.target.value;
  }

  stat: string = '';
  selectChangeStat(event: any) {
    this.stat = event.target.value;
  }

  getDepartement() {
    this.DepService.getDepList().subscribe((data) => {
      this.depts = data;
      //console.log(data)
    })
  }
  getDoors() {
    this.doorService.getDoorsList().subscribe((data) => {
      this.doors = data;
      //console.log(data)

    })
  }

  addData() {
    this.router.navigate(['/addDevice']);
  }
  MenageProfile() {
    this.router.navigate(['/']);
  }


  fileDownload() {
  }

  getReaders() {
    this.readerService.getReaderList().subscribe((data) => {
      this.readers = data;
      console.log(data)
    })
  }

  getController() {
    this.controllerService.getContList().subscribe((data) => {
      this.controllers = data;
      //console.log(data)

    })
  }

  getWaveshares() {
    this.waveService.getWaveList().subscribe((data) => {
      let i = 0;
      while (i < data.length) {
        if (data[i].prt !== undefined) {
          this.waves.push(data[i]);
        }
        i++;
      }
      console.log(this.waves);
    });
  }



  deleteCont(id: bigint) {
    let role = this.userAuthService.getRoles();
    if (role.includes("user")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    } else {

      Swal.fire({
        title: 'Are you sure?',
        text: "Would you like to delete it!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.controllerService.deleteCont(id, this.roless).subscribe(() => {
            console.log('deleted')
            Swal.fire(
              'Deleted!',
              'Controller ' + id + ' has been deleted.',
              'success'
            )
            window.location.reload();
          },
            (error: any) => {
              console.error('WebSocket error:', error);
            }
          )
        }

      })
    }
  }
  deleteRea(id: bigint) {
    let role = this.userAuthService.getRoles();
    if (role.includes("user")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    } else {

      Swal.fire({
        title: 'Are you sure?',
        text: "Would you like to delete it!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.readerService.deleteReader(id, this.roless).subscribe(() => {
            console.log('deleted')
            Swal.fire(
              'Deleted!',
              'Reader ' + id + ' has been deleted.',
              'success'
            )
            window.location.reload();
          },
            (error: any) => {
              console.error('WebSocket error:', error);
            }
          )
        }

      })
    }
  }


  deleteWave(id: bigint) {
    let role = this.userAuthService.getRoles();
    if (role.includes("user")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "Would you like to delete it!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.waveService.deleteWave(id, this.roless).subscribe(() => {
            Swal.fire(
              'Deleted!',
              'Waveshare ' + id + ' has been deleted.',
              'success'
            )
            window.location.reload();
          },
            (error: any) => {
              console.error('WebSocket error:', error);
            }
          )
        }

      })
    }
  }

  BefOpen(cont: any) {
    let role = this.userAuthService.getRoles();
    if (role.includes("user")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    } else {
      this.open(cont)
    }
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
        this.onSubmit()
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("form failed")
      },
    );
  }



  departement: string = '';
  selectChangeDep(event: any) {
    this.departement = event.target.value;
  }

  doorS: string = '';
  selectChangeDoor(event: any) {
    this.doorS = event.target.value;
  }
  goToDeviceList() {
    this.router.navigate(['/alldevices']);
  }
  saveController(): void {
    this.savedCont.nomCont = this.contForm.value.name;
    this.savedCont.status = this.stat;
    this.savedCont.ipAdresse = this.contForm.value.Adresse;
    this.savedCont.serial_Number = this.contForm.value.sn;
    this.savedCont.nbrPorte=this.contForm.value.number;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const day = today.getDate();

    let m = month.toString().padStart(2, '0');
    let d = day.toString().padStart(2, '0');


    this.savedCont.dateStatus=`${year}-${m}-${d}`;
    const deptObs = this.DepService.getDepById(Number(this.departement))
    forkJoin([deptObs]).subscribe(([deptData]) => {
      this.savedCont.dept = deptData;
      console.log(this.savedCont)
      this.contService.createCont(this.savedCont).subscribe(data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Controller added successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.goToDeviceList();
      },
        error => console.log(error));
    });
  }
  saveReader(): void {
    this.savedReader.numLecteur= this.readerForm.value.NumL;
    this.savedReader.etatLecteur = this.stat;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const day = today.getDate();

    let m = month.toString().padStart(2, '0');
    let d = day.toString().padStart(2, '0');


    this.savedReader.dateStatus=`${year}-${m}-${d}`;
    const doorObs = this.doorService.getDoorById(Number(this.doorS))
    forkJoin([doorObs]).subscribe(([doorData]) => {
      this.savedReader.prt = doorData;
      console.log(doorData);
      const objectCount = Object.keys(doorData.lecteur).length;
      if (objectCount < 2) {
        this.readerService.createReader(this.savedReader).subscribe(data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Reader added successfully',
            showConfirmButton: false,
            timer: 1500
          });

          console.log(data);
          this.goToDeviceList();
          window.location.reload()
        },
          error => console.log(error));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Door have already 2 Reader !!"
        })
      }
    });

  }
  saveWave() {
    this.sevedWaveShare.nameDevice = this.waveForm.value.nameWave;
    this.sevedWaveShare.adresse = this.waveForm.value.adr;
    this.sevedWaveShare.status = this.stat;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const day = today.getDate();
    let m = month.toString().padStart(2, '0');
    let d = day.toString().padStart(2, '0');
    this.sevedWaveShare.dateStatus =`${year}-${m}-${d}`;
    this.waveService.createWave(this.sevedWaveShare).subscribe((data) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Reader added successfully',
        showConfirmButton: false,
        timer: 1500
      });

      console.log(this.sevedWaveShare);
      this.goToDeviceList();
    },
      error => console.log(error));
  }

  onSubmit() {
    if (this.dev == "Controller") {
      this.saveController();
    } else if (this.dev == "Reader") {
      this.saveReader();
    } else if (this.dev == "Waveshare") {
      this.saveWave()
    }
  }

  openUpdtReader(content: any, id: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        let role = this.userAuthService.getRoles();
        if (role.includes("user")) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "You don't have access to do that"
          })
        } else {
          this.updateRea(id)
        }
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("form failed")
        this.readerForm.reset();

      },
    );

    this.readerService.getReaderById(id).subscribe(
      (data) => {
        this.readerForm.patchValue({
          NumL: data.numLecteur,
          door: data.prt.idPorte,
          status: data.etatLecteur
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  befUpR(content: any, id: any) {
    let role = this.userAuthService.getRoles();
    if (role.includes("user")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    } else {
      this.openUpdtReader(content, id)
    }
  }

  befUpC(content: any, id: any) {
    let role = this.userAuthService.getRoles();
    if (role.includes("user")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    } else {
      this.openUpdtCont(content, id)
    }
  }

  befUpW(content: any, id: any) {
    let role = this.userAuthService.getRoles();
    if (role.includes("user")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    } else {
      this.openUpdtWave(content, id)
    }
  }


  openUpdtWave(content: any, id: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.updateWave(id)
      },
      (reason) => {
        console.log("form failed")
        this.waveForm.reset();

      },
    );
    this.waveService.getWaveById(id).subscribe(
      (data) => {
        this.waveForm.patchValue({
          nameWave: data.nameDevice,
          status: data.status,
          adr: data.adresse,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openUpdtCont(content: any, id: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.updateCont(id)
      },
      (reason) => {
        console.log("form failed")
        this.contForm.reset()
      }
    );
    this.contService.getContById(id).subscribe(
      (data) => {
        this.contForm.patchValue({
          name: data.nomCont,
          status: data.status,
          dep: data.dept.idDep,
          Adresse: data.ipAdresse,
          sn: data.serial_Number,
          number:data.nbrPorte
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCont(id: any) {
    this.savedCont.nomCont = this.contForm.value.name;
    this.savedCont.status = this.contForm.value.status;
    this.savedCont.ipAdresse = this.contForm.value.Adresse;
    this.savedCont.serial_Number = this.contForm.value.sn;
    this.savedCont.nbrPorte=this.contForm.value.number;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const day = today.getDate();

    let m = month.toString().padStart(2, '0');
    let d = day.toString().padStart(2, '0');


    this.savedCont.dateStatus=`${year}-${m}-${d}`;
    this.contService.getContById(id).subscribe((cont) => {
      let dep: any
      if (this.departement) {
        dep = Number(this.departement)
      } else {
        dep = cont.dept.idDep
      }
      const deptObs = this.DepService.getDepById(dep)
      forkJoin([deptObs]).subscribe(([deptData]) => {
        this.savedCont.dept = deptData;
        console.log(deptData);
        this.contService.updateCont(id, this.savedCont).subscribe(data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Controller '+ id + ' Updated successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.goToDeviceList();
        },
          error => console.log(error));
      });
    }
    )

  }
  updateRea(id: any) {
    this.savedReader.numLecteur= this.readerForm.value.NumL;
    this.savedReader.etatLecteur = this.readerForm.value.status;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const day = today.getDate();
    let m = month.toString().padStart(2, '0');
    let d = day.toString().padStart(2, '0');
    this.savedReader.dateStatus =`${year}-${m}-${d}`;
    this.readerService.getReaderById(id).subscribe((re) => {
      let ii = 0
      if (this.doorS) {
        ii = Number(this.doorS)
      } else {
        ii = re.prt.idPorte
      }
      const doorObs = this.doorService.getDoorById(ii)
      forkJoin([doorObs]).subscribe(([doorData]) => {
        console.warn(doorData)
        this.savedReader.prt = doorData;
        console.log(doorData);
        const objectCount = Object.keys(doorData.lecteur).length;
        console.warn(objectCount)
        if (objectCount < 2) {
          this.readerService.updateReader(id, this.savedReader).subscribe(data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Reader ' + id + ' Updated successfully',
              showConfirmButton: false,
              timer: 1500
            });
            this.goToDeviceList();
            window.location.reload()
          },
            error => console.log(error));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Door have already 2 Reader !!"
          })
        }
      },
        (error) => {
          console.log(error);
        }
      );
    }
    )

  }
  updateWave(id: any) {
    let role = this.userAuthService.getRoles();
    if (role.includes("user")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    } else {
      this.sevedWaveShare.nameDevice = this.waveForm.value.nameWave;
      this.sevedWaveShare.adresse = this.waveForm.value.adr;
      this.sevedWaveShare.status = this.waveForm.value.status;
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1; // Months are zero-based, so add 1
      const day = today.getDate();
      let m = month.toString().padStart(2, '0');
      let d = day.toString().padStart(2, '0');
      this.sevedWaveShare.dateStatus =`${year}-${m}-${d}`;
      this.waveService.updateWave(id, this.sevedWaveShare).subscribe((data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Waveshare ' + id + ' updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.goToDeviceList();
        window.location.reload()
      },
        error => console.log(error));
    }
  }

}
