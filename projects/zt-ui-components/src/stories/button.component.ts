import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent as ZtButtonComponent } from '../lib/zt-button/button.component';

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [CommonModule, ZtButtonComponent],
  template: ` <zt-button
  [type]="type"
  [variant]="variant"
  [size]="ztSize"
  [outline]="outline"
  [disabled]="disabled"
  (click)="onClick.emit($event)"
>
  {{ label }}
</zt-button>`,
  styleUrls: ['./button.css'],
})
export class ButtonComponent {
  /** Button type */
  @Input()
  type: 'button' | 'submit' | 'reset' = 'button';

  /** Button variant */
  @Input()
  variant: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'link' = 'default';

  /** Is outline style? */
  @Input()
  outline = false;

  /** Is disabled? */
  @Input()
  disabled = false;

  /** How large should the button be? */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Button';

  /** Optional click handler */
  @Output()
  onClick = new EventEmitter<Event>();

  get ztSize(): 'zt-sm' | 'zt-md' | 'zt-lg' {
    switch (this.size) {
      case 'small': return 'zt-sm';
      case 'medium': return 'zt-md';
      case 'large': return 'zt-lg';
      default: return 'zt-md';
    }
  }
}
