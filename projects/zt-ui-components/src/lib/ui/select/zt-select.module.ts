import { SelectComponent } from '../../zt-select/select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * @deprecated ZTSelectModule is deprecated. Use standalone SelectComponent import instead:
 * ```typescript
 * import { SelectComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [CommonModule, FormsModule, SelectComponent],
  exports: [SelectComponent],
})
export class ZTSelectModule {
  constructor() {
    console.warn('ZTSelectModule is deprecated. Use standalone SelectComponent import instead: import { SelectComponent } from \'zt-ui-components\';');
  }
}
