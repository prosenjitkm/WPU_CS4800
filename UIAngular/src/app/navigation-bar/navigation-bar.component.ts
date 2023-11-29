import {Component, DoCheck} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements DoCheck{
  isNavigationBarRequired = false;
  isAdmin=false;

  constructor(private router: Router) {
    let userCategory = sessionStorage.getItem('userCategory');
    let parsedUserCategory = userCategory ? parseInt(userCategory, 10) : 0;

    // Check if parsedUserCategory is not a number (NaN), set to 0 if it is
    parsedUserCategory = isNaN(parsedUserCategory) ? 0 : parsedUserCategory;
    this.isAdmin = parsedUserCategory === 1;
  }

  ngDoCheck() {
    let currentRoute = this.router.url;
    let userCategory = sessionStorage.getItem('userCategory');
    let retrievedUserCategory = userCategory ? parseInt(userCategory, 10) : 0;
    // Check if the parsed number is not a number (NaN), then default to 0
    retrievedUserCategory = isNaN(retrievedUserCategory) ? 0 : retrievedUserCategory;

    this.isNavigationBarRequired = !(currentRoute === '/login' || currentRoute === '/register');
    this.isAdmin = retrievedUserCategory === 1;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
