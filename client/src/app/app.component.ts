import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { aU } from '@fullcalendar/core/internal-common';
import { AuthService } from './AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService, private themeService: ThemeService) {}

  ngOnInit() {
    console.log('AppComponent initialized');
  }

  logout(): void {
    this.authService.logout();
  }
}