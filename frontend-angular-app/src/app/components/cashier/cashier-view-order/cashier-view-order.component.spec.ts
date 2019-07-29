import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierViewOrderComponent } from './cashier-view-order.component';

describe('CashierViewOrderComponent', () => {
  let component: CashierViewOrderComponent;
  let fixture: ComponentFixture<CashierViewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierViewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierViewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
