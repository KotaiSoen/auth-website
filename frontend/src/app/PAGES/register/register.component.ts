import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  googleLogin() {
    window.location.href = "http://localhost:3000/users/auth/google"
  }

  facebookLogin() {
    window.location.href = "http://localhost:3000/users/auth/facebook"
  }

  githubLogin() {
    window.location.href = "http://localhost:3000/users/auth/github"
  }

  twitterLogin() {
    window.location.href = "http://localhost:3000/users/auth/twitter"
  }

  onSubmit() {
    console.log('clicked')
    this.authService.register(this.checkoutForm.value).subscribe((res) => {
      console.log(res);
      if(res) {
        this.router.navigate(['/personal-info']);
      } else {
        return
      }
    })
  }

}
