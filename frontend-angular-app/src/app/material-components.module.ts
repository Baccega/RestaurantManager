import { NgModule } from "@angular/core";

import {
  MatTabsModule,
  MatToolbarModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatSnackBarModule
} from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

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
    MatSidenavModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule
  ]
})
export class MaterialComponentsModule {}
