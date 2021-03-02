import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorInstructorsPage } from './instructor-instructors.page';

describe('InstructorInstructorsPage', () => {
  let component: InstructorInstructorsPage;
  let fixture: ComponentFixture<InstructorInstructorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorInstructorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorInstructorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
