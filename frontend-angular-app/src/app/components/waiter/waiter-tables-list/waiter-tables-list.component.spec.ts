import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterTablesListComponent } from './waiter-tables-list.component';

describe('WaiterTablesListComponent', () => {
  let component: WaiterTablesListComponent;
  let fixture: ComponentFixture<WaiterTablesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterTablesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterTablesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
