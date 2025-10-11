import { SelectComponent } from '../lib/zt-select/select.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<SelectComponent> = {
  title: 'Select',
  component: SelectComponent,
  argTypes: {
    size: {
      options: ['zt-md', 'zt-sm', 'zt-lg'],
      control: { type: 'select' },
      default: 'zt-md',
    },
    theme: {
      options: ['light', 'dark', 'bootstrap', 'material'],
      control: { type: 'select' },
      default: 'light',
    },
    inputStyle: {
      options: ['zt', 'material', 'bs'],
      control: { type: 'select' },
      default: 'zt',
    },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Select: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'zt',
    placeholder: 'Choose an option',
    dataSource: [
      { id: 1, firstName: 'John' },
      { id: 2, firstName: 'Jane' },
      { id: 3, firstName: 'Bob' },
    ],
    key: 'id',
    displayValue: 'firstName',
  },
  render: (args) => ({
    template: `
    <zt-select [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder" [dataSource]="dataSource" [key]="key" [displayValue]="displayValue"></zt-select>
    `,
    props: args,
  }),
};

export const Material_Select: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'material',
    placeholder: 'Material style select',
    dataSource: [
      { id: 1, firstName: 'Alice' },
      { id: 2, firstName: 'Charlie' },
      { id: 3, firstName: 'David' },
    ],
    key: 'id',
    displayValue: 'firstName',
  },
  render: (args) => ({
    template: `
    <zt-select [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder" [dataSource]="dataSource" [key]="key" [displayValue]="displayValue"></zt-select>
    `,
    props: args,
  }),
};

export const Bootstrap_Select: Story = {
  args: {
    size: 'zt-md',
    theme: 'bootstrap',
    inputStyle: 'bs',
    placeholder: 'Bootstrap style select',
    dataSource: [
      { id: 1, firstName: 'Eve' },
      { id: 2, firstName: 'Frank' },
      { id: 3, firstName: 'Grace' },
    ],
    key: 'id',
    displayValue: 'firstName',
  },
  render: (args) => ({
    template: `
    <zt-select [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder" [dataSource]="dataSource" [key]="key" [displayValue]="displayValue"></zt-select>
    `,
    props: args,
  }),
};
