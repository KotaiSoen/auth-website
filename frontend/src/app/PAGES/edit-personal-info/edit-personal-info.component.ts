import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.css']
})
export class EditPersonalInfoComponent implements OnInit {

  users: any[] = [];


  constructor(private webService: WebService, private router: Router) { }

  ngOnInit(): void {
    this.getPersonalInfo();
  }

  getPersonalInfo() {
    this.webService.getPersonalInfo().subscribe((res: any) => {
      console.log(res);
      this.users = res;
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

}
