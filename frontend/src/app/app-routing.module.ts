import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPersonalInfoComponent } from './PAGES/edit-personal-info/edit-personal-info.component';
import { LoginComponent } from './PAGES/login/login.component';
import { PersonalInfoComponent } from './PAGES/personal-info/personal-info.component';
import { RegisterComponent } from './PAGES/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: 'edit-personal', component: EditPersonalInfoComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
