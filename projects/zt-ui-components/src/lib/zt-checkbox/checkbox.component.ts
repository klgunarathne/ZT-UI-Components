import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ElementRef,
} from '@angular/core';
import { ThemeConfig } from '../theme/theme.types';
import { KeyboardNavigationDirective } from '../theme/keyboard-navigation.directive';

/**
 * A customizable checkbox component that provides selection functionality with various styles, themes, and accessibility features.
 *
 * The checkbox component supports multiple visual variants, sizes, and integrates seamlessly with the ZT-UI-Components theming system.
 * It provides full accessibility support with ARIA attributes, keyboard navigation, and screen reader compatibility.
 *
 * @example
 * <!-- Basic usage with two-way binding -->
 * <zt-checkbox [(checked)]="isSelected" label="Accept terms"></zt-checkbox>
 *
 * @example
 * <!-- Advanced usage with event handling -->
 * <zt-checkbox
 *   [checked]="settings.notifications"
 *   [variant]="'rounded'"
 *   [size]="'zt-lg'"
 *   [theme]="'dark'"
 *   [disabled]="false"
 *   [showLabel]="true"
 *   label="Enable notifications"
 *   (checkboxChange)="onCheckboxChange($event)"
 *   (focus)="onFocus()"
 *   (blur)="onBlur()">
 * </zt-checkbox>
 *
 * @example
 * <!-- With theme override -->
 * <zt-checkbox [ztTheme]="customTheme" [checked]="true" label="Custom themed checkbox"></zt-checkbox>
 */
@Component({
  selector: 'zt-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [KeyboardNavigationDirective],
  hostDirectives: [KeyboardNavigationDirective],
})
export class CheckboxComponent {
  constructor(private elementRef: ElementRef) {}

  /**
   * Whether the checkbox is checked (selected state).
   * Controls the visual state and determines if the checkbox is active.
   * @default false
   */
  @Input() checked = false;

  /**
   * Whether the checkbox is disabled.
   * When disabled, the checkbox cannot be interacted with and appears visually muted.
   * @default false
   */
  @Input() disabled = false;

  /**
   * The visual variant of the checkbox.
   * - 'default': Standard checkbox with rounded corners
   * - 'rounded': Fully rounded checkbox (circular)
   * - 'square': Square checkbox with minimal rounding
   * @default 'default'
   */
  @Input() variant: 'default' | 'rounded' | 'square' = 'default';

  /**
   * The size of the checkbox.
   * - 'zt-sm': Small size (16px)
   * - 'zt-md': Medium size (20px) - default
   * - 'zt-lg': Large size (24px)
   * @default 'zt-md'
   */
  @Input() size: 'zt-sm' | 'zt-md' | 'zt-lg' = 'zt-md';

  /**
   * The theme of the checkbox.
   * Supports predefined themes: light, dark, bootstrap, material.
   * @default 'light'
   * @deprecated Use global theming or ztTheme directive for local overrides
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * Local theme override for this checkbox component.
   * Allows customizing colors, border radius, and other theme properties for this specific instance.
   * Takes precedence over the global theme.
   */
  @Input() ztTheme?: Partial<ThemeConfig>;

  /**
   * Label text for the checkbox (accessibility).
   * Used for screen readers and as fallback text when showLabel is false.
   * @default ''
   */
  @Input() label = '';

  /**
   * Whether to show the label text visually next to the checkbox.
   * When true, displays the label text beside the checkbox.
   * @default false
   */
  @Input() showLabel = false;

  /**
   * Emitted when the checkbox state changes.
   * Provides the new checked state (true for checked, false for unchecked).
   */
  @Output() checkboxChange = new EventEmitter<boolean>();

  /**
   * Emitted when the checkbox receives focus.
   * Useful for tracking user interaction and implementing custom focus behaviors.
   */
  @Output() focus = new EventEmitter<void>();

  /**
   * Emitted when the checkbox loses focus.
   * Useful for validation, saving state, or triggering side effects.
   */
  @Output() blur = new EventEmitter<void>();

  /**
   * Dynamically applies CSS classes to the checkbox element
   */
  @HostBinding('class') get checkboxClass(): string {
    let classes = [this.size, `theme-${this.theme}`, `zt-checkbox-${this.variant}`];
    if (this.checked) {
      classes.push('zt-checkbox-checked');
    }
    if (this.disabled) {
      classes.push('zt-checkbox-disabled');
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
    return 'checkbox';
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
   * Handles checkbox click events
   */
  onCheckboxClick(): void {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.checkboxChange.emit(this.checked);
  }

  /**
   * Handles keyboard events for accessibility
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onCheckboxClick();
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
