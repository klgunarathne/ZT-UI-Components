import { InputComponent } from './input.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent
  ],
  exports: [
    InputComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class ZtInputModule {
  /**
   * Provides the ZtInputModule with optional configuration.
   * Use this method when importing the module in your root application module.
   */
  static forRoot(): ModuleWithProviders<ZtInputModule> {
    return {
      ngModule: ZtInputModule,
      providers: [
        // Add any global providers here if needed
      ]
    };
  }

  /**
   * Provides the ZtInputModule for feature modules.
   * Use this method when importing the module in feature modules.
   */
  static forChild(): ModuleWithProviders<ZtInputModule> {
    return {
      ngModule: ZtInputModule
    };
  }
}
