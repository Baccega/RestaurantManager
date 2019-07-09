import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BartenderDashboardComponent } from "src/app/components/bartender/bartender-dashboard/bartender-dashboard.component";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [BartenderDashboardComponent],
  imports: [CommonModule, AppRoutingModule]
})
export class BartenderModule {}
