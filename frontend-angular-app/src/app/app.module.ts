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
import { WaiterTablesListComponent } from './components/waiter/waiter-tables-list/waiter-tables-list.component';

import {MatTabsModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WaiterNewOrderComponent } from './components/waiter/waiter-new-order/waiter-new-order.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    WaiterDashboardComponent,
    ChefDashboardComponent,
    BartenderDashboardComponent,
    CashierDashboardComponent,
    WaiterTablesListComponent,
    WaiterNewOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
