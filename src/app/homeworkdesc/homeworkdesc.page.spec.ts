import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeworkdescPage } from './homeworkdesc.page';

describe('HomeworkdescPage', () => {
  let component: HomeworkdescPage;
  let fixture: ComponentFixture<HomeworkdescPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworkdescPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeworkdescPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
