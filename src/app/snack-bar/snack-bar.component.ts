import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { Subscription } from "rxjs";
import { ShowSnackBarInput } from "../models/snack-bar";
import { MessageService } from "../services/message.service";

@Component({
  selector: "snack-bar",
  templateUrl: "./snack-bar.component.html",
  styleUrls: ["./snack-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackBarComponent implements OnInit, OnDestroy {

  @Input() hideTimer: number;

  @ViewChild("snackBar") snackBar: ElementRef;

  text: string;
  
  private onUndoClickCallback: () => void;
  private sub: Subscription;
  private timeout: NodeJS.Timeout;

  constructor(
    private readonly msgSvc: MessageService,
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.sub = this.msgSvc.$showSnackBar.subscribe((input: ShowSnackBarInput) => {
      this.show(input);
    });
  }

  show(input: ShowSnackBarInput):void {
    this.text = input.text;
    this.onUndoClickCallback = input.onUndoClick;
    this.snackBar.nativeElement.classList.add("visible");
    this.setTimerToHide();
    this.cd.detectChanges();
  }

  hide(): void {
    this.text = null;
    this.onUndoClickCallback = null;
    this.snackBar.nativeElement.classList.remove("visible");
  }

  setTimerToHide(): void {
    if(this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.hide();
      this.timeout = null;
    }, this.hideTimer * 1000);
  }

  onUndoClick(): void{
    if (this.onUndoClickCallback) {
      this.onUndoClickCallback();
      this.hide();
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.timeout.unref();
  }
}
