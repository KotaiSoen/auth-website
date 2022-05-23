import { Component, OnInit } from '@angular/core';
import { WebReqService } from 'src/app/web-req.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  user!: any[];

  constructor(private webService: WebReqService) { }

  ngOnInit(): void {
    this.webService.getPersonalInfo().subscribe((res: any) => {
      console.log(res);
      this.user = res;
    })
  }

}
