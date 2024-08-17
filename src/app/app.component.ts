import { Component } from '@angular/core';
import { AuthService } from './auth.service'; // Adjust the import path according to your project structure
import { NavigationEnd, Router } from '@angular/router';
import { AuthStateService } from './state/auth.state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router,private authStateService: AuthStateService) {}

  // ngOnInit() {
  //   this.authStateService.authState$.subscribe((isLoggedIn) => {
  //     this.isLoggedIn = isLoggedIn;
  //   });

  //   // Check if already authenticated when the app loads
  //   this.isLoggedIn = this.authService.isAuthenticated()


  // }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Determine whether to show the navbar based on the current route
        const currentRoute = this.router.url;
        this.isLoggedIn = !['/login', '/signup'].includes(currentRoute);
      }
    });
  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      this.router.navigate(['/login']); // Redirect to login page
    });
  }
}
