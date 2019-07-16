import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterTableDetailComponent } from './waiter-table-detail.component';

describe('WaiterTableDetailComponent', () => {
  let component: WaiterTableDetailComponent;
  let fixture: ComponentFixture<WaiterTableDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterTableDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
