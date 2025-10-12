import { TemplateRef } from '@angular/core';

/**
 * Represents the data type of a column in the data grid.
 */
export type DataType = 'string' | 'number' | 'date' | 'boolean';

/**
 * Represents the direction of sorting.
 */
export type SortDirection = 'asc' | 'desc' | null;

/**
 * Represents the available filter operators for data grid filtering.
 */
export type FilterOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'between'
  | 'isEmpty'
  | 'isNotEmpty';

/**
 * Represents the selection mode for the data grid.
 */
export type SelectionMode = 'none' | 'single' | 'multiple';

/**
 * Defines the configuration for a data grid column.
 */
export interface DataGridColumn {
  /** The field name in the data source that this column represents. */
  field: string;
  /** The display title for the column header. */
  title?: string;
  /** The width of the column. Can be a number (pixels) or string (e.g., '100px', '20%'). */
  width?: number | string;
  /** The minimum width of the column in pixels. */
  minWidth?: number;
  /** The maximum width of the column in pixels. */
  maxWidth?: number;
  /** Whether the column is sortable. */
  sortable?: boolean;
  /** Whether the column is filterable. */
  filterable?: boolean;
  /** Whether the column is editable. */
  editable?: boolean;
  /** Whether the column is visible. */
  visible?: boolean;
  /** Custom template for the entire column. */
  template?: TemplateRef<any>;
  /** The data type of the column values. */
  dataType?: DataType;
  /** Format string for displaying values (e.g., date formats). */
  format?: string;
  /** Current sort direction for this column. */
  sortDirection?: SortDirection;
  /** Current filter value for this column. */
  filterValue?: any;
  /** Current filter operator for this column. */
  filterOperator?: FilterOperator;
  /** Text alignment for the column cells. */
  alignment?: 'left' | 'center' | 'right';
  /** Custom template for the column header. */
  headerTemplate?: TemplateRef<any>;
  /** Custom template for the column cells. */
  cellTemplate?: TemplateRef<any>;
  /** Custom template for editing the column cells. */
  editTemplate?: TemplateRef<any>;
}

/**
 * Represents the current sorting state for a data grid.
 */
export interface DataGridSortState {
  /** The field being sorted. */
  field: string;
  /** The sort direction. */
  direction: SortDirection;
  /** The priority of this sort (for multi-column sorting). */
  priority?: number;
}

/**
 * Represents the current filtering state for a data grid column.
 */
export interface DataGridFilterState {
  /** The field being filtered. */
  field: string;
  /** The filter value. */
  value: any;
  /** The filter operator. */
  operator: FilterOperator;
}

/**
 * Represents the current grouping state for a data grid.
 */
export interface DataGridGroupState {
  /** The field being grouped by. */
  field: string;
  /** The sort direction for the group. */
  direction: SortDirection;
}

/**
 * Represents the current selection state for a data grid.
 */
export interface DataGridSelectionState {
  /** The selection mode. */
  mode: SelectionMode;
  /** Array of selected row data. */
  selectedRows: any[];
  /** Array of selected row keys. */
  selectedKeys: any[];
}

/**
 * Configuration options for the data grid component.
 */
export interface DataGridOptions {
  /** Array of column definitions. */
  columns: DataGridColumn[];
  /** Data source - either an array of data or a URL for remote data. */
  dataSource: any[] | string;
  /** Whether sorting is enabled globally. */
  sortable?: boolean;
  /** Whether filtering is enabled globally. */
  filterable?: boolean;
  /** Whether editing is enabled globally. */
  editable?: boolean;
  /** Whether row selection is enabled. */
  selectable?: boolean;
  /** Whether grouping is enabled. */
  groupable?: boolean;
  /** Whether pagination is enabled. */
  pageable?: boolean;
  /** Default page size. */
  pageSize?: number;
  /** Available page size options. */
  pageSizeOptions?: number[];
  /** Whether virtual scrolling is enabled. */
  virtualScroll?: boolean;
  /** Whether data export is enabled. */
  exportable?: boolean;
  /** Whether to show borders around the grid. */
  showBorders?: boolean;
  /** Whether to show vertical lines between columns. */
  showColumnLines?: boolean;
  /** Whether to show horizontal lines between rows. */
  showRowLines?: boolean;
  /** Whether to show column headers. */
  showColumnHeaders?: boolean;
  /** Whether column reordering is allowed. */
  allowColumnReordering?: boolean;
  /** Whether column resizing is allowed. */
  allowColumnResizing?: boolean;
  /** Whether grouping is allowed. */
  allowGrouping?: boolean;
  /** Whether sorting is allowed. */
  allowSorting?: boolean;
  /** Whether filtering is allowed. */
  allowFiltering?: boolean;
  /** Whether selection is allowed. */
  allowSelection?: boolean;
  /** Whether operations should be performed remotely. */
  remoteOperations?: boolean;
  /** The theme of the data grid. */
  theme?: 'light' | 'dark' | 'bootstrap' | 'material';
}

/**
 * Event object emitted by the data grid for various operations.
 */
export interface DataGridEvent {
  /** The type of event. */
  type: 'sort' | 'filter' | 'select' | 'edit' | 'group' | 'page' | 'export';
  /** Additional data associated with the event. */
  data?: any;
  /** The column related to the event. */
  column?: DataGridColumn;
  /** The row related to the event. */
  row?: any;
  /** Multiple rows related to the event. */
  rows?: any[];
  /** The field related to the event. */
  field?: string;
  /** The new value for edit events. */
  value?: any;
  /** The old value for edit events. */
  oldValue?: any;
}

/**
 * Represents the complete state of the data grid.
 */
export interface DataGridState {
  /** Current sorting state. */
  sort: DataGridSortState[];
  /** Current filtering state. */
  filter: DataGridFilterState[];
  /** Current grouping state. */
  group: DataGridGroupState[];
  /** Current selection state. */
  selection: DataGridSelectionState;
  /** Current pagination state. */
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  /** Current column configurations. */
  columns: DataGridColumn[];
}

/**
 * Represents a row in the data grid.
 */
export interface DataGridRow {
  /** The original data object for this row. */
  data: any;
  /** The index of this row in the data source. */
  index: number;
  /** The unique key for this row. */
  key: any;
  /** Whether this row is selected. */
  selected?: boolean;
  /** Whether this row is expanded (for grouped rows). */
  expanded?: boolean;
  /** The nesting level of this row. */
  level?: number;
  /** The parent row for nested rows. */
  parent?: any;
}

/**
 * Represents a group row in the data grid.
 */
export interface DataGridGroupRow extends DataGridRow {
  /** The group key. */
  key: any;
  /** The child rows in this group. */
  items: DataGridRow[];
  /** Summary data for the group. */
  summary?: any;
  /** Whether the group is expanded. */
  expanded: boolean;
  /** The nesting level of the group. */
  level: number;
}

/**
 * Configuration for summary calculations in the data grid.
 */
export interface DataGridSummary {
  /** The field to calculate summary for. */
  field: string;
  /** The type of aggregation to perform. */
  aggregate: 'sum' | 'avg' | 'min' | 'max' | 'count';
  /** Format string for the summary value. */
  format?: string;
  /** Display format for the summary label. */
  displayFormat?: string;
}
