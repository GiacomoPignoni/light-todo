import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { TodoElement } from "src/app/models/todo";

@Component({
  selector: "todo-el",
  templateUrl: "./todo-el.component.html",
  styleUrls: ["./todo-el.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoElComponent{

  @Input() element: TodoElement;

  @Output() removeClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() checkChange: EventEmitter<void> = new EventEmitter<void>();
}
