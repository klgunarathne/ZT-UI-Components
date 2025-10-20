import { NgModule } from '@angular/core';
import { ZtModalComponent } from './zt-modal.component';

/**
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
 * import { ZtModalModule } from 'zt-ui-components';
 *
 * @NgModule({
 *   imports: [ZtModalModule],
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: [ZtModalComponent],
  exports: [ZtModalComponent],
})
export class ZtModalModule {}
