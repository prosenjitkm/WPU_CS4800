import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: any;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}
