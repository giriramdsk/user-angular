import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule] 
})
export class SignupComponent {
  signupData = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    role: 'User',
    password: ''
  };
  
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.signup(this.signupData).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);  // Redirect to login after successful signup
      },
      error: (err) => {
        console.error('Signup failed', err);
      }
    });
  }
}
