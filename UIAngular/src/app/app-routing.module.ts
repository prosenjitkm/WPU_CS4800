/*app-routing.module.ts*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListingComponent } from "./userListing/userListing.component";
import { AuthGuard } from "./core/guard/auth.guard";
import {ProductListOfUserComponent} from "./product-list-of-user/product-list-of-user.component";
import {ShopComponent} from "./shop/shop.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";


const routes: Routes = [
  { component: HomeComponent, path: '', canActivate:[AuthGuard]},
  { component: RegisterComponent, path: 'register'},
  { component: LoginComponent, path: 'login' },
  { component: UserListingComponent, path: 'user', canActivate:[AuthGuard]},
  { component: ProductListOfUserComponent, path: 'products/:userId', canActivate: [AuthGuard]},
  { component: ShopComponent, path: 'shop', canActivate: [AuthGuard]},
  { component: ProductDetailComponent, path: 'product/:id' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
