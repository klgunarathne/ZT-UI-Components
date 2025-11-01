import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ElementRef,
} from '@angular/core';
import { ThemeConfig } from '../theme/theme.types';

/**
 * A modern toggle switch component that provides on/off functionality with various styles, themes, and accessibility features.
 *
 * The toggle component supports multiple visual variants (default, rounded, square), sizes (small, medium, large),
 * and integrates seamlessly with the ZT-UI-Components theming system. It provides full accessibility support
 * with ARIA attributes, keyboard navigation, and screen reader compatibility.
 *
 * @example
 * <!-- Basic usage with two-way binding -->
 * <zt-toggle [(checked)]="isEnabled" label="Enable notifications"></zt-toggle>
 *
 * @example
 * <!-- Advanced usage with event handling -->
 * <zt-toggle
 *   [checked]="settings.darkMode"
 *   [variant]="'rounded'"
 *   [size]="'zt-lg'"
 *   [theme]="'dark'"
 *   [disabled]="false"
 *   [showLabel]="true"
 *   label="Dark Mode"
 *   (toggleChange)="onToggleChange($event)"
 *   (focus)="onFocus()"
 *   (blur)="onBlur()">
 * </zt-toggle>
 *
 * @example
 * <!-- With theme override -->
 * <zt-toggle [ztTheme]="customTheme" [checked]="true" label="Custom themed toggle"></zt-toggle>
 */
@Component({
  selector: 'zt-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ToggleComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  /**
   * Whether the toggle is checked (on state).
   * Controls the visual state and determines if the toggle is active.
   * @default false
   */
  @Input() checked = false;

  /**
   * Whether the toggle is disabled.
   * When disabled, the toggle cannot be interacted with and appears visually muted.
   * @default false
   */
  @Input() disabled = false;

  /**
   * The visual variant of the toggle.
   * - 'default': Standard toggle with rounded corners
   * - 'rounded': Fully rounded toggle (pill-shaped)
   * - 'square': Square toggle with minimal rounding
   * @default 'default'
   */
  @Input() variant: 'default' | 'rounded' | 'square' = 'default';

  /**
   * The size of the toggle.
   * - 'zt-sm': Small size (36px width)
   * - 'zt-md': Medium size (44px width) - default
   * - 'zt-lg': Large size (52px width)
   * @default 'zt-md'
   */
  @Input() size: 'zt-sm' | 'zt-md' | 'zt-lg' = 'zt-md';

  /**
   * The theme of the toggle.
   * Supports predefined themes: light, dark, bootstrap, material.
   * @default 'light'
   * @deprecated Use global theming or ztTheme directive for local overrides
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * Local theme override for this toggle component.
   * Allows customizing colors, border radius, and other theme properties for this specific instance.
   * Takes precedence over the global theme.
   */
  @Input() ztTheme?: Partial<ThemeConfig>;

  /**
   * Label text for the toggle (accessibility).
   * Used for screen readers and as fallback text when showLabel is false.
   * @default ''
   */
  @Input() label = '';

  /**
   * Whether to show the label text visually next to the toggle.
   * When true, displays the label text beside the toggle switch.
   * @default false
   */
  @Input() showLabel = false;

  /**
   * Emitted when the toggle state changes.
   * Provides the new checked state (true for on, false for off).
   */
  @Output() toggleChange = new EventEmitter<boolean>();

  /**
   * Emitted when the toggle receives focus.
   * Useful for tracking user interaction and implementing custom focus behaviors.
   */
  @Output() focus = new EventEmitter<void>();

  /**
   * Emitted when the toggle loses focus.
   * Useful for validation, saving state, or triggering side effects.
   */
  @Output() blur = new EventEmitter<void>();

  /**
   * Dynamically applies CSS classes to the toggle element
   */
  @HostBinding('class') get toggleClass(): string {
    let classes = [this.size, `theme-${this.theme}`, `zt-toggle-${this.variant}`];
    if (this.checked) {
      classes.push('zt-toggle-checked');
    }
    if (this.disabled) {
      classes.push('zt-toggle-disabled');
    }
    return classes.join(' ');
  }

  /**
   * Sets the tabindex attribute for keyboard navigation
   */
  @HostBinding('attr.tabindex') get tabIndex(): number {
    return this.disabled ? -1 : 0;
  }

  /**
   * Sets the role attribute for screen readers
   */
  @HostBinding('attr.role') get role(): string {
    return 'switch';
  }

  /**
   * Sets the aria-checked attribute for screen readers
   */
  @HostBinding('attr.aria-checked') get ariaChecked(): boolean {
    return this.checked;
  }

  /**
   * Sets the aria-disabled attribute for screen readers
   */
  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean {
    return this.disabled;
  }

  /**
   * Sets the aria-label attribute if no label is provided
   */
  @HostBinding('attr.aria-label') get ariaLabel(): string | null {
    return this.label || null;
  }

  ngOnInit(): void {
    if (this.ztTheme) {
      this.applyLocalTheme();
    }
  }

  /**
   * Handles toggle click events
   */
  onToggleClick(): void {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.toggleChange.emit(this.checked);
  }

  /**
   * Handles keyboard events for accessibility
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onToggleClick();
    }
  }

  /**
   * Handles focus events
   */
  onFocus(): void {
    this.focus.emit();
  }

  /**
   * Handles blur events
   */
  onBlur(): void {
    this.blur.emit();
  }

  /**
   * Applies local theme override to the component
   */
  private applyLocalTheme(): void {
    if (!this.ztTheme) return;

    const hostElement = this.elementRef.nativeElement;

    if (this.ztTheme.colors) {
      Object.entries(this.ztTheme.colors).forEach(([key, value]) => {
        const cssVar = `--zt-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        hostElement.style.setProperty(cssVar, value);
      });
    }

    if (this.ztTheme.borderRadius !== undefined) {
      hostElement.style.setProperty('--zt-border-radius', `${this.ztTheme.borderRadius}px`);
    }

    if (this.ztTheme.borderSize !== undefined) {
      hostElement.style.setProperty('--zt-border-size', `${this.ztTheme.borderSize}px`);
    }
  }
}
