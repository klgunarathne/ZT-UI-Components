# ZT-UI-Components

A comprehensive collection of reusable UI components for Angular applications, featuring a robust theming system, accessibility compliance, and modern design patterns.

## UI Components

ZT-UI Components provides a rich set of components organized into the following categories:

### Form Components
- **`<zt-input>`** - Advanced text input with validation, character counting, and multiple visual styles
- **`<zt-textarea>`** - Multi-line text input with length validation and character counting
- **`<zt-select>`** - Dropdown select with data binding, search capabilities, and customizable styles
- **`<zt-checkbox>`** - Customizable checkbox with various styles, themes, and accessibility features
- **`<zt-radio>`** - Radio button component for single selection with customizable styles and themes
- **`<zt-datetime-picker>`** - Date and time picker with calendar interface, time selection, and customizable options

### Interactive Components
- **`<zt-button>`** - Versatile button with variants, sizes, states, and interaction handling
- **`<zt-modal>`** - Flexible modal dialogs with theming, accessibility, and customizable content
- **`<zt-paginator>`** - Pagination component for navigating data tables and lists
- **`<zt-toggle>`** - Toggle switch component with customizable styles, labels, and states

### Layout Components
- **`<zt-card>`** - Flexible container with headers, bodies, footers, variants, and hover effects

### Data Display Components
- **`<zt-data-grid>`** - Advanced data table with sorting, filtering, pagination, and row selection

## Installation

```bash
npm install zt-ui-components
```

### Prerequisites
- Angular 16+
- Node.js 18+
- npm or yarn

## Basic Usage

### 1. Import Components

For standalone Angular applications:

```typescript
import { Component } from '@angular/core';
import { ZtButton, ZtInput, ZtCard, ZTThemeService } from 'zt-ui-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ZtButton, ZtInput, ZtCard],
  template: `
    <zt-card cardStyle="elevated" size="md">
      <div class="card-header">
        <h3>Welcome to ZT-UI</h3>
      </div>
      <div class="card-body">
        <zt-input placeholder="Enter your name" size="zt-md"></zt-input>
        <zt-button variant="primary" size="zt-md" (click)="handleSubmit()">Get Started</zt-button>
      </div>
    </zt-card>
  `,
})
export class AppComponent {
  constructor(private themeService: ZTThemeService) {
    this.themeService.setThemeByName('light');
  }

  handleSubmit() {
    // Handle form submission
    console.log('Form submitted!');
  }
}
```

For module-based applications (legacy support):

```typescript
// Note: ZT UI Components are primarily designed for standalone usage.
// For module-based applications, import individual component modules from specific paths:

import { ZTButtonModule } from 'zt-ui-components/ui/button';
import { ZTInputModule } from 'zt-ui-components/ui/input';
import { ZTCardModule } from 'zt-ui-components/ui/card';

@NgModule({
  imports: [ZTButtonModule, ZTInputModule, ZTCardModule],
})
export class AppModule {}
```

### 2. Add Global Styles

Include component styles in your global stylesheet:

```scss
// styles.scss
@import '~zt-ui-components/styles';
```

### 3. Configure Theme (Optional)

Set up a global theme in `app.config.ts`:

```typescript
import { THEME_CONFIG } from 'zt-ui-components';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: THEME_CONFIG,
      useValue: {
        name: 'brand-theme',
        colors: { primary: '#007bff' },
        borderRadius: 8,
      }
    }
  ]
};
```

## Advanced Features

### Reactive Forms Integration

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.maxLength(500)]]
    });
  }
}
```

```html
<form [formGroup]="contactForm">
  <zt-input formControlName="email" inputType="email"></zt-input>
  <zt-textarea formControlName="message" [textlength]="500"></zt-textarea>
</form>
```

### Data Grid with Sorting and Selection

```typescript
export class UserListComponent {
  users = [
    { id: 1, name: 'John Doe', age: 30, department: 'Engineering', salary: 75000 },
    { id: 2, name: 'Jane Smith', age: 25, department: 'Marketing', salary: 65000 },
    { id: 3, name: 'Bob Johnson', age: 35, department: 'Sales', salary: 55000 },
  ];

  columns: DataGridColumn[] = [
    { field: 'id', title: 'ID', width: '60px', sortable: true, alignment: 'center' },
    { field: 'name', title: 'Full Name', sortable: true, minWidth: 150 },
    { field: 'age', title: 'Age', width: '80px', sortable: true, alignment: 'center' },
    { field: 'department', title: 'Department', sortable: true, minWidth: 120 },
    { field: 'salary', title: 'Salary', width: '100px', sortable: true, alignment: 'right' }
  ];

  handleGridEvent(event: DataGridEvent) {
    switch(event.type) {
      case 'sort':
        console.log('Sorted by:', event.column?.field, event.value);
        break;
      case 'select':
        console.log('Selected rows:', event.rows);
        break;
    }
  }
}
```

```html
<zt-data-grid
  [dataSource]="users"
  [columns]="columns"
  [allowSorting]="true"
  [allowSelection]="true"
  [selectionMode]="'single'"
  [striped]="true"
  [showBorders]="true"
  [theme]="'light'"
  (onDataGridEvent)="handleGridEvent($event)">
</zt-data-grid>
```

### Modal Dialogs

```html
<zt-modal [isOpen]="showModal" [title]="'Confirm'" (onClose)="closeModal()">
  <div modal-body>Are you sure?</div>
  <div modal-footer>
    <zt-button (click)="closeModal()">Cancel</zt-button>
    <zt-button variant="primary" (click)="confirm()">OK</zt-button>
  </div>
</zt-modal>
```

## API Reference

### Button Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger'` | `'primary'` | Button style |
| `size` | `'zt-sm' \| 'zt-md' \| 'zt-lg'` | `'zt-md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `outline` | `boolean` | `false` | Outline style |

### Input Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Input value |
| `placeholder` | `string` | `'Enter text'` | Placeholder text |
| `inputType` | `'text' \| 'email' \| 'password'` | `'text'` | Input type |
| `textlength` | `number` | `255` | Max length |
| `showCharCounter` | `boolean` | `false` | Show counter |
| `required` | `boolean` | `false` | Required field validation |
| `customValidators` | `((value: string) => string \| null)[]` | `[]` | Custom validation functions |
| `errorMessage` | `string` | - | Custom error message |
| `disabled` | `boolean` | `false` | Disabled state |

**Events:**
- `(valueChange)` - Emitted when input value changes
- `(blur)` - Emitted on input blur
- `(focus)` - Emitted on input focus
- `(validationChange)` - Emitted when validation state changes

### Card Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cardStyle` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` | Card style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Card size |
| `variant` | `'default' \| 'primary'` | `'default'` | Color variant |

### Select Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `dataSource` | `any[]` | `[]` | Options array |
| `key` | `string` | - | Value property |
| `displayValue` | `string` | - | Display property |
| `value` | `any` | - | Selected value |

### Data Grid Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `dataSource` | `any[]` | `[]` | Data array |
| `columns` | `DataGridColumn[]` | `[]` | Column configuration |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Visual theme |
| `allowSorting` | `boolean` | `true` | Enable column sorting |
| `allowSelection` | `boolean` | `false` | Enable row selection |
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | Row selection behavior |
| `striped` | `boolean` | `false` | Alternating row colors |
| `showBorders` | `boolean` | `true` | Display cell borders |
| `showEdit` | `boolean` | `false` | Show edit action buttons |
| `showDelete` | `boolean` | `false` | Show delete action buttons |
| `editButtonType` | `'button' \| 'link'` | `'link'` | Edit button style |
| `deleteButtonType` | `'button' \| 'link'` | `'link'` | Delete button style |
| `pages` | `number` | `1` | Total number of pages |
| `currentPageSize` | `number` | `10` | Rows per page |
| `pageSizeOptions` | `string` | `'5, 10, 20, 100'` | Available page sizes |
| `paginatorStyle` | `'page' \| 'arrow'` | `'page'` | Pagination style |

**Events:**
- `(onDataGridEvent)` - Emitted for sort, select, and action events
- `(onPageChange)` - Emitted when pagination changes

### Modal Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Modal visibility |
| `title` | `string` | `''` | Modal title |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Modal size |
| `closable` | `boolean` | `true` | Show close button |

**Events:**
- `(onClose)` - Emitted when modal closes
- `(onOpen)` - Emitted when modal opens


### Checkbox Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checkbox state |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | `''` | Label text |
| `size` | `'zt-sm' \| 'zt-md' \| 'zt-lg'` | `'zt-md'` | Checkbox size |
| `variant` | `'default' \| 'rounded' \| 'square'` | `'default'` | Visual style |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Theme variant |
| `showLabel` | `boolean` | `false` | Show label text visually |

**Events:**
- `(checkboxChange)` - Emitted when checkbox state changes

### Radio Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Radio button state |
| `disabled` | `boolean` | `false` | Disabled state |
| `value` | `string` | `''` | Value associated with radio button |
| `name` | `string` | `''` | Name attribute for radio group |
| `label` | `string` | `''` | Label text |
| `size` | `'zt-sm' \| 'zt-md' \| 'zt-lg'` | `'zt-md'` | Radio button size |
| `variant` | `'default' \| 'rounded' \| 'square'` | `'default'` | Visual style |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Theme variant |
| `showLabel` | `boolean` | `false` | Show label text visually |

**Events:**
- `(radioChange)` - Emitted when radio button state changes

### Datetime Picker Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `selectedDate` | `Date \| null` | `null` | Currently selected date and time |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | `''` | Label text |
| `size` | `'zt-sm' \| 'zt-md' \| 'zt-lg'` | `'zt-md'` | Component size |
| `variant` | `'default' \| 'rounded' \| 'square'` | `'default'` | Visual style |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Theme variant |
| `showLabel` | `boolean` | `false` | Show label text visually |
| `showTime` | `boolean` | `true` | Show time selection |
| `minDate` | `Date \| null` | `null` | Minimum selectable date |
| `maxDate` | `Date \| null` | `null` | Maximum selectable date |
| `dateFormat` | `string` | `'medium'` | Date format string |

**Events:**
- `(dateChange)` - Emitted when selected date changes

### Toggle Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Toggle state |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | `''` | Label text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Toggle size |
| `variant` | `'default' \| 'rounded' \| 'square'` | `'default'` | Visual style |
| `theme` | `string` | `'light'` | Theme variant |

**Events:**
- `(checkedChange)` - Emitted when toggle state changes

#### Checkbox Component Usage Examples

```html
<!-- Basic checkbox -->
<zt-checkbox [(checked)]="isSelected"></zt-checkbox>

<!-- Checkbox with label -->
<zt-checkbox
  label="Accept terms and conditions"
  [(checked)]="termsAccepted"
  [showLabel]="true"
  size="zt-md">
</zt-checkbox>

<!-- Disabled checkbox -->
<zt-checkbox
  label="System setting"
  [checked]="true"
  [disabled]="true"
  [showLabel]="true">
</zt-checkbox>

<!-- Custom styled checkbox -->
<zt-checkbox
  label="Enable feature"
  [(checked)]="featureEnabled"
  variant="rounded"
  size="zt-lg"
  theme="dark">
</zt-checkbox>
```

#### Radio Component Usage Examples

```html
<!-- Radio button group -->
<zt-radio
  [checked]="selectedOption === 'option1'"
  [value]="'option1'"
  [name]="'options'"
  label="Option 1"
  [showLabel]="true"
  (radioChange)="selectedOption = $event">
</zt-radio>

<zt-radio
  [checked]="selectedOption === 'option2'"
  [value]="'option2'"
  [name]="'options'"
  label="Option 2"
  [showLabel]="true"
  (radioChange)="selectedOption = $event">
</zt-radio>

<zt-radio
  [checked]="selectedOption === 'option3'"
  [value]="'option3'"
  [name]="'options'"
  label="Option 3"
  [showLabel]="true"
  (radioChange)="selectedOption = $event">
</zt-radio>
```

```typescript
export class SettingsComponent {
  isSelected = false;
  termsAccepted = false;
  featureEnabled = false;
  selectedOption = 'option1';

  constructor(private themeService: ZTThemeService) {}

  onCheckboxChange(value: boolean) {
    console.log('Checkbox changed:', value);
  }

  onRadioChange(value: string) {
    console.log('Radio changed:', value);
  }
}
```

#### Datetime Picker Component Usage Examples

```html
<!-- Basic datetime picker -->
<zt-datetime-picker [(selectedDate)]="appointmentDate" label="Appointment Date & Time"></zt-datetime-picker>

<!-- Date only picker -->
<zt-datetime-picker
  [(selectedDate)]="birthDate"
  [showTime]="false"
  label="Birth Date"
  [showLabel]="true">
</zt-datetime-picker>

<!-- With date range constraints -->
<zt-datetime-picker
  [(selectedDate)]="meetingDate"
  [minDate]="minDate"
  [maxDate]="maxDate"
  label="Meeting Date & Time"
  [showLabel]="true"
  (dateChange)="onDateChange($event)">
</zt-datetime-picker>

<!-- Custom styled picker -->
<zt-datetime-picker
  [(selectedDate)]="eventDate"
  variant="rounded"
  size="zt-lg"
  theme="dark"
  label="Event Date & Time"
  [showLabel]="true">
</zt-datetime-picker>
```

```typescript
export class ScheduleComponent {
  appointmentDate: Date | null = null;
  birthDate: Date | null = null;
  meetingDate: Date | null = null;
  eventDate: Date | null = new Date();

  minDate = new Date(); // Today
  maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days from now

  onDateChange(selectedDate: Date | null) {
    console.log('Selected date:', selectedDate);
    // Handle date change logic
  }
}
```

#### Toggle Component Usage Examples

```html
<!-- Basic toggle -->
<zt-toggle [(checked)]="isEnabled"></zt-toggle>

<!-- Toggle with label -->
<zt-toggle
  label="Enable notifications"
  [(checked)]="notificationsEnabled"
  size="md">
</zt-toggle>

<!-- Disabled toggle -->
<zt-toggle
  label="System setting"
  [checked]="true"
  [disabled]="true">
</zt-toggle>

<!-- Custom styled toggle -->
<zt-toggle
  label="Dark mode"
  [(checked)]="darkMode"
  variant="rounded"
  size="lg">
</zt-toggle>
```

```typescript
export class SettingsComponent {
  isEnabled = false;
  notificationsEnabled = true;
  darkMode = false;

  constructor(private themeService: ZTThemeService) {}

  ngOnInit() {
    // Sync toggle with theme
    this.darkMode = this.themeService.getCurrentTheme()?.name === 'dark';
  }

  onToggleChange(value: boolean) {
    console.log('Toggle changed:', value);
  }
}
```


## Customization

### Theming System

ZT-UI Components includes a comprehensive theming system:

```typescript
import { ZTThemeService } from 'zt-ui-components';

constructor(private themeService: ZTThemeService) {}

setTheme() {
  this.themeService.setTheme({
    name: 'custom',
    colors: {
      primary: '#FF6B35',
      success: '#4CAF50',
    },
    borderRadius: 12,
  });
}
```

### Local Theme Overrides

```html
<zt-button [ztTheme]="customTheme" variant="primary">
  Custom Button
</zt-button>
```

### CSS Custom Properties

```scss
:host {
  --zt-primary: #FF6B35;
  --zt-border-radius: 12px;
}
```

## Examples

### Complete Form Example

```typescript
export class UserFormComponent {
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(''),
  });

  roles = [
    { id: 'admin', name: 'Administrator' },
    { id: 'user', name: 'User' },
  ];

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
```

```html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <zt-input formControlName="name" placeholder="Full Name" [required]="true"></zt-input>
  <zt-input formControlName="email" inputType="email" placeholder="Email" [required]="true"></zt-input>
  <zt-select
    formControlName="role"
    [dataSource]="roles"
    [key]="'id'"
    [displayValue]="'name'"
    placeholder="Select Role">
  </zt-select>
  <zt-button type="submit" variant="primary" [disabled]="userForm.invalid">
    Create User
  </zt-button>
</form>
```

### Advanced Validation Example

```typescript
export class AdvancedFormComponent {
  customValidators = [
    (value: string) => value.length < 3 ? 'Minimum 3 characters required' : null,
    (value: string) => !/\d/.test(value) ? 'Must contain at least one number' : null,
    (value: string) => !/[A-Z]/.test(value) ? 'Must contain at least one uppercase letter' : null
  ];

  onValidationChange(isValid: boolean) {
    console.log('Form validation state:', isValid);
  }
}
```

```html
<form>
  <!-- Required field with character counter -->
  <zt-input
    placeholder="Username (required)"
    [required]="true"
    [textlength]="20"
    [showCharCounter]="true">
  </zt-input>

  <!-- Custom validation -->
  <zt-input
    placeholder="Password"
    inputType="password"
    [customValidators]="customValidators"
    (validationChange)="onValidationChange($event)">
  </zt-input>

  <!-- Field with custom error message -->
  <zt-input
    placeholder="Email"
    inputType="email"
    [errorMessage]="'Please enter a valid email address'"
    [required]="true">
  </zt-input>
</form>
```

### Data Grid with Actions

```typescript
export class UserManagementComponent {
  users = [
    { id: 1, name: 'John Doe', age: 30, department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 25, department: 'Marketing', status: 'Active' },
    { id: 3, name: 'Bob Johnson', age: 35, department: 'Sales', status: 'Inactive' },
  ];

  columns: DataGridColumn[] = [
    { field: 'id', title: 'ID', width: '60px', sortable: true },
    { field: 'name', title: 'Name', sortable: true, minWidth: 150 },
    { field: 'department', title: 'Department', sortable: true },
    { field: 'status', title: 'Status', width: '100px' }
  ];

  onEdit(user: any) {
    console.log('Edit user:', user);
    // Open edit modal or navigate to edit page
  }

  onDelete(user: any) {
    if (confirm(`Delete user ${user.name}?`)) {
      console.log('Delete user:', user);
      // Remove user from data source
    }
  }

  handleGridEvent(event: DataGridEvent) {
    switch(event.type) {
      case 'sort':
        console.log('Column sorted:', event.column?.field);
        break;
      case 'select':
        console.log('Rows selected:', event.rows?.length);
        break;
    }
  }
}
```

```html
<zt-data-grid
  [dataSource]="users"
  [columns]="columns"
  [allowSorting]="true"
  [allowSelection]="true"
  [selectionMode]="'multiple'"
  [showEdit]="true"
  [showDelete]="true"
  [editButtonType]="'link'"
  [deleteButtonType]="'button'"
  [striped]="true"
  [currentPageSize]="5"
  [pageSizeOptions]="'5, 10, 15'"
  [theme]="'bootstrap'"
  (onDataGridEvent)="handleGridEvent($event)">
</zt-data-grid>
```

## Troubleshooting

### Common Issues

1. **Components not rendering**: Ensure proper imports and module declarations
2. **Theme not applying**: Check theme service injection and configuration
3. **Form validation issues**: Verify ControlValueAccessor implementation
4. **Performance problems**: Use OnPush change detection and trackBy functions

### Debug Mode

```typescript
// Enable theme debugging
this.themeService.enableDebugMode();
```

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-component`)
3. Make changes with tests
4. Run tests (`npm test`)
5. Update documentation
6. Submit pull request

### Development Setup

```bash
npm install
ng build zt-ui-components --watch
ng test zt-ui-components
```

### Adding New Components

1. Generate component: `ng generate component zt-new-component --project=zt-ui-components --standalone`
2. Implement with theme support
3. Add unit tests
4. Create Storybook stories
5. Update documentation

## License

MIT
