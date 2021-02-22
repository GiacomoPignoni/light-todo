import { readFileSync, writeFileSync } from "fs";
import { TodoElement } from "../src/app/models/todo";
import { Consts } from "./consts";

export class TodoListUtils {
  public static saveTodoList(todoList: TodoElement[]): void {
    writeFileSync(Consts.TODOLIST_FILE_NAME, JSON.stringify(todoList));
  }

  public static setGlobalTodoList(todoList: TodoElement[]): void {
    (global as any)[Consts.TODOLIST_VAR_NAME] = todoList;
  }

  public static loadTodoList(): TodoElement[] | null {
    try {
      const data = readFileSync(Consts.TODOLIST_FILE_NAME);
      if(data) {
        return JSON.parse(data.toString());
      }
  
      return null;
    } catch(error) {
      return null;
    }
  }
}