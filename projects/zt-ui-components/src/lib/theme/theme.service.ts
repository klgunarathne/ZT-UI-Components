import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeConfig, ThemeName, ThemeContext } from './theme.types';
import { LIGHT_THEME, getThemeByName } from './default-themes';
import { ThemeValidationService } from './theme-validation.service';

/**
 * Injection token for theme configuration
 */
export const THEME_CONFIG = new InjectionToken<Partial<ThemeConfig>>('THEME_CONFIG');

/**
 * Service for managing global theme state and switching
 */
@Injectable({
  providedIn: 'root',
})
export class ZTThemeService {
  private currentThemeSubject = new BehaviorSubject<ThemeConfig>(LIGHT_THEME);
  private themeOverridesSubject = new BehaviorSubject<Partial<ThemeConfig> | null>(null);

  /**
   * Observable for the current global theme
   */
  public currentTheme$: Observable<ThemeConfig> = this.currentThemeSubject.asObservable();

  /**
   * Observable for theme overrides
   */
  public themeOverrides$: Observable<Partial<ThemeConfig> | null> = this.themeOverridesSubject.asObservable();

  constructor(
    private validationService: ThemeValidationService,
    @Optional() @Inject(THEME_CONFIG) private config?: Partial<ThemeConfig>
  ) {
    this.initializeTheme();
  }

  /**
   * Gets the current global theme
   */
  get currentTheme(): ThemeConfig {
    return this.currentThemeSubject.value;
  }

  /**
   * Gets the current theme overrides
   */
  get themeOverrides(): Partial<ThemeConfig> | null {
    return this.themeOverridesSubject.value;
  }

  /**
   * Initializes the theme from configuration or defaults
   */
  private initializeTheme(): void {
    if (this.config) {
      const mergedTheme = this.validationService.mergeThemes(LIGHT_THEME, this.config);
      if (mergedTheme) {
        this.setTheme(mergedTheme);
      } else {
        console.warn('Invalid theme configuration provided, falling back to default theme');
        this.setTheme(LIGHT_THEME);
      }
    } else {
      this.setTheme(LIGHT_THEME);
    }
  }

  /**
   * Sets the global theme
   * @param theme The theme configuration to set
   */
  setTheme(theme: ThemeConfig): void {
    const validation = this.validationService.validateTheme(theme);

    if (!validation.isValid) {
      console.error('Invalid theme configuration:', validation.errors);
      throw new Error(`Theme validation failed: ${validation.errors.join(', ')}`);
    }

    if (validation.warnings.length > 0) {
      console.warn('Theme validation warnings:', validation.warnings);
    }

    this.currentThemeSubject.next(theme);
    this.applyThemeToDocument(theme);
  }

  /**
   * Sets the theme by name
   * @param themeName The predefined theme name
   */
  setThemeByName(themeName: ThemeName): void {
    const theme = getThemeByName(themeName);
    this.setTheme(theme);
  }

  /**
   * Updates the current theme with partial overrides
   * @param overrides Partial theme configuration
   */
  updateTheme(overrides: Partial<ThemeConfig>): void {
    const mergedTheme = this.validationService.mergeThemes(this.currentTheme, overrides);
    if (mergedTheme) {
      this.setTheme(mergedTheme);
    } else {
      console.error('Failed to merge theme overrides');
    }
  }

  /**
   * Sets temporary theme overrides for a component
   * @param overrides Theme overrides
   * @returns Function to clear overrides
   */
  setThemeOverrides(overrides: Partial<ThemeConfig>): () => void {
    this.themeOverridesSubject.next(overrides);
    return () => this.clearThemeOverrides();
  }

  /**
   * Clears theme overrides
   */
  clearThemeOverrides(): void {
    this.themeOverridesSubject.next(null);
  }

  /**
   * Gets the effective theme context for a component
   * @param componentOverrides Optional component-specific overrides
   * @returns Theme context with global theme and overrides
   */
  getThemeContext(componentOverrides?: Partial<ThemeConfig>): ThemeContext {
    return {
      globalTheme: this.currentTheme,
      componentOverrides: componentOverrides || this.themeOverrides || undefined,
    };
  }

  /**
   * Applies theme CSS custom properties to the document root
   * @param theme The theme to apply
   */
  private applyThemeToDocument(theme: ThemeConfig): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const colors = theme.colors;

    // Apply color variables
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--zt-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });

    // Apply other theme properties
    root.style.setProperty('--zt-border-radius', `${theme.borderRadius}px`);
    root.style.setProperty('--zt-border-size', `${theme.borderSize}px`);

    if (theme.fontFamily) {
      root.style.setProperty('--zt-font-family', theme.fontFamily);
    }

    if (theme.fontSize) {
      root.style.setProperty('--zt-font-size-small', theme.fontSize.small);
      root.style.setProperty('--zt-font-size-medium', theme.fontSize.medium);
      root.style.setProperty('--zt-font-size-large', theme.fontSize.large);
    }

    if (theme.spacing) {
      root.style.setProperty('--zt-spacing-small', theme.spacing.small);
      root.style.setProperty('--zt-spacing-medium', theme.spacing.medium);
      root.style.setProperty('--zt-spacing-large', theme.spacing.large);
    }

    // Set theme class on body for CSS selectors
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme.name}`);
  }

  /**
   * Resets theme to default
   */
  resetToDefault(): void {
    this.setTheme(LIGHT_THEME);
  }

  /**
   * Toggles between light and dark themes
   */
  toggleDarkMode(): void {
    const currentName = this.currentTheme.name;
    if (currentName === 'light') {
      this.setThemeByName('dark');
    } else if (currentName === 'dark') {
      this.setThemeByName('light');
    } else {
      // For other themes, toggle to dark if current is light-like, or light if dark-like
      this.setThemeByName('dark');
    }
  }

  /**
   * Gets available theme names
   */
  getAvailableThemes(): ThemeName[] {
    return ['light', 'dark', 'bootstrap', 'material'];
  }

  /**
   * Exports current theme configuration
   */
  exportTheme(): ThemeConfig {
    return { ...this.currentTheme };
  }

  /**
   * Imports a theme configuration
   * @param themeConfig The theme configuration to import
   */
  importTheme(themeConfig: ThemeConfig): void {
    this.setTheme(themeConfig);
  }
}
