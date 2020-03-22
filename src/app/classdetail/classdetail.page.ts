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

  constructor(
    private route: ActivatedRoute, 
    private router: Router
    ) {
    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state;

        this.title = this.data.name;
        this.professor = this.data.professorName;
        this.partialNotes(this.data.classDetail)
      }
    });

    this.userDetails = { profileUrl: "./assets/icon/avatar.png" };
    this.selectSegment = 'profile';
  }

  ngOnInit() {

  }

  partialNotes(detail) {

    for (let i = 0; i < detail.length; i++) {
      if (detail[i].codeParcial == 'I') {
        this.firstPartialNote = detail[i].score;
      } else
        if (detail[i].codeParcial == 'II') {
          this.secondPartialNote = detail[i].score;
        } else
          if (detail[i].codeParcial == 'III') {
            this.thirdPartialNote = detail[i].score;
          } else
            if (detail[i].codeParcial == 'IV') {
              this.fourthPartialNote = detail[i].score;
            }
    }
    this.promNote = (this.firstPartialNote + this.secondPartialNote + this.thirdPartialNote + this.fourthPartialNote) / 4;
  }

}
