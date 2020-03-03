/**
* Ionic Full App  (https://store.enappd.com/product/ionic-full-app-ionic-4-full-app)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreezePage } from './breeze.page';

describe('BreezePage', () => {
  let component: BreezePage;
  let fixture: ComponentFixture<BreezePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreezePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreezePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});