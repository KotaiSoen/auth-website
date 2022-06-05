import { Component, OnInit } from '@angular/core';
import { WebService } from '../../web.service'

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  user!: any[];

  constructor(private webService: WebService) { }

  ngOnInit(): void {
    this.webService.getPersonalInfo().subscribe((res) => {
      console.log(res);
    })
  }

}
