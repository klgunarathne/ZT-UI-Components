import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class InputComponent {
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
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

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
   * Handles keydown events to enforce character length limits.
   * Updates the value if within the allowed length.
   */
  @HostListener('keydown') onKeydown() {
    if (Number(this.textlength) > this.textInput?.nativeElement.value.length)
      this.value = this.textInput?.nativeElement.value;
  }
}
