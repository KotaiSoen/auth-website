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

  editPersonal(payload: Object) {
    return this.http.put(`${this.URL}/edit-personal`, payload, {withCredentials: true});
  }

  uploadPicture(payload: Object) {
    return this.http.put(`${this.URL}/uploadPicture`, payload, {withCredentials: true})
  }
}
