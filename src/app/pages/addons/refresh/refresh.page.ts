import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../services/util/util.service';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.page.html',
  styleUrls: ['./refresh.page.scss'],
})
export class RefreshPage implements OnInit {
  initialData = [
    {
      'title': 'Burt Bear',
      'author': 'Enappd'
    },
    {
      'title': 'Isabella Iguana',
      'author': 'Fat Cat'
    },
    {
      'title': 'Donald Duck',
      'author': 'Enappd'
    },
    {
      'title': 'Lionel Lion',
      'author': 'Cute Cat'
    }
  ];
  loadedData = [];
  constructor(private util: UtilService) {

  }
  ngOnInit() {
    this.resetList();
  }
  doRefresh(event) {
    if (this.loadedData.length > 10) {
      setTimeout(() => {
        this.util.presentToast('No new data available', true, 'top', 1500);
        event.target.complete();
      }, 1000)
    } else {
      this.util.getApiResponse().subscribe(data => {
        console.log(data);
        const result = data['result'];
        result.forEach(element => {
          this.loadedData.unshift(element)
        });
        console.log('Async operation has ended');
        event.target.complete();
      })
    }
  }
  resetList() {
    this.loadedData = Object.assign([], this.initialData);;
  }
}
