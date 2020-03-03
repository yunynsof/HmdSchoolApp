import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DatetimepickersPage } from './datetimepickers.page';
import { SharableModule } from 'src/app/components/sharable.module';

const routes: Routes = [
  {
    path: '',
    component: DatetimepickersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DatetimepickersPage]
})
export class DatetimepickersPageModule {}
