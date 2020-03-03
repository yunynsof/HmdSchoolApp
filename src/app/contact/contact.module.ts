import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'

import { ContactPage } from './contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    AgmDirectionModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactPage
      }
    ])
  ],
  declarations: [ContactPage]
})
export class ContactPageModule {}
