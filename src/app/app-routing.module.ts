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
      {path: 'client/delete/:id', component: ClientDeleteComponent}
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
