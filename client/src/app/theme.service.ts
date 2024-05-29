import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: string | null = null;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setTheme(themeName: string): void {
    if (this.currentTheme) {
      this.renderer.removeClass(document.body, this.currentTheme);
    }
    this.currentTheme = themeName;
    this.renderer.addClass(document.body, themeName);
  }
}
