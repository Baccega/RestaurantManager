import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChefDashboardComponent } from "src/app/components/chef/chef-dashboard/chef-dashboard.component";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [ChefDashboardComponent],
  imports: [CommonModule, AppRoutingModule]
})
export class ChefModule {}
