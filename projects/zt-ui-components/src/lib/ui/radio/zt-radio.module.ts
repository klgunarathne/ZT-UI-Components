import { RadioComponent } from '../../zt-radio/radio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, RadioComponent],
  exports: [RadioComponent],
})
export class ZTRadioModule {}
