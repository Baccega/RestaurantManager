import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefOrderDetailComponent } from './chef-order-detail.component';

describe('ChefOrderDetailComponent', () => {
  let component: ChefOrderDetailComponent;
  let fixture: ComponentFixture<ChefOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
