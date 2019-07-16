import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterTableListComponent } from './waiter-table-list.component';

describe('WaiterTableListComponent', () => {
  let component: WaiterTableListComponent;
  let fixture: ComponentFixture<WaiterTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
