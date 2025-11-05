import { Meta, StoryObj } from '@storybook/angular';
import { DatetimePickerComponent } from '../lib/zt-datetime-picker/datetime-picker.component';

export default {
  title: 'Components/Datetime Picker',
  component: DatetimePickerComponent,
  argTypes: {
    selectedDate: {
      control: 'date',
      description: 'The currently selected date and time',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the datetime picker is disabled',
    },
    variant: {
      control: { type: 'select', options: ['default', 'rounded', 'square'] },
      description: 'The visual variant of the datetime picker',
    },
    size: {
      control: { type: 'select', options: ['zt-sm', 'zt-md', 'zt-lg'] },
      description: 'The size of the datetime picker',
    },
    theme: {
      control: { type: 'select', options: ['light', 'dark', 'bootstrap', 'material'] },
      description: 'The theme of the datetime picker',
    },
    label: {
      control: 'text',
      description: 'Label text for accessibility',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label text visually',
    },
    showTime: {
      control: 'boolean',
      description: 'Whether to show time selection',
    },
    minDate: {
      control: 'date',
      description: 'The minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'The maximum selectable date',
    },
    dateFormat: {
      control: 'text',
      description: 'The date format string',
    },
    dateChange: {
      action: 'dateChange',
      description: 'Emitted when the selected date changes',
    },
  },
} as Meta<DatetimePickerComponent>;

type Story = StoryObj<DatetimePickerComponent>;

export const Default: Story = {
  args: {
    selectedDate: null,
    disabled: false,
    variant: 'default',
    size: 'zt-md',
    theme: 'light',
    label: 'Select date and time',
    showLabel: false,
    showTime: true,
    minDate: null,
    maxDate: null,
    dateFormat: 'medium',
  },
};

export const WithSelectedDate: Story = {
  args: {
    ...Default.args,
    selectedDate: new Date(),
    label: 'Meeting time',
    showLabel: true,
  },
};

export const DateOnly: Story = {
  args: {
    ...Default.args,
    showTime: false,
    label: 'Select date only',
    showLabel: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    selectedDate: new Date(),
    label: 'Disabled picker',
    showLabel: true,
  },
};

export const RangeSelection: Story = {
  args: {
    ...Default.args,
    isRangeMode: true,
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    startLabel: 'Start Date',
    endLabel: 'End Date',
    showTime: true,
  },
  render: (args) => ({
    props: { ...args, startDate: args.startDate, endDate: args.endDate },
    template: `
      <div>
        <zt-datetime-picker
          [isRangeMode]="isRangeMode"
          [(startDate)]="startDate"
          [(endDate)]="endDate"
          [startLabel]="startLabel"
          [endLabel]="endLabel"
          [disabled]="disabled"
          [variant]="variant"
          [size]="size"
          [theme]="theme"
          [showTime]="showTime"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [dateFormat]="dateFormat"
          [locale]="locale"
          (rangeChange)="onRangeChange($event)">
        </zt-datetime-picker>
        <p style="margin-top: 10px;">Range: {{ startDate ? startDate.toLocaleString() : 'None' }} - {{ endDate ? endDate.toLocaleString() : 'None' }}</p>
      </div>
    `,
  }),
};

export const Rounded: Story = {
  args: {
    ...Default.args,
    variant: 'rounded',
    label: 'Rounded picker',
    showLabel: true,
  },
};

export const Square: Story = {
  args: {
    ...Default.args,
    variant: 'square',
    label: 'Square picker',
    showLabel: true,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'zt-sm',
    label: 'Small picker',
    showLabel: true,
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'zt-lg',
    label: 'Large picker',
    showLabel: true,
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
    label: 'Dark theme picker',
    showLabel: true,
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
    label: 'Bootstrap theme picker',
    showLabel: true,
  },
};

export const MaterialTheme: Story = {
  args: {
    ...Default.args,
    theme: 'material',
    label: 'Material theme picker',
    showLabel: true,
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
    label: 'Interactive datetime picker',
    showLabel: true,
  },
  render: (args) => ({
    props: { ...args, selectedDate: null },
    template: `
      <div>
        <zt-datetime-picker
          [selectedDate]="selectedDate"
          [disabled]="disabled"
          [variant]="variant"
          [size]="size"
          [theme]="theme"
          [label]="label"
          [showLabel]="showLabel"
          [showTime]="showTime"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [dateFormat]="dateFormat"
          (dateChange)="selectedDate = $event">
        </zt-datetime-picker>
        <p style="margin-top: 10px;">Selected: {{ selectedDate ? selectedDate.toLocaleString() : 'None' }}</p>
      </div>
    `,
  }),
};
