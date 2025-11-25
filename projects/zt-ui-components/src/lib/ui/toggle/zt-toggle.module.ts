import { NgModule } from '@angular/core';
import { ToggleComponent } from '../../zt-toggle/toggle.component';

/**
 * @deprecated ZTToggleModule is deprecated. Use standalone ToggleComponent import instead:
 * ```typescript
 * import { ToggleComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [ToggleComponent],
  exports: [ToggleComponent]
})
export class ZTToggleModule {
  constructor() {
    console.warn('ZTToggleModule is deprecated. Use standalone ToggleComponent import instead: import { ToggleComponent } from \'zt-ui-components\';');
  }
}
