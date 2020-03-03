import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-homeworkdaydetail',
  templateUrl: './homeworkdaydetail.page.html',
  styleUrls: ['./homeworkdaydetail.page.scss'],
})
export class HomeworkdaydetailPage implements OnInit {

  date: any;
  cant: any;
  assignments: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private alertService: AlertService
    ) {
    this.alertService.present();
    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {
        this.date = this.router.getCurrentNavigation().extras.state.data.date;
        this.cant = this.router.getCurrentNavigation().extras.state.data.assignment;

        for (let i = 0; i < this.cant.length; i++) {
          this.assignments = this.cant;
        }
      }
    });
    this.alertService.dismiss();
  }

  ngOnInit() {
  }

  detailPage(data) {

    let navigationExtras: NavigationExtras = {
      state: {
        data: data
      }
    };
    this.router.navigate(['homeworkdesc'], navigationExtras);
  }
}
