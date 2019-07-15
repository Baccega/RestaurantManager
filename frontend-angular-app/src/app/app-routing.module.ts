import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { WaiterDashboardComponent } from "./components/waiter/waiter-dashboard/waiter-dashboard.component";
import { BartenderDashboardComponent } from "./components/bartender/bartender-dashboard/bartender-dashboard.component";
import { ChefDashboardComponent } from "./components/chef/chef-dashboard/chef-dashboard.component";
import { CashierDashboardComponent } from "./components/cashier/cashier-dashboard/cashier-dashboard.component";
import { WaiterNewTableComponent } from "./components/waiter/waiter-new-table/waiter-new-table.component";
import { WaiterComponent } from "./components/waiter/waiter/waiter.component";
import { ChefOrderDetailComponent } from "./components/chef/chef-order-detail/chef-order-detail.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "waiter",
    component: WaiterComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: WaiterDashboardComponent },
      { path: "new-table", component: WaiterNewTableComponent },
      { path: "**", redirectTo: "" }
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
      { path: ":id", component: ChefOrderDetailComponent },
      { path: "**", redirectTo: "" }
    ]
  },
  {
    path: "cashier",
    component: CashierDashboardComponent
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
