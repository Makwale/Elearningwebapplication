import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatabasequizPage } from './databasequiz.page';

describe('DatabasequizPage', () => {
  let component: DatabasequizPage;
  let fixture: ComponentFixture<DatabasequizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabasequizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatabasequizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
