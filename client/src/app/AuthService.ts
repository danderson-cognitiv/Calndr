import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalndrProxyService } from './proxies/calndrproxy.service';
import { IUserModel } from '../../../database/interfaces/IUserModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<IUserModel | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private calndrProxyService: CalndrProxyService, private router: Router) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    console.log('Loading current user');
    this.calndrProxyService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUserSubject.next(user);
        if (user) {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Failed to load current user:', error);
        this.currentUserSubject.next(null);
      }
    });
  }

  login(): void {
    window.location.href = `${this.calndrProxyService.hostUrl}auth/google`;
  }

  logout(): void {
    this.calndrProxyService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']); // Redirect to login page after logout
      },
      error: (error) => {
        console.error('Failed to logout:' + error);
      }
    });
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
