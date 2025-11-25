import { NgModule } from '@angular/core';
import { ButtonComponent } from '../../zt-button/button.component';

/**
 * @deprecated ZTButtonModule is deprecated. Use standalone ButtonComponent import instead:
 * ```typescript
 * import { ButtonComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [ButtonComponent],
  exports: [ButtonComponent]
})
export class ZTButtonModule {
  constructor() {
    console.warn('ZTButtonModule is deprecated. Use standalone ButtonComponent import instead: import { ButtonComponent } from \'zt-ui-components\';');
  }
}
