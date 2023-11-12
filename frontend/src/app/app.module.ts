// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule}  from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MaterialModule } from "../material.module";

import { AppComponent } from './app.component';

import { HeaderComponent } from "./components/header/header.component";
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { NavComponent } from './components/nav/nav.component';
import { ShopComponent } from './components/shop/shop.component';
// ... other imports

@NgModule({
  declarations: [
    AppComponent,
    // ... your components here

    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    ProductListComponent,
    PageNotFoundComponent,
    NavComponent,
    ShopComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    RouterOutlet,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MaterialModule

    // ... other modules here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
