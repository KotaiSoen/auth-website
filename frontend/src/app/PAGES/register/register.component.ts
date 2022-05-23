import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MidAuthService } from 'src/app/mid-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private midService: MidAuthService) { }

  ngOnInit(): void {
  }

  onSignUpButtonClicked(email: string, password: string) {
    this.midService.signUp(email, password).subscribe((res: HttpResponse<any>) => {
      
    })
  }

}
