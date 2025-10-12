import { CardComponent } from './card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, CardComponent],
  exports: [CardComponent],
})
export class ZtCardModule {}
