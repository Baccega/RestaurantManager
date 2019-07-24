import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierBusyComponent } from './cashier-busy.component';

describe('CashierBusyComponent', () => {
  let component: CashierBusyComponent;
  let fixture: ComponentFixture<CashierBusyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierBusyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierBusyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
