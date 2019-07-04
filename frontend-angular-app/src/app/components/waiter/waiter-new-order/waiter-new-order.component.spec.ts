import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterNewOrderComponent } from './waiter-new-order.component';

describe('WaiterNewOrderComponent', () => {
  let component: WaiterNewOrderComponent;
  let fixture: ComponentFixture<WaiterNewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterNewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
