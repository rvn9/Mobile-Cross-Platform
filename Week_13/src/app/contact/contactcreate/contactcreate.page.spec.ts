import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactcreatePage } from './contactcreate.page';

describe('ContactcreatePage', () => {
  let component: ContactcreatePage;
  let fixture: ComponentFixture<ContactcreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactcreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactcreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
