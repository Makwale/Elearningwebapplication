import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Quize1Page } from './quize1.page';

describe('Quize1Page', () => {
  let component: Quize1Page;
  let fixture: ComponentFixture<Quize1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quize1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Quize1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
