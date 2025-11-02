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
import { ScrollingModule } from '@angular/cdk/scrolling';
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
 * ## Key Features
 * - 🔄 **Sorting**: Click column headers to sort data (ascending/descending)
 * - 📄 **Pagination**: Built-in pagination with customizable page sizes
 * - ✅ **Selection**: Single or multiple row selection modes
 * - 🎨 **Themes**: Light, Dark, Bootstrap, and Material Design themes
 * - 📝 **Actions**: Edit and Delete action buttons with customizable styles
 * - 📊 **Columns**: Flexible column configuration with alignment and sizing
 * - ♿ **Accessibility**: Full keyboard navigation and ARIA support
 * - 📱 **Responsive**: Adapts to different screen sizes
 *
 * ## Basic Usage
 * ```html
 * <zt-data-grid
 *   [dataSource]="employees"
 *   [columns]="gridColumns"
 *   [allowSorting]="true"
 *   [allowSelection]="true"
 *   [theme]="'light'"
 *   (onDataGridEvent)="handleEvent($event)">
 * </zt-data-grid>
 * ```
 *
 * ## Advanced Configuration
 * ```typescript
 * // Component class
 * employees = [
 *   { id: 1, name: 'John Doe', age: 30, department: 'Engineering', salary: 75000 },
 *   { id: 2, name: 'Jane Smith', age: 25, department: 'Marketing', salary: 65000 }
 * ];
 *
 * gridColumns: DataGridColumn[] = [
 *   { field: 'id', title: 'ID', width: '60px', sortable: true, alignment: 'center' },
 *   { field: 'name', title: 'Full Name', sortable: true, minWidth: 150 },
 *   { field: 'age', title: 'Age', width: '80px', sortable: true, alignment: 'center' },
 *   { field: 'department', title: 'Department', sortable: true, minWidth: 120 },
 *   { field: 'salary', title: 'Salary', width: '100px', sortable: true, alignment: 'right' }
 * ];
 *
 * handleEvent(event: DataGridEvent) {
 *   switch(event.type) {
 *     case 'sort':
 *       console.log('Sorted by:', event.column?.field, event.value);
 *       break;
 *     case 'select':
 *       console.log('Selected rows:', event.rows);
 *       break;
 *   }
 * }
 * ```
 *
 * ## With Actions
 * ```html
 * <zt-data-grid
 *   [dataSource]="data"
 *   [columns]="columns"
 *   [showEdit]="true"
 *   [showDelete]="true"
 *   [editButtonType]="'link'"
 *   [deleteButtonType]="'button'"
 *   (onDataGridEvent)="onAction($event)">
 * </zt-data-grid>
 * ```
 *
 * ## Themes
 * The component supports four built-in themes:
 * - `'light'` - Clean, professional light theme (default)
 * - `'dark'` - Dark theme for low-light environments
 * - `'bootstrap'` - Bootstrap-inspired styling
 * - `'material'` - Material Design theme
 *
 * ## Events
 * - `onDataGridEvent`: Emitted for sort, select, and action events
 * - `onPageChange`: Emitted when pagination changes
 *
 * @author ZT-UI-Components Team
 * @version 1.0.0
 * @since 1.0.0
 */
@Component({
  selector: 'zt-data-grid',
  templateUrl: './zt-data-grid.component.html',
  styleUrls: ['./zt-data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ScrollingModule, ButtonComponent, ZtPaginatorXComponent],
})
export class ZtDataGridComponent implements OnInit, OnChanges {
  /**
   * Visual theme for the data grid component.
   *
   * Available themes:
   * - `'light'`: Clean, professional light theme (default)
   * - `'dark'`: Dark theme optimized for low-light environments
   * - `'bootstrap'`: Bootstrap-inspired styling with familiar aesthetics
   * - `'material'`: Material Design theme with subtle shadows and modern look
   *
   * @example
   * ```html
   * <zt-data-grid [theme]="'dark'" [dataSource]="data"></zt-data-grid>
   * ```
   *
   * @default 'light'
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  @HostBinding('class') get dataGridClass(): string {
    return `theme-${this.theme}`;
  }
  /**
   * Column configuration for the data grid.
   *
   * Defines the structure, appearance, and behavior of each column.
   * If not provided, columns will be auto-generated from the data source.
   *
   * @example
   * ```typescript
   * columns: DataGridColumn[] = [
   *   { field: 'id', title: 'ID', width: '60px', sortable: true },
   *   { field: 'name', title: 'Name', sortable: true, minWidth: 150 },
   *   { field: 'age', title: 'Age', alignment: 'center', sortable: true }
   * ];
   * ```
   */
  @Input() columns: DataGridColumn[] = [];

  /**
   * Data source array containing the rows to display in the grid.
   *
   * Each object in the array represents a row, with properties matching the column field names.
   *
   * @example
   * ```typescript
   * dataSource = [
   *   { id: 1, name: 'John Doe', age: 30, department: 'Engineering' },
   *   { id: 2, name: 'Jane Smith', age: 25, department: 'Marketing' }
   * ];
   * ```
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
   * Key field name used for row identification and selection tracking.
   *
   * This field should contain unique values for each row in the data source.
   *
   * @default 'id'
   * @example 'id', 'uuid', 'employeeId'
   */
  @Input() keyField: string = 'id';

  /**
   * Enable or disable column sorting functionality globally.
   *
   * When enabled, sortable columns will show sort indicators and respond to header clicks.
   * Individual columns can override this setting via their `sortable` property.
   *
   * @default true
   */
  @Input() allowSorting: boolean = true;

  /**
   * Enable or disable filtering functionality globally.
   *
   * **Note**: Filtering is not yet implemented in this version.
   *
   * @default false
   */
  @Input() allowFiltering: boolean = false;

  /**
   * Enable or disable row selection functionality.
   *
   * When enabled, rows become clickable and can be selected based on the `selectionMode`.
   *
   * @default false
   */
  @Input() allowSelection: boolean = false;

  /**
   * Row selection behavior mode.
   *
   * - `'none'`: No selection allowed
   * - `'single'`: Only one row can be selected at a time
   * - `'multiple'`: Multiple rows can be selected simultaneously
   *
   * Automatically set to `'single'` when `allowSelection` is true and mode is `'none'`.
   *
   * @default 'none'
   */
  @Input() selectionMode: SelectionMode = 'none';

  /**
   * Selected rows
   */
  selectedRows: any[] = [];

  /**
   * Display alternating row colors (striped pattern).
   *
   * Creates a zebra-striped appearance that improves readability for large datasets.
   *
   * @default false
   */
  @Input() striped: boolean = false;

  /**
   * Show borders around grid cells and headers.
   *
   * Provides visual separation between cells and improves the grid's structure appearance.
   *
   * @default true
   */
  @Input() showBorders: boolean = true;

  /**
   * Display edit action buttons in the Actions column.
   *
   * When enabled, each row will show an Edit button that emits an event when clicked.
   *
   * @default false
   */
  @Input() showEdit: boolean = false;

  /**
   * Display delete action buttons in the Actions column.
   *
   * When enabled, each row will show a Delete button that emits an event when clicked.
   *
   * @default false
   */
  @Input() showDelete: boolean = false;

  /**
   * Visual style for edit action buttons.
   *
   * - `'button'`: Filled button appearance
   * - `'link'`: Link-style appearance (default)
   *
   * @default 'link'
   */
  @Input() editButtonType: 'button' | 'link' = 'link';

  /**
   * Visual style for delete action buttons.
   *
   * - `'button'`: Filled button appearance
   * - `'link'`: Link-style appearance (default)
   *
   * @default 'link'
   */
  @Input() deleteButtonType: 'button' | 'link' = 'link';

  // pagination options
  currentPage: number = 1;
  display = '';

  /**
   * Total number of pages available for pagination.
   *
   * This is automatically calculated based on `dataSource.length` and `currentPageSize`.
   * Can be set manually for custom pagination logic.
   *
   * @default 1
   */
  @Input() pages: number = 1;

  /**
   * Visual style of the pagination controls.
   *
   * - `'page'`: Shows page numbers (1, 2, 3...) with navigation arrows
   * - `'arrow'`: Shows current page and total pages (e.g., "3 / 10") with arrows only
   *
   * @default 'page'
   * @example 'page', 'arrow'
   */
  @Input() paginatorStyle: 'page' | 'arrow' = 'page';

  /**
   * Event emitted when the current page changes.
   *
   * Provides the new page number for external pagination handling.
   *
   * @example
   * ```html
   * <zt-data-grid (onPageChange)="handlePageChange($event)"></zt-data-grid>
   * ```
   * ```typescript
   * handlePageChange(page: number) {
   *   console.log('Navigated to page:', page);
   *   // Load data for the new page
   * }
   * ```
   */
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  /**
   * Event emitted for various data grid interactions.
   *
   * Emitted for sorting, selection, and action button clicks.
   *
   * @example
   * ```html
   * <zt-data-grid (onDataGridEvent)="handleGridEvent($event)"></zt-data-grid>
   * ```
   * ```typescript
   * handleGridEvent(event: DataGridEvent) {
   *   switch(event.type) {
   *     case 'sort':
   *       console.log('Sorted by:', event.column?.field, event.value);
   *       break;
   *     case 'select':
   *       console.log('Selected rows:', event.rows);
   *       break;
   *   }
   * }
   * ```
   */
  @Output() onDataGridEvent: EventEmitter<DataGridEvent> = new EventEmitter();

  /**
   * Available page size options as a comma-separated string.
   *
   * Users can select from these options to change how many rows are displayed per page.
   * The paginator will show buttons for each option.
   *
   * @default '5, 10, 20, 100'
   * @example '5, 10, 15, 20, 50, 100'
   */
  @Input() pageSizeOptions: string = '5, 10, 20, 100';
  pageSizes: number[] = [];

  /**
   * Current number of rows to display per page.
   *
   * Must be one of the values in `pageSizeOptions`.
   * Changing this value will recalculate pagination and reset to page 1.
   *
   * @default 10
   */
  @Input() currentPageSize: number = 10;

  /**
   * Enable virtual scrolling for large datasets.
   *
   * When enabled, only visible rows are rendered in the DOM, improving performance
   * with thousands of rows. Requires `@angular/cdk/scrolling`.
   *
   * **Note**: Virtual scrolling is not yet fully implemented in this version.
   *
   * @default false
   */
  @Input() virtualScroll: boolean = false;

  /**
   * Height of each row in pixels when virtual scrolling is enabled.
   *
   * Used to calculate which rows should be rendered based on scroll position.
   *
   * @default 40
   */
  @Input() itemSize: number = 40;

  /**
   * Minimum buffer size in pixels for virtual scrolling.
   *
   * Extra rows rendered outside the viewport to prevent flickering during scroll.
   *
   * @default 200
   */
  @Input() minBufferPx: number = 200;

  /**
   * Maximum buffer size in pixels for virtual scrolling.
   *
   * Maximum number of extra rows to render outside the viewport.
   *
   * @default 400
   */
  @Input() maxBufferPx: number = 400;
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
