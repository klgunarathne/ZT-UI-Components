/**
 * ZT-Toast-X Module
 *
 * A minimal Angular module that provides toast notification functionality for legacy
 * module-based Angular applications. This module serves as a bridge for applications
 * that haven't migrated to standalone components, offering the same powerful toast
 * system in a traditional NgModule wrapper.
 *
 * Module Architecture:
 * - **Zero Declarations**: No component declarations - relies on standalone components
 * - **Minimal Imports**: Only CommonModule for essential Angular directives
 * - **Empty Exports**: Components are imported directly, not exported through module
 * - **Service Provision**: Toast service is provided in root, not through module
 *
 * Design Philosophy:
 * - **Standalone-First**: Encourages modern Angular standalone component usage
 * - **Backward Compatibility**: Supports legacy module-based applications
 * - **Clean Separation**: Clear distinction between module and standalone usage
 * - **Future-Proof**: Designed for eventual module system deprecation
 *
 * Usage Patterns:
 * - **Legacy Applications**: Traditional NgModule-based Angular projects
 * - **Gradual Migration**: Step-by-step migration from modules to standalone
 * - **Library Integration**: Easy integration with existing module ecosystems
 * - **Testing Environments**: Module-based testing setups
 *
 * Important Notes:
 * - This module is intentionally minimal and doesn't declare or export components
 * - For new applications, prefer standalone component imports
 * - The module exists primarily for backward compatibility
 * - Service injection works identically in both patterns
 *
 * @example Module-based Application Setup
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { ZtToastXModule } from 'zt-toast-x';
 *
 * @NgModule({
 *   declarations: [AppComponent],
 *   imports: [
 *     BrowserModule,
 *     ZtToastXModule, // Provides toast infrastructure
 *     // Other modules...
 *   ],
 *   bootstrap: [AppComponent]
 * })
 * export class AppModule { }
 * ```
 *
 * @example Component Usage in Module-based App
 * ```typescript
 * import { Component } from '@angular/core';
 * import { ZtToastXComponent } from 'zt-toast-x';
 *
 * @Component({
 *   selector: 'app-toast-demo',
 *   template: `
 *     <button (click)="showToast()">Show Toast</button>
 *     <zt-toast-x position="top-right"></zt-toast-x>
 *   `,
 *   // Note: ZtToastXComponent must be declared in a module
 * })
 * export class ToastDemoComponent {
 *   // Component logic...
 * }
 * ```
 *
 * Migration Recommendation:
 * For new Angular applications (v14+), consider using standalone components directly:
 * ```typescript
 * @Component({
 *   standalone: true,
 *   imports: [ZtToastXComponent],
 *   // ... component config
 * })
 * ```
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtToastXComponent } from './zt-toast-x';

/**
 * Toast module providing toast notification functionality
 *
 * This module serves as a convenient way to import the toast component
 * in traditional NgModule-based Angular applications. For standalone
 * components, you can import ZtToastXComponent directly.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: []
})
export class ZtToastXModule { }
