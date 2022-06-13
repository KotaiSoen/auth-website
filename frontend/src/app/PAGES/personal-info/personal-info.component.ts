import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../../web.service'

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  user: any[] = [];

  constructor(private webService: WebService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    // this.route.params.subscribe((params) => {
    //     const res = JSON.parse(params['res']);
    //     console.log(res);
    //     this.user.push(res);
    // })

    if(this.user.length === 0) {
      this.webService.getPersonalInfo().subscribe((res) => {
        console.log(res);
      })
    }
    
  }

}
