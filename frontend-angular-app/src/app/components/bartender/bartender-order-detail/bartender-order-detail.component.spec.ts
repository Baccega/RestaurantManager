import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BartenderOrderDetailComponent } from './bartender-order-detail.component';

describe('BartenderOrderDetailComponent', () => {
  let component: BartenderOrderDetailComponent;
  let fixture: ComponentFixture<BartenderOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BartenderOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BartenderOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
