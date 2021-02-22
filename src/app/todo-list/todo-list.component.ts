import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { TodoElement } from "../models/todo";
import { MessageService } from "../services/message.service";
import { TodoListService } from "../services/todo-list.service";
import { animations } from "./animations";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: animations
})
export class TodoListComponent {

  todoList: TodoElement[];
  textInput = "";

  private lastRemovedElement: TodoElement;

  constructor(
    private readonly todoListSvc: TodoListService,
    private readonly msgSvc: MessageService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.todoList = this.todoListSvc.getGlobalTodoList() ?? [];
  }

  onTextInputKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.addElement();
    }
  }

  addElement(): void {
    if(this.textInput !== "") {
      this.todoList.unshift(new TodoElement({
        id: this.findMaxId() + 1,
        text: this.textInput
      }));
      this.textInput = "";
      this.todoListSvc.saveTodoList(this.todoList);
    }
  }

  removeElement(index: number): void {
    this.lastRemovedElement = this.todoList[index];
    this.todoList.splice(index, 1);
    this.todoListSvc.saveTodoList(this.todoList);
    this.msgSvc.showSnackBar({
      text: "Element removed",
      onUndoClick: () => {
        this.undoRemove();
      }
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
    this.todoListSvc.saveTodoList(this.todoList);
  }

  onCheckChange(index: number): void {
    const modifiedEl = this.todoList[index];
    if(modifiedEl.checked === true) {
      let firstCheckedElIndex = this.todoList.findIndex(x => x.checked && x.id !== modifiedEl.id);
      if (firstCheckedElIndex === -1) {
        firstCheckedElIndex = this.todoList.length;
      }
      moveItemInArray(this.todoList, index, firstCheckedElIndex - 1);
    }
    this.todoListSvc.saveTodoList(this.todoList);
  }

  private undoRemove(): void {
    if (this.lastRemovedElement) {
      this.todoList.unshift(this.lastRemovedElement);
      this.lastRemovedElement = null;
      this.todoListSvc.saveTodoList(this.todoList);
      this.cd.detectChanges();
    }
  }

  private findMaxId(): number {
    let max = -1;
    this.todoList.forEach(e => {
      if (e.id > max) {
        max = e.id;
      }
    });
    return max;
  }
}
