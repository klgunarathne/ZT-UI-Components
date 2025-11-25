import { NgModule } from '@angular/core';
import { InputComponent } from '../../zt-input/input.component';

/**
 * @deprecated ZTInputModule is deprecated. Use standalone InputComponent import instead:
 * ```typescript
 * import { InputComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [InputComponent],
  exports: [InputComponent]
})
export class ZTInputModule {
  constructor() {
    console.warn('ZTInputModule is deprecated. Use standalone InputComponent import instead: import { InputComponent } from \'zt-ui-components\';');
  }
}
