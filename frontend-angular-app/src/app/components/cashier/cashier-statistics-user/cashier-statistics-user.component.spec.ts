import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierStatisticsUserComponent } from './cashier-statistics-user.component';

describe('CashierStatisticsUserComponent', () => {
  let component: CashierStatisticsUserComponent;
  let fixture: ComponentFixture<CashierStatisticsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierStatisticsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierStatisticsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
