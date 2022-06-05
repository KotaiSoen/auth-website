import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private webService: WebService) { }

  register(payload: Object) {
    return this.http.post(`${this.webService.URL}/register`, payload);
  }

  login(payload: Object) {
    return this.http.post(`${this.webService.URL}/login`, payload);
  }
}
