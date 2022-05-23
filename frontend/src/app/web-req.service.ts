import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebReqService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getPersonalInfo() {
    return this.http.get(`${this.authService.URL}/users/personal-info`);
  }
}
