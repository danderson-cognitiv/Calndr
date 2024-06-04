import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent {
  constructor(private themeService: ThemeService) {}

  switchTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }
}
