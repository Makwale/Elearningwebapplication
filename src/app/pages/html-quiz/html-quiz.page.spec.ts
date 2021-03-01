import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HtmlQuizPage } from './html-quiz.page';

describe('HtmlQuizPage', () => {
  let component: HtmlQuizPage;
  let fixture: ComponentFixture<HtmlQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HtmlQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
