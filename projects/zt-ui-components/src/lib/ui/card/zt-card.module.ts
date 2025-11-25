import { NgModule } from '@angular/core';
import { CardComponent } from '../../zt-card/card.component';

/**
 * @deprecated ZTCardModule is deprecated. Use standalone CardComponent import instead:
 * ```typescript
 * import { CardComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [CardComponent],
  exports: [CardComponent]
})
export class ZTCardModule {
  constructor() {
    console.warn('ZTCardModule is deprecated. Use standalone CardComponent import instead: import { CardComponent } from \'zt-ui-components\';');
  }
}
