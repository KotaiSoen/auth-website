import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../../web.service'

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  users: any[] = [];

  constructor(private webService: WebService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.route.params.subscribe((params) => {
    //     const res = JSON.parse(params['res']);
    //     console.log(res);
    //     this.user.push(res);
    // })
    this.webService.getPersonalInfo().subscribe((res: any) => {
      console.log(res);
      this.users = res;
    })


  }

}
