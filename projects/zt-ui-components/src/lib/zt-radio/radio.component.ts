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
 * A customizable radio button component that provides single selection functionality with various styles, themes, and accessibility features.
 *
 * The radio component supports multiple visual variants, sizes, and integrates seamlessly with the ZT-UI-Components theming system.
 * It provides full accessibility support with ARIA attributes, keyboard navigation, and screen reader compatibility.
 *
 * @example
 * <!-- Basic usage with two-way binding -->
 * <zt-radio [(checked)]="selectedOption" [value]="'option1'" name="options" label="Option 1"></zt-radio>
 *
 * @example
 * <!-- Advanced usage with event handling -->
 * <zt-radio
 *   [checked]="selectedValue === 'dark'"
 *   [value]="'dark'"
 *   [variant]="'rounded'"
 *   [size]="'zt-lg'"
 *   [theme]="'dark'"
 *   [disabled]="false"
 *   [showLabel]="true"
 *   name="theme"
 *   label="Dark theme"
 *   (radioChange)="onRadioChange($event)"
 *   (focus)="onFocus()"
 *   (blur)="onBlur()">
 * </zt-radio>
 *
 * @example
 * <!-- With theme override -->
 * <zt-radio [ztTheme]="customTheme" [checked]="true" [value]="'selected'" name="group" label="Custom themed radio"></zt-radio>
 */
@Component({
  selector: 'zt-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [KeyboardNavigationDirective],
  hostDirectives: [KeyboardNavigationDirective],
})
export class RadioComponent {
  constructor(private elementRef: ElementRef) {}

  /**
   * Whether the radio button is checked (selected state).
   * Controls the visual state and determines if the radio button is active.
   * @default false
   */
  @Input() checked = false;

  /**
   * Whether the radio button is disabled.
   * When disabled, the radio button cannot be interacted with and appears visually muted.
   * @default false
   */
  @Input() disabled = false;

  /**
   * The value associated with this radio button.
   * Used to identify which radio button is selected in a group.
   * @default ''
   */
  @Input() value = '';

  /**
   * The name attribute for the radio button group.
   * Radio buttons with the same name are part of the same group.
   * @default ''
   */
  @Input() name = '';

  /**
   * The visual variant of the radio button.
   * - 'default': Standard radio button with rounded appearance
   * - 'rounded': Fully rounded radio button (circular)
   * - 'square': Square radio button with minimal rounding
   * @default 'default'
   */
  @Input() variant: 'default' | 'rounded' | 'square' = 'default';

  /**
   * The size of the radio button.
   * - 'zt-sm': Small size (16px)
   * - 'zt-md': Medium size (20px) - default
   * - 'zt-lg': Large size (24px)
   * @default 'zt-md'
   */
  @Input() size: 'zt-sm' | 'zt-md' | 'zt-lg' = 'zt-md';

  /**
   * The theme of the radio button.
   * Supports predefined themes: light, dark, bootstrap, material.
   * @default 'light'
   * @deprecated Use global theming or ztTheme directive for local overrides
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * Local theme override for this radio component.
   * Allows customizing colors, border radius, and other theme properties for this specific instance.
   * Takes precedence over the global theme.
   */
  @Input() ztTheme?: Partial<ThemeConfig>;

  /**
   * Label text for the radio button (accessibility).
   * Used for screen readers and as fallback text when showLabel is false.
   * @default ''
   */
  @Input() label = '';

  /**
   * Whether to show the label text visually next to the radio button.
   * When true, displays the label text beside the radio button.
   * @default false
   */
  @Input() showLabel = false;

  /**
   * Emitted when the radio button state changes.
   * Provides the value of the selected radio button.
   */
  @Output() radioChange = new EventEmitter<string>();

  /**
   * Emitted when the radio button receives focus.
   * Useful for tracking user interaction and implementing custom focus behaviors.
   */
  @Output() focus = new EventEmitter<void>();

  /**
   * Emitted when the radio button loses focus.
   * Useful for validation, saving state, or triggering side effects.
   */
  @Output() blur = new EventEmitter<void>();

  /**
   * Dynamically applies CSS classes to the radio element
   */
  @HostBinding('class') get radioClass(): string {
    let classes = [this.size, `theme-${this.theme}`, `zt-radio-${this.variant}`];
    if (this.checked) {
      classes.push('zt-radio-checked');
    }
    if (this.disabled) {
      classes.push('zt-radio-disabled');
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
    return 'radio';
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
   * Handles radio button click events
   */
  onRadioClick(): void {
    if (this.disabled || this.checked) return;

    this.checked = true;
    this.radioChange.emit(this.value);
  }

  /**
   * Handles keyboard events for accessibility
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onRadioClick();
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
