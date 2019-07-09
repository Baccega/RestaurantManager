import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HeaderComponent } from "./components/header/header.component";

import { WaiterModule } from "./modules/waiter/waiter.module";
import { BartenderModule } from "./modules/bartender/bartender.module";
import { ChefModule } from "./modules/chef/chef.module";
import { CashierModule } from "./modules/cashier/cashier.module";

import {MatTabsModule, MatButtonModule, MatIconModule} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, LoginComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WaiterModule,
    BartenderModule,
    ChefModule,
    CashierModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
