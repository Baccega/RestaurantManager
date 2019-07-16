import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WaiterComponent } from "src/app/components/waiter/waiter/waiter.component";
import { WaiterNewTableComponent } from "src/app/components/waiter/waiter-new-table/waiter-new-table.component";
import { WaiterDashboardComponent } from "src/app/components/waiter/waiter-dashboard/waiter-dashboard.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { WaiterTablesListComponent } from "src/app/components/waiter/waiter-tables-list/waiter-tables-list.component";
import { MaterialComponentsModule } from "../material-components/material-components.module";

@NgModule({
  declarations: [
    WaiterComponent,
    WaiterNewTableComponent,
    WaiterDashboardComponent,
    WaiterTablesListComponent
  ],
  imports: [CommonModule, AppRoutingModule, MaterialComponentsModule]
})
export class WaiterModule {}
