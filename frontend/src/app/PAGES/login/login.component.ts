import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  googleLogin() {
    window.location.href = "https://serene-sierra-33552.herokuapp.com/users/auth/google"
  }

  facebookLogin() {
    window.location.href = "https://serene-sierra-33552.herokuapp.com/users/auth/facebook"
  }

  githubLogin() {
    window.location.href = "https://serene-sierra-33552.herokuapp.com/users/auth/github"
  }

  twitterLogin() {
    window.location.href = "https://serene-sierra-33552.herokuapp.com/users/auth/twitter"
  }

  onSubmit() {
    console.log('clicked');
    this.authService.login(this.checkoutForm.value).subscribe((res) => {
      console.log(res);
      // if(res) {
      //   this.router.navigate(['/personal-info', { res: JSON.stringify(res) }])
      // }
      if(res) {
        this.router.navigate(['/personal-info']);
      }
    })
  }

}


