import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterNewTableComponent } from './waiter-new-table.component';

describe('WaiterNewTableComponent', () => {
  let component: WaiterNewTableComponent;
  let fixture: ComponentFixture<WaiterNewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterNewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterNewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
