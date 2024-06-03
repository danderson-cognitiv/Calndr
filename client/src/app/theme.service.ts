import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: string | null = null;
  private readonly themeKey = 'selectedTheme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  setTheme(themeName: string): void {
    if (this.currentTheme) {
      this.renderer.removeClass(document.body, this.currentTheme);
    }
    this.currentTheme = themeName;
    this.renderer.addClass(document.body, themeName);
    localStorage.setItem(this.themeKey, themeName);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.renderer.addClass(document.body, savedTheme);
    }
  }
}
