import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChefOrderListComponent } from "./chef-order-list.component";

describe("ChefOrderListComponent", () => {
  let component: ChefOrderListComponent;
  let fixture: ComponentFixture<ChefOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChefOrderListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
