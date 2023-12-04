import { Component } from '@angular/core';
interface Notification {
  id: number;
  title: string;
  description: string;
  date: Date;
}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notificationsArray: Notification[] = [];

  constructor() {
    // Generate dummy notifications with titles, descriptions, and dates
    for (let i = 1; i <= 10; i++) {
      const notification: Notification = {
        id: i,
        title: `Notification Title ${i}`,
        description: `Description for Notification ${i}`,
        date: new Date() // Current date for simplicity (replace with actual dates)
      };
      this.notificationsArray.push(notification);
    }
  }
}
