import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericBlockListComponent } from './generic-block-list.component';

describe('GenericBlockListComponent', () => {
  let component: GenericBlockListComponent;
  let fixture: ComponentFixture<GenericBlockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericBlockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
