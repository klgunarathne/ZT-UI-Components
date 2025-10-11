import { InputComponent } from './input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, InputComponent],
  exports: [InputComponent],
})
export class ZtInputModule {}
