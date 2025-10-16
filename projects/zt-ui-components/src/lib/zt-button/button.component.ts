import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ElementRef,
} from '@angular/core';
import { ThemeConfig } from '../theme/theme.types';

/**
 * A customizable button component that supports various styles, sizes, themes, and variants.
 * It can be used as a standard button, submit button, or reset button with different visual appearances.
 *
 * @example
 * <zt-button variant="primary" size="zt-md" theme="light">Click me</zt-button>
 * <zt-button variant="danger" outline="true" disabled="true">Disabled</zt-button>
 */
@Component({
  selector: 'zt-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ButtonComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}
  /**
   * The type of the button element.
   * @default 'button'
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Whether the button is disabled.
   * @default false
   */
  @Input() disabled = false;

  /**
   * The visual variant of the button.
   * @default 'primary'
   */
  @Input() variant: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'link' | 'round' | 'floating' = 'primary';

  /**
   * Whether to display the button as an outline style.
   * @default false
   */
  @Input() outline = false;

  /**
   * The size of the button.
   * @default 'zt-md'
   */
  @Input() size: 'zt-sm' | 'zt-md' | 'zt-lg' = 'zt-md';

  /**
   * The theme of the button.
   * @default 'light'
   * @deprecated Use global theming or ztTheme directive for local overrides
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * Local theme override for this button component.
   * Takes precedence over global theme.
   */
  @Input() ztTheme?: Partial<ThemeConfig>;

  /**
   * Dynamically applies CSS classes to the button element based on the component's properties.
   * @returns A string of CSS classes.
   */
  @HostBinding('class') get buttonClass(): string {
    let classes: string[] = [this.size, `theme-${this.theme}`];
    if (this.outline) {
      classes.push(`zt-${this.variant}-o`);
    } else {
      classes.push(`zt-${this.variant}`);
    }
    return classes.join(' ');
  }

  /**
   * Sets the 'type' attribute on the button element.
   * @returns The button type.
   */
  @HostBinding('attr.type') get buttonType(): string {
    return this.type;
  }

  /**
   * Sets the 'disabled' attribute on the button element when disabled is true.
   * @returns true if disabled, null otherwise.
   */
  @HostBinding('attr.disabled') get isDisabled(): boolean | null {
    return this.disabled || null;
  }

  /**
   * Applies theme overrides if specified
   */
  ngOnInit(): void {
    if (this.ztTheme) {
      this.applyLocalTheme();
    }
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

    if (this.ztTheme.fontFamily) {
      hostElement.style.setProperty('--zt-font-family', this.ztTheme.fontFamily);
    }
  }
}
