import { RadioComponent } from '../../zt-radio/radio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @deprecated ZTRadioModule is deprecated. Use standalone RadioComponent import instead:
 * ```typescript
 * import { RadioComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [CommonModule, RadioComponent],
  exports: [RadioComponent],
})
export class ZTRadioModule {
  constructor() {
    console.warn('ZTRadioModule is deprecated. Use standalone RadioComponent import instead: import { RadioComponent } from \'zt-ui-components\';');
  }
}
