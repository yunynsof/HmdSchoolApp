import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimepickersPage } from './datetimepickers.page';

describe('DatetimepickersPage', () => {
  let component: DatetimepickersPage;
  let fixture: ComponentFixture<DatetimepickersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimepickersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimepickersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
