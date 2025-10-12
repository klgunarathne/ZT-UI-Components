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

/**
 * A pagination component that displays page numbers and navigation controls.
 * Supports themes and emits page change events for integration with data tables or lists.
 *
 * @example
 * <zt-paginator
 *   [pages]="10"
 *   [theme]="'light'"
 *   (onPageChange)="onPageChange($event)">
 * </zt-paginator>
 */
@Component({
  selector: 'zt-paginator',
  templateUrl: './zt-paginator.component.html',
  styleUrls: ['./zt-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ZtPaginatorComponent implements OnInit, OnChanges {
  /**
   * Array of page numbers to display.
   */
  pageNumbers: any;

  /**
   * The currently active page number.
   */
  currentPage: number = 1;

  /**
   * Total number of pages to display.
   * @default 1
   */
  @Input() pages: number = 1;

  /**
   * Event emitted when the current page changes.
   * Provides the new page number.
   */
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

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

  constructor() {}

  ngOnInit(): void {}

  /**
   * Lifecycle hook that updates page numbers when input properties change.
   * @param changes Object containing changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.pageNumbers = Array(this.pages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  /**
   * Sets the current page and emits the page change event.
   * @param currentPage The page number to navigate to.
   */
  getPageNo(currentPage: number) {
    this.currentPage = currentPage;
    this.onPageChange.emit(currentPage);
  }

  /**
   * Navigates to the first page.
   */
  goFirst() {
    this.currentPage = this.pageNumbers[0];
    this.onPageChange.emit(this.currentPage);
  }

  /**
   * Navigates to the next page if available.
   */
  goNext() {
    if (this.currentPage < this.pageNumbers.length) this.currentPage++;
    this.onPageChange.emit(this.currentPage);
  }

  /**
   * Navigates to the previous page if available.
   */
  goPrevious() {
    if (this.currentPage > 1) this.currentPage--;
    this.onPageChange.emit(this.currentPage);
  }

  /**
   * Navigates to the last page.
   */
  goLast() {
    this.currentPage = this.pageNumbers[this.pageNumbers.length - 1];
    this.onPageChange.emit(this.currentPage);
  }
}
