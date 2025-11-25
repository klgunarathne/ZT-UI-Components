import { CheckboxComponent } from '../../zt-checkbox/checkbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, CheckboxComponent],
  exports: [CheckboxComponent],
})
export class ZTCheckboxModule {}
