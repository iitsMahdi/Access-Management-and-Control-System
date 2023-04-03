import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { UserComponent } from './components/user/user.component';
import { SidenavwrapperComponent } from './components/sidenavwrapper/sidenavwrapper.component';
import { DoorsComponent } from './components/doors/doors.component';
import { DevicesComponent } from './components/devices/devices.component';
import { DepartementsComponent } from './components/departements/departements.component';
import { AccessControlComponent } from './components/access-control/access-control.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AddUserComponent } from './components/addForm/add-user/add-user.component';
import { UpdateUserComponent } from './components/updateForm/update-user/update-user.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { AddDoorComponent } from './components/addForm/add-door/add-door.component';
import { AddDeptComponent } from './components/addForm/add-dept/add-dept.component';
import { AddDeviceComponent } from './components/addForm/add-device/add-device.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateDoorComponent } from './components/updateForm/update-door/update-door.component';

const routes: Routes = [
  // Sidenavwrapper Component acts like a shell & the active child Component gets rendered into the <router-outlet>
  {
    path: '',
    component: SidenavwrapperComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        /*canActivate:[AuthGuard], data:{roles:['Admin']}*/ },
      {
        path: 'alluser',
        component: UserComponent
      },
      {
        path: 'alldoors',
        component: DoorsComponent
      },
      {
        path: 'alldevices',
        component: DevicesComponent
      },
      {
        path: 'alldepartements',
        component: DepartementsComponent
      },
      {
        path: 'accessC',
        component: AccessControlComponent
      },
      {
        path: 'attendance',
        component: AttendanceComponent
      },
      {
        path:'addUser',
        component:AddUserComponent
      },
      {
        path:'addDoor',
        component:AddDoorComponent
      },
      {
        path:'addDept',
        component:AddDeptComponent
      },
      {
        path:'addDevice',
        component:AddDeviceComponent
      },
      {
        path:'updateUser/:id',
        component:UpdateUserComponent
      },
      {
        path:'allProfiles',
        component:ProfilesComponent
      },
      {
        path:'account',
        component:AccountComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'updateDoor/:id',
        component:UpdateDoorComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
