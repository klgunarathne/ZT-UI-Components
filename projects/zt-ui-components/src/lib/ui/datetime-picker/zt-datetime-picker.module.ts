import { DatetimePickerComponent } from '../../zt-datetime-picker/datetime-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, DatetimePickerComponent],
  exports: [DatetimePickerComponent],
})
export class ZTDatetimePickerModule {}
