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

@Component({
  selector: 'zt-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class InputComponent {
  @ViewChild('textInput') textInput?: ElementRef;
  @Input() value? = '';
  @Input() placeholder? = 'label';
  @Input() textlength? = 255;
  @Input() inputType?: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() inputStyle: 'zt' | 'material' | 'bs' = 'zt';
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';
  @Input() size: 'zt-md' | 'zt-sm' | 'zt-lg' = 'zt-md';
  @HostBinding('class') get inputClass(): string {
    return `${this.size} theme-${this.theme}`;
  }

  @HostListener('keydown') onKeydown() {
    if (Number(this.textlength) > this.textInput?.nativeElement.value.length)
      this.value = this.textInput?.nativeElement.value;
  }
}
