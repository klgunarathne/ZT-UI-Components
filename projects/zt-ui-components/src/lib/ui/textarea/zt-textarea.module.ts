import { TextareaComponent } from '../../zt-textarea/textarea.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, TextareaComponent],
  exports: [TextareaComponent],
})
export class ZTTextareaModule { }
