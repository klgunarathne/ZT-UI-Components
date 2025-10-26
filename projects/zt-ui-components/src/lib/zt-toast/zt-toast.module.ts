/**
 * ZT-UI Components Toast Module
 *
 * Module that provides the toast notification functionality for Angular applications.
 * This module exports the standalone ZtToastComponent and makes it available
 * for import in other modules or standalone components.
 *
 * The module includes:
 * - ZtToastComponent: The main toast display component
 * - CommonModule: Required Angular directives (ngIf, ngFor, etc.)
 *
 * Usage in module-based applications:
 * ```typescript
 * import { ZtToastModule } from 'zt-ui-components';
 *
 * @NgModule({
 *   imports: [ZtToastModule],
 * })
 * export class AppModule {}
 * ```
 *
 * Usage in standalone components:
 * ```typescript
 * import { ZtToastComponent } from 'zt-ui-components';
 *
 * @Component({
 *   imports: [ZtToastComponent],
 * })
 * export class MyComponent {}
 * ```
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtToastComponent } from './zt-toast.component';

/**
 * Toast module providing toast notification functionality
 *
 * This module serves as a convenient way to import the toast component
 * in traditional NgModule-based Angular applications. For standalone
 * components, you can import ZtToastComponent directly.
 */
@NgModule({
  imports: [
    CommonModule,
    ZtToastComponent,
  ],
  exports: [ZtToastComponent]
})
export class ZtToastModule { }
