import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

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
  score;
  teacher;
  selectSegment;
  
  constructor(
     private route: ActivatedRoute,
     private appComponent: AppComponent,
     private router: Router) {
    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {
    
          this.class = this.router.getCurrentNavigation().extras.state.data.class;
          this.date =  this.router.getCurrentNavigation().extras.state.data.presentation_date[2] + ' ' + this.appComponent.obtainMonth(this.router.getCurrentNavigation().extras.state.data.presentation_date[1]) + ' ' + 'del' + ' ' + this.router.getCurrentNavigation().extras.state.data.presentation_date[0];
          this.detail = this.router.getCurrentNavigation().extras.state.data.tittle;
          this.score = this.router.getCurrentNavigation().extras.state.data.score;
          this.teacher = this.router.getCurrentNavigation().extras.state.data.teacher;
          this.description = this.router.getCurrentNavigation().extras.state.data.description;
          this.title = this.class;

      }
      this.selectSegment = 'profile';
    });
  }

  ngOnInit() {
  }

}
