# ZT-UI-Components

A comprehensive collection of reusable UI components for Angular applications, featuring a robust theming system, accessibility compliance, and modern design patterns.

## UI Components

ZT-UI Components provides a rich set of components organized into the following categories:

### Form Components
- **`<zt-input>`** - Advanced text input with validation, character counting, and multiple visual styles
- **`<zt-textarea>`** - Multi-line text input with length validation and character counting
- **`<zt-select>`** - Dropdown select with data binding, search capabilities, and customizable styles

### Interactive Components
- **`<zt-button>`** - Versatile button with variants, sizes, states, and interaction handling
- **`<zt-modal>`** - Flexible modal dialogs with theming, accessibility, and customizable content
- **`<zt-paginator>`** - Pagination component for navigating data tables and lists
- **`<zt-toast>`** - Toast notification system with multiple types, positions, and customizable options

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
import { ZtButton, ZtInput, ZtCard, ZtToast, ZTThemeService } from 'zt-ui-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ZtButton, ZtInput, ZtCard, ZtToast],
  template: `
    <zt-card cardStyle="elevated" size="md">
      <div class="card-header">
        <h3>Welcome to ZT-UI</h3>
      </div>
      <div class="card-body">
        <zt-input placeholder="Enter your name" size="zt-md"></zt-input>
        <zt-button variant="primary" size="zt-md" (click)="showToast()">Get Started</zt-button>
      </div>
    </zt-card>
    <zt-toast position="top-right"></zt-toast>
  `,
})
export class AppComponent {
  constructor(private themeService: ZTThemeService) {
    this.themeService.setThemeByName('light');
  }

  showToast() {
    // Toast will be shown via service - see usage examples below
  }
}
```

For module-based applications:

```typescript
// app.module.ts
import { ZtButtonModule, ZtInputModule, ZtCardModule, ZtToastModule } from 'zt-ui-components';

@NgModule({
  imports: [ZtButtonModule, ZtInputModule, ZtCardModule, ZtToastModule],
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

### Data Grid with Sorting and Filtering

```html
<zt-data-grid
  [dataSource]="users"
  [columns]="columns"
  [sortable]="true"
  [filterable]="true"
  [pagination]="true">
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

### Toast Notifications

```html
<!-- Basic toast component -->
<zt-toast position="top-right"></zt-toast>
```

```typescript
import { ZtToastService } from 'zt-ui-components';

export class MyComponent {
  constructor(private toastService: ZtToastService) {}

  showSuccessToast() {
    this.toastService.success('Operation completed successfully!', 'Success');
  }

  showErrorToast() {
    this.toastService.error('An error occurred!', 'Error', {
      duration: 5000,
      dismissible: true,
      showProgress: true
    });
  }

  showInfoToast() {
    this.toastService.info('Here is some information.', 'Info');
  }

  showWarningToast() {
    this.toastService.warning('Please be cautious!', 'Warning');
  }
}
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
| `columns` | `DataGridColumn[]` | `[]` | Column config |
| `sortable` | `boolean` | `false` | Enable sorting |
| `filterable` | `boolean` | `false` | Enable filtering |
| `pagination` | `boolean` | `false` | Enable pagination |

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

### Toast Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'top-right'` | Toast container position |
| `showDemoButtons` | `boolean` | `false` | Show demo buttons for testing |

**Toast Service Methods:**
- `success(message, title?, options?)` - Show success toast
- `error(message, title?, options?)` - Show error toast
- `info(message, title?, options?)` - Show info toast
- `warning(message, title?, options?)` - Show warning toast
- `show(toast)` - Show custom toast
- `remove(id)` - Remove specific toast
- `clear()` - Remove all toasts

**Toast Options:**
- `duration` - Auto-hide duration in milliseconds (default: 5000)
- `dismissible` - Allow manual dismissal (default: true)
- `showProgress` - Show progress bar (default: false)
- `position` - Toast position

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
  <zt-input formControlName="name" placeholder="Full Name"></zt-input>
  <zt-input formControlName="email" inputType="email" placeholder="Email"></zt-input>
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

### Data Table with Actions

```typescript
export class UserListComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  ];

  columns = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'status', header: 'Status' },
    {
      field: 'actions',
      header: 'Actions',
      template: (row) => `
        <zt-button size="zt-sm" (click)="editUser(row)">Edit</zt-button>
        <zt-button variant="danger" size="zt-sm" (click)="deleteUser(row)">Delete</zt-button>
      `
    }
  ];

  editUser(user: any) { /* handle edit */ }
  deleteUser(user: any) { /* handle delete */ }
}
```

```html
<zt-data-grid
  [dataSource]="users"
  [columns]="columns"
  [sortable]="true"
  [pagination]="true"
  [pageSize]="10">
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
