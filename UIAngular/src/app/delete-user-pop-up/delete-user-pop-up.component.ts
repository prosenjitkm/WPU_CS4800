// delete-user-pop-up.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-delete-user-pop-up',
  templateUrl: './delete-user-pop-up.component.html',
  styleUrl: './delete-user-pop-up.component.css'
})
export class DeleteUserPopUpComponent {
  constructor(
    private service: AuthService,
    public dialogRef: MatDialogRef<DeleteUserPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
