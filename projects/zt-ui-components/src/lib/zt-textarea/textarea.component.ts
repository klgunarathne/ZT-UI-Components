import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyboardNavigationDirective } from '../theme/keyboard-navigation.directive';

/**
 * A customizable textarea component with character counting, length validation, and various styling options.
 * Supports different themes, sizes, and input styles with optional character count display.
 *
 * @example
 * <zt-textarea
 *   placeholder="Enter your message"
 *   [textlength]="500"
 *   [rows]="4"
 *   [showCharCount]="true"
 *   size="zt-md"
 *   theme="light">
 * </zt-textarea>
 */
@Component({
  selector: 'zt-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, KeyboardNavigationDirective],
  hostDirectives: [KeyboardNavigationDirective],
})
export class TextareaComponent {
  /**
   * Reference to the textarea element for direct DOM manipulation.
   */
  @ViewChild('textareaInput') textareaInput?: ElementRef;

  /**
   * The current value of the textarea.
   * @default ''
   */
  @Input() value? = '';

  /**
   * Placeholder text displayed when the textarea is empty.
   * @default 'label'
   */
  @Input() placeholder? = 'label';

  /**
   * Maximum allowed character length for the textarea.
   * @default 255
   */
  @Input() textlength = 255;

  /**
   * The type attribute for the textarea (typically 'text').
   * @default 'text'
   */
  @Input() type? = 'text';

  /**
   * Current length of the text in the textarea.
   */
  currentTextLength = 0;

  /**
   * The visible width of the textarea in average character widths.
   * Must be a positive integer.
   * @default 20
   */
  @Input() cols? = 20;

  /**
   * The number of visible text lines for the textarea.
   * Must be a positive integer.
   * @default 2
   */
  @Input() rows? = 2;

  /**
   * The visual style of the textarea.
   * @default 'zt'
   */
  @Input() inputStyle: 'zt' | 'material' | 'bs' = 'zt';

  /**
   * The theme of the textarea component.
   * @default 'light'
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * The size of the textarea component.
   * @default 'zt-md'
   */
  @Input() size: 'zt-md' | 'zt-sm' | 'zt-lg' = 'zt-md';

  /**
   * Whether to show the character count below the textarea.
   * @default true
   */
  @Input() showCharCount? = true;

  /**
   * Whether the textarea field is required for form submission.
   *
   * When required, the component will validate that the field is not empty
   * and display appropriate error messages if validation fails.
   *
   * @default false
   */
  @Input() required = false;

  /**
   * Custom error message to display when validation fails.
   *
   * If not provided, a default message will be shown for required field validation.
   */
  @Input() errorMessage?: string;

  /**
   * Dynamically applies CSS classes to the textarea element based on size, theme, and validation state.
   * @returns A string of CSS classes.
   */
  @HostBinding('class') get textareaClass(): string {
    let classes = `${this.size} theme-${this.theme}`;
    if (this.hasValidationError) {
      classes += ' error';
    } else if (this.value && this.value.trim() !== '') {
      classes += ' valid';
    }
    return classes;
  }

  /**
   * Whether the textarea has validation errors.
   *
   * Computed property that checks required field validation.
   */
  get hasValidationError(): boolean {
    if (this.required) {
      return !this.value || this.value.trim() === '';
    }
    return false;
  }

  /**
   * Gets the current error message to display.
   */
  get currentErrorMessage(): string | undefined {
    if (this.hasValidationError) {
      return this.errorMessage || 'This field is required';
    }
    return undefined;
  }

  /**
   * Handles keydown events to enforce character length limits and update current text length.
   * Updates the value if within the allowed length.
   */
  @HostListener('keydown') onKeydown() {
    if (
      Number(this.textlength) > this.textareaInput?.nativeElement.value.length
    )
      this.value = this.textareaInput?.nativeElement.value;
    this.currentTextLength = this.textareaInput?.nativeElement.value.length;
  }

  /**
   * Listens to global keyup events to update the current text length, particularly for delete operations.
   * @param event The keyboard event.
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.DELETE) {
      this.currentTextLength = this.textareaInput?.nativeElement.value.length;
    }
  }
}

/**
 * Enumeration of key codes used in the textarea component.
 */
export enum KEY_CODE {
  DELETE = 'Delete',
}
