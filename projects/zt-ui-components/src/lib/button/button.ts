import { Component, Input } from '@angular/core';

@Component({
  selector: 'zt-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  get buttonClass(): string {
    return `zt-button zt-button--${this.variant} zt-button--${this.size}`;
  }
}
