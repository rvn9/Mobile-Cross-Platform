import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactindexPage } from './contactindex.page';

describe('ContactindexPage', () => {
  let component: ContactindexPage;
  let fixture: ComponentFixture<ContactindexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactindexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactindexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
