import { ZtDataGridComponent } from './zt-data-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, ZtDataGridComponent],
  exports: [ZtDataGridComponent],
})
export class ZtDataGridModule {}
