import { InputComponent } from '../lib/zt-input/input.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
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
type Story = StoryObj<InputComponent>;

export const Input: Story = {
  args: {
    size: 'zt-md',
    theme: "bootstrap",
    inputStyle: 'zt',
    placeholder: 'Enter text',
  },
  render: (args) => ({
    template: `
    <zt-input [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder"></zt-input>
    `,
    props: args,
  }),
};

export const Material_Input: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'material',
    placeholder: 'Material style input',
  },
  render: (args) => ({
    template: `
    <zt-input [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder"></zt-input>
    `,
    props: args,
  }),
};

export const Bootstrap_Input: Story = {
  args: {
    size: 'zt-md',
    theme: 'bootstrap',
    inputStyle: 'bs',
    placeholder: 'Bootstrap style input',
  },
  render: (args) => ({
    template: `
    <zt-input [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder"></zt-input>
    `,
    props: args,
  }),
};
