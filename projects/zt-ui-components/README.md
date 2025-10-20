# ZT-UI-Components

A comprehensive collection of reusable UI components for Angular applications, featuring a robust theming system, accessibility compliance, and modern design patterns.

## Installation

```bash
npm install zt-ui-components
```

## Available Components

### Form Components
- **`<zt-input>`** - Customizable text input with validation, themes, and floating labels
- **`<zt-textarea>`** - Multi-line text input with character counting and length validation
- **`<zt-select>`** - Dropdown select component with data binding and search capabilities

### Interactive Components
- **`<zt-button>`** - Versatile button component with variants, sizes, and states
- **`<zt-paginator>`** - Pagination component for data tables and lists

### Layout Components
- **`<zt-card>`** - Flexible card component with headers, bodies, footers, and variants

### Data Display Components
- **`<zt-data-grid>`** - Advanced data table with sorting, filtering, and pagination

## Quick Start

Import the components you need in your Angular module or standalone component:

```typescript
import { ZtButton, ZtInput, ZtCard, ZTThemeService } from 'zt-ui-components';

@Component({
  imports: [ZtButton, ZtInput, ZtCard],
  // ...
})
export class AppComponent {
  constructor(private themeService: ZTThemeService) {}

  ngOnInit() {
    // Set global theme
    this.themeService.setThemeByName('dark');
  }
}
```

### Basic Usage Example

```html
<zt-card cardStyle="elevated" size="md">
  <div class="card-header">
    <h3>User Registration</h3>
  </div>
  <div class="card-body">
    <zt-input
      placeholder="Enter your name"
      size="zt-md"
      [textlength]="50">
    </zt-input>
    <zt-button variant="primary" size="zt-md">
      Submit
    </zt-button>
  </div>
</zt-card>
```

## Theming System

ZT-UI-Components includes a comprehensive theming system that supports global themes, local overrides, and dynamic theme switching.

### Global Theming Setup

Set a global theme that applies to all components by default:

#### Method 1: Using ZTThemeService

```typescript
import { ZTThemeService, LIGHT_THEME, DARK_THEME } from 'zt-ui-components';

@Component({...})
export class AppComponent implements OnInit {
  constructor(private themeService: ZTThemeService) {}

  ngOnInit() {
    // Set predefined theme
    this.themeService.setThemeByName('dark');

    // Or set custom theme
    this.themeService.setTheme({
      name: 'custom-brand',
      colors: {
        primary: '#007bff',
        success: '#28a745',
        danger: '#dc3545',
        // ... other colors
      },
      borderRadius: 8,
      borderSize: 1,
      fontFamily: 'Inter, sans-serif'
    });
  }
}
```

#### Method 2: Application Configuration

Configure default theme globally in `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { THEME_CONFIG } from 'zt-ui-components';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configure default theme
    {
      provide: THEME_CONFIG,
      useValue: {
        name: 'brand-theme',
        colors: {
          primary: '#your-brand-color',
          // ... customize as needed
        },
        borderRadius: 6,
      }
    }
  ]
};
```

### Local Theme Overrides

Override theme properties for individual components:

#### Using ztTheme Input Property

```html
<!-- Override theme for specific card -->
<zt-card [ztTheme]="customCardTheme" cardStyle="elevated">
  <div class="card-header">Custom Themed Card</div>
  <div class="card-body">Content here</div>
</zt-card>

<!-- Override theme for specific input -->
<zt-input
  [ztTheme]="inputTheme"
  placeholder="Custom styled input"
  size="zt-md">
</zt-input>
```

```typescript
export class MyComponent {
  // Partial theme override - inherits global theme
  customCardTheme: Partial<ThemeConfig> = {
    colors: {
      primary: '#ff6b6b',
      borderRadius: 12,
    },
    borderSize: 2
  };

  // Complete input theme override
  inputTheme: Partial<ThemeConfig> = {
    colors: {
      primary: '#4ecdc4',
      textBlack: '#2c3e50'
    },
    borderRadius: 6
  };
}
```

#### Using ztTheme Directive

```html
<!-- Apply theme override using directive -->
<div ztTheme="sectionTheme">
  <zt-button variant="primary">Themed Button</zt-button>
  <zt-input placeholder="Themed Input"></zt-input>
</div>
```

### Available Predefined Themes

- **`light`** - Default light theme with clean, modern styling
- **`dark`** - Dark theme optimized for low-light environments
- **`bootstrap`** - Bootstrap-inspired theme for consistency
- **`material`** - Material Design theme following Google's guidelines

### Dynamic Theme Switching

Implement runtime theme switching with reactive updates:

```typescript
export class ThemeSwitcherComponent {
  availableThemes = ['light', 'dark', 'bootstrap', 'material'];
  currentTheme$ = this.themeService.currentTheme$;

  constructor(private themeService: ZTThemeService) {}

  // Switch to specific theme
  setTheme(themeName: string) {
    this.themeService.setThemeByName(themeName as any);
  }

  // Toggle between light and dark
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  // Listen to theme changes
  ngOnInit() {
    this.themeService.currentTheme$.subscribe(theme => {
      console.log('Theme changed to:', theme.name);
      // Update local storage, apply side effects, etc.
    });
  }

  // Export current theme configuration
  exportTheme() {
    const themeConfig = this.themeService.exportTheme();
    localStorage.setItem('user-theme', JSON.stringify(themeConfig));
  }

  // Import saved theme
  importTheme() {
    const savedTheme = localStorage.getItem('user-theme');
    if (savedTheme) {
      this.themeService.importTheme(JSON.parse(savedTheme));
    }
  }
}
```

### Advanced Theme Customization

#### Creating Custom Themes

```typescript
import { ThemeConfig } from 'zt-ui-components';

const CUSTOM_BRAND_THEME: ThemeConfig = {
  name: 'brand-theme',
  colors: {
    textBlack: '#1a1a1a',
    textWhite: '#ffffff',
    textPrimary: '#0066cc',
    default: '#f8f9fa',
    defaultHoverBg: '#e9ecef',
    defaultHoverBorder: '#dee2e6',
    defaultPressed: '#dee2e6',
    primary: '#0066cc',
    primaryHoverBg: '#0052a3',
    primaryHoverBorder: '#004085',
    primaryPressed: '#004085',
    success: '#28a745',
    successHoverBg: '#218838',
    successHoverBorder: '#1e7e34',
    successPressed: '#1e7e34',
    info: '#17a2b8',
    infoHoverBg: '#138496',
    infoHoverBorder: '#117a8b',
    infoPressed: '#117a8b',
    warning: '#ffc107',
    warningHoverBg: '#e0a800',
    warningHoverBorder: '#d39e00',
    warningPressed: '#d39e00',
    danger: '#dc3545',
    dangerHoverBg: '#c82333',
    dangerHoverBorder: '#bd2130',
    dangerPressed: '#bd2130',
    dark: '#343a40',
    darkHoverBg: '#23272b',
    darkHoverBorder: '#1d2124',
    darkPressed: '#1d2124',
    link: 'transparent',
    linkHoverBg: 'rgba(0, 102, 204, 0.1)',
    linkHoverBorder: '#0066cc',
    linkPressed: 'rgba(0, 102, 204, 0.2)',
  },
  borderRadius: 8,
  borderSize: 1,
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontSize: {
    small: '14px',
    medium: '16px',
    large: '18px'
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  }
};
```

#### Theme Validation

Validate custom themes for consistency and accessibility:

```typescript
const validation = this.themeService.validateTheme(customTheme);
if (!validation.isValid) {
  console.error('Theme validation errors:', validation.errors);
  // Handle validation errors
}

if (validation.warnings.length > 0) {
  console.warn('Theme warnings:', validation.warnings);
  // Handle warnings (e.g., contrast issues)
}
```

## Component API Reference

### Button Component (`<zt-button>`)

A versatile button component with multiple variants, sizes, and interaction states.

```html
<!-- Basic usage -->
<zt-button variant="primary" size="zt-md">Click me</zt-button>

<!-- With event binding -->
<zt-button variant="secondary" size="zt-lg" (click)="handleClick()">
  Secondary Button
</zt-button>

<!-- Disabled state -->
<zt-button variant="danger" [disabled]="true">Disabled</zt-button>

<!-- Outline style -->
<zt-button variant="primary" [outline]="true">Outline Button</zt-button>

<!-- With theme override -->
<zt-button [ztTheme]="customButtonTheme" variant="primary">
  Custom Themed Button
</zt-button>
```

#### Button Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `variant` | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'dark' \| 'link' \| 'round' \| 'floating'` | `'primary'` | Visual style variant |
| `outline` | `boolean` | `false` | Display as outline style |
| `size` | `'zt-sm' \| 'zt-md' \| 'zt-lg'` | `'zt-md'` | Button size |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Legacy theme property (use global theming) |
| `ztTheme` | `Partial<ThemeConfig>` | - | Local theme override |

#### Button Events

| Event | Type | Description |
|-------|------|-------------|
| `(click)` | `Event` | Emitted when button is clicked |

### Input Component (`<zt-input>`)

A feature-rich, accessible text input component with advanced validation, multiple visual styles, and comprehensive theming support. Supports two-way data binding, reactive forms, character counting, and extensive customization options.

#### Key Features

- **🎨 Multiple Visual Styles**: ZT, Material Design, and Bootstrap styles
- **📝 Advanced Validation**: Character limits, input types, visual feedback
- **♿ Full Accessibility**: WCAG 2.1 AA compliant with proper ARIA support
- **🔗 Two-Way Binding**: Seamless integration with `[(ngModel)]` and reactive forms
- **🎯 ControlValueAccessor**: Native Angular forms support
- **📊 Character Counter**: Real-time character counting with visual indicators
- **🎨 Theme Integration**: Global and local theme overrides
- **⚡ Performance Optimized**: OnPush change detection and efficient rendering
- **🛡️ Type Safe**: Full TypeScript support with strict typing

#### Basic Usage Examples

```html
<!-- Basic text input -->
<zt-input
  placeholder="Enter your name"
  size="zt-md">
</zt-input>

<!-- Email input with validation -->
<zt-input
  placeholder="Email address"
  inputType="email"
  [textlength]="100"
  [showCharCounter]="true"
  size="zt-md">
</zt-input>

<!-- Password input with character limit -->
<zt-input
  placeholder="Password"
  inputType="password"
  [textlength]="50"
  [showCharCounter]="true"
  size="zt-lg">
</zt-input>

<!-- Material design style -->
<zt-input
  placeholder="Search"
  inputStyle="material"
  size="zt-md">
</zt-input>

<!-- Bootstrap style -->
<zt-input
  placeholder="Bootstrap input"
  inputStyle="bs"
  size="zt-md">
</zt-input>
```

#### Two-Way Data Binding

```html
<!-- Using ngModel for two-way binding -->
<zt-input
  placeholder="Enter name"
  [(ngModel)]="userName"
  [textlength]="50"
  [showCharCounter]="true">
</zt-input>

<p>Character count: {{ userName.length }}/50</p>
```

#### Reactive Forms Integration

```typescript
// In your component
export class MyFormComponent {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)])
  });

  constructor() {
    // Form control will automatically sync with input component
  }
}
```

```html
<form [formGroup]="userForm">
  <!-- Works seamlessly with reactive forms -->
  <zt-input
    formControlName="email"
    placeholder="Email address"
    inputType="email"
    [showCharCounter]="true">
  </zt-input>

  <zt-input
    formControlName="name"
    placeholder="Full name"
    [textlength]="50"
    [showCharCounter]="true">
  </zt-input>
</form>
```

#### Event Handling

```html
<zt-input
  placeholder="Interactive input"
  (valueChange)="onValueChange($event)"
  (focus)="onFocus($event)"
  (blur)="onBlur($event)"
  [textlength]="100"
  [showCharCounter]="true">
</zt-input>
```

```typescript
export class MyComponent {
  onValueChange(value: string) {
    console.log('Input value changed:', value);
  }

  onFocus(event: FocusEvent) {
    console.log('Input focused');
  }

  onBlur(event: FocusEvent) {
    console.log('Input blurred');
  }
}
```

#### Advanced Configuration

```html
<!-- Fully configured input with all features -->
<zt-input
  placeholder="Advanced input example"
  inputType="text"
  inputStyle="zt"
  size="zt-md"
  [value]="initialValue"
  [textlength]="200"
  [showCharCounter]="true"
  [disabled]="isDisabled"
  [errorMessage]="validationError"
  [ztTheme]="customTheme"
  (valueChange)="onValueChange($event)"
  (blur)="validateInput($event)">
</zt-input>
```

#### Theme Customization

```html
<!-- Local theme override -->
<zt-input
  [ztTheme]="brandInputTheme"
  placeholder="Brand styled input"
  [showCharCounter]="true">
</zt-input>
```

```typescript
export class MyComponent {
  brandInputTheme: Partial<ThemeConfig> = {
    colors: {
      primary: '#FF6B35',        // Brand orange
      textBlack: '#2D3748',      // Dark gray text
      default: '#FFFFFF',        // White background
    },
    borderRadius: 8,             // Rounded corners
    borderSize: 2,              // Thicker borders
    fontFamily: '"Inter", sans-serif'
  };
}
```

#### Accessibility Features

```html
<!-- Accessible input with proper labeling -->
<zt-input
  placeholder="First name"
  [showCharCounter]="true"
  [textlength]="50"
  aria-describedby="first-name-help">
</zt-input>

<div id="first-name-help" class="help-text">
  Enter your first name (maximum 50 characters)
</div>
```

#### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Input value (supports two-way binding) |
| `placeholder` | `string` | `'Enter text'` | Placeholder text displayed when empty |
| `textlength` | `number` | `255` | Maximum character length |
| `inputType` | `'text' \| 'number' \| 'email' \| 'password'` | `'text'` | HTML input type |
| `inputStyle` | `'zt' \| 'material' \| 'bs'` | `'zt'` | Visual style (ZT, Material, Bootstrap) |
| `size` | `'zt-sm' \| 'zt-md' \| 'zt-lg'` | `'zt-md'` | Component size |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `showCharCounter` | `boolean` | `false` | Show real-time character counter |
| `errorMessage` | `string` | `undefined` | Error message to display |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Legacy theme property (deprecated) |
| `ztTheme` | `Partial<ThemeConfig>` | `undefined` | Local theme override |

#### Input Events

| Event | Type | Description |
|-------|------|-------------|
| `(valueChange)` | `string` | Emitted when input value changes |
| `(focus)` | `FocusEvent` | Emitted when input gains focus |
| `(blur)` | `FocusEvent` | Emitted when input loses focus |

#### CSS Custom Properties

The component supports extensive customization through CSS custom properties:

```scss
:host {
  // Input dimensions
  --zt-input-height: 48px;
  --zt-input-padding: var(--zt-spacing-medium, 12px);
  --zt-input-border-radius: var(--zt-border-radius, 4px);
  --zt-input-border-size: var(--zt-border-size, 1px);

  // Colors
  --zt-input-bg: var(--zt-default, #ffffff);
  --zt-input-color: var(--zt-text-black, #212529);
  --zt-input-border: var(--zt-default-hover-border, #ced4da);
  --zt-input-border-focus: var(--zt-primary, #007bff);
  --zt-input-placeholder: var(--zt-text-gray, #6c757d);

  // Validation states
  --zt-input-error: #dc3545;
  --zt-input-warning: #ffc107;

  // Character counter
  --zt-counter-font-size: var(--zt-font-size-small, 0.875rem);
}
```

#### Validation States

The component provides visual feedback for different validation states:

```scss
// Error state (character limit exceeded)
.zt-input.error input {
  border-color: var(--zt-input-error);
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
}

// Warning state (approaching limit)
.char-counter.warning {
  color: var(--zt-input-warning);
}

// Success state (valid input)
.char-counter {
  color: var(--zt-text-gray);
}
```

#### Best Practices

1. **Character Limits**: Always set reasonable `textlength` values for better UX
2. **Show Counter**: Use `[showCharCounter]="true"` for inputs with limits
3. **Error Messages**: Provide clear, actionable error messages
4. **Accessibility**: Ensure proper labeling and ARIA attributes
5. **Theme Consistency**: Use global themes rather than local overrides when possible
6. **Form Integration**: Leverage ControlValueAccessor for seamless form integration

#### Migration from v1.x

If upgrading from an earlier version:

```typescript
// Before (v1.x)
<zt-input
  placeholder="Name"
  [textlength]="50"
  theme="light">
</zt-input>

// After (v2.x) - Enhanced features
<zt-input
  placeholder="Name"
  [textlength]="50"
  [showCharCounter]="true"
  [ztTheme]="inputTheme">
</zt-input>
```

Key improvements in v2.x:
- ✅ Two-way data binding support
- ✅ Reactive forms integration
- ✅ Enhanced accessibility
- ✅ Visual validation feedback
- ✅ Performance optimizations
- ✅ Better TypeScript support

### Textarea Component (`<zt-textarea>`)

Multi-line text input with character counting and validation.

```html
<!-- Basic textarea -->
<zt-textarea
  placeholder="Enter your message"
  [rows]="4"
  [cols]="50">
</zt-textarea>

<!-- With character counting -->
<zt-textarea
  placeholder="Comments"
  [textlength]="500"
  [showCharCount]="true"
  [rows]="6">
</zt-textarea>

<!-- Bootstrap style -->
<zt-textarea
  inputStyle="bs"
  placeholder="Bootstrap styled textarea">
</zt-textarea>
```

#### Textarea Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Textarea value |
| `placeholder` | `string` | `'label'` | Placeholder text |
| `textlength` | `number` | `255` | Maximum character length |
| `rows` | `number` | `2` | Number of visible rows |
| `cols` | `number` | `20` | Number of visible columns |
| `inputStyle` | `'zt' \| 'material' \| 'bs'` | `'zt'` | Visual style |
| `size` | `'zt-sm' \| 'zt-md' \| 'zt-lg'` | `'zt-md'` | Component size |
| `showCharCount` | `boolean` | `true` | Show character counter |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Legacy theme property |
| `ztTheme` | `Partial<ThemeConfig>` | - | Local theme override |

### Select Component (`<zt-select>`)

Dropdown select component with data binding, customizable display, and style-specific placeholder behaviors.

#### Style-Specific Behaviors

- **ZT Style** (`inputStyle="zt"`): Traditional styling with `value=""` placeholder option
- **Material Style** (`inputStyle="material"`): Material Design styling with `value=""` placeholder option
- **Bootstrap Style** (`inputStyle="bs"`): Bootstrap styling with `[ngValue]="null"` placeholder option (recommended for placeholder functionality)

#### Placeholder Handling

- **ZT & Material styles**: Use `value=""` for placeholder, clear to `-1`, display `message` property text
- **Bootstrap style**: Uses `[ngValue]="null"` for placeholder, clears to `null`, displays `placeholder` property text

```html
<!-- ZT Style (default) -->
<zt-select
  inputStyle="zt"
  [dataSource]="countries"
  [key]="'code'"
  [displayValue]="'name'"
  placeholder="Select country">
</zt-select>

<!-- Material Style -->
<zt-select
  inputStyle="material"
  [dataSource]="options"
  [key]="'id'"
  [displayValue]="'name'"
  placeholder="Choose option">
</zt-select>

<!-- Bootstrap Style (with proper placeholder support) -->
<zt-select
  inputStyle="bs"
  [dataSource]="options"
  [key]="'id'"
  [displayValue]="'name'"
  placeholder="Choose option">
</zt-select>

<!-- With clear button and value binding -->
<zt-select
  inputStyle="bs"
  [dataSource]="options"
  [key]="'id'"
  [displayValue]="'name'"
  [(value)]="selectedValue"
  [showClearButton]="true"
  placeholder="Choose option"
  (valueChange)="onSelectionChange($event)">
</zt-select>
```

#### Select Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `dataSource` | `any[]` | `[]` | Array of options to display |
| `key` | `any` | - | Property name to use as option value |
| `displayValue` | `any` | `''` | Property name to display as option text |
| `value` | `any` | - | Selected value (supports two-way binding) |
| `placeholder` | `string` | `'Choose an option'` | Placeholder text (only effective with `inputStyle="bs"`) |
| `inputStyle` | `'zt' \| 'material' \| 'bs'` | `'zt'` | Visual style with different placeholder behaviors |
| `size` | `'zt-sm' \| 'zt-md' \| 'zt-lg'` | `'zt-md'` | Component size |
| `showClearButton` | `boolean` | `true` | Show clear/reset button |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Legacy theme property (use global theming) |
| `ztTheme` | `Partial<ThemeConfig>` | - | Local theme override |

#### Select Events

| Event | Type | Description |
|-------|------|-------------|
| `(valueChange)` | `any` | Emitted when selection changes |

### Card Component (`<zt-card>`)

Flexible container component with header, body, footer, and variants.

```html
<!-- Basic card -->
<zt-card cardStyle="elevated" size="md">
  <div class="card-header">Card Title</div>
  <div class="card-body">Card content goes here</div>
  <div class="card-footer">
    <zt-button variant="primary">Action</zt-button>
  </div>
</zt-card>

<!-- Outlined card with variant -->
<zt-card
  cardStyle="outlined"
  variant="primary"
  [hoverable]="true"
  size="lg">
  <div class="card-header">Primary Card</div>
  <div class="card-body">Content with primary styling</div>
</zt-card>

<!-- Flat card with custom theme -->
<zt-card
  [ztTheme]="cardTheme"
  cardStyle="flat"
  size="md">
  <div class="card-body">Custom themed content</div>
</zt-card>
```

#### Card Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cardStyle` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` | Card visual style |
| `variant` | `'default' \| 'primary' \| 'info' \| 'danger' \| 'warning' \| 'dark'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Card size/padding |
| `hoverable` | `boolean` | `false` | Enable hover effects |
| `theme` | `'light' \| 'dark' \| 'material' \| 'bootstrap'` | `'light'` | Legacy theme property |
| `ztTheme` | `Partial<ThemeConfig>` | - | Local theme override |

#### Card Content Projection

| Selector | Description |
|----------|-------------|
| `.card-header` | Card header section |
| `.card-body` | Main card content |
| `.card-footer` | Card footer/actions |
| `.card-media` | Media content (images, etc.) |

### Paginator Component (`<zt-paginator>`)

Pagination component for navigating through data pages.

```html
<!-- Basic paginator -->
<zt-paginator
  [pages]="10"
  (onPageChange)="onPageChange($event)">
</zt-paginator>

<!-- With theme override -->
<zt-paginator
  [ztTheme]="paginatorTheme"
  [pages]="totalPages"
  (onPageChange)="handlePageChange($event)">
</zt-paginator>
```

#### Paginator Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pages` | `number` | `1` | Total number of pages |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Legacy theme property |
| `ztTheme` | `Partial<ThemeConfig>` | - | Local theme override |

#### Paginator Events

| Event | Type | Description |
|-------|------|-------------|
| `(onPageChange)` | `number` | Emitted when page changes |

### Data Grid Component (`<zt-data-grid>`)

Advanced data table with sorting, filtering, and pagination.

```html
<!-- Basic data grid -->
<zt-data-grid
  [dataSource]="users"
  [columns]="gridColumns"
  [sortable]="true"
  [filterable]="true">
</zt-data-grid>

<!-- With pagination -->
<zt-data-grid
  [dataSource]="products"
  [columns]="productColumns"
  [pagination]="true"
  [pageSize]="20">
</zt-data-grid>
```

#### Data Grid Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `dataSource` | `any[]` | `[]` | Data array |
| `columns` | `DataGridColumn[]` | `[]` | Column definitions |
| `sortable` | `boolean` | `false` | Enable column sorting |
| `filterable` | `boolean` | `false` | Enable column filtering |
| `pagination` | `boolean` | `false` | Enable pagination |
| `pageSize` | `number` | `10` | Items per page |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Legacy theme property |
| `ztTheme` | `Partial<ThemeConfig>` | - | Local theme override |

## Development

### Setting Up the Project

This library is built using Angular CLI. To start developing:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `ng build zt-ui-components --watch`

## Adding New Components to the Library

Follow these step-by-step instructions to add new UI components to the ZT-UI-Components library.

### Step 1: Generate Component Structure

Generate a new component using Angular CLI:

```bash
# Generate component in the library
ng generate component zt-new-component --project=zt-ui-components --style=scss --standalone

# Alternative: Generate in specific directory
ng generate component lib/zt-new-component --project=zt-ui-components --style=scss --standalone
```

### Step 2: Implement Component Logic

Update the generated component with proper theming support:

```typescript
// zt-new-component.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeConfig } from '../theme/theme.types';

@Component({
  selector: 'zt-new-component',
  templateUrl: './zt-new-component.component.html',
  styleUrls: ['./zt-new-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ZtNewComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  /**
   * Component title
   */
  @Input() title = '';

  /**
   * Component size
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Component variant
   */
  @Input() variant: 'default' | 'primary' | 'secondary' = 'default';

  /**
   * Legacy theme property (deprecated)
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * Local theme override
   */
  @Input() ztTheme?: Partial<ThemeConfig>;

  /**
   * Apply CSS classes with theme support
   */
  @HostBinding('class') get componentClass(): string {
    return `${this.size} variant-${this.variant} theme-${this.theme}`;
  }

  ngOnInit(): void {
    // Apply local theme overrides if specified
    if (this.ztTheme) {
      this.applyLocalTheme();
    }
  }

  /**
   * Apply local theme overrides to the component
   */
  private applyLocalTheme(): void {
    if (!this.ztTheme) return;

    const hostElement = this.elementRef.nativeElement;

    if (this.ztTheme.colors) {
      Object.entries(this.ztTheme.colors).forEach(([key, value]) => {
        const cssVar = `--zt-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        hostElement.style.setProperty(cssVar, value);
      });
    }

    // Apply other theme properties as needed
    if (this.ztTheme.borderRadius !== undefined) {
      hostElement.style.setProperty('--zt-border-radius', `${this.ztTheme.borderRadius}px`);
    }
  }
}
```

### Step 3: Create Component Template

```html
<!-- zt-new-component.component.html -->
<div class="new-component-container">
  <div class="new-component-header" *ngIf="title">
    <h3 class="title">{{ title }}</h3>
  </div>

  <div class="new-component-content">
    <ng-content></ng-content>
  </div>
</div>
```

### Step 4: Style with SCSS and Theme Variables

```scss
// zt-new-component.component.scss
@use "../../assets/themes" as themes;

:host {
  display: block;
  font-family: var(--zt-font-family, inherit);

  .new-component-container {
    border: var(--zt-border-size, 1px) solid var(--zt-default-hover-border, #e0e0e0);
    border-radius: var(--zt-border-radius, 4px);
    background-color: var(--zt-default, #ffffff);
    padding: var(--zt-spacing-medium, 16px);
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--zt-primary, #007bff);
      box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
    }
  }

  .new-component-header {
    margin-bottom: var(--zt-spacing-medium, 16px);

    .title {
      color: var(--zt-text-black, #212529);
      margin: 0;
      font-size: var(--zt-font-size-large, 18px);
      font-weight: 600;
    }
  }

  .new-component-content {
    color: var(--zt-text-black, #212529);
    line-height: 1.6;
  }

  // Size variants
  &.sm {
    .new-component-container {
      padding: var(--zt-spacing-small, 8px);
    }
  }

  &.lg {
    .new-component-container {
      padding: var(--zt-spacing-large, 24px);
    }
  }

  // Theme variants
  &.variant-primary {
    .new-component-container {
      border-color: var(--zt-primary, #007bff);

      &:hover {
        border-color: var(--zt-primary-hover-border, #0056b3);
        box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
      }
    }

    .title {
      color: var(--zt-primary, #007bff);
    }
  }

  &.variant-secondary {
    .new-component-container {
      border-color: var(--zt-dark, #343a40);

      &:hover {
        border-color: var(--zt-dark-hover-border, #1d2124);
      }
    }
  }

  // Dark theme overrides
  &.theme-dark {
    .new-component-container {
      background-color: var(--zt-default, #2d3748);
      border-color: var(--zt-default-hover-border, #4a5568);
    }

    .title {
      color: var(--zt-text-white, #ffffff);
    }

    .new-component-content {
      color: var(--zt-text-white, #ffffff);
    }
  }
}
```

### Step 5: Write Unit Tests

```typescript
// zt-new-component.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZtNewComponent } from './zt-new-component.component';

describe('ZtNewComponent', () => {
  let component: ZtNewComponent;
  let fixture: ComponentFixture<ZtNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZtNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZtNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title when provided', () => {
    component.title = 'Test Title';
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('.title');
    expect(titleElement.textContent).toContain('Test Title');
  });

  it('should apply correct CSS classes', () => {
    component.size = 'lg';
    component.variant = 'primary';
    component.theme = 'dark';
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    expect(hostElement.classList.contains('lg')).toBe(true);
    expect(hostElement.classList.contains('variant-primary')).toBe(true);
    expect(hostElement.classList.contains('theme-dark')).toBe(true);
  });

  it('should apply local theme overrides', () => {
    component.ztTheme = {
      colors: { primary: '#ff0000' },
      borderRadius: 8
    };
    component.ngOnInit();

    const hostElement = fixture.nativeElement;
    const primaryColor = getComputedStyle(hostElement).getPropertyValue('--zt-primary');
    const borderRadius = getComputedStyle(hostElement).getPropertyValue('--zt-border-radius');

    expect(primaryColor).toBe('#ff0000');
    expect(borderRadius).toBe('8px');
  });

  it('should project content correctly', () => {
    const testContent = 'Test projected content';
    fixture.nativeElement.innerHTML = `<zt-new-component>${testContent}</zt-new-component>`;
    fixture.detectChanges();

    const contentElement = fixture.nativeElement.querySelector('.new-component-content');
    expect(contentElement.textContent.trim()).toBe(testContent);
  });
});
```

### Step 6: Create Module (Optional)

If your component needs to be used in module-based applications:

```typescript
// zt-new-component.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtNewComponent } from './zt-new-component.component';

@NgModule({
  declarations: [ZtNewComponent],
  imports: [CommonModule],
  exports: [ZtNewComponent],
})
export class ZtNewComponentModule {}
```

### Step 7: Update Public API

Add exports to `src/public-api.ts`:

```typescript
// Export the component
export * from './lib/zt-new-component/zt-new-component.component';

// Export the module (if created)
export * from './lib/zt-new-component/zt-new-component.module';
```

### Step 8: Update Documentation

Add the new component to the README.md component list and API reference:

```markdown
### New Component (`<zt-new-component>`)

Description of the new component.

```html
<zt-new-component
  title="Component Title"
  size="md"
  variant="primary">
  Component content here
</zt-new-component>
```

#### New Component Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `''` | Component title |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Visual variant |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Legacy theme |
| `ztTheme` | `Partial<ThemeConfig>` | - | Local theme override |
```

### Step 9: Add Stories (Optional)

Create Storybook stories for documentation:

```typescript
// zt-new-component.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { ZtNewComponent } from './zt-new-component.component';

const meta: Meta<ZtNewComponent> = {
  title: 'Components/New Component',
  component: ZtNewComponent,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<ZtNewComponent>;

export const Default: Story = {
  args: {
    title: 'Default Component',
  },
};

export const Primary: Story = {
  args: {
    title: 'Primary Component',
    variant: 'primary',
    size: 'lg',
  },
};
```

### Step 10: Test Integration

1. Build the library: `ng build zt-ui-components`
2. Run tests: `ng test zt-ui-components`
3. Test in consuming application
4. Verify theming works correctly

### Best Practices for New Components

- **Standalone Components**: Use Angular standalone components for better tree-shaking
- **Theme Integration**: Always include `ztTheme` input and theme-aware styling
- **Accessibility**: Implement proper ARIA attributes and keyboard navigation
- **Performance**: Use `OnPush` change detection strategy
- **Testing**: Write comprehensive unit tests covering all inputs and states
- **Documentation**: Update README and create Storybook stories
- **CSS Variables**: Use theme CSS variables for all colors, spacing, and typography
- **Responsive**: Ensure components work across different screen sizes
- **Content Projection**: Use `<ng-content>` for flexible content insertion

## Integration with Angular Applications

### Application Setup

#### 1. Install Dependencies

```bash
npm install zt-ui-components
```

#### 2. Configure Global Theme (Optional)

In `app.config.ts` for standalone applications:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { THEME_CONFIG } from 'zt-ui-components';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Optional: Configure default theme
    {
      provide: THEME_CONFIG,
      useValue: {
        name: 'brand-theme',
        colors: {
          primary: '#your-brand-color',
          // ... customize as needed
        },
        borderRadius: 8,
      }
    }
  ]
};
```

For module-based applications, configure in `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { THEME_CONFIG } from 'zt-ui-components';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: THEME_CONFIG,
      useValue: {
        name: 'app-theme',
        colors: { /* custom colors */ },
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

#### 3. Import Components

In standalone components:

```typescript
import { Component } from '@angular/core';
import {
  ZtButton,
  ZtInput,
  ZtCard,
  ZTThemeService
} from 'zt-ui-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ZtButton, ZtInput, ZtCard],
  template: `
    <zt-card>
      <div class="card-header">Welcome</div>
      <div class="card-body">
        <zt-input placeholder="Enter name"></zt-input>
        <zt-button variant="primary">Submit</zt-button>
      </div>
    </zt-card>
  `,
})
export class AppComponent {
  constructor(private themeService: ZTThemeService) {
    // Optional: Set initial theme
    this.themeService.setThemeByName('light');
  }
}
```

### Runtime Theme Management

#### Theme Switcher Component

Create a component for dynamic theme switching:

```typescript
// theme-switcher.component.ts
import { Component } from '@angular/core';
import { ZTThemeService, ThemeName } from 'zt-ui-components';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <div class="theme-switcher">
      <button
        *ngFor="let theme of availableThemes"
        (click)="setTheme(theme)"
        [class.active]="currentTheme === theme">
        {{ theme | titlecase }}
      </button>
    </div>
  `,
  styles: [`
    .theme-switcher {
      display: flex;
      gap: 8px;
    }
    button {
      padding: 8px 16px;
      border: 1px solid #ccc;
      background: white;
      cursor: pointer;
    }
    button.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
  `]
})
export class ThemeSwitcherComponent {
  availableThemes: ThemeName[] = ['light', 'dark', 'bootstrap', 'material'];
  currentTheme = 'light';

  constructor(private themeService: ZTThemeService) {
    // Subscribe to theme changes
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme.name as ThemeName;
    });
  }

  setTheme(theme: ThemeName) {
    this.themeService.setThemeByName(theme);
  }
}
```

#### Persisting User Theme Preferences

```typescript
// theme.service.ts (application-level service)
import { Injectable } from '@angular/core';
import { ZTThemeService, ThemeConfig } from 'zt-ui-components';

@Injectable({ providedIn: 'root' })
export class AppThemeService {
  constructor(private ztThemeService: ZTThemeService) {
    this.loadSavedTheme();
  }

  setTheme(themeName: string) {
    this.ztThemeService.setThemeByName(themeName as any);
    localStorage.setItem('user-theme', themeName);
  }

  setCustomTheme(theme: ThemeConfig) {
    this.ztThemeService.setTheme(theme);
    localStorage.setItem('custom-theme', JSON.stringify(theme));
  }

  private loadSavedTheme() {
    const savedTheme = localStorage.getItem('user-theme');
    const customTheme = localStorage.getItem('custom-theme');

    if (customTheme) {
      try {
        const theme = JSON.parse(customTheme);
        this.ztThemeService.setTheme(theme);
      } catch (error) {
        console.warn('Failed to load custom theme');
      }
    } else if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }
}
```

### Accessibility Considerations

#### Color Contrast

The theming system validates color contrast ratios:

```typescript
const customTheme: ThemeConfig = {
  name: 'accessible-theme',
  colors: {
    textBlack: '#000000',  // High contrast text
    default: '#ffffff',    // White background
    // ... other colors
  },
  // ... other properties
};

// Validate theme accessibility
const validation = this.themeService.validateTheme(customTheme);
if (!validation.isValid) {
  console.error('Accessibility issues:', validation.errors);
}
```

#### Focus Management

Components automatically handle focus indicators through theme colors:

```scss
// Component styles use theme focus colors
.my-component:focus {
  outline: 2px solid var(--zt-primary, #007bff);
  outline-offset: 2px;
}
```

#### Screen Reader Support

All components include proper ARIA attributes:

```html
<!-- Screen reader friendly -->
<zt-button
  variant="primary"
  aria-label="Save changes"
  [disabled]="isLoading">
  {{ isLoading ? 'Saving...' : 'Save' }}
</zt-button>
```

### Customization Examples

#### Brand Integration

```typescript
// Brand theme configuration
const BRAND_THEME: ThemeConfig = {
  name: 'brand',
  colors: {
    primary: '#FF6B35',      // Brand orange
    success: '#4CAF50',      // Standard green
    danger: '#F44336',       // Standard red
    textBlack: '#2D3748',    // Dark gray
    default: '#FFFFFF',      // White
    // ... complete color palette
  },
  borderRadius: 12,          // Rounded corners
  borderSize: 2,            // Thicker borders
  fontFamily: '"Inter", sans-serif',
  fontSize: {
    small: '14px',
    medium: '16px',
    large: '20px'
  },
  spacing: {
    small: '12px',
    medium: '20px',
    large: '32px'
  }
};
```

#### Dark Mode Implementation

```typescript
// Dark theme with brand colors
const DARK_BRAND_THEME: ThemeConfig = {
  name: 'dark-brand',
  colors: {
    primary: '#FF8C42',      // Lighter brand orange for dark
    textBlack: '#FFFFFF',    // White text
    textWhite: '#FFFFFF',    // White text
    default: '#1A202C',      // Dark background
    // ... adjusted colors for dark theme
  },
  // ... other properties same as brand theme
};
```

### Performance Optimization

#### Lazy Loading Themes

```typescript
// Lazy load theme configuration
async loadTheme(themeName: string) {
  const themeModule = await import(`./themes/${themeName}.theme`);
  this.themeService.setTheme(themeModule.default);
}
```

#### CSS Custom Properties

The theming system uses CSS custom properties for optimal performance:

```scss
// Efficient theme variable usage
.my-component {
  color: var(--zt-text-black, #212529);
  background: var(--zt-default, #ffffff);
  border: var(--zt-border-size, 1px) solid var(--zt-primary, #007bff);
  border-radius: var(--zt-border-radius, 4px);
  padding: var(--zt-spacing-medium, 16px);
}
```

### Best Practices

#### Theme Organization

- **Global Themes**: Use for app-wide consistency
- **Component Themes**: Reserve for specific component needs
- **User Preferences**: Respect system preferences (dark mode)
- **Brand Guidelines**: Ensure themes match brand requirements

#### Development Workflow

1. **Design System First**: Establish design tokens before implementation
2. **Theme Validation**: Always validate custom themes
3. **Testing**: Test themes across all components and breakpoints
4. **Documentation**: Keep theme documentation current
5. **Performance**: Monitor theme switching performance

#### Error Handling

```typescript
try {
  this.themeService.setTheme(customTheme);
} catch (error) {
  console.error('Theme application failed:', error);
  // Fallback to default theme
  this.themeService.resetToDefault();
}
```

## Migration Guide

### Upgrading from v1.x to v2.0

Version 2.0 introduces significant improvements and some breaking changes. Follow this guide to migrate your existing implementations.

#### New Features in v2.0

- ✅ **Two-way Data Binding**: Full `[(ngModel)]` support
- ✅ **Reactive Forms**: Complete `ControlValueAccessor` implementation
- ✅ **Enhanced Accessibility**: WCAG 2.1 AA compliance
- ✅ **Visual Validation**: Real-time feedback and error states
- ✅ **Performance Optimizations**: OnPush change detection and efficient rendering
- ✅ **Better TypeScript Support**: Improved type safety and IntelliSense

#### Breaking Changes

##### 1. **Input Validation Behavior**
```typescript
// Before (v1.x) - Validation was inconsistent
<zt-input [textlength]="100" (keydown)="manualValidation()"></zt-input>

// After (v2.0) - Automatic validation with visual feedback
<zt-input [textlength]="100" [showCharCounter]="true" [errorMessage]="validationError"></zt-input>
```

##### 2. **Event Handling**
```typescript
// Before (v1.x) - Manual event handling required
<zt-input (keydown)="onKeyDown($event)" [value]="inputValue" (input)="onInput($event)"></zt-input>

// After (v2.0) - Simplified with proper event delegation
<zt-input [(ngModel)]="inputValue" (valueChange)="onValueChange($event)"></zt-input>
```

##### 3. **Theme Application**
```typescript
// Before (v1.x) - Direct DOM manipulation
<zt-input [ztTheme]="theme" (afterViewInit)="applyTheme()"></zt-input>

// After (v2.0) - Automatic theme application
<zt-input [ztTheme]="theme"></zt-input> // Theme applied automatically in ngOnInit
```

#### Migration Steps

1. **Update Imports**
```typescript
// Before (v1.x)
import { ZtInputModule } from 'zt-ui-components';

// After (v2.0) - Enhanced module with forms support
import { ZtInputModule } from 'zt-ui-components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ZtInputModule.forRoot(), // Use forRoot() for root module
    ReactiveFormsModule
  ]
})
```

2. **Update Component Usage**
```typescript
// Before (v1.x)
<zt-input
  placeholder="Name"
  [textlength]="50"
  theme="light"
  [value]="name"
  (keydown)="validateInput()">
</zt-input>

// After (v2.0) - Enhanced features
<zt-input
  placeholder="Name"
  [(ngModel)]="name"
  [textlength]="50"
  [showCharCounter]="true"
  [ztTheme]="inputTheme"
  (valueChange)="onNameChange($event)"
  (blur)="validateName()">
</zt-input>
```

3. **Update Form Integration**
```typescript
// Before (v1.x) - Manual form handling
export class MyComponent {
  name = '';

  onInput(event: any) {
    this.name = event.target.value;
  }
}

// After (v2.0) - Automatic form integration
export class MyComponent {
  name = '';

  onNameChange(newValue: string) {
    this.name = newValue;
    // Validation happens automatically
  }
}
```

#### Deprecated Features

| Feature | Status | Replacement |
|---------|--------|-------------|
| `theme` input property | Deprecated | Use `ztTheme` or global theming |
| Manual validation | Deprecated | Use reactive forms and `errorMessage` |
| `keydown` event handling | Simplified | Use `valueChange` and `blur` events |

## Accessibility Best Practices

### WCAG 2.1 AA Compliance

All components in ZT-UI-Components are designed to meet WCAG 2.1 AA standards:

#### Keyboard Navigation
- **Tab Order**: Components follow logical tab sequence
- **Focus Indicators**: Visible focus states using theme colors
- **Keyboard Shortcuts**: Standard shortcuts supported (Ctrl+A, etc.)

#### Screen Reader Support
- **Semantic HTML**: Proper use of form elements and landmarks
- **ARIA Labels**: Descriptive labels and descriptions
- **Live Regions**: Dynamic content updates announced

#### Color and Contrast
- **Minimum Ratios**: 4.5:1 for normal text, 3:1 for large text
- **Theme Validation**: Built-in contrast checking
- **Color Independence**: Information not conveyed by color alone

### Input Component Accessibility Features

```html
<!-- Properly accessible input -->
<label for="user-email">Email Address</label>
<zt-input
  id="user-email"
  inputType="email"
  placeholder="Enter your email address"
  [textlength]="100"
  [showCharCounter]="true"
  [errorMessage]="emailError"
  aria-describedby="email-help">
</zt-input>

<div id="email-help" class="help-text">
  We'll use this email to send you updates (max 100 characters)
</div>

<!-- Error message with proper ARIA -->
<div id="email-error" role="alert" *ngIf="emailError">
  {{ emailError }}
</div>
```

#### Accessibility Checklist

- ✅ **Labels**: Every input has an associated label
- ✅ **Instructions**: Complex inputs have clear instructions
- ✅ **Error Messages**: Errors are descriptive and actionable
- ✅ **Character Limits**: Limits are communicated before reaching them
- ✅ **Focus Management**: Focus is visible and logical
- ✅ **Keyboard Support**: All interactions work via keyboard
- ✅ **Screen Readers**: Content is properly announced
- ✅ **Color Contrast**: All text meets minimum contrast ratios

### Performance Best Practices

#### Change Detection Optimization
- **OnPush Strategy**: Used throughout the library for optimal performance
- **Input Binding**: Avoid complex expressions in templates
- **TrackBy Functions**: Use with *ngFor directives

#### Bundle Size Optimization
- **Tree Shaking**: Standalone components for optimal bundle size
- **Dynamic Imports**: Lazy load components when possible
- **CSS Optimization**: Use CSS custom properties for theme switching

#### Runtime Performance
- **Efficient Events**: Use `input` events instead of `keydown` where possible
- **Renderer2**: Safe DOM manipulation for Universal compatibility
- **Batch Updates**: Minimize change detection cycles

### Theming Best Practices

#### Design Token Organization
```scss
// Use consistent naming conventions
:root {
  --zt-color-primary: #007bff;
  --zt-color-success: #28a745;
  --zt-color-danger: #dc3545;

  --zt-spacing-xs: 4px;
  --zt-spacing-sm: 8px;
  --zt-spacing-md: 16px;
  --zt-spacing-lg: 24px;

  --zt-border-radius-sm: 4px;
  --zt-border-radius-md: 8px;
  --zt-border-radius-lg: 12px;
}
```

#### Theme Validation
```typescript
// Always validate custom themes
const validation = this.themeService.validateTheme(customTheme);
if (!validation.isValid) {
  console.error('Theme validation failed:', validation.errors);
  // Provide fallback or fix issues
}
```

#### Performance Considerations
- **CSS Variables**: Use for dynamic theming (better performance)
- **Theme Caching**: Cache computed theme values when possible
- **Minimal Overrides**: Use global themes rather than component-level overrides

## Best Practices

- **Component Design**: Use Angular's standalone components for better tree-shaking
- **Styling**: Use SCSS with BEM methodology for maintainable styles
- **Inputs/Outputs**: Define clear interfaces for component APIs
- **Accessibility**: Ensure components are accessible (ARIA attributes, keyboard navigation)
- **Performance**: Use `OnPush` change detection where possible
- **Testing**: Write comprehensive unit tests and integration tests
- **Theming**: Prefer global themes with minimal local overrides for consistency
- **Forms Integration**: Leverage ControlValueAccessor for seamless form support
- **Error Handling**: Provide clear, actionable error messages
- **Documentation**: Keep component documentation current and comprehensive

### Accessibility & Theming

The theming system is designed with accessibility in mind:

- **Contrast Ratios**: All default themes maintain WCAG AA compliant contrast ratios
- **Color Validation**: Theme validation includes accessibility checks
- **Semantic Colors**: Use semantic color names (primary, success, danger) for consistent meaning
- **Focus Indicators**: Theme colors include focus states for keyboard navigation

#### Theme Validation

```typescript
const validation = themeService.validateTheme(customTheme);
if (!validation.isValid) {
  console.error('Theme validation errors:', validation.errors);
}
if (validation.warnings.length > 0) {
  console.warn('Theme warnings:', validation.warnings);
}
```

### Styling Guidelines

- Use SCSS variables for colors, spacing, and typography
- Follow BEM naming convention: `.block__element--modifier`
- Ensure responsive design with media queries
- Use CSS custom properties for theming support
- Prefer global theme variables over hardcoded values
- Test themes across different components for consistency

### Versioning

Follow semantic versioning:
- **MAJOR**: Breaking changes
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

### Building

To build the library:

```bash
ng build zt-ui-components --configuration=production
```

### Testing

Run unit tests:

```bash
ng test zt-ui-components --watch=false
```

### Publishing

1. Build the library
2. Navigate to dist: `cd dist/zt-ui-components`
3. Publish: `npm publish`

Make sure you have an NPM account and are logged in.

## Complete API Reference

### Input Component Detailed API

#### Properties

| Property | Type | Default | Description | Example |
|----------|------|---------|-------------|---------|
| `value` | `string` | `''` | Input value with two-way binding support | `[value]="name"` |
| `placeholder` | `string` | `'Enter text'` | Placeholder text | `placeholder="Enter email"` |
| `textlength` | `number` | `255` | Maximum characters allowed | `[textlength]="100"` |
| `inputType` | `'text' \| 'number' \| 'email' \| 'password'` | `'text'` | HTML input type | `inputType="email"` |
| `inputStyle` | `'zt' \| 'material' \| 'bs'` | `'zt'` | Visual style variant | `inputStyle="material"` |
| `size` | `'zt-sm' \| 'zt-md' \| 'zt-lg'` | `'zt-md'` | Component size | `size="zt-lg"` |
| `disabled` | `boolean` | `false` | Disable input interaction | `[disabled]="isDisabled"` |
| `showCharCounter` | `boolean` | `false` | Show character counter | `[showCharCounter]="true"` |
| `errorMessage` | `string` | `undefined` | Error message to display | `[errorMessage]="emailError"` |
| `theme` | `'light' \| 'dark' \| 'bootstrap' \| 'material'` | `'light'` | Legacy theme (deprecated) | `theme="dark"` |
| `ztTheme` | `Partial<ThemeConfig>` | `undefined` | Local theme override | `[ztTheme]="customTheme"` |

#### Events

| Event | Payload | Description | Example |
|-------|---------|-------------|---------|
| `valueChange` | `string` | Emitted when value changes | `(valueChange)="onChange($event)"` |
| `focus` | `FocusEvent` | Emitted when input gains focus | `(focus)="onFocus($event)"` |
| `blur` | `FocusEvent` | Emitted when input loses focus | `(blur)="onBlur($event)"` |

#### Computed Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `currentLength` | `number` | Current character count | `{{ inputComponent.currentLength }}` |
| `hasError` | `boolean` | Whether character limit exceeded | `*ngIf="inputComponent.hasError"` |
| `counterClass` | `string` | CSS class for counter state | `[ngClass]="inputComponent.counterClass"` |
| `ariaDescribedBy` | `string` | ARIA described-by attribute | `aria-describedby="{{ inputComponent.ariaDescribedBy }}"` |

#### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--zt-input-height` | `48px` | Input height |
| `--zt-input-padding` | `var(--zt-spacing-medium)` | Input padding |
| `--zt-input-border-radius` | `var(--zt-border-radius)` | Border radius |
| `--zt-input-border-size` | `var(--zt-border-size)` | Border thickness |
| `--zt-input-bg` | `var(--zt-default)` | Background color |
| `--zt-input-color` | `var(--zt-text-black)` | Text color |
| `--zt-input-border` | `var(--zt-default-hover-border)` | Border color |
| `--zt-input-border-focus` | `var(--zt-primary)` | Focus border color |
| `--zt-input-placeholder` | `var(--zt-text-gray)` | Placeholder color |
| `--zt-input-error` | `#dc3545` | Error state color |
| `--zt-input-warning` | `#ffc107` | Warning state color |
| `--zt-counter-font-size` | `var(--zt-font-size-small)` | Counter text size |

### Theme Configuration API

#### ThemeConfig Interface

```typescript
interface ThemeConfig {
  name: string;
  colors: {
    textBlack: string;
    textWhite: string;
    textPrimary: string;
    default: string;
    defaultHoverBg: string;
    defaultHoverBorder: string;
    defaultPressed: string;
    primary: string;
    primaryHoverBg: string;
    primaryHoverBorder: string;
    primaryPressed: string;
    success: string;
    successHoverBg: string;
    successHoverBorder: string;
    successPressed: string;
    info: string;
    infoHoverBg: string;
    infoHoverBorder: string;
    infoPressed: string;
    warning: string;
    warningHoverBg: string;
    warningHoverBorder: string;
    warningPressed: string;
    danger: string;
    dangerHoverBg: string;
    dangerHoverBorder: string;
    dangerPressed: string;
    dark: string;
    darkHoverBg: string;
    darkHoverBorder: string;
    darkPressed: string;
    link: string;
    linkHoverBg: string;
    linkHoverBorder: string;
    linkPressed: string;
  };
  borderRadius?: number;
  borderSize?: number;
  fontFamily?: string;
  fontSize?: {
    small: string;
    medium: string;
    large: string;
  };
  spacing?: {
    small: string;
    medium: string;
    large: string;
  };
}
```

#### ZTThemeService Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `setTheme` | `theme: ThemeConfig` | `void` | Set complete theme configuration |
| `setThemeByName` | `name: ThemeName` | `void` | Set predefined theme by name |
| `getCurrentTheme` | `none` | `ThemeConfig` | Get current theme configuration |
| `currentTheme$` | `none` | `Observable<ThemeConfig>` | Observable of current theme |
| `validateTheme` | `theme: ThemeConfig` | `ValidationResult` | Validate theme for accessibility |
| `exportTheme` | `none` | `ThemeConfig` | Export current theme as object |
| `importTheme` | `theme: ThemeConfig` | `void` | Import theme from object |
| `resetToDefault` | `none` | `void` | Reset to default theme |
| `toggleDarkMode` | `none` | `void` | Toggle between light and dark themes |

### Component Architecture

#### Standalone Components

All components are built as Angular standalone components:

```typescript
@Component({
  selector: 'zt-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [/* ControlValueAccessor providers */]
})
export class InputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  // Component implementation
}
```

#### Module-Based Usage (Optional)

For traditional module-based applications:

```typescript
import { ZtInputModule } from 'zt-ui-components';

@NgModule({
  imports: [ZtInputModule.forRoot()],
  // ...
})
export class AppModule {}
```

### Error Handling API

#### Validation Error Types

```typescript
interface ValidationError {
  type: 'required' | 'maxlength' | 'minlength' | 'pattern' | 'email' | 'custom';
  message: string;
  value?: any;
}

interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: string[];
}
```

#### Component Error States

```typescript
// Error state management
export class MyComponent {
  emailError?: string;

  validateEmail() {
    if (this.emailFormControl.errors?.['required']) {
      this.emailError = 'Email is required';
    } else if (this.emailFormControl.errors?.['email']) {
      this.emailError = 'Please enter a valid email address';
    } else {
      this.emailError = undefined;
    }
  }
}
```

### TypeScript Utility Types

#### Component Props Types

```typescript
// Input component props
type InputType = 'text' | 'number' | 'email' | 'password';
type InputStyle = 'zt' | 'material' | 'bs';
type InputSize = 'zt-sm' | 'zt-md' | 'zt-lg';
type ThemeName = 'light' | 'dark' | 'bootstrap' | 'material';

// Theme configuration
type ColorName = keyof ThemeConfig['colors'];
type SpacingSize = 'small' | 'medium' | 'large';
type FontSize = 'small' | 'medium' | 'large';
```

#### Event Handler Types

```typescript
// Event handler signatures
type ValueChangeHandler = (value: string) => void;
type FocusHandler = (event: FocusEvent) => void;
type BlurHandler = (event: FocusEvent) => void;

// ControlValueAccessor signatures
type OnChangeFn = (value: any) => void;
type OnTouchedFn = () => void;
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT
