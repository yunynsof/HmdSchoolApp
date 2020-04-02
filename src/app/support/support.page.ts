import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  items: any = [];
  dataObtain;

  constructor(
    private appComponent: AppComponent,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.alertService.present();
    this.authService.support().then(data => {

      this.dataObtain = data;
      if (this.dataObtain != null) {
        this.items = [];

        for (let i = 0; i < this.dataObtain.length; i++) {

          this.items.push({
            question: this.dataObtain[i].question,
            answers: this.dataObtain[i].answers,
            expanded: false
          });
        }
        this.alertService.dismiss();
      }else setTimeout(() => this.errorSupport(), 1000);
    });
  }

  errorSupport() {
    this.alertService.dismiss();
    this.alertService.errorSupport('Verifique otra fecha en la agenda');
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  ngOnInit() {
  }

  iconStudent() {
    this.appComponent.iconStudent();
  }

}
