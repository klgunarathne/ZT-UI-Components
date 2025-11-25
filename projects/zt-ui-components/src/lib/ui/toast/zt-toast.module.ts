import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtToastComponent } from '../../zt-toast/zt-toast.component';

@NgModule({
  imports: [
    CommonModule,
    ZtToastComponent,
  ],
  exports: [ZtToastComponent]
})
export class ZTToastModule { }
