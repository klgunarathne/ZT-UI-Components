import { DatetimePickerComponent } from './datetime-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, DatetimePickerComponent],
  exports: [DatetimePickerComponent],
})
export class ZtDatetimePickerModule {}
