import { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from '../lib/zt-toggle/toggle.component';

export default {
  title: 'Components/Toggle',
  component: ToggleComponent,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the toggle is checked (on state)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    variant: {
      control: { type: 'select', options: ['default', 'rounded', 'square'] },
      description: 'The visual variant of the toggle',
    },
    size: {
      control: { type: 'select', options: ['zt-sm', 'zt-md', 'zt-lg'] },
      description: 'The size of the toggle',
    },
    theme: {
      control: { type: 'select', options: ['light', 'dark', 'bootstrap', 'material'] },
      description: 'The theme of the toggle',
    },
    label: {
      control: 'text',
      description: 'Label text for accessibility',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label text visually',
    },
    toggleChange: {
      action: 'toggleChange',
      description: 'Emitted when the toggle state changes',
    },
  },
} as Meta<ToggleComponent>;

type Story = StoryObj<ToggleComponent>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    variant: 'default',
    size: 'zt-md',
    theme: 'light',
    label: 'Toggle option',
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
    label: 'Enable notifications',
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
    label: 'Interactive toggle',
    showLabel: true,
  },
  render: (args) => ({
    props: { ...args, checked: false },
    template: `
      <div>
        <zt-toggle
          [checked]="checked"
          [disabled]="disabled"
          [variant]="variant"
          [size]="size"
          [theme]="theme"
          [label]="label"
          [showLabel]="showLabel"
          (toggleChange)="checked = $event">
        </zt-toggle>
        <p style="margin-top: 10px;">Current state: {{ checked ? 'ON' : 'OFF' }}</p>
      </div>
    `,
  }),
};
