import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtPaginatorComponent } from '../../zt-paginator/zt-paginator.component';
import { ZtPaginatorXComponent } from '../../zt-paginator/zt-paginator-x/zt-paginator-x.component';

/**
 * @deprecated ZTPaginatorModule is deprecated. Use standalone ZtPaginatorComponent import instead:
 * ```typescript
 * import { ZtPaginatorComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [CommonModule, ZtPaginatorComponent, ZtPaginatorXComponent],
  exports: [ZtPaginatorComponent, ZtPaginatorXComponent],
})
export class ZTPaginatorModule {
  constructor() {
    console.warn('ZTPaginatorModule is deprecated. Use standalone ZtPaginatorComponent import instead: import { ZtPaginatorComponent } from \'zt-ui-components\';');
  }
}
