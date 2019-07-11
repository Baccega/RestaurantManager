import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GenericBlockListComponent } from "src/app/components/generic-block-list/generic-block-list.component";

@NgModule({
  declarations: [GenericBlockListComponent],
  exports: [GenericBlockListComponent],
  imports: [CommonModule]
})
export class SharedModule {}
