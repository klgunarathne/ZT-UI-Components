import { DatetimePickerComponent } from '../../zt-datetime-picker/datetime-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @deprecated ZTDatetimePickerModule is deprecated. Use standalone DatetimePickerComponent import instead:
 * ```typescript
 * import { DatetimePickerComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [CommonModule, DatetimePickerComponent],
  exports: [DatetimePickerComponent],
})
export class ZTDatetimePickerModule {
  constructor() {
    console.warn('ZTDatetimePickerModule is deprecated. Use standalone DatetimePickerComponent import instead: import { DatetimePickerComponent } from \'zt-ui-components\';');
  }
}
