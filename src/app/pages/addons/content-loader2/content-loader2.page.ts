import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-loader2',
  templateUrl: './content-loader2.page.html',
  styleUrls: ['./content-loader2.page.scss'],
})
export class ContentLoader2Page implements OnInit {
  data: any;

  constructor() {}

  ionViewWillEnter() {
    setTimeout(() => {
      this.data = {
        'heading': 'Normal text',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'adipiscing elit.'
      };
    }, 5000);
  }
  ngOnInit() {
  }

}
