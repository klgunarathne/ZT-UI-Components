# ZT UI Components

A comprehensive collection of reusable Angular UI components built with Angular 20+. This library provides modern, customizable components with multiple themes and extensive configuration options.

## Features

- 🎨 Multiple themes (Light, Dark, Bootstrap, Material)
- 📱 Responsive design
- 🔧 Highly customizable
- 📚 Well-documented with JSDoc comments
- 🧪 Storybook integration for component demos
- 🚀 Built with Angular standalone components

## Components

### Toggle (`zt-toggle`)
A modern toggle switch component with multiple variants and accessibility features.

**Features:**
- Multiple variants: default, rounded, square
- Size options: small, medium, large
- Theme support (Light, Dark, Bootstrap, Material)
- Accessibility compliant (ARIA attributes, keyboard navigation)
- Customizable labels

**Basic Usage:**
```html
<zt-toggle [(checked)]="isEnabled" label="Enable notifications"></zt-toggle>
<zt-toggle checked="true" variant="rounded" size="zt-lg" theme="dark"></zt-toggle>
```

### Button (`zt-button`)
A versatile button component with various styles, sizes, and variants.

**Features:**
- Multiple variants: default, primary, success, info, warning, danger, dark, link, round, floating
- Outline styles
- Size options: small, medium, large
- Theme support

**Basic Usage:**
```html
<zt-button variant="primary" size="zt-md" theme="light">Click me</zt-button>
<zt-button variant="danger" outline="true">Outlined Button</zt-button>
```

### Input (`zt-input`)
A customizable input field with validation and styling options.

**Features:**
- Input types: text, number, email, password
- Character length validation
- Multiple styles: zt, material, bootstrap
- Theme support

**Basic Usage:**
```html
<zt-input
  placeholder="Enter text"
  inputType="text"
  [textlength]="255"
  size="zt-md"
  theme="light">
</zt-input>
```

### Select (`zt-select`)
A dropdown select component with data binding.

**Features:**
- Data source binding
- Customizable display and key fields
- Clear button option
- Theme support

**Basic Usage:**
```html
<zt-select
  [dataSource]="options"
  [key]="'id'"
  [displayValue]="'name'"
  placeholder="Choose an option">
</zt-select>
```

### Textarea (`zt-textarea`)
A multi-line text input with character counting.

**Features:**
- Character count display
- Length validation
- Configurable rows and columns
- Theme support

**Basic Usage:**
```html
<zt-textarea
  placeholder="Enter your message"
  [textlength]="500"
  [rows]="4"
  [showCharCount]="true">
</zt-textarea>
```

### Data Grid (`zt-data-grid`)
A powerful data table component with sorting, filtering, and pagination.

**Features:**
- Column sorting
- Row selection (single/multiple)
- Pagination
- Customizable columns
- Theme support
- Edit/Delete actions

**Basic Usage:**
```html
<zt-data-grid
  [dataSource]="data"
  [columns]="gridColumns"
  [allowSorting]="true"
  [allowSelection]="true"
  [theme]="'light'"
  (onDataGridEvent)="handleEvent($event)">
</zt-data-grid>
```

### Paginator (`zt-paginator`, `zt-paginator-x`)
Pagination components for data navigation.

**Features:**
- Page number display
- Navigation controls
- Configurable page limits (zt-paginator-x)
- Style options: page, arrow

**Basic Usage:**
```html
<zt-paginator
  [pages]="10"
  [theme]="'light'"
  (onPageChange)="onPageChange($event)">
</zt-paginator>
```

## Installation

```bash
npm install zt-ui-components
```

## Usage

Import the components you need in your Angular module or standalone component:

```typescript
import { ButtonComponent, InputComponent } from 'zt-ui-components';

@Component({
  standalone: true,
  imports: [ButtonComponent, InputComponent],
  // ...
})
export class MyComponent {}
```

## Development

### Prerequisites

- Node.js 18+
- Angular CLI 20+

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zt-ui-components.git
cd zt-ui-components
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. View Storybook stories:
```bash
npm run storybook
```

### Building

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Generating Documentation

```bash
npx compodoc -p projects/zt-ui-components/tsconfig.lib.json
```

## API Documentation

Comprehensive API documentation is available via Compodoc. Run the documentation generation command above and open `documentation/index.html` in your browser.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions and support, please open an issue on GitHub.
