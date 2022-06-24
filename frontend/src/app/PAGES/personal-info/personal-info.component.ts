import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebService } from '../../web.service'

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  users: any[] = [];

  constructor(private webService: WebService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    // this.route.params.subscribe((params) => {
    //     const res = JSON.parse(params['res']);
    //     console.log(res);
    //     this.user.push(res);
    // })
    this.webService.getPersonalInfo().subscribe((res: any) => {
      console.log(res);
      this.users = res;
      this.spinner.hide();
    })


  }

}
