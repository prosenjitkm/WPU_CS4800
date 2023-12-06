/*buyer.guard.ts*/
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../service/auth/authorization.service';
import { UserService } from "../service/user/user.service";

@Injectable({ providedIn: 'root' })
export class BuyerGuard implements CanActivate {
  constructor(
    private authService: AuthorizationService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }

    const userCategory = this.userService.getUsersUserCategory();
    if (userCategory !== 2) { // Assuming '2' is the ID for Buyers
      this.router.navigate(['']);
      this.toastr.warning('Access denied. Buyers only.');
      return false;
    }
    return true;
  }
}
