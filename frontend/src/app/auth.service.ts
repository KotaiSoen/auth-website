import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    }),
    withCredentials: true
  };

  httpOptionsTwo = {
    headers: new HttpHeaders({
      'Content-Type' : 'text/plain'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient, private webService: WebService) { }

  register(payload: Object) {
    return this.http.post(`${this.webService.URL}/register`, payload, this.httpOptions);
  }

  login(payload: Object) {
    return this.http.post(`${this.webService.URL}/login`, payload, this.httpOptions);
  }

  logout() {
    return this.http.get(`${this.webService.URL}/logout`, this.httpOptions)
  }

  changePassword(payload: Object) {
    return this.http.post(`${this.webService.URL}/change-password`, payload, {withCredentials: true});
  }
}
