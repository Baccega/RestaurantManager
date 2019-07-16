import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HeaderComponent } from "./components/header/header.component";

import { MaterialComponentsModule } from "./material-components.module";
import { WaiterNewOrderComponent } from "./components/waiter/waiter-new-order/waiter-new-order.component";
import { WaiterDashboardComponent } from "./components/waiter/waiter-dashboard/waiter-dashboard.component";
import { GenericBlockListComponent } from "./components/generic-block-list/generic-block-list.component";
import { ChefOrderDetailComponent } from "./components/chef/chef-order-detail/chef-order-detail.component";
import { ChefDashboardComponent } from "./components/chef/chef-dashboard/chef-dashboard.component";
import { BartenderDashboardComponent } from "./components/bartender/bartender-dashboard/bartender-dashboard.component";
import { CashierDashboardComponent } from "./components/cashier/cashier-dashboard/cashier-dashboard.component";
import { SidenavService } from "./services/sidenav.service";
import { WaiterTableDetailComponent } from "./components/waiter/waiter-table-detail/waiter-table-detail.component";
import { WaiterTableListComponent } from "./components/waiter/waiter-table-list/waiter-table-list.component";
import { WaiterComponent } from "./components/waiter/waiter/waiter.component";
import { WaiterNewTableComponent } from './components/waiter/waiter-new-table/waiter-new-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,

    WaiterDashboardComponent,
    WaiterNewOrderComponent,

    GenericBlockListComponent,

    ChefDashboardComponent,
    ChefOrderDetailComponent,

    BartenderDashboardComponent,

    CashierDashboardComponent,

    WaiterTableDetailComponent,

    WaiterTableListComponent,

    WaiterComponent,

    WaiterNewTableComponent
  ],
  imports: [BrowserModule, AppRoutingModule, MaterialComponentsModule],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule {}
