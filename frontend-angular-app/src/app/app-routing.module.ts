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

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: "waiter",
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        component: WaiterDashboardComponent,
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
      { path: "new-table", component: WaiterNewTableComponent },
      { path: "new-order/:id", component: WaiterNewOrderComponent },
      { path: "**", redirectTo: "dashboard" }
    ]
  },
  {
    path: "bartender",
    component: BartenderDashboardComponent
  },
  {
    path: "chef",
    component: ChefDashboardComponent,
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
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        component: CashierDashboardComponent
      },
      { path: "bills/:table", component: CashierStatisticsComponent },
      { path: "statistics", component: CashierStatisticsComponent },
      { path: "**", redirectTo: "" }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
