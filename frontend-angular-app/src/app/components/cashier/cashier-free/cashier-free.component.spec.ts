import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierFreeComponent } from './cashier-free.component';

describe('CashierFreeComponent', () => {
  let component: CashierFreeComponent;
  let fixture: ComponentFixture<CashierFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
