import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  URL = 'http://localhost:3000/users'

  

  constructor(private http: HttpClient) { }

  getPersonalInfo() {
    return this.http.get(`${this.URL}/personal-info`, {withCredentials: true});
  }
}
