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
import { ZtPaginatorXComponent } from '../zt-paginator/zt-paginator-x/zt-paginator-x.component';
import {
  DataGridColumn,
  DataGridOptions,
  DataGridEvent,
  DataGridSortState,
  DataGridRow,
  SortDirection,
  SelectionMode,
} from './models';

/**
 * A comprehensive data grid component with sorting, filtering, selection, pagination, and editing capabilities.
 * Supports various themes and customizable columns with templates.
 *
 * @example
 * <zt-data-grid
 *   [dataSource]="data"
 *   [columns]="gridColumns"
 *   [allowSorting]="true"
 *   [allowSelection]="true"
 *   [theme]="'light'"
 *   (onDataGridEvent)="handleEvent($event)">
 * </zt-data-grid>
 */
@Component({
  selector: 'zt-data-grid',
  templateUrl: './zt-data-grid.component.html',
  styleUrls: ['./zt-data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ButtonComponent, ZtPaginatorXComponent],
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
  @Input() selectionMode: SelectionMode = 'none';

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

  /**
   * Edit button type
   */
  @Input() editButtonType: 'button' | 'link' = 'link';

  /**
   * Delete button type
   */
  @Input() deleteButtonType: 'button' | 'link' = 'link';

  // pagination options
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
  /**
   * Constructor for the data grid component.
   */
  constructor() {}

  /**
   * Lifecycle hook that initializes the component.
   * Sets up selection mode, page size options, columns, and processes initial data.
   */
  ngOnInit(): void {
    if (this.allowSelection && this.selectionMode === 'none') {
      this.selectionMode = 'single';
    }
    this.getPageSizeOptionsFromString();
    this.initializeColumns();
    this.processData();
  }

  /**
   * Initializes columns for the data grid.
   * Auto-generates columns from data source if none are provided.
   * Updates existing columns with global sorting settings.
   */
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

    // Update existing columns with global allowSorting setting
    this.columns.forEach(column => {
      if (column.sortable === undefined) {
        column.sortable = this.allowSorting;
      }
    });
  }

  /**
   * Capitalizes the first letter of a string.
   * @param str The string to capitalize.
   * @returns The capitalized string.
   */
  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Processes the data source by applying sorting and pagination.
   * Creates DataGridRow objects for display.
   */
  private processData(): void {
    let data = [...this.dataSource];

    // Apply sorting only if globally allowed
    if (this.allowSorting && this.sortState.length > 0) {
      data = this.applySorting(data);
    }

    // Apply pagination
    this.processedData = this.applyPagination(data);

    // Create DataGridRow objects
    this.processedData = this.processedData.map((item, index) => ({
      data: item,
      index,
      key: (item as any)[this.keyField],
      selected: this.selectedRows.some(selectedRow => selectedRow[this.keyField] === (item as any)[this.keyField])
    }));
  }

  /**
   * Applies sorting to the data array based on the current sort state.
   * @param data The data array to sort.
   * @returns The sorted data array.
   */
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

  /**
   * Applies pagination to the data array.
   * @param data The data array to paginate.
   * @returns The paginated data array.
   */
  private applyPagination(data: any[]): any[] {
    const startRecord = (this.currentPage - 1) * this.currentPageSize;
    return data.slice(startRecord, startRecord + this.currentPageSize);
  }

  /**
   * Parses the page size options string into an array of numbers.
   */
  getPageSizeOptionsFromString() {
    this.pageSizes = this.pageSizeOptions.split(',').map((item) => {
      return parseInt(item);
    });
  }

  /**
   * Lifecycle hook that responds to input property changes.
   * Updates selection mode, recalculates pages, and reprocesses data as needed.
   * @param changes Object containing changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allowSelection'] && this.allowSelection && this.selectionMode === 'none') {
      this.selectionMode = 'single';
    }
    if (changes['dataSource'] || changes['currentPageSize']) {
      this.getPagesCount();
    }
    if (changes['dataSource']) {
      this.processData();
    }
  }

  /**
   * Handles page navigation from the paginator.
   * @param currentPage The page number to navigate to.
   */
  getPageNo(currentPage: number) {
    this.currentPage = currentPage;
    this.onPageChange.emit(currentPage);
    this.processData();
  }

  /**
   * Handles page size changes.
   * @param pageSize The new page size.
   */
  onPageSize(pageSize: number) {
    this.currentPageSize = pageSize;
    this.getPagesCount();
    this.processData();
  }

  /**
   * Handles page change events from the paginator component.
   * @param page The new page number.
   */
  onPaginatorPageChange(page: number) {
    this.currentPage = page;
    this.onPageChange.emit(page);
    this.processData();
  }

  /**
   * Additional method to handle direct paginator events.
   * @param page The new page number.
   */
  onPageChangeEvent(page: number) {
    this.currentPage = page;
    this.onPageChange.emit(page);
    this.processData();
  }

  /**
   * Handles column sorting when a column header is clicked.
   * @param column The column to sort.
   */
  onSort(column: DataGridColumn): void {
    if (!column.sortable || !this.allowSorting) return;

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

  /**
   * Handles row selection when a row is clicked.
   * @param row The row that was clicked.
   */
  onRowClick(row: DataGridRow): void {
    if (!this.allowSelection || this.selectionMode === 'none') return;

    const rowKey = row.key;

    if (this.selectionMode === 'single') {
      // Single selection: deselect all others, then toggle current
      this.selectedRows = [];
      const wasSelected = row.selected;
      if (!wasSelected) {
        this.selectedRows.push(row.data);
      }
    } else if (this.selectionMode === 'multiple') {
      // Multiple selection: toggle current row
      const index = this.selectedRows.findIndex(selectedRow => selectedRow[this.keyField] === rowKey);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(row.data);
      }
    }

    // Update the row selection state
    this.processData();

    // Emit selection event
    this.onDataGridEvent.emit({
      type: 'select',
      row: row.data,
      rows: this.selectedRows,
      value: this.selectedRows
    });
  }

  /**
   * Calculates the total number of pages based on data source length and page size.
   */
  getPagesCount() {
    this.pages = Math.ceil(this.dataSource.length / this.currentPageSize);
    console.log(Math.ceil(this.dataSource.length / this.currentPageSize));
  }
}
