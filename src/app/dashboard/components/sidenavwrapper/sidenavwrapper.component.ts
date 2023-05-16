import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-sidenavwrapper',
  templateUrl: './sidenavwrapper.component.html',
  styleUrls: ['./sidenavwrapper.component.css']
})
export class SidenavwrapperComponent implements AfterViewInit {
  isExpanded: boolean = true;
  target!:string;
  constructor(private userService : UserService,    private router: Router,
    ) {}

  ngAfterViewInit(): void {const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

  allSideMenu.forEach(item => {
      const li = item.parentElement;

      item.addEventListener('click', function () {
          allSideMenu.forEach(i => {
              i.parentElement?.classList.remove('active');
          })
          li?.classList.add('active');
      })
  });

  const menuBar = document.querySelector('#content nav .bx.bx-menu');
  const sidebar = document.getElementById('sidebar');

  menuBar?.addEventListener('click', function () {
      sidebar?.classList.toggle('hide');
  })

  const searchButton = document.querySelector('#content nav form .form-input button');
  const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
  const searchForm = document.querySelector('#content nav form');

  searchButton?.addEventListener('click', function (e) {
      if (window.innerWidth < 576) {
          e.preventDefault();
          searchForm?.classList.toggle('show');
          if (searchForm?.classList.contains('show')) {
              searchButtonIcon?.classList.replace('bx-search', 'bx-x');
          } else {
              searchButtonIcon?.classList.replace('bx-x', 'bx-search');
          }
      }
  })

  if (window.innerWidth < 768) {
      sidebar?.classList.add('hide');
  } else if (window.innerWidth > 576) {
      searchButtonIcon?.classList.replace('bx-x', 'bx-search');
      searchForm?.classList.remove('show');
  }

  window.addEventListener('resize', function () {
      if (this.innerWidth > 576) {
          searchButtonIcon?.classList.replace('bx-x', 'bx-search');
          searchForm?.classList.remove('show');
      }
  })

  }

  ok():void {
  }

  logOut(){
    console.log('disconnected')
    this.userService.logoutUser();
  }

  set(ch:string){
    this.target=ch
  }
  prof(){
    this.router.navigate(['/account']);

  }
}





