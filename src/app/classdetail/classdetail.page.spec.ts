import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassdetailPage } from './classdetail.page';

describe('ClassdetailPage', () => {
  let component: ClassdetailPage;
  let fixture: ComponentFixture<ClassdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
