import {Component, DoCheck} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck {
  isNavigationBarRequired = false;
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  ngDoCheck() {
    let currentUrl = this.router.url;
    if(currentUrl == '/login' || currentUrl == '/register')
    {
      this.isNavigationBarRequired = false;
    }else {
      this.isNavigationBarRequired = true;
    }
  }
}
