import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GenericBlockListComponent } from "src/app/components/generic-block-list/generic-block-list.component";
import { MaterialComponentsModule } from "../material-components/material-components.module";

@NgModule({
  declarations: [GenericBlockListComponent],
  exports: [GenericBlockListComponent],
  imports: [CommonModule, MaterialComponentsModule]
})
export class SharedModule {}
