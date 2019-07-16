import { NgModule } from "@angular/core";

import {
  MatTabsModule,
  MatToolbarModule,
  MatSidenavModule
} from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [],
  exports: [
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule
  ]
})
export class MaterialComponentsModule {}
