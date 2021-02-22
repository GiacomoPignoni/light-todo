import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ViewChild, ElementRef} from "@angular/core";

@Component({
  selector: "icon-button",
  templateUrl: "./icon-button.component.html",
  styleUrls: ["./icon-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent {
  @ViewChild("btn") btn: ElementRef;

  @Input() icon: string;
  @Output() click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    this.triggerAnimation();
    this.click.emit(event);
  }

  private triggerAnimation(): void {
    (this.btn.nativeElement as HTMLElement).classList.remove("animate-squize");
    // Need to execute this in the next loop, so timeout 0
    setTimeout(() => {
      (this.btn.nativeElement as HTMLElement).classList.add("animate-squize");
    }, 0);
  }
}
