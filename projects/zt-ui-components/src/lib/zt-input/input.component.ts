import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
  Optional,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from '../theme/theme.directive';
import { ThemeConfig } from '../theme/theme.types';

/**
 * A customizable input component that supports various input types, styles, and themes.
 * It provides features like character length validation and different visual appearances.
 *
 * @example
 * <zt-input placeholder="Enter text" inputType="text" size="zt-md" theme="light"></zt-input>
 * <zt-input [textlength]="50" inputStyle="material" [value]="inputValue"></zt-input>
 */
@Component({
  selector: 'zt-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class InputComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}
  /**
   * Reference to the input element for direct DOM manipulation.
   */
  @ViewChild('textInput') textInput?: ElementRef;

  /**
   * The current value of the input field.
   * @default ''
   */
  @Input() value? = '';

  /**
   * Placeholder text displayed when the input is empty.
   * @default 'label'
   */
  @Input() placeholder? = 'label';

  /**
   * Maximum allowed character length for the input.
   * @default 255
   */
  @Input() textlength? = 255;

  /**
   * The type of input element (text, number, email, password).
   * @default 'text'
   */
  @Input() inputType?: 'text' | 'number' | 'email' | 'password' = 'text';

  /**
   * The visual style of the input (zt, material, bs for Bootstrap).
   * @default 'zt'
   */
  @Input() inputStyle: 'zt' | 'material' | 'bs' = 'zt';

  /**
   * The theme of the input component.
   * @default 'light'
   * @deprecated Use global theming or ztTheme directive for local overrides
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * Local theme override for this input component.
   * Takes precedence over global theme.
   */
  @Input() ztTheme?: Partial<ThemeConfig>;

  /**
   * The size of the input component.
   * @default 'zt-md'
   */
  @Input() size: 'zt-md' | 'zt-sm' | 'zt-lg' = 'zt-md';

  /**
   * Dynamically applies CSS classes to the input element based on size and theme.
   * @returns A string of CSS classes.
   */
  @HostBinding('class') get inputClass(): string {
    return `${this.size} theme-${this.theme}`;
  }

  /**
   * Applies theme overrides if specified
   */
  ngOnInit(): void {
    if (this.ztTheme) {
      // Apply local theme override
      this.applyLocalTheme();
    }
  }

  /**
   * Applies local theme override to the component
   */
  private applyLocalTheme(): void {
    if (!this.ztTheme) return;

    // Apply theme variables directly to the host element
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

  /**
   * Handles keydown events to enforce character length limits.
   * Updates the value if within the allowed length.
   */
  @HostListener('keydown') onKeydown() {
    if (Number(this.textlength) > this.textInput?.nativeElement.value.length)
      this.value = this.textInput?.nativeElement.value;
  }
}
