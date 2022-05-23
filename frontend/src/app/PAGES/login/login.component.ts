import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { MidAuthService } from 'src/app/mid-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private midService: MidAuthService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onLoginButtonClicked(email: string, password: string) {
    this.midService.login(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    })
  }

}


