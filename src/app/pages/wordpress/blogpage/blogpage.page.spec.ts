import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpagePage } from './blogpage.page';

describe('BlogpagePage', () => {
  let component: BlogpagePage;
  let fixture: ComponentFixture<BlogpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
