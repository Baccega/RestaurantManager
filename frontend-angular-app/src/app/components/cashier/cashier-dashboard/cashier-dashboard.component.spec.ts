import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierDashboardComponent } from './cashier-dashboard.component';

describe('CashierDashboardComponent', () => {
  let component: CashierDashboardComponent;
  let fixture: ComponentFixture<CashierDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
