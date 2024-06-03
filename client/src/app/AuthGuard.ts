import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('inside is authenticated')
      return true;
    } else {
      console.log('outside is authenticated')
      this.router.navigate(['/login']);
      return false;
    }
  }
}
