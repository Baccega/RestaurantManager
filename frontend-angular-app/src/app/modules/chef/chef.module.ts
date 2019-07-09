import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChefDashboardComponent } from "src/app/components/chef/chef-dashboard/chef-dashboard.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MaterialComponentsModule } from "../material-components/material-components.module";
import { ChefOrderDetailComponent } from "src/app/components/chef/chef-order-detail/chef-order-detail.component";

@NgModule({
  declarations: [ChefDashboardComponent, ChefOrderDetailComponent],
  imports: [CommonModule, AppRoutingModule, MaterialComponentsModule]
})
export class ChefModule {}
