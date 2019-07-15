import { NgModule } from "@angular/core";
import { ChefDashboardComponent } from "src/app/components/chef/chef-dashboard/chef-dashboard.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MaterialComponentsModule } from "../material-components/material-components.module";
import { ChefOrderDetailComponent } from "src/app/components/chef/chef-order-detail/chef-order-detail.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [ChefDashboardComponent, ChefOrderDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MaterialComponentsModule,
    SharedModule
  ]
})
export class ChefModule {}
