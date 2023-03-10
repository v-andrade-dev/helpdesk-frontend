import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClientCreateComponent } from './components/client/client-create/client-create.component';
import { ClientDeleteComponent } from './components/client/client-delete/client-delete.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientUpdateComponent } from './components/client/client-update/client-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { RequestCreateComponent } from './components/request/request-create/request-create.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';
import { RequestReadComponent } from './components/request/request-read/request-read.component';
import { RequestUpdateComponent } from './components/request/request-update/request-update.component';
import { TechnicianCreateComponent } from './components/technician/technician-create/technician-create.component';
import { TechnicianDeleteComponent } from './components/technician/technician-delete/technician-delete.component';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { TechnicianUpdateComponent } from './components/technician/technician-update/technician-update.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},

  {
    path: '', component: NavComponent, canActivate:[AuthGuard], children: [
      {path: 'home', component: HomeComponent},
      {path: 'technician', component: TechnicianListComponent},
      {path: 'technician/create', component: TechnicianCreateComponent},
      {path: 'technician/update/:id', component: TechnicianUpdateComponent},
      {path: 'technician/delete/:id', component: TechnicianDeleteComponent},

      {path: 'client', component: ClientListComponent},
      {path: 'client/create', component: ClientCreateComponent},
      {path: 'client/update/:id', component: ClientUpdateComponent},
      {path: 'client/delete/:id', component: ClientDeleteComponent},

      {path: 'request', component: RequestListComponent},
      {path: 'request/create', component: RequestCreateComponent},
      {path: 'request/update/:id', component: RequestUpdateComponent},
      {path: 'request/read/:id', component: RequestReadComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
