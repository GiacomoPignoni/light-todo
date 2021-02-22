import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ShowSnackBarInput } from "src/app/models/snack-bar";

@Injectable()
export class MessageService {

  public readonly $showSnackBar: Subject<ShowSnackBarInput> = new Subject<ShowSnackBarInput>();

  showSnackBar(input: ShowSnackBarInput): void {
    this.$showSnackBar.next(input);
  }
}
