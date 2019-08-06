import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierNewUserComponent } from './cashier-new-user.component';

describe('CashierNewUserComponent', () => {
  let component: CashierNewUserComponent;
  let fixture: ComponentFixture<CashierNewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierNewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
