/*app.module.ts*/

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { UserListingComponent } from "./components/userListing/userListing.component";
import { UserUpdateComponent } from "./components/user-update/user-update.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { DeleteUserPopUpComponent } from "./components/delete-user-pop-up/delete-user-pop-up.component";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import {ProductListOfAllUsersComponent} from "./components/product-list-of-all-users/product-list-of-all-users.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ShopComponent} from "./components/shop/shop.component";
import {SideNavComponent} from "./components/side-nav/side-nav.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {CartComponent} from "./components/cart/cart.component";
import {ProductListForShopComponent} from "./components/product-list-for-shop/product-list-for-shop.component";
import {ProductListOfCurrentUserComponent} from "./components/product-list-of-current-user/product-list-of-current-user.component";
import {
  ProductListOfCurrentUserDeleteAProductComponent
} from "./components/product-list-of-current-user-delete-a-product/product-list-of-current-user-delete-a-product.component";

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
    UserUpdateComponent,
    DeleteUserPopUpComponent,
    ProductListOfAllUsersComponent,
    ShopComponent,
    SideNavComponent,
    ProductDetailComponent,
    CartComponent,
    ProductListForShopComponent,
    ProductListOfCurrentUserComponent,
    ProductListOfCurrentUserDeleteAProductComponent
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
