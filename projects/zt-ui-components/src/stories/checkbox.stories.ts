import { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../lib/zt-checkbox/checkbox.component';

export default {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (selected state)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    variant: {
      control: { type: 'select', options: ['default', 'rounded', 'square'] },
      description: 'The visual variant of the checkbox',
    },
    size: {
      control: { type: 'select', options: ['zt-sm', 'zt-md', 'zt-lg'] },
      description: 'The size of the checkbox',
    },
    theme: {
      control: { type: 'select', options: ['light', 'dark', 'bootstrap', 'material'] },
      description: 'The theme of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text for accessibility',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label text visually',
    },
    checkboxChange: {
      action: 'checkboxChange',
      description: 'Emitted when the checkbox state changes',
    },
  },
} as Meta<CheckboxComponent>;

type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    variant: 'default',
    size: 'zt-md',
    theme: 'light',
    label: 'Checkbox option',
    showLabel: false,
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Accept terms and conditions',
    showLabel: true,
  },
};

export const Rounded: Story = {
  args: {
    ...Default.args,
    variant: 'rounded',
  },
};

export const Square: Story = {
  args: {
    ...Default.args,
    variant: 'square',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'zt-sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'zt-lg',
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a202c' },
      ],
    },
  },
};

export const BootstrapTheme: Story = {
  args: {
    ...Default.args,
    theme: 'bootstrap',
  },
};

export const MaterialTheme: Story = {
  args: {
    ...Default.args,
    theme: 'material',
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
    label: 'Interactive checkbox',
    showLabel: true,
  },
  render: (args) => ({
    props: { ...args, checked: false },
    template: `
      <div>
        <zt-checkbox
          [checked]="checked"
          [disabled]="disabled"
          [variant]="variant"
          [size]="size"
          [theme]="theme"
          [label]="label"
          [showLabel]="showLabel"
          (checkboxChange)="checked = $event">
        </zt-checkbox>
        <p style="margin-top: 10px;">Current state: {{ checked ? 'CHECKED' : 'UNCHECKED' }}</p>
      </div>
    `,
  }),
};
