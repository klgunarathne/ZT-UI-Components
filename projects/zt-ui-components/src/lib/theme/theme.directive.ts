import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  HostBinding,
  Renderer2,
  Optional,
} from '@angular/core';
import { ZTThemeService } from './theme.service';
import { ThemeConfig } from './theme.types';
import { Subscription } from 'rxjs';

/**
 * Directive to apply theme overrides to individual components
 * Usage: <zt-card [ztTheme]="customThemeConfig">...</zt-card>
 */
@Directive({
  selector: '[ztTheme]',
  standalone: true,
})
export class ThemeDirective implements OnInit, OnDestroy {
  private subscription?: Subscription;
  private clearOverrides?: () => void;

  /**
   * Theme configuration override for this component
   */
  @Input('ztTheme') themeOverride?: Partial<ThemeConfig>;

  /**
   * Whether to inherit from parent theme context
   */
  @Input() inheritTheme = true;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private themeService: ZTThemeService
  ) {}

  ngOnInit(): void {
    if (this.themeOverride) {
      this.applyThemeOverride();
    } else if (this.inheritTheme) {
      this.subscribeToGlobalTheme();
    }
  }

  ngOnDestroy(): void {
    this.clearOverrides?.();
    this.subscription?.unsubscribe();
  }

  /**
   * Applies theme override to the component
   */
  private applyThemeOverride(): void {
    if (!this.themeOverride) return;

    this.clearOverrides = this.themeService.setThemeOverrides(this.themeOverride);
    this.applyThemeToElement(this.themeService.getThemeContext(this.themeOverride));
  }

  /**
   * Subscribes to global theme changes
   */
  private subscribeToGlobalTheme(): void {
    this.subscription = this.themeService.currentTheme$.subscribe(theme => {
      const context = this.themeService.getThemeContext();
      this.applyThemeToElement(context);
    });
  }

  /**
   * Applies theme styles to the element
   * @param context Theme context
   */
  private applyThemeToElement(context: { globalTheme: ThemeConfig; componentOverrides?: Partial<ThemeConfig> }): void {
    const element = this.elementRef.nativeElement;
    const theme = context.componentOverrides
      ? { ...context.globalTheme, ...context.componentOverrides }
      : context.globalTheme;

    // Apply CSS custom properties to the element
    this.applyCssVariables(element, theme);

    // Update element classes
    this.updateThemeClasses(element, theme);
  }

  /**
   * Applies CSS custom properties to an element
   * @param element The element to apply variables to
   * @param theme The theme configuration
   */
  private applyCssVariables(element: HTMLElement, theme: ThemeConfig): void {
    const colors = theme.colors;

    // Apply color variables with component scope
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--zt-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      this.renderer.setStyle(element, cssVar, value);
    });

    // Apply other theme properties
    this.renderer.setStyle(element, '--zt-border-radius', `${theme.borderRadius}px`);
    this.renderer.setStyle(element, '--zt-border-size', `${theme.borderSize}px`);

    if (theme.fontFamily) {
      this.renderer.setStyle(element, '--zt-font-family', theme.fontFamily);
    }

    if (theme.fontSize) {
      this.renderer.setStyle(element, '--zt-font-size-small', theme.fontSize.small);
      this.renderer.setStyle(element, '--zt-font-size-medium', theme.fontSize.medium);
      this.renderer.setStyle(element, '--zt-font-size-large', theme.fontSize.large);
    }

    if (theme.spacing) {
      this.renderer.setStyle(element, '--zt-spacing-small', theme.spacing.small);
      this.renderer.setStyle(element, '--zt-spacing-medium', theme.spacing.medium);
      this.renderer.setStyle(element, '--zt-spacing-large', theme.spacing.large);
    }
  }

  /**
   * Updates theme-related CSS classes on the element
   * @param element The element to update
   * @param theme The theme configuration
   */
  private updateThemeClasses(element: HTMLElement, theme: ThemeConfig): void {
    // Remove existing theme classes
    const existingClasses = Array.from(element.classList).filter(cls => cls.startsWith('theme-'));
    existingClasses.forEach(cls => this.renderer.removeClass(element, cls));

    // Add new theme class
    this.renderer.addClass(element, `theme-${theme.name}`);
  }
}
