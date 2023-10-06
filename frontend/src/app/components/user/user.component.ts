import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(id: number | undefined): void {
    if (id !== undefined) {
      this.userService.getUserById(id).subscribe(user => {
        this.selectedUser = user;
      });
    }
  }

  deleteUser(id: number | undefined): void {
    if (id !== undefined) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getAllUsers();  // Refresh the user list after deletion
      });
    }
  }

  saveUser(): void {
    if (this.selectedUser) {
      if (this.selectedUser.id) {
        // Update existing user
        this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(user => {
          this.getAllUsers();  // Refresh the user list after updating
          this.selectedUser = null;
        });
      } else {
        // Create new user
        this.userService.createUser(this.selectedUser).subscribe(user => {
          this.getAllUsers();  // Refresh the user list after adding
          this.selectedUser = null;
        });
      }
    }
  }

  newUser(): void {
    this.selectedUser = new User();  // Reset the selected user to an empty object for the form
  }

  cancelEdit(): void {
    this.selectedUser = null;  // Clear the selected user to hide the form
  }
}
