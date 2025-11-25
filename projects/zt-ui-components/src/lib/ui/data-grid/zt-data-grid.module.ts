import { ZtDataGridComponent } from '../../zt-data-grid/zt-data-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @deprecated ZTDataGridModule is deprecated. Use standalone ZtDataGridComponent import instead:
 * ```typescript
 * import { ZtDataGridComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [CommonModule, ZtDataGridComponent],
  exports: [ZtDataGridComponent],
})
export class ZTDataGridModule {
  constructor() {
    console.warn('ZTDataGridModule is deprecated. Use standalone ZtDataGridComponent import instead: import { ZtDataGridComponent } from \'zt-ui-components\';');
  }
}
