import { SelectComponent } from '../lib/zt-select/select.component';
import type { Meta, StoryObj } from '@storybook/angular';

/**
 * Select component stories demonstrating different input styles and their behaviors.
 *
 * ## Style Behaviors:
 * - **ZT Style**: Traditional select with `value=""` placeholder option
 * - **Material Style**: Material Design styling with `value=""` placeholder option
 * - **Bootstrap Style**: Bootstrap styling with `[ngValue]="null"` placeholder option (recommended for placeholder functionality)
 */
const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  parameters: {
    docs: {
      description: {
        component: `
## Select Component

A versatile select dropdown component with multiple styling options.

### Style-Specific Behaviors:

- **ZT Style** (\`inputStyle="zt"\`): Uses \`value=""\` for placeholder option
- **Material Style** (\`inputStyle="material"\`): Uses \`value=""\` for placeholder option
- **Bootstrap Style** (\`inputStyle="bs"\`): Uses \`[ngValue]="null"\` for placeholder option (recommended)

### Placeholder Handling:

- ZT & Material styles: Clear to \`-1\`, use \`message\` property for placeholder text
- Bootstrap style: Clears to \`null\`, uses \`placeholder\` property for placeholder text

### Usage Examples:

\`\`\`typescript
// ZT Style (default)
<zt-select inputStyle="zt" [dataSource]="options" [key]="'id'" [displayValue]="'name'"></zt-select>

// Material Style
<zt-select inputStyle="material" [dataSource]="options" [key]="'id'" [displayValue]="'name'"></zt-select>

// Bootstrap Style (with proper placeholder support)
<zt-select inputStyle="bs" [dataSource]="options" [key]="'id'" [displayValue]="'name'" placeholder="Choose option"></zt-select>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      options: ['zt-md', 'zt-sm', 'zt-lg'],
      control: { type: 'select' },
      description: 'Size of the select component',
    },
    theme: {
      options: ['light', 'dark', 'bootstrap', 'material'],
      control: { type: 'select' },
      description: 'Theme of the select component',
    },
    inputStyle: {
      options: ['zt', 'material', 'bs'],
      control: { type: 'select' },
      description: 'Visual style with different placeholder behaviors',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text (only effective with inputStyle="bs")',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the select field is required',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Custom error message for validation failures',
    },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

/**
 * ZT Style Select - Traditional styling with `value=""` placeholder option.
 * Uses the `message` property for placeholder text display.
 */
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
  parameters: {
    docs: {
      description: {
        story: 'ZT Style uses `value=""` for placeholder option and displays `message` property text.',
      },
    },
  },
  render: (args) => ({
    template: `
    <zt-select [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder" [dataSource]="dataSource" [key]="key" [displayValue]="displayValue"></zt-select>
    `,
    props: args,
  }),
};

/**
 * Required Select - Demonstrates required field validation with error states.
 */
export const Required_Select: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
    inputStyle: 'bs',
    placeholder: 'Choose an option (required)',
    required: true,
    errorMessage: 'Please select an option',
    dataSource: [
      { id: 1, firstName: 'John' },
      { id: 2, firstName: 'Jane' },
      { id: 3, firstName: 'Bob' },
    ],
    key: 'id',
    displayValue: 'firstName',
  },
  parameters: {
    docs: {
      description: {
        story: 'Required select field with validation error display. Shows red border and error message when no option is selected.',
      },
    },
  },
  render: (args) => ({
    template: `
    <zt-select
      [size]="size"
      [theme]="theme"
      [inputStyle]="inputStyle"
      [placeholder]="placeholder"
      [required]="required"
      [errorMessage]="errorMessage"
      [dataSource]="dataSource"
      [key]="key"
      [displayValue]="displayValue">
    </zt-select>
    `,
    props: args,
  }),
};

/**
 * Select with Custom Error Message - Shows custom validation error handling.
 */
export const Select_With_Custom_Error: Story = {
  args: {
    size: 'zt-md',
    theme: 'bootstrap',
    inputStyle: 'bs',
    placeholder: 'Select your role',
    required: true,
    errorMessage: 'Role selection is mandatory for account creation',
    dataSource: [
      { id: 'admin', name: 'Administrator' },
      { id: 'user', name: 'User' },
      { id: 'guest', name: 'Guest' },
    ],
    key: 'id',
    displayValue: 'name',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with custom error message. Demonstrates how to provide specific validation feedback to users.',
      },
    },
  },
  render: (args) => ({
    template: `
    <zt-select
      [size]="size"
      [theme]="theme"
      [inputStyle]="inputStyle"
      [placeholder]="placeholder"
      [required]="required"
      [errorMessage]="errorMessage"
      [dataSource]="dataSource"
      [key]="key"
      [displayValue]="displayValue">
    </zt-select>
    `,
    props: args,
  }),
};

/**
 * Material Style Select - Material Design styling with `value=""` placeholder option.
 * Uses the `message` property for placeholder text display (empty in template).
 */
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
  parameters: {
    docs: {
      description: {
        story: 'Material Style uses `value=""` for placeholder option with no display text in the option element.',
      },
    },
  },
  render: (args) => ({
    template: `
    <zt-select [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder" [dataSource]="dataSource" [key]="key" [displayValue]="displayValue"></zt-select>
    `,
    props: args,
  }),
};

/**
 * Bootstrap Style Select - Bootstrap styling with `[ngValue]="null"` placeholder option.
 * **This is the only style that properly supports placeholder functionality.**
 * Uses the `placeholder` property for placeholder text display.
 */
export const Bootstrap_Select: Story = {
  args: {
    size: 'zt-md',
    theme: 'bootstrap',
    inputStyle: 'bs',
    placeholder: 'Choose an option',
    dataSource: [
      { id: 1, firstName: 'Eve' },
      { id: 2, firstName: 'Frank' },
      { id: 3, firstName: 'Grace' },
    ],
    key: 'id',
    displayValue: 'firstName',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bootstrap Style uses `[ngValue]="null"` for placeholder option and properly displays `placeholder` property text. This is the recommended style for placeholder functionality.',
      },
    },
  },
  render: (args) => ({
    template: `
    <zt-select [size]="size" [theme]="theme" [inputStyle]="inputStyle" [placeholder]="placeholder" [dataSource]="dataSource" [key]="key" [displayValue]="displayValue"></zt-select>
    `,
    props: args,
  }),
};
