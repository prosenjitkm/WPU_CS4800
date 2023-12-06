/*navigation-bar.component.ts*/
import {Component, DoCheck} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements DoCheck{
  isNavigationBarRequired = false;
  isAdmin= false;
  isSeller = false;
  isBuyer = false;

  constructor(private router: Router) {
    this.checkUserCategory();
  }

  ngDoCheck() {
    let currentRoute = this.router.url;
    this.isNavigationBarRequired = !(currentRoute === '/login' || currentRoute === '/register');
    this.checkUserCategory();
  }

  checkUserCategory() {
    let userCategory = sessionStorage.getItem('userCategory');
    let parsedUserCategory = userCategory ? parseInt(userCategory, 10) : 0;
    parsedUserCategory = isNaN(parsedUserCategory) ? 0 : parsedUserCategory;

    this.isAdmin = parsedUserCategory === 1;
    this.isSeller = parsedUserCategory === 3;
    this.isBuyer = parsedUserCategory === 2;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  onClickProductListOfUser(element: any) {
    this.router.navigate(['/my-products', element.id]);
  }
}
