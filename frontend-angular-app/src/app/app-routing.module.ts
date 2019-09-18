import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { WaiterDashboardComponent } from "./components/waiter/waiter-dashboard/waiter-dashboard.component";
import { BartenderDashboardComponent } from "./components/bartender/bartender-dashboard/bartender-dashboard.component";
import { ChefDashboardComponent } from "./components/chef/chef-dashboard/chef-dashboard.component";
import { CashierDashboardComponent } from "./components/cashier/cashier-dashboard/cashier-dashboard.component";
import { WaiterNewOrderComponent } from "./components/waiter/waiter-new-order/waiter-new-order.component";
import { ChefOrderDetailComponent } from "./components/chef/chef-order-detail/chef-order-detail.component";
import { WaiterTableDetailComponent } from "./components/waiter/waiter-table-detail/waiter-table-detail.component";
import { WaiterNewTableComponent } from "./components/waiter/waiter-new-table/waiter-new-table.component";
import { DummyComponent } from "./components/dummy/dummy.component";
import { CashierStatisticsComponent } from "./components/cashier/cashier-statistics/cashier-statistics.component";
import { CashierViewOrderComponent } from "./components/cashier/cashier-view-order/cashier-view-order.component";
import { CashierBillComponent } from "./components/cashier/cashier-bill/cashier-bill.component";

import { CashierStatisticsUserComponent } from "./components/cashier/cashier-statistics-user/cashier-statistics-user.component";
import { CashierNewUserComponent } from "./components/cashier/cashier-new-user/cashier-new-user.component";
import { BartenderOrderDetailComponent } from "./components/bartender/bartender-order-detail/bartender-order-detail.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: "logout",
    component: LogoutComponent,
    pathMatch: "full"
  },
  {
    path: "waiter/new-table",
    canActivate: [AuthGuard],
    data: {
      expectedRole: "waiter"
    },
    component: WaiterNewTableComponent
  },
  {
    path: "waiter/new-order/:id",
    canActivate: [AuthGuard],
    data: {
      expectedRole: "waiter"
    },
    component: WaiterNewOrderComponent
  },
  {
    path: "waiter",
    component: WaiterDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: "waiter"
    },
    children: [
      {
        path: "",
        component: DummyComponent,
        pathMatch: "full"
      },
      { path: ":id", component: WaiterTableDetailComponent },
      { path: "**", redirectTo: "" }
    ]
  },
  {
    path: "bartender",
    component: BartenderDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: "bartender"
    },
    children: [
      {
        path: "",
        component: DummyComponent,
        pathMatch: "full"
      },
      { path: ":id", component: BartenderOrderDetailComponent },
      { path: "**", redirectTo: "" }
    ]
  },
  {
    path: "chef",
    component: ChefDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: "chef"
    },
    children: [
      {
        path: "",
        component: DummyComponent,
        pathMatch: "full"
      },
      { path: ":id", component: ChefOrderDetailComponent },
      { path: "**", redirectTo: "" }
    ]
  },
  {
    path: "cashier",
    canActivate: [AuthGuard],
    data: {
      expectedRole: "cashier"
    },
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: CashierDashboardComponent },
      { path: "tables/:table", component: CashierViewOrderComponent },
      { path: "tables/:table/bill", component: CashierBillComponent },
      { path: "statistics", component: CashierStatisticsComponent },
      {
        path: "statistics/users/new",
        component: CashierNewUserComponent
      },
      {
        path: "statistics/users/:user",
        component: CashierStatisticsUserComponent
      },
      { path: "**", redirectTo: "dashboard" }
    ]
  },
  { path: "**", redirectTo: "logout" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
