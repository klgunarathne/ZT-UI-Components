import { ZtPaginatorComponent } from '../lib/zt-paginator/zt-paginator.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ZtPaginatorComponent> = {
  title: 'Components/Paginator',
  component: ZtPaginatorComponent,
  argTypes: {
    pages: {
      control: { type: 'number' },
      default: 10,
    },
    theme: {
      options: ['light', 'dark', 'bootstrap', 'material'],
      control: { type: 'select' },
      default: 'light',
    },
  },
};

export default meta;
type Story = StoryObj<ZtPaginatorComponent>;

export const Paginator: Story = {
  args: {
    pages: 10,
    theme: 'light',
  },
  render: (args) => ({
    template: `
    <zt-paginator [pages]="pages" [theme]="theme" (onPageChange)="onPageChange($event)"></zt-paginator>
    `,
    props: args,
  }),
};

export const PaginatorDark: Story = {
  args: {
    pages: 5,
    theme: 'dark',
  },
  render: (args) => ({
    template: `
    <zt-paginator [pages]="pages" [theme]="theme" (onPageChange)="onPageChange($event)"></zt-paginator>
    `,
    props: args,
  }),
};

export const PaginatorBootstrap: Story = {
  args: {
    pages: 8,
    theme: 'bootstrap',
  },
  render: (args) => ({
    template: `
    <zt-paginator [pages]="pages" [theme]="theme" (onPageChange)="onPageChange($event)"></zt-paginator>
    `,
    props: args,
  }),
};

export const PaginatorMaterial: Story = {
  args: {
    pages: 12,
    theme: 'material',
  },
  render: (args) => ({
    template: `
    <zt-paginator [pages]="pages" [theme]="theme" (onPageChange)="onPageChange($event)"></zt-paginator>
    `,
    props: args,
  }),
};
