import { TemplateRef } from '@angular/core';

export type DataType = 'string' | 'number' | 'date' | 'boolean';

export type SortDirection = 'asc' | 'desc' | null;

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

export type SelectionMode = 'none' | 'single' | 'multiple';

export interface DataGridColumn {
  field: string;
  title?: string;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  visible?: boolean;
  template?: TemplateRef<any>;
  dataType?: DataType;
  format?: string;
  sortDirection?: SortDirection;
  filterValue?: any;
  filterOperator?: FilterOperator;
  alignment?: 'left' | 'center' | 'right';
  headerTemplate?: TemplateRef<any>;
  cellTemplate?: TemplateRef<any>;
  editTemplate?: TemplateRef<any>;
}

export interface DataGridSortState {
  field: string;
  direction: SortDirection;
  priority?: number;
}

export interface DataGridFilterState {
  field: string;
  value: any;
  operator: FilterOperator;
}

export interface DataGridGroupState {
  field: string;
  direction: SortDirection;
}

export interface DataGridSelectionState {
  mode: SelectionMode;
  selectedRows: any[];
  selectedKeys: any[];
}

export interface DataGridOptions {
  columns: DataGridColumn[];
  dataSource: any[] | string; // array or URL for remote data
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  selectable?: boolean;
  groupable?: boolean;
  pageable?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  virtualScroll?: boolean;
  exportable?: boolean;
  showBorders?: boolean;
  showColumnLines?: boolean;
  showRowLines?: boolean;
  showColumnHeaders?: boolean;
  allowColumnReordering?: boolean;
  allowColumnResizing?: boolean;
  allowGrouping?: boolean;
  allowSorting?: boolean;
  allowFiltering?: boolean;
  allowSelection?: boolean;
  remoteOperations?: boolean;
  theme?: 'light' | 'dark' | 'bootstrap' | 'material';
}

export interface DataGridEvent {
  type: 'sort' | 'filter' | 'select' | 'edit' | 'group' | 'page' | 'export';
  data?: any;
  column?: DataGridColumn;
  row?: any;
  rows?: any[];
  field?: string;
  value?: any;
  oldValue?: any;
}

export interface DataGridState {
  sort: DataGridSortState[];
  filter: DataGridFilterState[];
  group: DataGridGroupState[];
  selection: DataGridSelectionState;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  columns: DataGridColumn[];
}

export interface DataGridRow {
  data: any;
  index: number;
  key: any;
  selected?: boolean;
  expanded?: boolean;
  level?: number;
  parent?: any;
}

export interface DataGridGroupRow extends DataGridRow {
  key: any;
  items: DataGridRow[];
  summary?: any;
  expanded: boolean;
  level: number;
}

export interface DataGridSummary {
  field: string;
  aggregate: 'sum' | 'avg' | 'min' | 'max' | 'count';
  format?: string;
  displayFormat?: string;
}
