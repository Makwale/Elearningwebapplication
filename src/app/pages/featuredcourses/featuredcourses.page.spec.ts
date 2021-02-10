import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeaturedcoursesPage } from './featuredcourses.page';

describe('FeaturedcoursesPage', () => {
  let component: FeaturedcoursesPage;
  let fixture: ComponentFixture<FeaturedcoursesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedcoursesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedcoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
