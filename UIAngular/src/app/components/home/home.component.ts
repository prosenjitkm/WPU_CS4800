// home.component.ts
// home.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user/user.service";
import { User } from "../../models/userModel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user?: User; // Use '?' to mark the property as optional
  userName: string = ''; // Initialize as empty string

  constructor(private userService: UserService) {}

  ngOnInit() {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      this.userName = storedUserName;
      this.getUserProfile(this.userName);
    }
  }

  getUserProfile(userName: string) {
    this.userService.getUserByUserName(userName).subscribe(
      (user: any) => { // Temporarily type as 'any' to bypass the type issue
        this.user = user as User; // Cast the response to 'User' type
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
