import { Meta, StoryObj } from '@storybook/angular';
import { RadioComponent } from '../lib/zt-radio/radio.component';

export default {
  title: 'Components/Radio',
  component: RadioComponent,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked (selected state)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    value: {
      control: 'text',
      description: 'The value associated with this radio button',
    },
    name: {
      control: 'text',
      description: 'The name attribute for the radio button group',
    },
    variant: {
      control: { type: 'select', options: ['default', 'rounded', 'square'] },
      description: 'The visual variant of the radio button',
    },
    size: {
      control: { type: 'select', options: ['zt-sm', 'zt-md', 'zt-lg'] },
      description: 'The size of the radio button',
    },
    theme: {
      control: { type: 'select', options: ['light', 'dark', 'bootstrap', 'material'] },
      description: 'The theme of the radio button',
    },
    label: {
      control: 'text',
      description: 'Label text for accessibility',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label text visually',
    },
    radioChange: {
      action: 'radioChange',
      description: 'Emitted when the radio button state changes',
    },
  },
} as Meta<RadioComponent>;

type Story = StoryObj<RadioComponent>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    value: 'option1',
    name: 'radio-group',
    variant: 'default',
    size: 'zt-md',
    theme: 'light',
    label: 'Radio option',
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
    label: 'Select this option',
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

export const RadioGroup: Story = {
  args: {
    ...Default.args,
    label: 'Option 1',
    showLabel: true,
  },
  render: (args) => ({
    props: { ...args, selectedValue: 'option1' },
    template: `
      <div>
        <zt-radio
          [checked]="selectedValue === 'option1'"
          [value]="'option1'"
          [name]="'demo-group'"
          [variant]="variant"
          [size]="size"
          [theme]="theme"
          [disabled]="disabled"
          [showLabel]="showLabel"
          label="Option 1"
          (radioChange)="selectedValue = $event">
        </zt-radio>
        <br><br>
        <zt-radio
          [checked]="selectedValue === 'option2'"
          [value]="'option2'"
          [name]="'demo-group'"
          [variant]="variant"
          [size]="size"
          [theme]="theme"
          [disabled]="disabled"
          [showLabel]="showLabel"
          label="Option 2"
          (radioChange)="selectedValue = $event">
        </zt-radio>
        <br><br>
        <zt-radio
          [checked]="selectedValue === 'option3'"
          [value]="'option3'"
          [name]="'demo-group'"
          [variant]="variant"
          [size]="size"
          [theme]="theme"
          [disabled]="disabled"
          [showLabel]="showLabel"
          label="Option 3"
          (radioChange)="selectedValue = $event">
        </zt-radio>
        <p style="margin-top: 10px;">Selected: {{ selectedValue }}</p>
      </div>
    `,
  }),
};
