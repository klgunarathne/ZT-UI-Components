import { NgModule } from '@angular/core';
import { ZtModalComponent } from '../../zt-modal/zt-modal.component';

/**
 * @deprecated ZTModalModule is deprecated. Use standalone ZtModalComponent import instead:
 * ```typescript
 * import { ZtModalComponent } from 'zt-ui-components';
 * ```
 *
 * ZT Modal Module
 *
 * This module provides modal dialog functionality for the ZT UI Components library.
 * It includes a flexible modal component with theming support, accessibility features,
 * and customizable content areas.
 *
 * Note: ZtModalComponent is a standalone component. This module serves as a
 * convenience for importing the component in non-standalone applications.
 *
 * @example
 * ```typescript
 * // For standalone applications, import directly:
 * import { ZtModalComponent } from 'zt-ui-components';
 *
 * // For module-based applications:
 * import { ZTModalModule } from 'zt-ui-components/ui/modal';
 *
 * @NgModule({
 *   imports: [ZTModalModule],
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: [ZtModalComponent],
  exports: [ZtModalComponent],
})
export class ZTModalModule {
  constructor() {
    console.warn('ZTModalModule is deprecated. Use standalone ZtModalComponent import instead: import { ZtModalComponent } from \'zt-ui-components\';');
  }
}
