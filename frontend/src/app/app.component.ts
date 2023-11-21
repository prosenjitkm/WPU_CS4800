import {Component, DoCheck} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'ECOMMERCE';
  isMenuRequired=false;
  constructor(private router:Router){}

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    this.isMenuRequired = !(currentUrl == '/login' || currentUrl == '/register');
  }

}
