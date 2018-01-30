import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {
  avatars = [
    'svg-1', 'svg-2', 'svg-3', 'svg-4'
  ];

  user: User;
  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService
  ) { }

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  ngOnInit() {
    this.user = new User();
  }
  save() {
    this.userService.addUser(this.user).then(user => {
      this.dialogRef.close(this.user);
    });
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
