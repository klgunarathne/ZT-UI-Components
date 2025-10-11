import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'zt-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() variant: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'link' = 'primary';
  @Input() outline = false;
  @Input() size: 'zt-sm' | 'zt-md' | 'zt-lg' = 'zt-md';
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  @HostBinding('class') get buttonClass(): string {
    let classes: string[] = [this.size, `theme-${this.theme}`];
    if (this.outline) {
      classes.push(`zt-${this.variant}-o`);
    } else {
      classes.push(`zt-${this.variant}`);
    }
    return classes.join(' ');
  }

  @HostBinding('attr.type') get buttonType(): string {
    return this.type;
  }

  @HostBinding('attr.disabled') get isDisabled(): boolean | null {
    return this.disabled || null;
  }
}
