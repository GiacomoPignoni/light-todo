import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Events } from "shared/events";
import { ElectronService } from "./services/electron.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  
  private readonly DARK_MODE_KEY = "dark-mode";

  darkMode = false;

  constructor(
    private readonly translate: TranslateService,
    private readonly electronSvc: ElectronService
  ) {
    this.translate.setDefaultLang("en");
  }

  ngOnInit(): void {
    this.checkDarkMode();
    this.electronSvc.ipcRenderer.on(Events.toggleDarkMode, () => {
      this.toggleDarkMode();
    });
  }

  private checkDarkMode(): void {
    const darkMode = JSON.parse(localStorage.getItem(this.DARK_MODE_KEY));
    if(darkMode) {
      this.darkMode = darkMode;
      this.applyDarkMode();
    }
  }

  private toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem(this.DARK_MODE_KEY, this.darkMode.toString());
    this.applyDarkMode();
  }

  private applyDarkMode(): void {
    if(this.darkMode) {
      document.querySelector("body").classList.add("dark");
    } else {
      document.querySelector("body").classList.remove("dark");
    }
  }
}
