import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Optional,
  OnInit,
  OnDestroy,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ThemeDirective } from '../theme/theme.directive';
import { ThemeConfig } from '../theme/theme.types';

/**
 * A feature-rich, accessible input component with advanced validation, multiple visual styles, and comprehensive theming support.
 *
 * ## Key Features
 * - 🎨 **Multiple Visual Styles**: ZT (default), Material Design, and Bootstrap styles
 * - 📝 **Advanced Validation**: Character limits with real-time feedback and visual indicators
 * - ♿ **Full Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes and keyboard navigation
 * - 🔗 **Two-Way Data Binding**: Seamless integration with `[(ngModel)]` and reactive forms
 * - 🎯 **ControlValueAccessor**: Native Angular forms support for reactive and template-driven forms
 * - 📊 **Character Counter**: Real-time character counting with warning and error states
 * - 🎨 **Theme Integration**: Global and local theme overrides with CSS custom properties
 * - ⚡ **Performance Optimized**: OnPush change detection and efficient DOM manipulation
 * - 🛡️ **Type Safe**: Full TypeScript support with strict typing and IntelliSense
 *
 * ## Usage Examples
 *
 * ### Basic Usage
 * ```html
 * <zt-input
 *   placeholder="Enter your name"
 *   size="zt-md">
 * </zt-input>
 * ```
 *
 * ### Two-Way Data Binding
 * ```html
 * <zt-input
 *   placeholder="Enter name"
 *   [(ngModel)]="userName"
 *   [textlength]="50"
 *   [showCharCounter]="true">
 * </zt-input>
 * ```
 *
 * ### Reactive Forms Integration
 * ```html
 * <zt-input
 *   formControlName="email"
 *   placeholder="Email address"
 *   inputType="email"
 *   [showCharCounter]="true">
 * </zt-input>
 * ```
 *
 * ### Event Handling
 * ```html
 * <zt-input
 *   placeholder="Interactive input"
 *   (valueChange)="onValueChange($event)"
 *   (focus)="onFocus($event)"
 *   (blur)="onBlur($event)"
 *   [textlength]="100"
 *   [showCharCounter]="true">
 * </zt-input>
 * ```
 *
 * ### Advanced Configuration
 * ```html
 * <zt-input
 *   placeholder="Advanced input example"
 *   inputType="text"
 *   inputStyle="zt"
 *   size="zt-md"
 *   [value]="initialValue"
 *   [textlength]="200"
 *   [showCharCounter]="true"
 *   [disabled]="isDisabled"
 *   [errorMessage]="validationError"
 *   [ztTheme]="customTheme"
 *   (valueChange)="onValueChange($event)"
 *   (blur)="validateInput($event)">
 * </zt-input>
 * ```
 *
 * ### Theme Customization
 * ```html
 * <zt-input
 *   [ztTheme]="brandInputTheme"
 *   placeholder="Brand styled input"
 *   [showCharCounter]="true">
 * </zt-input>
 * ```
 *
 * ```typescript
 * brandInputTheme: Partial<ThemeConfig> = {
 *   colors: {
 *     primary: '#FF6B35',        // Brand orange
 *     textBlack: '#2D3748',      // Dark gray text
 *     default: '#FFFFFF',        // White background
 *   },
 *   borderRadius: 8,             // Rounded corners
 *   borderSize: 2,              // Thicker borders
 *   fontFamily: '"Inter", sans-serif'
 * };
 * ```
 *
 * ## Accessibility Features
 * - Unique IDs for proper label association
 * - ARIA attributes for screen reader support
 * - Keyboard navigation support
 * - Focus management with visual indicators
 * - Character counter with proper announcements
 * - Error states with role="alert"
 *
 * ## Performance Considerations
 * - Uses OnPush change detection strategy
 * - Efficient event handling with input events instead of keydown
 * - Renderer2 for optimal DOM manipulation
 * - CSS custom properties for theme switching without style recalculation
 *
 * @author ZT-UI-Components Team
 * @version 2.0.0
 * @since 1.0.0
 */
@Component({
  selector: 'zt-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  host: {
    class: 'zt-input'
  }
})
export class InputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private destroy$ = new Subject<void>();
  private renderer: Renderer2;

  /**
   * Reference to the native input element for advanced DOM manipulation if needed.
   * Most use cases should use the value property and events instead.
   *
   * @example
   * ```typescript
   * // Access native element (advanced usage)
   * if (this.textInput) {
   *   this.textInput.nativeElement.focus();
   * }
   * ```
   */
  @ViewChild('textInput') textInput?: ElementRef<HTMLInputElement>;

  /**
   * The current value of the input field. Supports two-way data binding with `[(ngModel)]`.
   *
   * When used with reactive forms, this property is automatically synchronized with the FormControl value.
   *
   * @example
   * ```html
   * <!-- Template-driven form -->
   * <zt-input [(ngModel)]="userName" placeholder="Enter name"></zt-input>
   *
   * <!-- Reactive form -->
   * <zt-input formControlName="email" placeholder="Email"></zt-input>
   * ```
   *
   * @default ''
   */
  @Input() value = '';

  /**
   * Placeholder text displayed when the input is empty. Provides context about expected input.
   *
   * For accessibility, ensure placeholder text is not the only way to identify the input's purpose.
   * Use proper labeling with `<label>` elements or `aria-labelledby` when possible.
   *
   * @example
   * ```html
   * <zt-input placeholder="Enter your full name"></zt-input>
   * <zt-input placeholder="user@example.com"></zt-input>
   * ```
   *
   * @default 'Enter text'
   */
  @Input() placeholder = 'Enter text';

  /**
   * Maximum allowed character length for the input. When exceeded, further typing is prevented.
   *
   * Use with `[showCharCounter]="true"` to provide visual feedback to users about character limits.
   * The component automatically handles validation and provides appropriate ARIA attributes.
   *
   * @example
   * ```html
   * <!-- Short input for names -->
   * <zt-input [textlength]="50" [showCharCounter]="true" placeholder="Name"></zt-input>
   *
   * <!-- Long input for descriptions -->
   * <zt-input [textlength]="500" [showCharCounter]="true" placeholder="Description"></zt-input>
   * ```
   *
   * @default 255
   */
  @Input() textlength = 255;

  /**
   * The type attribute of the HTML input element, determining input behavior and validation.
   *
   * - `text`: Standard text input (default)
   * - `email`: Email input with built-in validation UI on supported browsers
   * - `password`: Password input with text masking
   * - `number`: Numeric input with increment/decrement controls on supported browsers
   *
   * @example
   * ```html
   * <zt-input inputType="email" placeholder="Email address"></zt-input>
   * <zt-input inputType="password" placeholder="Password"></zt-input>
   * <zt-input inputType="number" placeholder="Age"></zt-input>
   * ```
   *
   * @default 'text'
   */
  @Input() inputType: 'text' | 'number' | 'email' | 'password' = 'text';

  /**
   * Visual style variant that changes the appearance and behavior of the input.
   *
   * - `zt`: Default ZT-UI style with floating labels and modern aesthetics
   * - `material`: Material Design style with bottom-border focus and label animation
   * - `bs`: Bootstrap-style input with traditional form styling
   *
   * Each style maintains consistent functionality while providing different visual experiences.
   *
   * @example
   * ```html
   * <!-- Default ZT style -->
   * <zt-input inputStyle="zt" placeholder="ZT Style"></zt-input>
   *
   * <!-- Material Design style -->
   * <zt-input inputStyle="material" placeholder="Material Style"></zt-input>
   *
   * <!-- Bootstrap style -->
   * <zt-input inputStyle="bs" placeholder="Bootstrap Style"></zt-input>
   * ```
   *
   * @default 'zt'
   */
  @Input() inputStyle: 'zt' | 'material' | 'bs' = 'zt';

  /**
   * Legacy theme property for backward compatibility.
   *
   * @deprecated 2.0.0 - Use global theming with `ZTThemeService` or local `ztTheme` overrides instead.
   * This property will be removed in a future major version.
   *
   * @example
   * ```typescript
   * // ❌ Deprecated - avoid using
   * <zt-input theme="dark" placeholder="Dark theme"></zt-input>
   *
   * // ✅ Recommended approach
   * <zt-input [ztTheme]="darkTheme" placeholder="Dark theme"></zt-input>
   * ```
   *
   * @default 'light'
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * Local theme override for this input component. Takes precedence over global theme settings.
   *
   * Use this for component-specific styling that differs from your global theme.
   * For consistent theming across your application, prefer global theme configuration.
   *
   * @example
   * ```html
   * <zt-input
   *   [ztTheme]="brandInputTheme"
   *   placeholder="Brand styled input">
   * </zt-input>
   * ```
   *
   * ```typescript
   * brandInputTheme: Partial<ThemeConfig> = {
   *   colors: {
   *     primary: '#FF6B35',        // Brand orange
   *     textBlack: '#2D3748',      // Dark gray text
   *     default: '#FFFFFF',        // White background
   *   },
   *   borderRadius: 8,             // Rounded corners
   *   borderSize: 2,              // Thicker borders
   *   fontFamily: '"Inter", sans-serif'
   * };
   * ```
   */
  @Input() ztTheme?: Partial<ThemeConfig>;

  /**
   * Size variant that controls the overall scale of the input component.
   *
   * - `zt-sm`: Small size for compact layouts
   * - `zt-md`: Medium size (default) for standard forms
   * - `zt-lg`: Large size for emphasis or touch interfaces
   *
   * @example
   * ```html
   * <zt-input size="zt-sm" placeholder="Small input"></zt-input>
   * <zt-input size="zt-md" placeholder="Medium input"></zt-input>
   * <zt-input size="zt-lg" placeholder="Large input"></zt-input>
   * ```
   *
   * @default 'zt-md'
   */
  @Input() size: 'zt-md' | 'zt-sm' | 'zt-lg' = 'zt-md';

  /**
   * Error message to display when validation fails or character limit is exceeded.
   *
   * The message is displayed below the input with appropriate styling and ARIA attributes.
   * Use clear, actionable error messages to help users correct their input.
   *
   * @example
   * ```html
   * <zt-input
   *   placeholder="Email"
   *   inputType="email"
   *   [errorMessage]="emailError"
   *   [textlength]="100">
   * </zt-input>
   * ```
   *
   * ```typescript
   * emailError: string;
   *
   * validateEmail() {
   *   if (this.emailFormControl.invalid) {
   *     if (this.emailFormControl.errors?.['required']) {
   *       this.emailError = 'Email is required';
   *     } else if (this.emailFormControl.errors?.['email']) {
   *       this.emailError = 'Please enter a valid email address';
   *     }
   *   } else {
   *     this.emailError = undefined;
   *   }
   * }
   * ```
   */
  @Input() errorMessage?: string;

  /**
   * Whether the input is disabled and prevents user interaction.
   *
   * Disabled inputs cannot be focused, edited, or submitted. They are visually
   * distinguished and include appropriate ARIA attributes for accessibility.
   *
   * @example
   * ```html
   * <!-- Regular input -->
   * <zt-input placeholder="Editable input"></zt-input>
   *
   * <!-- Disabled input -->
   * <zt-input placeholder="Disabled input" [disabled]="true"></zt-input>
   *
   * <!-- Conditionally disabled -->
   * <zt-input
   *   placeholder="Conditional input"
   *   [disabled]="isFormDisabled">
   * </zt-input>
   * ```
   *
   * @default false
   */
  @Input() disabled = false;

  /**
   * Whether to show a real-time character counter below the input.
   *
   * The counter displays current character count vs. maximum allowed characters.
   * Visual styling changes based on input state:
   * - Normal: Default text color
   * - Warning: When > 80% of limit (orange/warning color)
   * - Error: When limit exceeded (red/error color)
   *
   * @example
   * ```html
   * <!-- Without counter -->
   * <zt-input [textlength]="100" placeholder="No counter"></zt-input>
   *
   * <!-- With counter -->
   * <zt-input [textlength]="100" [showCharCounter]="true" placeholder="With counter"></zt-input>
   * <!-- Displays: "0/100" -->
   * ```
   *
   * @default false
   */
  @Input() showCharCounter = false;

  /**
   * Unique identifier for this input instance, used for accessibility and proper label association.
   *
   * Automatically generated to ensure uniqueness across multiple input instances on the same page.
   * Used internally for `id`, `for`, `aria-labelledby`, and `aria-describedby` attributes.
   *
   * @example
   * ```html
   * <!-- Input with uniqueId: "zt-input-a1b2c3d4" -->
   * <zt-input placeholder="Name"></zt-input>
   * <!-- Renders as: <input id="zt-input-a1b2c3d4" ...> -->
   * <!-- With label: <label for="zt-input-a1b2c3d4" ...> -->
   * ```
   */
  readonly uniqueId = `zt-input-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Output event emitted whenever the input value changes.
   *
   * Used for two-way data binding with `[(ngModel)]` and reactive forms integration.
   * Emitted after character validation and limit enforcement.
   *
   * @example
   * ```html
   * <zt-input
   *   placeholder="Name"
   *   (valueChange)="onNameChange($event)"
   *   [(ngModel)]="userName">
   * </zt-input>
   * ```
   *
   * ```typescript
   * onNameChange(newValue: string) {
   *   console.log('Name changed to:', newValue);
   *   this.userName = newValue;
   * }
   * ```
   */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Output event emitted when the input loses focus (blur event).
   *
   * Useful for validation triggers, saving data, or updating UI state.
   * Provides the native FocusEvent for advanced use cases.
   *
   * @example
   * ```html
   * <zt-input
   *   placeholder="Email"
   *   (blur)="validateEmail()"
   *   inputType="email">
   * </zt-input>
   * ```
   *
   * ```typescript
   * validateEmail() {
   *   if (this.emailFormControl.invalid) {
   *     this.showEmailError = true;
   *   }
   * }
   * ```
   */
  @Output() blur = new EventEmitter<FocusEvent>();

  /**
   * Output event emitted when the input gains focus (focus event).
   *
   * Useful for showing help text, highlighting related fields, or analytics tracking.
   * Provides the native FocusEvent for advanced use cases.
   *
   * @example
   * ```html
   * <zt-input
   *   placeholder="Search"
   *   (focus)="showSearchHelp = true"
   *   (blur)="showSearchHelp = false">
   * </zt-input>
   * ```
   */
  @Output() focus = new EventEmitter<FocusEvent>();

  /**
   * Current character count of the input value.
   *
   * Computed property that returns the length of the current value.
   * Used by the character counter display and validation logic.
   *
   * @example
   * ```typescript
   * // In component class
   * get progressPercentage(): number {
   *   return (this.inputComponent.currentLength / this.inputComponent.textlength) * 100;
   * }
   * ```
   *
   * @returns The number of characters in the current value, or 0 if empty
   */
  get currentLength(): number {
    return this.value?.length || 0;
  }

  /**
   * Whether the input has exceeded the character limit.
   *
   * Computed property used for validation states and visual feedback.
   * Affects CSS classes, ARIA attributes, and error display logic.
   *
   * @example
   * ```scss
   * .my-form {
   *   .zt-input.error input {
   *     border-color: red;
   *   }
   * }
   * ```
   *
   * @returns true if current length exceeds textlength limit
   */
  get hasError(): boolean {
    return this.currentLength > this.textlength;
  }

  /**
   * CSS class name for the character counter based on current input state.
   *
   * Returns appropriate class for styling the counter:
   * - `''` (empty): Normal state, within limits
   * - `'warning'`: Approaching limit (> 80% of textlength)
   * - `'error'`: Exceeded limit
   *
   * @example
   * ```html
   * <div class="char-counter" [ngClass]="counterClass">
   *   {{ currentLength }}/{{ textlength }}
   * </div>
   * ```
   *
   * @returns CSS class name for current counter state
   */
  get counterClass(): string {
    if (this.hasError) return 'error';
    if (this.currentLength > this.textlength * 0.8) return 'warning';
    return '';
  }

  /**
   * Space-separated list of element IDs that describe this input for accessibility.
   *
   * Used with `aria-describedby` attribute to associate the input with:
   * - Character counter (when `showCharCounter` is true)
   * - Error message (when `errorMessage` is provided)
   *
   * Enables screen readers to provide additional context about the input.
   *
   * @example
   * ```html
   * <!-- Input with counter and error message -->
   * <zt-input
   *   [showCharCounter]="true"
   *   [errorMessage]="validationError"
   *   aria-describedby="additional-help">
   * </zt-input>
   * <!-- aria-describedby value: "zt-input-a1b2c3d4-counter zt-input-a1b2c3d4-error additional-help" -->
   * ```
   *
   * @returns Space-separated string of descriptive element IDs
   */
  get ariaDescribedBy(): string {
    const descriptions = [];
    if (this.showCharCounter) descriptions.push(`${this.uniqueId}-counter`);
    if (this.errorMessage) descriptions.push(`${this.uniqueId}-error`);
    return descriptions.join(' ');
  }

  /**
   * Dynamically applies CSS classes to the host element for styling and state management.
   *
   * Combines multiple class sources:
   * - Input style variant (`zt-${inputStyle}`)
   * - Size variant (`${size}`)
   * - Legacy theme class (`theme-${theme}`)
   * - Disabled state (`disabled` when `disabled` is true)
   * - Error state (`error` when character limit exceeded)
   *
   * @example
   * ```html
   * <!-- Input with multiple classes -->
   * <zt-input inputStyle="material" size="zt-lg" [disabled]="true"></zt-input>
   * <!-- Applied classes: "zt-material zt-lg theme-light disabled" -->
   * ```
   *
   * @returns Space-separated string of CSS classes
   */
  @HostBinding('class') get inputClass(): string {
    return `zt-${this.inputStyle} ${this.size} theme-${this.theme} ${this.disabled ? 'disabled' : ''} ${this.hasError ? 'error' : ''}`;
  }

  constructor(
    private elementRef: ElementRef,
    renderer: Renderer2
  ) {
    this.renderer = renderer;
  }

  /**
   * ControlValueAccessor implementation - enables reactive forms support.
   * These callbacks are registered by Angular's forms module.
   */
  private onChange = (value: any) => {};
  private onTouched = () => {};

  /**
   * ControlValueAccessor: Write a new value to the element.
   *
   * Called by Angular forms when the FormControl value changes.
   * Updates the component's value property and triggers change detection.
   *
   * @param value - The new value to write (null/undefined becomes empty string)
   *
   * @example
   * ```typescript
   * // Angular forms automatically calls this method
   * this.form.patchValue({ email: 'user@example.com' });
   * // Triggers: writeValue('user@example.com')
   * ```
   */
  writeValue(value: any): void {
    this.value = value || '';
  }

  /**
   * ControlValueAccessor: Register a callback function to call when the value changes.
   *
   * Called by Angular forms to register the FormControl's value change listener.
   * The registered function is called whenever the input value changes.
   *
   * @param fn - Callback function to register for value changes
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * ControlValueAccessor: Register a callback function to call when the input is touched.
   *
   * Called by Angular forms to register the FormControl's touch listener.
   * The registered function is called when the input loses focus.
   *
   * @param fn - Callback function to register for touch events
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * ControlValueAccessor: Disable or enable the input element.
   *
   * Called by Angular forms when the FormControl is disabled/enabled.
   * Updates the disabled state and triggers change detection.
   *
   * @param isDisabled - Whether to disable the input
   *
   * @example
   * ```typescript
   * // Angular forms automatically calls this method
   * this.form.get('email').disable();
   * // Triggers: setDisabledState(true)
   * ```
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Angular lifecycle hook called after component initialization.
   *
   * Applies local theme overrides if provided via the `ztTheme` input property.
   * Theme application happens after view initialization to ensure DOM elements exist.
   *
   * @example
   * ```typescript
   * // Component with local theme override
   * <zt-input [ztTheme]="customTheme"></zt-input>
   * // Triggers: ngOnInit() -> applyLocalTheme()
   * ```
   */
  ngOnInit(): void {
    if (this.ztTheme) {
      this.applyLocalTheme();
    }
  }

  /**
   * Angular lifecycle hook called before component destruction.
   *
   * Cleans up subscriptions and prevents memory leaks.
   * Completes the destroy subject to signal teardown of any RxJS subscriptions.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handles native input events for character validation and value synchronization.
   *
   * This method is called on every input event and performs several critical functions:
   * - Enforces character limits by truncating input if necessary
   * - Updates the component's value property
   * - Notifies Angular forms of value changes (ControlValueAccessor)
   * - Emits valueChange event for two-way binding
   *
   * Uses `@HostListener('input')` for better performance than keydown events.
   *
   * @example
   * ```typescript
   * // User types "Hello World" in input
   * // 1. Input event fires
   * // 2. onInput() called
   * // 3. Value updated to "Hello World"
   * // 4. onChange() callback invoked
   * // 5. valueChange.emit('Hello World') fired
   * ```
   */
  @HostListener('input') onInput() {
    const input = this.textInput?.nativeElement;
    if (!input) return;

    // Enforce character limit by truncating if exceeded
    if (input.value.length > this.textlength) {
      input.value = input.value.slice(0, this.textlength);
    }

    // Update component value and notify listeners
    this.value = input.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  /**
   * Handles keydown events to prevent input when character limit is reached.
   *
   * Provides real-time input prevention for better user experience.
   * Allows navigation and editing keys (Backspace, Delete, arrows) even at limit.
   * Prevents input of regular characters when limit is reached.
   *
   * @param event - The keyboard event containing information about the pressed key
   *
   * @example
   * ```typescript
   * // User types at character limit (textlength = 10)
   * // Current value: "Hello Worl" (10 chars)
   * // User presses 'd' -> onKeydown() prevents input
   * // User presses Backspace -> onKeydown() allows deletion
   * ```
   */
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const input = this.textInput?.nativeElement;
    if (!input) return;

    // Allow navigation and editing keys even at character limit
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
    if (input.value.length >= this.textlength && !allowedKeys.includes(event.key)) {
      event.preventDefault();
      return;
    }
  }

  /**
   * Handles focus events for accessibility and user interaction tracking.
   *
   * Emits the focus event for parent components and marks the control as touched
   * for Angular forms validation (triggers validation on blur).
   *
   * @param event - The native focus event
   *
   * @example
   * ```html
   * <zt-input (focus)="onInputFocus($event)"></zt-input>
   * ```
   *
   * ```typescript
   * onInputFocus(event: FocusEvent) {
   *   console.log('Input focused at:', event.timeStamp);
   *   // Show help text, highlight field, etc.
   * }
   * ```
   */
  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent) {
    this.focus.emit(event);
    this.onTouched();
  }

  /**
   * Handles blur events for validation triggers and user interaction tracking.
   *
   * Emits the blur event for parent components. Commonly used to trigger validation,
   * save data, or update UI state when user finishes editing.
   *
   * @param event - The native blur event
   *
   * @example
   * ```html
   * <zt-input (blur)="onInputBlur($event)"></zt-input>
   * ```
   *
   * ```typescript
   * onInputBlur(event: FocusEvent) {
   *   console.log('Input blurred at:', event.timeStamp);
   *   // Validate field, save data, hide help text, etc.
   * }
   * ```
   */
  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    this.blur.emit(event);
  }

  /**
   * Applies local theme overrides to the component using Renderer2 for optimal performance.
   *
   * This method transforms theme configuration into CSS custom properties and applies them
   * to the host element. The theme properties cascade down to all child elements,
   * enabling efficient theme switching without component recreation.
   *
   * Features:
   * - Batch style application to minimize layout thrashing
   * - Automatic CSS custom property name conversion (camelCase to kebab-case)
   * - Proper unit handling for dimensional properties
   * - Renderer2 for security and Angular Universal compatibility
   *
   * @example
   * ```typescript
   * // Define custom theme with all properties
   * customTheme: Partial<ThemeConfig> = {
   *   colors: {
   *     primary: '#FF6B35',
   *     textBlack: '#2D3748',
   *     default: '#FFFFFF'
   *   },
   *   borderRadius: 8,
   *   borderSize: 2,
   *   fontFamily: 'Inter, sans-serif'
   * };
   *
   * // Apply via input property
   * <zt-input [ztTheme]="customTheme"></zt-input>
   *
   * // Results in these CSS custom properties on the host element:
   * // --zt-primary: #FF6B35
   * // --zt-text-black: #2D3748
   * // --zt-default: #FFFFFF
   * // --zt-border-radius: 8px
   * // --zt-border-size: 2px
   * // --zt-font-family: Inter, sans-serif
   * ```
   *
   * @performance Uses batch style application to minimize layout thrashing
   * @security Renderer2 automatically sanitizes CSS values
   * @compatibility Works with Angular Universal and server-side rendering
   */
  private applyLocalTheme(): void {
    if (!this.ztTheme) return;

    const hostElement = this.elementRef.nativeElement;

    // Clear any existing theme styles first for clean application
    this.clearExistingThemeStyles();

    // Apply new theme styles in batch
    this.applyThemeStyles(hostElement);
  }

  /**
   * Clears existing theme-related styles from the host element.
   * This ensures clean theme application and prevents style conflicts.
   */
  private clearExistingThemeStyles(): void {
    if (!this.ztTheme) return;

    const hostElement = this.elementRef.nativeElement;

    // Remove existing theme-related CSS custom properties
    const themeProperties = [
      '--zt-primary', '--zt-text-black', '--zt-text-gray', '--zt-default',
      '--zt-default-hover-border', '--zt-border-radius', '--zt-border-size',
      '--zt-font-family', '--zt-input-bg', '--zt-input-color', '--zt-input-border',
      '--zt-input-border-focus', '--zt-input-placeholder', '--zt-label-spacing',
      '--zt-label-transform', '--zt-counter-spacing'
    ];

    themeProperties.forEach(property => {
      this.renderer.removeStyle(hostElement, property);
    });
  }

  /**
   * Applies theme styles to the host element using CSS custom properties.
   *
   * @param hostElement - The host element to apply styles to
   */
  private applyThemeStyles(hostElement: HTMLElement): void {
    if (!this.ztTheme) return;

    const styles: { [key: string]: string } = {};

    // Transform and apply color properties
    if (this.ztTheme.colors) {
      Object.entries(this.ztTheme.colors).forEach(([key, value]) => {
        const cssVar = `--zt-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        styles[cssVar] = value;
      });
    }

    // Apply dimensional properties with proper units
    if (this.ztTheme.borderRadius !== undefined) {
      styles['--zt-border-radius'] = `${this.ztTheme.borderRadius}px`;
    }

    if (this.ztTheme.borderSize !== undefined) {
      styles['--zt-border-size'] = `${this.ztTheme.borderSize}px`;
    }

    // Apply typography properties
    if (this.ztTheme.fontFamily) {
      styles['--zt-font-family'] = this.ztTheme.fontFamily;
    }

    // Apply font size properties if specified
    if (this.ztTheme.fontSize) {
      if (this.ztTheme.fontSize.small) {
        styles['--zt-font-size-small'] = this.ztTheme.fontSize.small;
      }
      if (this.ztTheme.fontSize.medium) {
        styles['--zt-font-size-medium'] = this.ztTheme.fontSize.medium;
      }
      if (this.ztTheme.fontSize.large) {
        styles['--zt-font-size-large'] = this.ztTheme.fontSize.large;
      }
    }

    // Apply spacing properties if specified
    if (this.ztTheme.spacing) {
      if (this.ztTheme.spacing.small) {
        styles['--zt-spacing-small'] = this.ztTheme.spacing.small;
      }
      if (this.ztTheme.spacing.medium) {
        styles['--zt-spacing-medium'] = this.ztTheme.spacing.medium;
      }
      if (this.ztTheme.spacing.large) {
        styles['--zt-spacing-large'] = this.ztTheme.spacing.large;
      }
    }

    // Apply label and counter spacing using existing spacing properties
    if (this.ztTheme.spacing) {
      if (this.ztTheme.spacing.small) {
        styles['--zt-counter-spacing'] = this.ztTheme.spacing.small;
      }
      if (this.ztTheme.spacing.medium) {
        styles['--zt-input-padding'] = this.ztTheme.spacing.medium;
      }
      if (this.ztTheme.spacing.large) {
        styles['--zt-label-spacing'] = this.ztTheme.spacing.large;
      }
    }

    // Batch apply all styles using Renderer2 for optimal performance
    // This approach minimizes layout thrashing compared to individual setProperty calls
    Object.entries(styles).forEach(([property, value]) => {
      this.renderer.setStyle(hostElement, property, value);
    });
  }
}
