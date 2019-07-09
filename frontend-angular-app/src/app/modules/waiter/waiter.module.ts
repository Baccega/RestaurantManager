import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WaiterComponent } from "src/app/components/waiter/waiter/waiter.component";
import { WaiterNewTableComponent } from "src/app/components/waiter/waiter-new-table/waiter-new-table.component";
import { WaiterDashboardComponent } from "src/app/components/waiter/waiter-dashboard/waiter-dashboard.component";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [
    WaiterComponent,
    WaiterNewTableComponent,
    WaiterDashboardComponent
  ],
  imports: [CommonModule, AppRoutingModule]
})
export class WaiterModule {}
