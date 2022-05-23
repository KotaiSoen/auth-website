import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post(`${this.URL}/users/login`, {
      email,
      password
    }, { observe: 'response' })
  }

  signUp(email: string, password: string) {
    return this.http.post(`${this.URL}/users/sign-up`, {
      email,
      password
    }, { observe: 'response' })
  }
}
