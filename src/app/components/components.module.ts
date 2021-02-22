import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconButtonComponent } from "./icon-button/icon-button.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { FormsModule } from "@angular/forms";

const COMPONENTS = [
  IconButtonComponent,
  CheckboxComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule { }
