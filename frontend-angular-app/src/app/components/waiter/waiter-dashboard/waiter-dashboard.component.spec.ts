import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterDashboardComponent } from './waiter-dashboard.component';

describe('WaiterDashboardComponent', () => {
  let component: WaiterDashboardComponent;
  let fixture: ComponentFixture<WaiterDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
