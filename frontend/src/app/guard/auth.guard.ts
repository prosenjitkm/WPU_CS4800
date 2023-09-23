import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private service:AuthService,
    private router:Router,
    private toastr:ToastrService,

  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.service.isLoggedIn())
    {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
/*
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
*/
