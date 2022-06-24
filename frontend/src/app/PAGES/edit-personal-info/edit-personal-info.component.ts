import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.css']
})
export class EditPersonalInfoComponent implements OnInit {

  users: any[] = [];

  passwordChange: string = '';


  constructor(private webService: WebService, private router: Router, private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPersonalInfo();
  }

  getPersonalInfo() {
    this.spinner.show();
    this.webService.getPersonalInfo().subscribe((res: any) => {
      console.log(res);
      this.users = res;
      this.spinner.hide();
    })
  }

  update(name: string, bio: string, phoneNumber: string, email: any) {
    const user = {name, bio, phoneNumber, email}
    console.log(user);
    this.webService.editPersonal(user).subscribe((res) => {
      if(res) {
        this.router.navigate(['/personal-info']);
      }
    })
  }

  uploadPicture(event: any) {

    const file = event.target.files[0];
    
    console.log(file)

    const formdata = new FormData();
    formdata.append('file', file)

    this.webService.uploadPicture(formdata).subscribe((res) => {
      if(res) {
        this.getPersonalInfo();
      }
    })

  }

  changePassword(password: string) {
    const pw = {password}
    this.authService.changePassword(pw).subscribe((res: any) => {
      console.log(res);
      // this.passwordChange = res;
    })
  }

}
