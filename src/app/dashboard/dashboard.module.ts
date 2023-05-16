import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { UserComponent } from './components/user/user.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidenavwrapperComponent } from './components/sidenavwrapper/sidenavwrapper.component';
import {MatTableModule} from '@angular/material/table';
import { DevicesComponent } from './components/devices/devices.component';
import { DoorsComponent } from './components/doors/doors.component';
import { DepartementsComponent } from './components/departements/departements.component';
import { AccessControlComponent } from './components/access-control/access-control.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AddUserComponent } from './components/addForm/add-user/add-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UpdateUserComponent } from './components/updateForm/update-user/update-user.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialgAddProfileComponent } from './components/addForm/dialg-add-profile/dialg-add-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgChartsModule } from 'ng2-charts';
import { AddDoorComponent } from './components/addForm/add-door/add-door.component';
import { AddDeviceComponent } from './components/addForm/add-device/add-device.component';
import { AddDeptComponent } from './components/addForm/add-dept/add-dept.component';
import { AddReaderComponent } from './components/addForm/add-reader/add-reader.component';
import { AccountComponent } from './components/account/account.component';
import { UpdateDoorComponent } from './components/updateForm/update-door/update-door.component';
import { AuthGuard } from '../auth/auth.guard';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { UpdateDeptComponent } from './components/updateForm/update-dept/update-dept.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateControllerComponent } from './components/updateForm/update-controller/update-controller.component';
import { UpdateReaderComponent } from './components/updateForm/update-reader/update-reader.component';
import { HasRoleGuard } from '../auth/has-role.guard';
import { InjectableRxStomp } from './rx-stomp';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgToastModule } from 'ng-angular-popup';
import { AddWaveComponent } from './components/addForm/add-wave/add-wave.component';
import { UpdateWaveComponent } from './components/updateForm/update-wave/update-wave.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HistoriqueComponent } from './components/historique/historique.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InfoComponent,
    UserComponent,
    SidenavwrapperComponent,
    DevicesComponent,
    DoorsComponent,
    DepartementsComponent,
    AccessControlComponent,
    AttendanceComponent,
    AddUserComponent,
    UpdateUserComponent,
    ProfilesComponent,
    DialgAddProfileComponent,
    AddDoorComponent,
    AddDeviceComponent,
    AddDeptComponent,
    AddReaderComponent,
    UpdateDoorComponent,
    AccountComponent,
    UpdateDeptComponent,
    UpdateControllerComponent,
    UpdateReaderComponent,
    AddWaveComponent,
    UpdateWaveComponent,
    HistoriqueComponent,

  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
    NgChartsModule,
    NgxPaginationModule,
    NgApexchartsModule,
    NgToastModule,
    NgbModule
    ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true},
    AuthGuard,HasRoleGuard,NgbModal
  ]
})
export class DashboardModule { }
