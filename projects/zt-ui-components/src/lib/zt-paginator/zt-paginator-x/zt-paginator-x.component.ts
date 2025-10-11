import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'zt-paginator-x',
  templateUrl: './zt-paginator-x.component.html',
  styleUrls: ['./zt-paginator-x.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ZtPaginatorXComponent implements OnInit, AfterViewInit {
  pageNumbers: number[] = [];
  currentPage: number = 1;
  display = '';
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
   * Set page limit
   *
   * how to use
   *
   * <zt-paginator [pagesLimit] = "10"></zt-paginator>
   * @type {number}
   * @memberof ZtPaginatorXComponent
   */
  @Input() pagesLimit: number = 3;

  /**
   * Change style of the paginator
   *
   *
   * values = 'page' | 'arrow'
   * default = 'page;
   *
   * how to use
   *
   * <zt-paginator paginatorStyle = "page"></zt-paginator>
   * @type {(string)}
   * @memberof ZtPaginatorXComponent
   */
  @Input() paginatorStyle: 'page' | 'arrow' = 'page';
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
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getPageNumbers(this.currentPage, this.pagesLimit);
  }

  ngAfterViewInit(): void {}

  getPageNumbers(start: number, limit: number) {
    this.pageNumbers = [];
    let count = 0;
    if (start > 1) {
      for (let i = start - 1; i <= this.pages; i++) {
        if (count >= limit) break;
        this.pageNumbers.push(i);
        count++;
      }
    } else {
      for (let i = start; i <= this.pages; i++) {
        if (count >= limit) break;
        this.pageNumbers.push(i);
        count++;
      }
    }
  }

  getPageNo(currentPage: number) {
    this.currentPage = currentPage;
    this.getPageNumbers(this.currentPage, this.pagesLimit);
  }

  goFirst() {
    this.currentPage = 1;
    this.getPageNumbers(1, this.pagesLimit);
  }

  goNext() {
    if (this.currentPage < this.pages) {
      this.currentPage++;
      this.getPageNumbers(this.currentPage, this.pagesLimit);
    }
  }

  goPreviours() {
    if (this.currentPage > 1) this.currentPage--;
    this.getPageNumbers(this.currentPage, this.pagesLimit);
  }

  goLast() {
    this.currentPage = this.pages;
    this.getPageNumbers(this.pages, this.pagesLimit);
  }
}
