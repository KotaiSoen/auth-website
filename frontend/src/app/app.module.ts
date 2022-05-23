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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebRequestInterceptor } from './web-req.interceptor';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PersonalInfoComponent,
    EditPersonalInfoComponent,
    CreatedByComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
