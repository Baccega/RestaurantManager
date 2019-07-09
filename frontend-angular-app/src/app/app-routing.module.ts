import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WaiterDashboardComponent } from './components/waiter/waiter-dashboard/waiter-dashboard.component';
import { BartenderDashboardComponent } from './components/bartender/bartender-dashboard/bartender-dashboard.component';
import { ChefDashboardComponent } from './components/chef/chef-dashboard/chef-dashboard.component';
import { CashierDashboardComponent } from './components/cashier/cashier-dashboard/cashier-dashboard.component';
import { WaiterNewOrderComponent } from './components/waiter/waiter-new-order/waiter-new-order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "waiter",
    component: WaiterDashboardComponent,
  },
  {
    path: "bartender",
    component: BartenderDashboardComponent,
  },
  {
    path: "chef",
    component: ChefDashboardComponent,
  },
  {
    path: "cashier",
    component: CashierDashboardComponent,
  },
  {
    path: "neworder/:id",
    component : WaiterNewOrderComponent
  },
  {
    path: "detail/:id",
    component : OrderDetailComponent
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
