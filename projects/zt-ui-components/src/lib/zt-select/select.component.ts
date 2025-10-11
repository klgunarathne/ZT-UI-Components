import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'zt-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SelectComponent {
  message = 'Choose an option';
  @Input() placeholder? = 'label';
  @Input() inputStyle?: 'zt' | 'material' | 'bs' = 'zt';
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';
  @Input() size: 'zt-md' | 'zt-sm' | 'zt-lg' = 'zt-md';
  @Input() dataSource: any[] = [];
  /**
   *This is the key of the list
   *
   * How to use:
   *
   * <zt-select [key]="id"><zt-select>
   *
   * @type {any}
   * @memberof SelectComponent
   */
  @Input() key?: any;
  /**
   *Display value of the list
   *
   * How to use:
   *
   * <zt-select [displayValue]="firstName"></zt-select>
   *
   * @type {any}
   * @memberof SelectComponent
   */
  @Input() displayValue: any = '';
  /**
   *Return value from the selected item from the select box
   *
   * How to use:
   * <zt-select [value]="id"></zt-select>
   *
   * @type {any}
   * @memberof SelectComponent
   */
  @Input() value: any;
  @Input() showClearButton = true;
  @HostBinding('class') get selectClass(): string {
    return `${this.size} theme-${this.theme}`;
  }

  @HostListener('change', ['$event'])
  onChange(event: any) {
    this.value = event.target.value;
    console.log(this.key, this.value);
  }

  onClear() {
    console.log(this.value);
    this.value = -1;
  }
}
