import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtPaginatorComponent } from './zt-paginator.component';
import { ZtPaginatorXComponent } from './zt-paginator-x/zt-paginator-x.component';

@NgModule({
  declarations: [ZtPaginatorComponent, ZtPaginatorXComponent],
  imports: [CommonModule],
  exports: [ZtPaginatorComponent, ZtPaginatorXComponent],
})
export class ZtPaginatorModule {}
