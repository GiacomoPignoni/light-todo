import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {

  @Input() id: string;

  @Input() checked: boolean;

  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChange(newValue: boolean): void {
    this.checked = newValue;
    this.checkedChange.emit(this.checked);
  }

}
