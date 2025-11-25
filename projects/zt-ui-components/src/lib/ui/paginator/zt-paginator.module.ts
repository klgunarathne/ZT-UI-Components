import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtPaginatorComponent } from '../../zt-paginator/zt-paginator.component';
import { ZtPaginatorXComponent } from '../../zt-paginator/zt-paginator-x/zt-paginator-x.component';

@NgModule({
  imports: [CommonModule, ZtPaginatorComponent, ZtPaginatorXComponent],
  exports: [ZtPaginatorComponent, ZtPaginatorXComponent],
})
export class ZTPaginatorModule { }
