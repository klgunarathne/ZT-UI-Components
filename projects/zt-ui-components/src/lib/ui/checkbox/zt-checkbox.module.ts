import { CheckboxComponent } from '../../zt-checkbox/checkbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @deprecated ZTCheckboxModule is deprecated. Use standalone CheckboxComponent import instead:
 * ```typescript
 * import { CheckboxComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [CommonModule, CheckboxComponent],
  exports: [CheckboxComponent],
})
export class ZTCheckboxModule {
  constructor() {
    console.warn('ZTCheckboxModule is deprecated. Use standalone CheckboxComponent import instead: import { CheckboxComponent } from \'zt-ui-components\';');
  }
}
