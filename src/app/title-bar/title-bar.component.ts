import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ElectronService } from "src/app/services/electron.service";

@Component({
  selector: "app-title-bar",
  templateUrl: "./title-bar.component.html",
  styleUrls: ["./title-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent implements OnInit {

  constructor(
    private readonly electronSvc: ElectronService
  ) { }

  ngOnInit(): void {
  }

  onCloseIconClick(): void {
    const currentWindow = this.electronSvc.remote.getCurrentWindow();
    currentWindow.hide();
  }
}
