import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLoader2Page } from './content-loader2.page';

describe('ContentLoader2Page', () => {
  let component: ContentLoader2Page;
  let fixture: ComponentFixture<ContentLoader2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentLoader2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLoader2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
