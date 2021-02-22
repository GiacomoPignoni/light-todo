import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import * as path from "path";
import * as url from "url";
import { TodoElement } from "./src/app/models/todo";
import { TodoListUtils } from "./shared/todo-list-utils";
import { Events } from "./shared/events";

let win: BrowserWindow = null;
let tray: Tray = null;

const args = process.argv.slice(1),
  serve = args.some(val => val === "--serve");

function createWindow(): BrowserWindow {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    center: true,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,
      enableRemoteModule : true
    },
  });

  if (serve) {

    win.webContents.openDevTools();

    require("electron-reload")(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL("http://localhost:1234");

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, "dist/index.html"),
      protocol: "file:",
      slashes: true
    }));
  }

  win.on("closed", () => {
    win = null;
  });

  return win;
}

function createTray() {
  tray = new Tray(path.resolve(__dirname, `${serve ? "src" : "dist"}/assets/icons/favicon.ico`));
  tray.setToolTip("Light todo");
  const menu = Menu.buildFromTemplate([
    {
      label: "Toggle Dark mode",
      type: "normal",
      click: () => {
        win.webContents.send(Events.toggleDarkMode);
      }
    },
    { 
      label: "Quit",
      type: "normal", 
      click: () => {
        app.quit();
      }
    }    
  ]);
  tray.setContextMenu(menu);
  tray.addListener("click", () => {
    win.show();
  });
}

function subscribeToEvents(): void {
  ipcMain.on(Events.saveTodoList, (event, todoList: TodoElement[]) => {
    TodoListUtils.setGlobalTodoList(todoList);
    TodoListUtils.saveTodoList(todoList);
  });
}

function preloadTodoList(): void {
  const todoList = TodoListUtils.loadTodoList();
  TodoListUtils.setGlobalTodoList(todoList);
}

try {
  const canRun = app.requestSingleInstanceLock();

  if (canRun) {
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    app.on("ready", () => setTimeout(() => {
      subscribeToEvents();
      preloadTodoList();
      createTray();
      createWindow();
    }, 400));
  
    app.on("window-all-closed", () => {
      //
    });
  
    app.on("activate", () => {
      win.show();
    });

    app.on("second-instance", () => {
      win?.show();
    });
  } else {
    app.quit();
  }
} catch (e) {
  app.quit();
}
