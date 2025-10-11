import { ZtButtonModule } from './../button/zt-button.module';
import { ZtDataGridComponent } from './zt-data-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ZtDataGridComponent],
  imports: [CommonModule, ZtButtonModule],
  exports: [ZtDataGridComponent],
})
export class ZtDataGridModule {}
