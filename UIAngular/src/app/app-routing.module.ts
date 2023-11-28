import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListingComponent } from "./userListing/userListing.component";
import { AuthGuard } from "./guard/auth.guard";


const routes: Routes = [
  { component: HomeComponent, path: '', canActivate:[AuthGuard]},
  { component: RegisterComponent, path: 'register'},
  { component: LoginComponent, path: 'login' },
  { component: UserListingComponent, path: 'user', canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
