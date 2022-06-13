import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    }),
  };

  constructor(private http: HttpClient, private webService: WebService) { }

  register(payload: Object) {
    return this.http.post(`${this.webService.URL}/register`, payload, this.httpOptions);
  }

  login(payload: Object) {
    return this.http.post(`${this.webService.URL}/login`, payload, this.httpOptions);
  }
}
