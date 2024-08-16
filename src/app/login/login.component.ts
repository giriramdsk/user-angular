import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.toastr.success('Login successful!', 'Success');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/user-list']);
      },
      error: (err) => {
        this.toastr.error('Login failed. Please try again.', 'Error');
      }
    });
  }
}
