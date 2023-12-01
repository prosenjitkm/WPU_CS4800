import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { UserListingComponent } from "./userListing/userListing.component";
import { UpdatePopUpComponent } from "./updatePopUp/updatePopUp.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { DeleteUserPopUpComponent } from "./delete-user-pop-up/delete-user-pop-up.component";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import {ProductListOfUserComponent} from "./product-list-of-user/product-list-of-user.component";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations:[
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavigationBarComponent,
    HeaderComponent,
    FooterComponent,
    UserListingComponent,
    UpdatePopUpComponent,
    DeleteUserPopUpComponent,
    ProductListOfUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatDividerModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{}
