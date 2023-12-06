/*app-routing.module.ts*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListingComponent } from "./components/userListing/userListing.component";
import { ProductListOfAllUsersComponent } from "./components/product-list-of-all-users/product-list-of-all-users.component";
import { ShopComponent } from "./components/shop/shop.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { CartComponent } from "./components/cart/cart.component";
import { UserUpdateComponent } from "./components/user-update/user-update.component";
import {ProductListOfCurrentUserComponent} from "./components/product-list-of-current-user/product-list-of-current-user.component";
import {AdminGuard} from "./guards/admin.guard";
import {BuyerGuard} from "./guards/buyer.guard";
import {SellerGuard} from "./guards/seller.guard";
import {
  ProductListOfCurrentUserDeleteAProductComponent
} from "./components/product-list-of-current-user-delete-a-product/product-list-of-current-user-delete-a-product.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { component: RegisterComponent, path: 'register'},
  { component: LoginComponent, path: 'login' },
  { component: UserListingComponent, path: 'user', canActivate:[AdminGuard]},
  { component: ProductListOfAllUsersComponent, path: 'products/:userId', canActivate: [AdminGuard]},
  { component: ProductDetailComponent, path: 'product/:id' , canActivate: [AdminGuard]},
  { component: UserUpdateComponent, path: 'update-user/:id', canActivate: [AdminGuard] },
  { component: ProductListOfCurrentUserComponent, path: 'my-products', /*canActivate: [SellerGuard]*/},
  { component: ProductListOfCurrentUserDeleteAProductComponent, path: 'update-product/:id', canActivate: [SellerGuard]},
  { component: CartComponent, path: 'cart', canActivate: [BuyerGuard]},
  { component: ShopComponent, path: 'shop', canActivate: [BuyerGuard]},
  { component: HomeComponent, path: 'home',},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
