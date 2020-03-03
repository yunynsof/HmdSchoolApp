import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-classdetail',
  templateUrl: './classdetail.page.html',
  styleUrls: ['./classdetail.page.scss'],
})
export class ClassdetailPage implements OnInit {

  data: any;
  title;
  firstPartialNote;
  secondPartialNote;
  thirdPartialNote;
  fourthPartialNote;
  promNote;
  selectSegment;
  userDetails;
  professor;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state;
        this.title = this.data.name;
        this.professor = this.data.professorName;
      }
    });
    this.userDetails = { profileUrl: "./assets/icon/avatar.png" };
    this.selectSegment = 'profile';
  }

  ngOnInit() {
    this.firstPartialNote = 80;
    this.secondPartialNote = 50;
    this.thirdPartialNote = 100;
    this.fourthPartialNote = 2;
    this.promNote = (this.firstPartialNote + this.secondPartialNote + this.thirdPartialNote + this.fourthPartialNote) / 4;

  }

}
