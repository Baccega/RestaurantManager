import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HeaderComponent } from "./components/header/header.component";

import { MaterialComponentsModule } from "./material-components.module";
import { WaiterNewOrderComponent } from "./components/waiter/waiter-new-order/waiter-new-order.component";
import { WaiterDashboardComponent } from "./components/waiter/waiter-dashboard/waiter-dashboard.component";
import { ChefOrderDetailComponent } from "./components/chef/chef-order-detail/chef-order-detail.component";
import { ChefDashboardComponent } from "./components/chef/chef-dashboard/chef-dashboard.component";
import { BartenderDashboardComponent } from "./components/bartender/bartender-dashboard/bartender-dashboard.component";
import { CashierDashboardComponent } from "./components/cashier/cashier-dashboard/cashier-dashboard.component";
import { WaiterTableDetailComponent } from "./components/waiter/waiter-table-detail/waiter-table-detail.component";
import { WaiterTableListComponent } from "./components/waiter/waiter-table-list/waiter-table-list.component";
import { WaiterNewTableComponent } from "./components/waiter/waiter-new-table/waiter-new-table.component";
import { DummyComponent } from "./components/dummy/dummy.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { OrderListComponent } from "./components/order-list/order-list.component";
import { CashierStatisticsComponent } from "./components/cashier/cashier-statistics/cashier-statistics.component";
import { CashierBillComponent } from "./components/cashier/cashier-bill/cashier-bill.component";
import { CashierViewOrderComponent } from "./components/cashier/cashier-view-order/cashier-view-order.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { domain } from "src/environments/environment";
import { CashierStatisticsUserComponent } from "./components/cashier/cashier-statistics-user/cashier-statistics-user.component";
import { CashierNewUserComponent } from "./components/cashier/cashier-new-user/cashier-new-user.component";
import { AuthService } from "./services/auth.service";
import { BartenderOrderDetailComponent } from "./components/bartender/bartender-order-detail/bartender-order-detail.component";
import { UserService } from "./services/user.service";
import { LogoutComponent } from './components/logout/logout.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    ChefDashboardComponent,
    ChefOrderDetailComponent,
    OrderListComponent,

    BartenderDashboardComponent,
    BartenderOrderDetailComponent,

    CashierDashboardComponent,
    CashierStatisticsComponent,
    CashierBillComponent,
    CashierViewOrderComponent,
    CashierStatisticsUserComponent,
    CashierNewUserComponent,

    WaiterDashboardComponent,
    WaiterTableDetailComponent,
    WaiterTableListComponent,
    WaiterNewOrderComponent,
    WaiterNewTableComponent,

    DummyComponent,

    SidenavComponent,

    LoginComponent,
    SnackbarComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [domain],
        blacklistedRoutes: [],
        authScheme: "",
        headerName: "auth-token"
      }
    })
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [SnackbarComponent]
})
export class AppModule {}
