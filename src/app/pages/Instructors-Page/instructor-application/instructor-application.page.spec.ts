import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorApplicationPage } from './instructor-application.page';

describe('InstructorApplicationPage', () => {
  let component: InstructorApplicationPage;
  let fixture: ComponentFixture<InstructorApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
