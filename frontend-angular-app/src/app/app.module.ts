import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { WaiterDashboardComponent } from './components/waiter/waiter-dashboard/waiter-dashboard.component';
import { ChefDashboardComponent } from './components/chef/chef-dashboard/chef-dashboard.component';
import { BartenderDashboardComponent } from './components/bartender/bartender-dashboard/bartender-dashboard.component';
import { CashierDashboardComponent } from './components/cashier/cashier-dashboard/cashier-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    WaiterDashboardComponent,
    ChefDashboardComponent,
    BartenderDashboardComponent,
    CashierDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
