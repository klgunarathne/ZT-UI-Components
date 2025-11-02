import { ZtDataGridComponent } from '../lib/zt-data-grid/zt-data-grid.component';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const sampleData = [
  { id: 1, name: 'John Doe', age: 30, city: 'New York', department: 'Engineering', salary: 75000 },
  { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles', department: 'Marketing', salary: 65000 },
  { id: 3, name: 'Bob Johnson', age: 35, city: 'Chicago', department: 'Sales', salary: 55000 },
  { id: 4, name: 'Alice Brown', age: 28, city: 'Houston', department: 'HR', salary: 60000 },
  { id: 5, name: 'Charlie Wilson', age: 42, city: 'Phoenix', department: 'Engineering', salary: 85000 },
  { id: 6, name: 'Diana Davis', age: 31, city: 'Philadelphia', department: 'Finance', salary: 70000 },
  { id: 7, name: 'Edward Miller', age: 29, city: 'San Antonio', department: 'Marketing', salary: 58000 },
  { id: 8, name: 'Fiona Garcia', age: 33, city: 'San Diego', department: 'Sales', salary: 62000 },
  { id: 9, name: 'George Rodriguez', age: 27, city: 'Dallas', department: 'Engineering', salary: 72000 },
  { id: 10, name: 'Helen Martinez', age: 36, city: 'San Jose', department: 'HR', salary: 68000 },
  { id: 11, name: 'Ian Anderson', age: 24, city: 'Austin', department: 'Finance', salary: 56000 },
  { id: 12, name: 'Julia Thomas', age: 32, city: 'Jacksonville', department: 'Marketing', salary: 59000 },
  { id: 13, name: 'Kevin Lee', age: 38, city: 'Seattle', department: 'Engineering', salary: 90000 },
  { id: 14, name: 'Laura White', age: 26, city: 'Denver', department: 'Sales', salary: 53000 },
  { id: 15, name: 'Michael Chen', age: 41, city: 'Boston', department: 'Finance', salary: 78000 },
];

const sampleColumns = [
  { field: 'id', title: 'ID', width: '60px', sortable: true, alignment: 'center' as const },
  { field: 'name', title: 'Full Name', sortable: true, minWidth: 150 },
  { field: 'age', title: 'Age', width: '80px', sortable: true, alignment: 'center' as const },
  { field: 'department', title: 'Department', sortable: true, minWidth: 120 },
  { field: 'city', title: 'City', sortable: true, minWidth: 120 },
  { field: 'salary', title: 'Salary', width: '100px', sortable: true, alignment: 'right' as const },
];

const meta: Meta<ZtDataGridComponent> = {
  title: 'Components/Data Grid',
  component: ZtDataGridComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ZtDataGridComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive data grid component with sorting, filtering, selection, pagination, and editing capabilities. Supports various themes and customizable columns.'
      }
    }
  },
  argTypes: {
    dataSource: {
      description: 'Array of data objects to display in the grid',
      control: { type: 'object' },
    },
    columns: {
      description: 'Column configuration array defining grid structure',
      control: { type: 'object' },
    },
    striped: {
      description: 'Show alternating row colors',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    showBorders: {
      description: 'Display borders around grid cells',
      control: { type: 'boolean' },
      defaultValue: true,
    },
    showEdit: {
      description: 'Show edit action buttons',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    showDelete: {
      description: 'Show delete action buttons',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    editButtonType: {
      description: 'Style of edit buttons',
      options: ['button', 'link'],
      control: { type: 'select' },
      defaultValue: 'link',
    },
    deleteButtonType: {
      description: 'Style of delete buttons',
      options: ['button', 'link'],
      control: { type: 'select' },
      defaultValue: 'link',
    },
    allowSorting: {
      description: 'Enable column sorting',
      control: { type: 'boolean' },
      defaultValue: true,
    },
    allowSelection: {
      description: 'Enable row selection',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    selectionMode: {
      description: 'Row selection behavior',
      options: ['none', 'single', 'multiple'],
      control: { type: 'select' },
      defaultValue: 'none',
    },
    pages: {
      description: 'Total number of pages',
      control: { type: 'number' },
      defaultValue: 1,
    },
    currentPageSize: {
      description: 'Number of rows per page',
      control: { type: 'number' },
      defaultValue: 10,
    },
    pageSizeOptions: {
      description: 'Available page size options (comma-separated)',
      control: { type: 'text' },
      defaultValue: '5, 10, 20, 100',
    },
    paginatorStyle: {
      description: 'Pagination control style',
      options: ['page', 'arrow'],
      control: { type: 'select' },
      defaultValue: 'page',
    },
    theme: {
      description: 'Visual theme for the data grid',
      options: ['light', 'dark', 'bootstrap', 'material'],
      control: { type: 'select' },
      defaultValue: 'light',
    },
  },
};

export default meta;
type Story = StoryObj<ZtDataGridComponent>;

export const DataGrid: Story = {
  args: {
    dataSource: sampleData,
    columns: sampleColumns,
    striped: true,
    showBorders: true,
    showEdit: true,
    showDelete: true,
    editButtonType: 'link',
    deleteButtonType: 'link',
    allowSorting: true,
    allowSelection: true,
    selectionMode: 'single',
    pages: 3,
    currentPageSize: 5,
    pageSizeOptions: '5, 10, 15, 20',
    paginatorStyle: 'page',
    theme: 'light',
  },
  render: (args) => ({
    template: `
    <div style="padding: 20px; background: #f8f9fa; min-height: 100vh;">
      <h2 style="margin-bottom: 20px; color: #333;">Employee Data Grid</h2>
      <zt-data-grid
        [dataSource]="dataSource"
        [columns]="columns"
        [striped]="striped"
        [showBorders]="showBorders"
        [showEdit]="showEdit"
        [showDelete]="showDelete"
        [editButtonType]="editButtonType"
        [deleteButtonType]="deleteButtonType"
        [allowSorting]="allowSorting"
        [allowSelection]="allowSelection"
        [selectionMode]="selectionMode"
        [pages]="pages"
        [currentPageSize]="currentPageSize"
        [pageSizeOptions]="pageSizeOptions"
        [paginatorStyle]="paginatorStyle"
        [theme]="theme"
        (onPageChange)="onPageChange($event)"
        (onDataGridEvent)="onDataGridEvent($event)"
      ></zt-data-grid>
    </div>
    `,
    props: args,
  }),
};

export const DataGridStriped: Story = {
  args: {
    dataSource: sampleData,
    columns: sampleColumns,
    striped: true,
    showBorders: true,
    showEdit: false,
    showDelete: false,
    editButtonType: 'link',
    deleteButtonType: 'link',
    allowSorting: true,
    allowSelection: false,
    selectionMode: 'none',
    pages: 3,
    currentPageSize: 5,
    pageSizeOptions: '5, 10, 15',
    paginatorStyle: 'page',
    theme: 'light',
  },
  render: (args) => ({
    template: `
    <div style="padding: 20px;">
      <h3 style="margin-bottom: 16px; color: #495057;">Striped Data Grid</h3>
      <p style="margin-bottom: 20px; color: #6c757d;">This example shows a clean data grid with striped rows and no action buttons.</p>
      <zt-data-grid
        [dataSource]="dataSource"
        [columns]="columns"
        [striped]="striped"
        [showBorders]="showBorders"
        [showEdit]="showEdit"
        [showDelete]="showDelete"
        [allowSorting]="allowSorting"
        [allowSelection]="allowSelection"
        [selectionMode]="selectionMode"
        [pages]="pages"
        [currentPageSize]="currentPageSize"
        [pageSizeOptions]="pageSizeOptions"
        [paginatorStyle]="paginatorStyle"
        [theme]="theme"
        (onPageChange)="onPageChange($event)"
        (onDataGridEvent)="onDataGridEvent($event)"
      ></zt-data-grid>
    </div>
    `,
    props: args,
  }),
};

export const DataGridArrowPaginator: Story = {
  args: {
    dataSource: sampleData,
    columns: sampleColumns,
    striped: false,
    showBorders: true,
    showEdit: true,
    showDelete: true,
    editButtonType: 'button',
    deleteButtonType: 'button',
    allowSorting: true,
    allowSelection: true,
    selectionMode: 'multiple',
    pages: 3,
    currentPageSize: 5,
    pageSizeOptions: '5, 10, 15',
    paginatorStyle: 'arrow',
    theme: 'dark',
  },
  render: (args) => ({
    template: `
    <div style="padding: 20px; background: #1a1a1a; min-height: 100vh; color: white;">
      <h3 style="margin-bottom: 16px; color: #ffffff;">Dark Theme with Arrow Pagination</h3>
      <p style="margin-bottom: 20px; color: #cccccc;">This example demonstrates the dark theme with arrow-style pagination and button-type action controls.</p>
      <zt-data-grid
        [dataSource]="dataSource"
        [columns]="columns"
        [striped]="striped"
        [showBorders]="showBorders"
        [showEdit]="showEdit"
        [showDelete]="showDelete"
        [editButtonType]="editButtonType"
        [deleteButtonType]="deleteButtonType"
        [allowSorting]="allowSorting"
        [allowSelection]="allowSelection"
        [selectionMode]="selectionMode"
        [pages]="pages"
        [currentPageSize]="currentPageSize"
        [pageSizeOptions]="pageSizeOptions"
        [paginatorStyle]="paginatorStyle"
        [theme]="theme"
        (onPageChange)="onPageChange($event)"
        (onDataGridEvent)="onDataGridEvent($event)"
      ></zt-data-grid>
    </div>
    `,
    props: args,
  }),
};

export const DataGridMaterialTheme: Story = {
  args: {
    dataSource: sampleData,
    columns: sampleColumns,
    striped: false,
    showBorders: true,
    showEdit: false,
    showDelete: false,
    allowSorting: true,
    allowSelection: true,
    selectionMode: 'single',
    pages: 3,
    currentPageSize: 5,
    pageSizeOptions: '5, 10, 15, 20',
    paginatorStyle: 'page',
    theme: 'material',
  },
  render: (args) => ({
    template: `
    <div style="padding: 20px; background: #fafafa; min-height: 100vh;">
      <h3 style="margin-bottom: 16px; color: #424242;">Material Design Theme</h3>
      <p style="margin-bottom: 20px; color: #757575;">Material Design inspired theme with clean aesthetics and subtle shadows.</p>
      <zt-data-grid
        [dataSource]="dataSource"
        [columns]="columns"
        [striped]="striped"
        [showBorders]="showBorders"
        [showEdit]="showEdit"
        [showDelete]="showDelete"
        [allowSorting]="allowSorting"
        [allowSelection]="allowSelection"
        [selectionMode]="selectionMode"
        [pages]="pages"
        [currentPageSize]="currentPageSize"
        [pageSizeOptions]="pageSizeOptions"
        [paginatorStyle]="paginatorStyle"
        [theme]="theme"
        (onPageChange)="onPageChange($event)"
        (onDataGridEvent)="onDataGridEvent($event)"
      ></zt-data-grid>
    </div>
    `,
    props: args,
  }),
};

export const DataGridBootstrapTheme: Story = {
  args: {
    dataSource: sampleData,
    columns: sampleColumns,
    striped: true,
    showBorders: true,
    showEdit: true,
    showDelete: true,
    editButtonType: 'link',
    deleteButtonType: 'link',
    allowSorting: true,
    allowSelection: false,
    selectionMode: 'none',
    pages: 3,
    currentPageSize: 5,
    pageSizeOptions: '5, 10, 15',
    paginatorStyle: 'page',
    theme: 'bootstrap',
  },
  render: (args) => ({
    template: `
    <div style="padding: 20px; background: #ffffff; min-height: 100vh;">
      <h3 style="margin-bottom: 16px; color: #495057;">Bootstrap Theme</h3>
      <p style="margin-bottom: 20px; color: #6c757d;">Classic Bootstrap styling with familiar form controls and spacing.</p>
      <zt-data-grid
        [dataSource]="dataSource"
        [columns]="columns"
        [striped]="striped"
        [showBorders]="showBorders"
        [showEdit]="showEdit"
        [showDelete]="showDelete"
        [editButtonType]="editButtonType"
        [deleteButtonType]="deleteButtonType"
        [allowSorting]="allowSorting"
        [allowSelection]="allowSelection"
        [selectionMode]="selectionMode"
        [pages]="pages"
        [currentPageSize]="currentPageSize"
        [pageSizeOptions]="pageSizeOptions"
        [paginatorStyle]="paginatorStyle"
        [theme]="theme"
        (onPageChange)="onPageChange($event)"
        (onDataGridEvent)="onDataGridEvent($event)"
      ></zt-data-grid>
    </div>
    `,
    props: args,
  }),
};
