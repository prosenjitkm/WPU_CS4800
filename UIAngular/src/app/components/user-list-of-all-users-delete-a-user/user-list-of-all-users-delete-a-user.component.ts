// user-list-of-all-users-delete-a-user.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthorizationService } from "../../service/auth/authorization.service";

@Component({
  selector: 'app-delete-user-pop-up',
  templateUrl: './user-list-of-all-users-delete-a-user.component.html',
  styleUrl: './user-list-of-all-users-delete-a-user.component.css'
})
export class UserListOfAllUsersDeleteAUserComponent {
  constructor(
    private service: AuthorizationService,
    public dialogRef: MatDialogRef<UserListOfAllUsersDeleteAUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
