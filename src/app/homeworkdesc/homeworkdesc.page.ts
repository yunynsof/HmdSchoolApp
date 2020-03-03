import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-homeworkdesc',
  templateUrl: './homeworkdesc.page.html',
  styleUrls: ['./homeworkdesc.page.scss'],
})
export class HomeworkdescPage implements OnInit {

  class;
  date;
  detail;
  description;
  title;
  selectSegment;
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {
          this.class = this.router.getCurrentNavigation().extras.state.data.class;
          this.date = this.router.getCurrentNavigation().extras.state.data.date;
          this.detail = this.router.getCurrentNavigation().extras.state.data.detail;
          this.description = this.router.getCurrentNavigation().extras.state.data.description;

          this.title = this.class;

      }
      this.selectSegment = 'profile';
    });
  }

  ngOnInit() {
  }

}
