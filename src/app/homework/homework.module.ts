import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { HomeworkPage } from './homework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeworkPage
      }
    ])
  ],
  declarations: [HomeworkPage]
})
export class HomeworkPageModule {}
