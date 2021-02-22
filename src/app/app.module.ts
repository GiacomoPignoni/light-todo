import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppComponent } from "src/app/app.component";
import { ElectronService } from "src/app/services/electron.service";
import { TitleBarComponent } from "src/app/title-bar/title-bar.component";
import { TodoListComponent } from "src/app/todo-list/todo-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ComponentsModule } from "src/app/components/components.module";
import { TodoElComponent } from "src/app/todo-list/todo-el/todo-el.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TodoListService } from "src/app/services/todo-list.service";
import { SnackBarComponent } from "src/app/snack-bar/snack-bar.component";
import { MessageService } from "src/app/services/message.service";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, TitleBarComponent, TodoListComponent, TodoElComponent, SnackBarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    DragDropModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ElectronService,
    TodoListService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
