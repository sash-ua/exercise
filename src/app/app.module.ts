import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterseptorService} from "./services/interseptor/interseptor.service";
import {TemplatesComponent} from "./templates/templates.component";
import {SafeHtmlPipe} from "./pipes/safe-html/safe-html.pipe";
import { EditorComponent } from './editor/editor.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    PageNotFoundComponent,
    TemplatesComponent,
    SafeHtmlPipe,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterseptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
