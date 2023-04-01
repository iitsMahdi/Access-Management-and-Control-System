import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenavwrapper',
  templateUrl: './sidenavwrapper.component.html',
  styleUrls: ['./sidenavwrapper.component.css']
})
export class SidenavwrapperComponent {
  isExpanded: boolean = false;

  constructor() {}
  ok():void{

  }
}
