/**
* Ionic Full App  (https://store.enappd.com/product/ionic-full-app-ionic-4-full-app)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UtilService } from '../services/util/util.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate {


  constructor(
    private util: UtilService,
    private navController: NavController,
    public auth: AuthService
  ) { }

  canActivate(): boolean {

    if (this.auth.isAuthenticated()) {
      return true;
    }
    else {

      this.navController.navigateRoot(['login']);
      return false;
    }
  }

}
