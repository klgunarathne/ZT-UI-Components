import { SelectComponent } from './select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, SelectComponent],
  exports: [SelectComponent],
})
export class ZtSelectModule {}
