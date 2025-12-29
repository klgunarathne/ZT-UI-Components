# ZT UI Components

A comprehensive collection of reusable Angular UI components built with Angular 20+. This library provides modern, customizable components with multiple themes and extensive configuration options.

## Features

- 🎨 Multiple themes (Light, Dark, Bootstrap, Material)
- 📱 Responsive design
- 🔧 Highly customizable
- 📚 Comprehensive documentation with Storybook MDX files
- 🧪 Interactive component demos and examples
- 🚀 Built with Angular standalone components
- ♿ WCAG 2.1 AA accessibility compliance
- 🎯 TypeScript support with full type definitions

## Documentation

📖 **Comprehensive Documentation Available**

- **[📚 Storybook Documentation](projects/zt-ui-components/src/stories)** - Interactive component playground
- **[🎯 Component API Reference](documentation/index.html)** - Complete API documentation via Compodoc
- **[🚀 Getting Started Tutorial](projects/zt-ui-components/src/stories/Tutorial.mdx)** - Step-by-step guide


## Components

Each component includes detailed documentation with usage examples, API reference, and interactive demos.

### Toggle (`zt-toggle`)
**[📖 View Toggle Documentation](projects/zt-ui-components/src/stories/Toggle.mdx)**

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
**[📖 View Button Documentation](projects/zt-ui-components/src/stories/Button.mdx)**

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
**[📖 View Input Documentation](projects/zt-ui-components/src/stories/Input.mdx)**

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
**[📖 View Select Documentation](projects/zt-ui-components/src/stories/Select.mdx)**

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
**[📖 View Textarea Documentation](projects/zt-ui-components/src/stories/Textarea.mdx)**

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
**[📖 View Data Grid Documentation](projects/zt-ui-components/src/stories/DataGrid.mdx)**

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
**[📖 View Paginator Documentation](projects/zt-ui-components/src/stories/Paginator.mdx)**

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

## Peer Dependencies

This library requires the following peer dependencies:

- `@angular/common`, `@angular/core`, `@angular/forms` (required)
- `@angular/cdk` (optional, for virtual scrolling in data grids)
- `rxjs` (required)

For enhanced performance with large datasets in data grids:

```bash
npm install @angular/cdk
```

**Note:** The data grid component uses `@angular/cdk/scrolling` for virtual scrolling when available. Install CDK to enable this feature for better performance with thousands of rows.

## Version Compatibility

| Angular Version | ZT-UI Components | Status |
|----------------|------------------|--------|
| Angular 14     | ❌ Not supported | - |
| Angular 15     | ❌ Not supported | - |
| Angular 16     | ✅ v2.0.0+       | Recommended |
| Angular 17     | ✅ v2.0.0+       | Recommended |
| Angular 18     | ✅ v2.0.0+       | Recommended |
| Angular 19     | ✅ v2.0.0+       | Recommended |
| Angular 20+    | ✅ v2.0.0+       | Latest |

**Note:** ZT-UI Components v2.0.0 requires Angular 16+. For older Angular versions, use v1.x.x (deprecated).

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

- **📖 Storybook MDX Documentation** - Interactive component guides with live examples
- **🔍 Compodoc API Reference** - Complete API documentation via Compodoc

Run the documentation generation command above and open `documentation/index.html` in your browser for detailed API reference.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Additional Components

The library also includes:

- **[Card Component](projects/zt-ui-components/src/stories/Card.mdx)** - Flexible container with headers, bodies, and variants
- **[Modal Component](projects/zt-ui-components/src/stories/Modal.mdx)** - Accessible modal dialogs with theming
- **[Checkbox Component](projects/zt-ui-components/src/stories/Checkbox.mdx)** - Boolean selection input
- **[Radio Component](projects/zt-ui-components/src/stories/Radio.mdx)** - Single selection from multiple options
- **[Datetime Picker](projects/zt-ui-components/src/stories/DatetimePicker.mdx)** - Date and time selection

## Support

For questions and support, please open an issue on GitHub or check our comprehensive [Storybook documentation](projects/zt-ui-components/src/stories).
