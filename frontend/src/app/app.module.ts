import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './PAGES/register/register.component';
import { LoginComponent } from './PAGES/login/login.component';
import { PersonalInfoComponent } from './PAGES/personal-info/personal-info.component';
import { EditPersonalInfoComponent } from './PAGES/edit-personal-info/edit-personal-info.component';
import { MatIconModule } from '@angular/material/icon';
import { CreatedByComponent } from './PAGES/created-by/created-by.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './PAGES/logout/logout.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PersonalInfoComponent,
    EditPersonalInfoComponent,
    CreatedByComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }