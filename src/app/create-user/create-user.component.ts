import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  user = { name: '', email: '', mobile: '', address: '' };

  constructor(private userService: UserService, private router: Router) {}

  createUser(): void {
    if (this.user.name && this.user.email && this.user.mobile && this.user.address) {
      this.userService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      alert('All fields are required.');
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
