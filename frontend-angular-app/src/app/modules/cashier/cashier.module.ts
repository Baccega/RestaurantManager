import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "src/app/app-routing.module";
import { CashierDashboardComponent } from "src/app/components/cashier/cashier-dashboard/cashier-dashboard.component";

@NgModule({
  declarations: [CashierDashboardComponent],
  imports: [CommonModule, AppRoutingModule]
})
export class CashierModule {}
