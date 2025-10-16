import { TextareaComponent } from '../lib/zt-textarea/textarea.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
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
type Story = StoryObj<TextareaComponent>;

export const Textarea: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'zt',
    placeholder: 'Enter your message',
    rows: 4,
    textlength: 255,
    showCharCount: true,
  },
  render: (args) => ({
    template: `
    <zt-textarea [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder" [rows]="rows" [textlength]="textlength" [showCharCount]="showCharCount"></zt-textarea>
    `,
    props: args,
  }),
};

export const Material_Textarea: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'material',
    placeholder: 'Material style textarea',
    rows: 4,
    textlength: 255,
    showCharCount: true,
  },
  render: (args) => ({
    template: `
    <zt-textarea [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder" [rows]="rows" [textlength]="textlength" [showCharCount]="showCharCount"></zt-textarea>
    `,
    props: args,
  }),
};

export const Bootstrap_Textarea: Story = {
  args: {
    size: 'zt-md',
    theme: 'bootstrap',
    inputStyle: 'bs',
    placeholder: 'Bootstrap style textarea',
    rows: 4,
    textlength: 255,
    showCharCount: true,
  },
  render: (args) => ({
    template: `
    <zt-textarea [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder" [rows]="rows" [textlength]="textlength" [showCharCount]="showCharCount"></zt-textarea>
    `,
    props: args,
  }),
};
