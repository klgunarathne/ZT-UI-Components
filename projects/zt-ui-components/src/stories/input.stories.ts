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
    required: {
      control: { type: 'boolean' },
      default: false,
    },
    showCharCounter: {
      control: { type: 'boolean' },
      default: false,
    },
    disabled: {
      control: { type: 'boolean' },
      default: false,
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

export const Required_Field: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'zt',
    placeholder: 'Required field',
    required: true,
  },
  render: (args) => ({
    template: `
    <zt-input
      [size]="size"
      [theme]="theme"
      [inputStyle]="inputStyle"
      [placeholder]="placeholder"
      [required]="required">
    </zt-input>
    `,
    props: args,
  }),
};

export const With_Character_Counter: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'zt',
    placeholder: 'Enter text with counter',
    textlength: 100,
    showCharCounter: true,
  },
  render: (args) => ({
    template: `
    <zt-input
      [size]="size"
      [theme]="theme"
      [inputStyle]="inputStyle"
      [placeholder]="placeholder"
      [textlength]="textlength"
      [showCharCounter]="showCharCounter">
    </zt-input>
    `,
    props: args,
  }),
};

export const Custom_Validation: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'zt',
    placeholder: 'Enter email with custom validation',
    customValidators: [
      (value: string) => !value.includes('@') ? 'Must contain @ symbol' : null,
      (value: string) => value.length < 5 ? 'Minimum 5 characters required' : null
    ],
  },
  render: (args) => ({
    template: `
    <zt-input
      [size]="size"
      [theme]="theme"
      [inputStyle]="inputStyle"
      [placeholder]="placeholder"
      [customValidators]="customValidators">
    </zt-input>
    `,
    props: args,
  }),
};

export const Validation_With_Error_Message: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'zt',
    placeholder: 'Field with custom error message',
    errorMessage: 'This field has a custom error message',
    required: true,
  },
  render: (args) => ({
    template: `
    <zt-input
      [size]="size"
      [theme]="theme"
      [inputStyle]="inputStyle"
      [placeholder]="placeholder"
      [errorMessage]="errorMessage"
      [required]="required">
    </zt-input>
    `,
    props: args,
  }),
};
