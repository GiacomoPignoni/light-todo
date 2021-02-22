"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win = null;
var tray = null;
var args = process.argv.slice(1), serve = args.some(function (val) { return val === "--serve"; });
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 400,
        height: 600,
        center: true,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: (serve) ? true : false,
            contextIsolation: false,
            enableRemoteModule: true
        },
    });
    if (serve) {
        win.webContents.openDevTools();
        require("electron-reload")(__dirname, {
            electron: require(__dirname + "/node_modules/electron")
        });
        win.loadURL("http://localhost:1234");
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, "dist/index.html"),
            protocol: "file:",
            slashes: true
        }));
    }
    win.on("closed", function () {
        win = null;
    });
    return win;
}
function createTray() {
    tray = new electron_1.Tray(path.resolve(__dirname, (serve ? "src" : "dist") + "/assets/icons/favicon.ico"));
    tray.setToolTip("Light todo");
    var menu = electron_1.Menu.buildFromTemplate([
        {
            label: "Quit",
            type: "normal",
            click: function () {
                electron_1.app.quit();
            }
        }
    ]);
    tray.setContextMenu(menu);
    tray.addListener("click", function () {
        if (win === null) {
            createWindow();
        }
    });
}
try {
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    electron_1.app.on("ready", function () { return setTimeout(function () {
        createTray();
        createWindow();
    }, 400); });
    electron_1.app.on("window-all-closed", function () {
        //
    });
    electron_1.app.on("activate", function () {
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    electron_1.app.quit();
}
//# sourceMappingURL=main.js.map