import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * An advanced pagination component with configurable page limits and styles.
 * Supports both page number and arrow navigation styles with theme customization.
 *
 * @example
 * <zt-paginator-x
 *   [pages]="20"
 *   [pagesLimit]="5"
 *   [paginatorStyle]="'page'"
 *   [theme]="'light'"
 *   (onPageChange)="onPageChange($event)">
 * </zt-paginator-x>
 */
@Component({
  selector: 'zt-paginator-x',
  templateUrl: './zt-paginator-x.component.html',
  styleUrls: ['./zt-paginator-x.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ZtPaginatorXComponent implements OnInit, AfterViewInit {
  /**
   * Array of page numbers currently displayed.
   */
  pageNumbers: number[] = [];

  /**
   * The currently active page number.
   */
  currentPage: number = 1;

  /**
   * Display string for pagination info.
   */
  display = '';

  /**
   * Total number of pages available.
   * @default 1
   */
  @Input() pages: number = 1;

  /**
   * Maximum number of page numbers to display at once.
   * @default 3
   */
  @Input() pagesLimit: number = 3;

  /**
   * Style of the paginator navigation.
   * @default 'page'
   */
  @Input() paginatorStyle: 'page' | 'arrow' = 'page';

  /**
   * The theme of the paginator component.
   * @default 'light'
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * Dynamically applies CSS classes to the paginator element based on the theme.
   * @returns A string of CSS classes.
   */
  @HostBinding('class') get paginatorClass(): string {
    return `theme-${this.theme}`;
  }

  /**
   * Event emitted when the current page changes.
   * Provides the new page number.
   */
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Lifecycle hook that recalculates page numbers when input properties change.
   * @param changes Object containing changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.getPageNumbers(this.currentPage, this.pagesLimit);
  }

  ngAfterViewInit(): void {}

  /**
   * Generates the array of page numbers to display based on current page and limit.
   * @param start The starting page number.
   * @param limit The maximum number of pages to show.
   */
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

  /**
   * Sets the current page and emits the page change event, then recalculates displayed pages.
   * @param currentPage The page number to navigate to.
   */
  getPageNo(currentPage: number) {
    this.currentPage = currentPage;
    this.onPageChange.emit(currentPage);
    this.getPageNumbers(this.currentPage, this.pagesLimit);
  }

  /**
   * Navigates to the first page if not already there.
   */
  goFirst() {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.onPageChange.emit(this.currentPage);
      this.getPageNumbers(1, this.pagesLimit);
    }
  }

  /**
   * Navigates to the next page if available.
   */
  goNext() {
    if (this.currentPage < this.pages) {
      this.currentPage++;
      this.onPageChange.emit(this.currentPage);
      this.getPageNumbers(this.currentPage, this.pagesLimit);
    }
  }

  /**
   * Navigates to the previous page if available.
   */
  goPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onPageChange.emit(this.currentPage);
      this.getPageNumbers(this.currentPage, this.pagesLimit);
    }
  }

  /**
   * Navigates to the last page if not already there.
   */
  goLast() {
    if (this.currentPage !== this.pages) {
      this.currentPage = this.pages;
      this.onPageChange.emit(this.currentPage);
      this.getPageNumbers(this.pages, this.pagesLimit);
    }
  }
}
