/*admin.guard.ts*/
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../service/auth/authorization.service';
import { UserService } from "../service/user/user.service";

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
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
    if (userCategory !== 1) { // Assuming '1' is the ID for Admins
      this.router.navigate(['']);
      this.toastr.warning('Access denied. Admins only.');
      return false;
    }
    return true;
  }
}
