import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HomeworkdescPage } from './homeworkdesc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeworkdescPage
      }
    ])
  ],
  declarations: [HomeworkdescPage]
})
export class HomeworkdescPageModule {}
