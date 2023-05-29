import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/Service/user.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Departement } from 'src/app/model/Departement';
import { Profile } from 'src/app/model/Profile';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import e from 'cors';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm !:FormGroup;
  users: User[] = [];
  search: any;
  p: number = 1;
  roless = this.userAuthService.getRoles()
  updateUserMessage: string = '';
  createUserMessage: string = '';
  deleteUserMessage: string = '';
  user: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {

    this.userForm=this.formBuilder.group({
      email:['',Validators.required],
      Password:['',Validators.required],
    });

    this.getUsers();
  }

  onupdate(){
    this.updateUserMessage = 'Update User';
  }
  ondel(){
    this.updateUserMessage = 'Delete User';
  }
  onpwde(){
    this.updateUserMessage = 'Change PWD';
  }

  Search() {
    if (this.search == "") {
      this.ngOnInit()
    } else {
      this.users = this.users.filter(res => {
        return (res.firstname.toLowerCase().match(this.search.toLowerCase()) ||
          res.lastname.toLowerCase().match(this.search.toLowerCase()) ||
          res.email.toLowerCase().match(this.search.toLowerCase()) ||
          res.id.toString().toLowerCase().match(this.search.toLowerCase())
        );
      })
    }
  }

  addData() {
    let role = this.userAuthService.getRoles();
    if (role.includes("admin")) {
      this.router.navigate(['/addUserByAdmin']);
    } else {
      this.router.navigate(['/addUserByUser']);

    }
  }
  MenageProfile() {
    this.router.navigate(['/']);
  }

  private getUsers() {
    this.userService.getUsersList().subscribe(data => {
      this.users = data;
      console.log(this.users)
    });
  }



  updateUser(id: bigint) {
    let role = this.userAuthService.getRoles();
    if (role.includes("user")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to do that"
      })
    } else {
      this.router.navigate(['updateUser', id]);
    }
  }
  deleteUser(id: bigint) {
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
          this.userService.deleteUser(id, this.roless).subscribe(() => {
            console.log("deleted");
            Swal.fire(
              'Deleted!',
              'User ' + id + ' has been deleted.',
              'success'
            )
            this.getUsers();
            window.location.reload();
          }
          )
        }

      })
    }
  }

  fileDownload() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'User Data',
      useBom: true,
      headers: ['id', 'firstname', 'lastname', 'email', 'password', '', '', '', '', '', 'email', 'phone', 'image', 'code']
    };

    new ngxCsv(this.users, "Users", options);

  }

  open(content:any,id:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
        //this.onSubmit()
        this.update(id)
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("form failed")
        this.userForm.reset()
      },
    );
    this.userService.getUserById(id).subscribe(
      (data) => {
        console.warn(data)
        this.userForm.patchValue({
          email: data.email,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  update(id:any){
    let email=this.userForm.value.email;
    let ps =this.userForm.value.Password

    this.userService.updatePassword(id,ps).subscribe(()=>{
      this.userService.MailingUserPwdChanged(email).subscribe((data:any)=>{
        //console.warn(data)
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Password changed successfully',
        showConfirmButton: false,
        timer: 1500
      });
    },
    (error:any) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "There is something wrong !!"
      })
    })
  }


}
