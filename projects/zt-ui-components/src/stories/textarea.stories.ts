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
    required: {
      control: { type: 'boolean' },
      description: 'Whether the textarea field is required',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Custom error message for validation failures',
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

/**
 * Required Textarea - Demonstrates required field validation with error states.
 */
export const Required_Textarea: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'zt',
    placeholder: 'Enter your message (required)',
    rows: 4,
    textlength: 255,
    showCharCount: true,
    required: true,
    errorMessage: 'Message is required for submission',
  },
  parameters: {
    docs: {
      description: {
        story: 'Required textarea field with validation error display. Shows red border and error message when field is empty.',
      },
    },
  },
  render: (args) => ({
    template: `
    <zt-textarea
      [size]="size"
      [theme]="theme"
      [inputStyle]="inputStyle"
      [placeholder]="placeholder"
      [rows]="rows"
      [textlength]="textlength"
      [showCharCount]="showCharCount"
      [required]="required"
      [errorMessage]="errorMessage">
    </zt-textarea>
    `,
    props: args,
  }),
};

/**
 * Textarea with Custom Error Message - Shows custom validation error handling.
 */
export const Textarea_With_Custom_Error: Story = {
  args: {
    size: 'zt-md',
    theme: 'bootstrap',
    inputStyle: 'bs',
    placeholder: 'Describe your issue',
    rows: 5,
    textlength: 500,
    showCharCount: true,
    required: true,
    errorMessage: 'Please provide a detailed description of the issue you are experiencing',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with custom error message. Demonstrates how to provide specific validation feedback for longer text inputs.',
      },
    },
  },
  render: (args) => ({
    template: `
    <zt-textarea
      [size]="size"
      [theme]="theme"
      [inputStyle]="inputStyle"
      [placeholder]="placeholder"
      [rows]="rows"
      [textlength]="textlength"
      [showCharCount]="showCharCount"
      [required]="required"
      [errorMessage]="errorMessage">
    </zt-textarea>
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
