import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * A customizable select dropdown component that supports various styles, themes, and data binding.
 * It allows users to select from a list of options with configurable display and value properties.
 *
 * @example
 * <zt-select
 *   [dataSource]="options"
 *   [key]="'id'"
 *   [displayValue]="'name'"
 *   [value]="selectedValue"
 *   placeholder="Choose an option"
 *   size="zt-md"
 *   theme="light">
 * </zt-select>
 */
@Component({
  selector: 'zt-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SelectComponent implements OnInit {
  /**
   * Default message displayed in the component.
   */
  message = 'Choose an option';

  /**
   * Placeholder text displayed when no option is selected.
   * @default 'Choose an option'
   */
  @Input() placeholder? = 'Choose an option';

  /**
   * The visual style of the select component.
   * @default 'zt'
   */
  @Input() inputStyle?: 'zt' | 'material' | 'bs' = 'zt';

  /**
   * The theme of the select component.
   * @default 'light'
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * The size of the select component.
   * @default 'zt-md'
   */
  @Input() size: 'zt-md' | 'zt-sm' | 'zt-lg' = 'zt-md';

  /**
   * Array of data objects to populate the select options.
   * @default []
   */
  @Input() dataSource: any[] = [];

  /**
   * The property name in the data objects to use as the unique key/identifier.
   * Used for binding the selected value.
   */
  @Input() key?: any;

  /**
   * The property name in the data objects to display as the option text.
   * @default ''
   */
  @Input() displayValue: any = '';

  /**
   * The currently selected value. Should match the key property of the selected item.
   */
  @Input() value: any;

  /**
   * Whether to show a clear button to reset the selection.
   * @default true
   */
  @Input() showClearButton = true;

  /**
   * Event emitted when the selected value changes.
   */
  @Output() valueChange = new EventEmitter<any>();

  /**
   * Dynamically applies CSS classes to the select element based on size and theme.
   * @returns A string of CSS classes.
   */
  @HostBinding('class') get selectClass(): string {
    return `${this.size} theme-${this.theme}`;
  }

  /**
   * Handles the change event when a user selects an option.
   * Updates the value property with the selected option's value.
   * @param event The change event from the select element.
   */
  @HostListener('change', ['$event'])
  onChange(event: any) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
    console.log(this.key, this.value);
  }

  /**
   * Clears the current selection by setting the value to null for bs style, -1 for others.
   */
  onClear() {
    console.log(this.value);
    // Use null for bs style (which has [ngValue]="null" placeholder), -1 for others
    this.value = this.inputStyle === 'bs' ? null : -1;
    this.valueChange.emit(this.value);
  }

  /**
   * Initializes the component and ensures placeholder is shown when no value is set.
   */
  ngOnInit() {
    // If no value is provided, set appropriate default based on input style
    // bs style uses null for placeholder, others use -1
    if (this.value === undefined) {
      this.value = this.inputStyle === 'bs' ? null : -1;
    }
  }
}
