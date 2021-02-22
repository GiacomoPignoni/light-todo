import { Injectable } from "@angular/core";
import { ElectronService } from "./electron.service";
import { TodoElement } from "../models/todo";
import { Events } from "shared/events";
import { Consts } from "shared/consts";

@Injectable()
export class TodoListService {

  constructor(
    private readonly electronSvc: ElectronService
  ) { }

  public getGlobalTodoList(): TodoElement[] | null {
    return this.electronSvc.remote.getGlobal(Consts.TODOLIST_VAR_NAME);
  }

  public saveTodoList(todoList: TodoElement[]): void {
    this.electronSvc.ipcRenderer.send(Events.saveTodoList, todoList);
  }
}
