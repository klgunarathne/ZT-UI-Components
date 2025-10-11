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

@Component({
  selector: 'zt-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class TextareaComponent {
  @ViewChild('textareaInput') textareaInput?: ElementRef;
  @Input() value? = '';
  @Input() placeholder? = 'label';
  @Input() textlength = 255;
  @Input() type? = 'text';
  currentTextLength = 0;
  /**
   *The visible width of the text control,
   *in average character widths. If it is specified,
   *it must be a positive integer.
   *If it is not specified, the default value is 20
   *
   * @memberof TextareaComponent
   */
  @Input() cols? = 20;
  /**
   *The number of visible text lines for the control.
   *it must be a positive integer.
   *If it is not specified, the default value is 2
   *
   * @memberof TextareaComponent
   */
  @Input() rows? = 2;
  @Input() inputStyle: 'zt' | 'material' | 'bs' = 'zt';
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';
  @Input() size: 'zt-md' | 'zt-sm' | 'zt-lg' = 'zt-md';
  /**
     Show charactor count bellow the textarea.

     how to use:

     <zt-textarea [showCharCount] = true | false></zt-textarea>
    * @memberof TextareaComponent
    */
  @Input() showCharCount? = true;
  @HostBinding('class') get textareaClass(): string {
    return `${this.size} theme-${this.theme}`;
  }

  @HostListener('keydown') onKeydown() {
    if (
      Number(this.textlength) > this.textareaInput?.nativeElement.value.length
    )
      this.value = this.textareaInput?.nativeElement.value;
    this.currentTextLength = this.textareaInput?.nativeElement.value.length;
  }

  /**
   *Listing to key events.
   *
   * @param {KeyboardEvent} event
   * @memberof TextareaComponent
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.DELETE) {
      this.currentTextLength = this.textareaInput?.nativeElement.value.length;
    }
  }
}

export enum KEY_CODE {
  DELETE = 'Delete',
}
