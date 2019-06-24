import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
    email: new FormControl('')
  });
  private currentUser: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      const { username, email } = user;

      this.profileForm = new FormGroup({
        username: new FormControl(username, Validators.required),
        newPassword: new FormControl(''),
        confirmPassword: new FormControl(''),
        email: new FormControl(email)
      });
    });
  }

  onSubmit(formValue: any) {
    const editedUser: User = this.currentUser;

    editedUser.email = formValue.email;
    editedUser.username = formValue.username;
    if (formValue.newPassword || formValue.confirmPassword) {
      if (formValue.newPassword !== formValue.confirmPassword) {
        return;
      }
      editedUser.password = formValue.newPassword;
    }

    this.authService.updateUser(editedUser).subscribe(console.log)
  }
}
