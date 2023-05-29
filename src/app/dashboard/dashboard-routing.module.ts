import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
import { UpdateDeptComponent } from './components/updateForm/update-dept/update-dept.component';
import { UpdateControllerComponent } from './components/updateForm/update-controller/update-controller.component';
import { HasRoleGuard } from '../auth/has-role.guard';
import { UpdateReaderComponent } from './components/updateForm/update-reader/update-reader.component';
import { UpdateWaveComponent } from './components/updateForm/update-wave/update-wave.component';
import { InfoComponent } from './components/info/info.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { AdduserByUserComponent } from './components/addForm/adduser-by-user/adduser-by-user.component';

const routes: Routes = [
  // Sidenavwrapper Component acts like a shell & the active child Component gets rendered into the <router-outlet>
  {
    path: '',
    component: SidenavwrapperComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['admin','user']
        }
      },
      {
        path: 'alluser',
        component: UserComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['user','admin']
        }
      },
      {
        path: 'alldoors',
        component: DoorsComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['user','admin']
        }
      },
      {
        path: 'alldevices',
        component: DevicesComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['user','admin']
        }
      },
      {
        path: 'alldepartements',
        component: DepartementsComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['user','admin']
        }
      },
      {
        path: 'accessC',
        component: AccessControlComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['user','admin']
        }
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['user','admin']
        }
      },
      {
        path: 'history',
        component: HistoriqueComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['user','admin']
        }
      },
      {
        path:'addUserByAdmin',
        component:AddUserComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['admin','user']
        }
      },
      {
        path:'addUserByUser',
        component:AdduserByUserComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['admin','user']
        }
      },
      {
        path:'addDoor',
        component:AddDoorComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['admin']
        }
      },
      {
        path:'addDept',
        component:AddDeptComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['admin']
        }
      },
      {
        path:'addDevice',
        component:AddDeviceComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['admin']
        }
      },
      {
        path:'updateUser/:id',
        component:UpdateUserComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['admin']
        }
      },
      {
        path:'allProfiles',
        component:ProfilesComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['user','admin']
        }
      },
      {
        path:'account/:id',
        component:AccountComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['admin','user']
        }
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'updateDoor/:id',
        component:UpdateDoorComponent,
        canActivate:[AuthGuard,HasRoleGuard],
        data:{
          roles:['admin']
        }
      },
      {
        path:'updateDep/:id',
        component:UpdateDeptComponent,
        canActivate:[AuthGuard],data:{
          roles:['admin',HasRoleGuard]
        }
      },
      {
        path:'updateCont/:id',
        component:UpdateControllerComponent,
        canActivate:[AuthGuard],
        data:{
          roles:['admin',HasRoleGuard]
        }
      },
      {
        path:'updateRea/:id',
        component:UpdateReaderComponent,
        canActivate:[AuthGuard],
        data:{
          roles:['admin',HasRoleGuard]
        }
      },
      {
        path:'updateWave/:id',
        component:UpdateWaveComponent,
        canActivate:[AuthGuard],
        data:{
          roles:['admin',HasRoleGuard]
        }
      },
      {
        path:'info',
        component:InfoComponent,
        canActivate:[AuthGuard],
        data:{
          roles:['admin',HasRoleGuard]
        }
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
