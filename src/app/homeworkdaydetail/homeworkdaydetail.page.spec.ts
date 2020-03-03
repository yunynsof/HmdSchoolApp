import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeworkdaydetailPage } from './homeworkdaydetail.page';

describe('HomeworkdaydetailPage', () => {
  let component: HomeworkdaydetailPage;
  let fixture: ComponentFixture<HomeworkdaydetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworkdaydetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeworkdaydetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
