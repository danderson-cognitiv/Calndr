// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log('Current user:', this.currentUser);
    });
  }

  logout(): void {
    this.authService.logout();
  }
}