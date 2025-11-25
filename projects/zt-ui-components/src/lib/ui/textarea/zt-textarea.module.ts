import { TextareaComponent } from '../../zt-textarea/textarea.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @deprecated ZTTextareaModule is deprecated. Use standalone TextareaComponent import instead:
 * ```typescript
 * import { TextareaComponent } from 'zt-ui-components';
 * ```
 */
@NgModule({
  imports: [CommonModule, TextareaComponent],
  exports: [TextareaComponent],
})
export class ZTTextareaModule {
  constructor() {
    console.warn('ZTTextareaModule is deprecated. Use standalone TextareaComponent import instead: import { TextareaComponent } from \'zt-ui-components\';');
  }
}
