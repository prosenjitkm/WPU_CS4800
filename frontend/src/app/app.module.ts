// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule}  from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
// ... other imports

@NgModule({
  declarations: [
    // ... your components here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    // ... other modules here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
