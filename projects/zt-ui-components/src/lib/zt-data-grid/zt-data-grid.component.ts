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
import { ButtonComponent } from '../zt-button/button.component';
import {
  DataGridColumn,
  DataGridOptions,
  DataGridEvent,
  DataGridSortState,
  DataGridRow,
  SortDirection,
} from './models';

@Component({
  selector: 'zt-data-grid',
  templateUrl: './zt-data-grid.component.html',
  styleUrls: ['./zt-data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ButtonComponent],
})
export class ZtDataGridComponent implements OnInit, OnChanges {
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  @HostBinding('class') get dataGridClass(): string {
    return `theme-${this.theme}`;
  }
  /**
   * Column configuration for the data grid
   */
  @Input() columns: DataGridColumn[] = [];

  /**
   * Data source for the grid
   */
  @Input() dataSource: any[] = [];

  /**
   * Processed data rows for display
   */
  processedData: DataGridRow[] = [];

  /**
   * Current sort state
   */
  sortState: DataGridSortState[] = [];

  /**
   * Key field for row identification
   */
  @Input() keyField: string = 'id';

  /**
   * Enable/disable sorting globally
   */
  @Input() allowSorting: boolean = true;

  /**
   * Enable/disable filtering globally
   */
  @Input() allowFiltering: boolean = false;

  /**
   * Enable/disable selection
   */
  @Input() allowSelection: boolean = false;

  /**
   * Selection mode
   */
  @Input() selectionMode: 'none' | 'single' | 'multiple' = 'none';

  /**
   * Selected rows
   */
  selectedRows: any[] = [];

  /**
   * Show striped rows
   */
  @Input() striped: boolean = false;

  /**
   * Show borders
   */
  @Input() showBorders: boolean = true;

  /**
   * Show edit actions
   */
  @Input() showEdit: boolean = false;

  /**
   * Show delete actions
   */
  @Input() showDelete: boolean = false;

  // pagination options
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
  @Output() onDataGridEvent: EventEmitter<DataGridEvent> = new EventEmitter();

  /**
   *
   * Page size options
   *
   * @type {number[]}
   * @memberof ZtDataGridComponent
   */
  @Input() pageSizeOptions: string = '5, 10, 20, 100';
  pageSizes: number[] = [];

  /**
   * Set current page size
   *
   * default value is 10
   *
   * @type {number}
   * @memberof ZtDataGridComponent
   */
  @Input() currentPageSize: number = 10;
  constructor() {}

  ngOnInit(): void {
    this.getPageSizeOptionsFromString();
    this.initializeColumns();
    this.processData();
  }

  private initializeColumns(): void {
    if (this.columns.length === 0 && this.dataSource.length > 0) {
      // Auto-generate columns from data
      const keys = Object.keys(this.dataSource[0]);
      this.columns = keys.map(key => ({
        field: key,
        title: this.capitalizeFirstLetter(key),
        sortable: this.allowSorting,
        visible: true
      }));
    }
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private processData(): void {
    let data = [...this.dataSource];

    // Apply sorting
    if (this.sortState.length > 0) {
      data = this.applySorting(data);
    }

    // Apply pagination
    this.processedData = this.applyPagination(data);

    // Create DataGridRow objects
    this.processedData = this.processedData.map((item, index) => ({
      data: item,
      index,
      key: (item as any)[this.keyField],
      selected: this.selectedRows.includes(item)
    }));
  }

  private applySorting(data: any[]): any[] {
    return data.sort((a, b) => {
      for (const sort of this.sortState) {
        const aVal = a[sort.field];
        const bVal = b[sort.field];
        let comparison = 0;

        if (aVal < bVal) comparison = -1;
        else if (aVal > bVal) comparison = 1;

        if (comparison !== 0) {
          return sort.direction === 'desc' ? -comparison : comparison;
        }
      }
      return 0;
    });
  }

  private applyPagination(data: any[]): any[] {
    const startRecord = (this.currentPage - 1) * this.currentPageSize;
    return data.slice(startRecord, startRecord + this.currentPageSize);
  }

  getPageSizeOptionsFromString() {
    this.pageSizes = this.pageSizeOptions.split(',').map((item) => {
      return parseInt(item);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPagesCount();
    this.getPageNumbers(this.currentPage, this.pagesLimit);
  }

  // pagination methods
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
    this.onPageChange.emit(currentPage);
    this.getPageNumbers(this.currentPage, this.pagesLimit);
    this.processData();
  }

  goFirst() {
    this.currentPage = 1;
    this.getPageNumbers(1, this.pagesLimit);
    this.processData();
    this.onPageChange.emit(this.currentPage);
  }

  goNext() {
    if (this.currentPage < this.pages) {
      this.currentPage++;
      this.getPageNumbers(this.currentPage, this.pagesLimit);
      this.processData();
      this.onPageChange.emit(this.currentPage);
    }
  }

  goPrevious() {
    if (this.currentPage > 1) this.currentPage--;
    this.getPageNumbers(this.currentPage, this.pagesLimit);
    this.processData();
    this.onPageChange.emit(this.currentPage);
  }

  goLast() {
    this.currentPage = this.pages;
    this.getPageNumbers(this.pages, this.pagesLimit);
    this.processData();
    this.onPageChange.emit(this.currentPage);
  }

  onPageSize(pageSize: number) {
    this.currentPageSize = pageSize;
    this.getPagesCount();
    this.getPageNumbers(this.currentPage, this.pagesLimit);
    this.processData();
  }

  onSort(column: DataGridColumn): void {
    if (!column.sortable) return;

    // Toggle sort direction
    const currentDirection = column.sortDirection;
    let newDirection: SortDirection = 'asc';

    if (currentDirection === 'asc') {
      newDirection = 'desc';
    } else if (currentDirection === 'desc') {
      newDirection = null;
    }

    // Reset all columns' sort direction
    this.columns.forEach(col => col.sortDirection = null);

    // Set new direction
    column.sortDirection = newDirection;

    // Update sort state
    this.sortState = newDirection ? [{ field: column.field, direction: newDirection }] : [];

    // Reprocess data
    this.processData();

    // Emit event
    this.onDataGridEvent.emit({ type: 'sort', column, value: newDirection });
  }

  // This method is now handled by processData()

  getPagesCount() {
    this.pages = Math.ceil(this.dataSource.length / this.currentPageSize);
    console.log(Math.ceil(this.dataSource.length / this.currentPageSize));
  }
}
