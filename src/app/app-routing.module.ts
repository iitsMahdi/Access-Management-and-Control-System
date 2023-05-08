import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { HasRoleGuard } from './auth/has-role.guard';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent

  },
  {
  path: '',
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  canActivate:[AuthGuard,HasRoleGuard],  data:{
    roles:['admin','user']
  }

},
{
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
