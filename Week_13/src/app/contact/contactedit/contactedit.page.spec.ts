import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContacteditPage } from './contactedit.page';

describe('ContacteditPage', () => {
  let component: ContacteditPage;
  let fixture: ComponentFixture<ContacteditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContacteditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContacteditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
