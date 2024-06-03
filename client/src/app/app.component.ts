import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calndr';
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    console.log('AppComponent initialized');
  }
}