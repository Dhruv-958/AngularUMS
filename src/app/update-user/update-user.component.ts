import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  user: any = { name: '', email: '', mobile: '', address: '' };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        this.user = data;
      });
    }
  }

  // Update user details
  updateUser(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Get user ID from the route
    if (userId && this.user.name && this.user.email && this.user.mobile && this.user.address) {
      this.userService.updateUser(userId, this.user).subscribe(() => {
        this.router.navigate(['/']);  // Navigate back to the Home page after update
      });
    } else {
      alert('All fields are required.');
    }
  }

  // Cancel the update and navigate back
  goBack(): void {
    this.router.navigate(['/']);
  }
}
