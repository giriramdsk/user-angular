import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
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

  roles = ['User', 'Admin', 'Guest']; 
  serverErrors: { [key: string]: string } = {}
  private toastRef: ActiveToast<any> | null = null;
  
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  onSubmit(form: NgForm) {
    
    if (form.invalid) {
      return;
    }
    this.authService.signup(this.signupData).subscribe({
      next: () => {
        this.toastRef = this.toastr.success('Signup successful!', 'success');
        setTimeout(() => {
          this.toastRef?.toastRef.close(); 
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.log(err)
        this.serverErrors = {};

        if (err.error && err.error.errors) {
          err.error.errors.forEach((error: { field: string, message: string }) => {
            this.serverErrors[error.field] = error.message;
          });
        this.toastr.error('Signup Validation failed.', 'Error');
        }else{

        this.toastr.error(err.error.message, 'Error');

        }
      },
      complete: () => {
      }
    });
  }

  isInvalid(field: string, form: NgForm): boolean {
    const control = form.controls[field];
    return control && control.invalid && (control.dirty || control.touched);
  }
}
