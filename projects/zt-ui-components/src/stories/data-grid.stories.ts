import { ZtDataGridComponent } from '../lib/zt-data-grid/zt-data-grid.component';
import type { Meta, StoryObj } from '@storybook/angular';

const sampleData = [
  { id: 1, name: 'John Doe', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Bob Johnson', age: 35, city: 'Chicago' },
  { id: 4, name: 'Alice Brown', age: 28, city: 'Houston' },
  { id: 5, name: 'Charlie Wilson', age: 42, city: 'Phoenix' },
  { id: 6, name: 'Diana Davis', age: 31, city: 'Philadelphia' },
  { id: 7, name: 'Edward Miller', age: 29, city: 'San Antonio' },
  { id: 8, name: 'Fiona Garcia', age: 33, city: 'San Diego' },
  { id: 9, name: 'George Rodriguez', age: 27, city: 'Dallas' },
  { id: 10, name: 'Helen Martinez', age: 36, city: 'San Jose' },
  { id: 11, name: 'Ian Anderson', age: 24, city: 'Austin' },
  { id: 12, name: 'Julia Thomas', age: 32, city: 'Jacksonville' },
];

const sampleColumns = [
  { field: 'id', title: 'ID', width: '80px', sortable: true },
  { field: 'name', title: 'Name', sortable: true },
  { field: 'age', title: 'Age', width: '100px', sortable: true },
  { field: 'city', title: 'City', sortable: true },
];

const meta: Meta<ZtDataGridComponent> = {
  title: 'Data Grid',
  component: ZtDataGridComponent,
  argTypes: {
    dataSource: {
      control: { type: 'object' },
    },
    columns: {
      control: { type: 'object' },
    },
    striped: {
      control: { type: 'boolean' },
      default: false,
    },
    showBorders: {
      control: { type: 'boolean' },
      default: true,
    },
    showEdit: {
      control: { type: 'boolean' },
      default: false,
    },
    showDelete: {
      control: { type: 'boolean' },
      default: false,
    },
    editButtonType: {
      options: ['button', 'link'],
      control: { type: 'select' },
      default: 'link',
    },
    deleteButtonType: {
      options: ['button', 'link'],
      control: { type: 'select' },
      default: 'link',
    },
    allowSorting: {
      control: { type: 'boolean' },
      default: true,
    },
    allowSelection: {
      control: { type: 'boolean' },
      default: false,
    },
    selectionMode: {
      options: ['none', 'single', 'multiple'],
      control: { type: 'select' },
      default: 'none',
    },
    pages: {
      control: { type: 'number' },
      default: 1,
    },
    currentPageSize: {
      control: { type: 'number' },
      default: 10,
    },
    paginatorStyle: {
      options: ['page', 'arrow'],
      control: { type: 'select' },
      default: 'page',
    },
    theme: {
      options: ['light', 'dark', 'bootstrap', 'material'],
      control: { type: 'select' },
      default: 'light',
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
    selectionMode: 'none',
    pages: 4,
    currentPageSize: 5,
    paginatorStyle: 'page',
    theme: "material",
  },
  render: (args) => ({
    template: `
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
      [paginatorStyle]="paginatorStyle"
      [theme]="theme"
      (onPageChange)="onPageChange($event)"
      (onDataGridEvent)="onDataGridEvent($event)"
    ></zt-data-grid>
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
    currentPageSize: 4,
    paginatorStyle: 'page',
    theme: 'light',
  },
  render: (args) => ({
    template: `
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
      [paginatorStyle]="paginatorStyle"
      [theme]="theme"
      (onPageChange)="onPageChange($event)"
      (onDataGridEvent)="onDataGridEvent($event)"
    ></zt-data-grid>
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
    allowSelection: false,
    selectionMode: 'none',
    pages: 3,
    currentPageSize: 4,
    paginatorStyle: 'arrow',
    theme: 'dark',
  },
  render: (args) => ({
    template: `
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
      [pagesLimit]="pagesLimit"
      [currentPageSize]="currentPageSize"
      [paginatorStyle]="paginatorStyle"
      [theme]="theme"
      (onPageChange)="onPageChange($event)"
      (onDataGridEvent)="onDataGridEvent($event)"
    ></zt-data-grid>
    `,
    props: args,
  }),
};
