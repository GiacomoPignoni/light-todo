import { Injectable } from "@angular/core";
import { ipcRenderer, remote, webFrame } from "electron";
import * as childProcess from "child_process";
import * as fs from "fs";

@Injectable()
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    if(this.isElectron) {
      this.ipcRenderer = window.require("electron").ipcRenderer;
      this.webFrame = window.require("electron").webFrame;
      this.remote = window.require("electron").remote;
      this.childProcess = window.require("child_process");
      this.fs = window.require("fs");

      this.webFrame.setZoomLevel(0);
    }
  }
}
