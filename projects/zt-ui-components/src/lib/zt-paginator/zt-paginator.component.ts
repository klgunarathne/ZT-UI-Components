import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'zt-paginator',
  templateUrl: './zt-paginator.component.html',
  styleUrls: ['./zt-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ZtPaginatorComponent implements OnInit, OnChanges {
  pageNumbers: any;
  currentPage: number = 1;
  /**
    * Set number of pages
    *
    * how to use
    *
    * <zt-paginator [pages] = "pages"></zt-paginator>
    *
    * @type {number}
    * @memberof ZtPaginatorComponent
    */
  @Input() pages: number = 1;
  /**
    * Return current page number
    *
    * how to use
    *
    * <zt-paginator (onPageChange) = "onPageChange($event)"></zt-paginator>
    *
    * @type {EventEmitter<number>}
    * @memberof ZtPaginatorComponent
    */
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  @HostBinding('class') get paginatorClass(): string {
    return `theme-${this.theme}`;
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.pageNumbers = Array(this.pages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  getPageNo(currentPage: number) {
    this.currentPage = currentPage;
    this.onPageChange.emit(currentPage);
  }

  goFirst() {
    this.currentPage = this.pageNumbers[0];
    this.onPageChange.emit(this.currentPage);
  }

  goNext() {
    if (this.currentPage < this.pageNumbers.length) this.currentPage++;
    this.onPageChange.emit(this.currentPage);
  }

  goPrevious() {
    if (this.currentPage > 1) this.currentPage--;
    this.onPageChange.emit(this.currentPage);
  }

  goLast() {
    this.currentPage = this.pageNumbers[this.pageNumbers.length - 1];
    this.onPageChange.emit(this.currentPage);
  }
}
