import { CheckboxComponent } from './checkbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, CheckboxComponent],
  exports: [CheckboxComponent],
})
export class ZtCheckboxModule {}
