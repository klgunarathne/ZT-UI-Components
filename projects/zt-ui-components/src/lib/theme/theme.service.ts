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
    // Load persisted theme after initialization
    this.loadPersistedTheme();
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
    // Persist theme automatically
    this.persistTheme();
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

    // Validate CSS custom properties before applying
    const cssValidation = this.validationService.validateCssCustomProperties(theme);
    if (!cssValidation.isValid) {
      console.error('CSS Custom Property Validation Failed:', cssValidation.errors);
      throw new Error(`Theme CSS validation failed: ${cssValidation.errors.join(', ')}`);
    }

    if (cssValidation.warnings.length > 0) {
      console.warn('CSS Custom Property Validation Warnings:', cssValidation.warnings);
    }

    // Clear existing theme properties
    this.clearExistingThemeProperties(root);

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
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--zt-spacing-${key}`, value);
      });
    }

    if (theme.shadows) {
      Object.entries(theme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--zt-shadow-${key}`, value);
      });
    }

    if (theme.animations) {
      Object.entries(theme.animations).forEach(([key, value]) => {
        root.style.setProperty(`--zt-animation-${key}`, value);
      });
    }

    if (theme.breakpoints) {
      Object.entries(theme.breakpoints).forEach(([key, value]) => {
        root.style.setProperty(`--zt-breakpoint-${key}`, value);
      });
    }

    // Set theme class on body for CSS selectors
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme.name}`);
  }

  /**
   * Clears existing theme-related CSS custom properties
   * @param root The document root element
   */
  private clearExistingThemeProperties(root: HTMLElement): void {
    const themeProperties = [
      // Colors
      '--zt-text-black', '--zt-text-white', '--zt-text-primary',
      '--zt-default', '--zt-default-hover-bg', '--zt-default-hover-border', '--zt-default-pressed',
      '--zt-primary', '--zt-primary-hover-bg', '--zt-primary-hover-border', '--zt-primary-pressed',
      '--zt-success', '--zt-success-hover-bg', '--zt-success-hover-border', '--zt-success-pressed',
      '--zt-info', '--zt-info-hover-bg', '--zt-info-hover-border', '--zt-info-pressed',
      '--zt-warning', '--zt-warning-hover-bg', '--zt-warning-hover-border', '--zt-warning-pressed',
      '--zt-danger', '--zt-danger-hover-bg', '--zt-danger-hover-border', '--zt-danger-pressed',
      '--zt-dark', '--zt-dark-hover-bg', '--zt-dark-hover-border', '--zt-dark-pressed',
      '--zt-link', '--zt-link-hover-bg', '--zt-link-hover-border', '--zt-link-pressed',
      // Dimensions
      '--zt-border-radius', '--zt-border-size',
      // Typography
      '--zt-font-family', '--zt-font-size-small', '--zt-font-size-medium', '--zt-font-size-large',
      // Spacing
      '--zt-spacing-xs', '--zt-spacing-sm', '--zt-spacing-md', '--zt-spacing-lg', '--zt-spacing-xl', '--zt-spacing-xxl',
      // Shadows
      '--zt-shadow-none', '--zt-shadow-xs', '--zt-shadow-sm', '--zt-shadow-md', '--zt-shadow-lg', '--zt-shadow-xl',
      // Animations
      '--zt-animation-fast', '--zt-animation-normal', '--zt-animation-slow', '--zt-animation-bounce',
      // Breakpoints
      '--zt-breakpoint-sm', '--zt-breakpoint-md', '--zt-breakpoint-lg', '--zt-breakpoint-xl'
    ];

    themeProperties.forEach(property => {
      root.style.removeProperty(property);
    });
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
   * Persists the current theme to localStorage
   */
  persistTheme(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('zt-theme', JSON.stringify(this.currentTheme));
      } catch (error) {
        console.warn('Failed to persist theme to localStorage:', error);
      }
    }
  }

  /**
   * Loads theme from localStorage
   */
  loadPersistedTheme(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const persistedTheme = localStorage.getItem('zt-theme');
        if (persistedTheme) {
          const theme = JSON.parse(persistedTheme);
          this.setTheme(theme);
        }
      } catch (error) {
        console.warn('Failed to load persisted theme:', error);
      }
    }
  }

  /**
   * Clears persisted theme from localStorage
   */
  clearPersistedTheme(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('zt-theme');
    }
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
