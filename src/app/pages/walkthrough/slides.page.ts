/**
* Ionic Full App  (https://store.enappd.com/product/ionic-full-app-ionic-4-full-app)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  slideOpts = {
    effect: 'flip',
  };

  constructor(private route:Router,private menuCtrl:MenuController) {
   this.menuCtrl.enable(false);
   }

  ngOnInit() {
  }

  sliderChanges(event){
    console.log('sliderChanges',event);
  }
    
  skip() {
    console.log('skip slides');
    this.route.navigate(['login']);
  }

   ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

}
