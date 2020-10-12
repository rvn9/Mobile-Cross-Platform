import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Modal1Component } from './modal1.component';

describe('Modal1Component', () => {
  let component: Modal1Component;
  let fixture: ComponentFixture<Modal1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Modal1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Modal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
