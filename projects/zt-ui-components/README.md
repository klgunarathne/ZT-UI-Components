# ZT-UI-Components

A collection of reusable UI components for Angular applications, built with SCSS for styling.

## Installation

```bash
npm install zt-ui-components
```

## Usage

Import the components you need in your Angular module or standalone component:

```typescript
import { ZtButton } from 'zt-ui-components';

@Component({
  imports: [ZtButton],
  // ...
})
export class AppComponent {}
```

### Button Component

```html
<zt-button variant="primary" size="medium">Click me</zt-button>
<zt-button variant="secondary" size="large" (click)="handleClick()">Secondary</zt-button>
<zt-button variant="danger" [disabled]="true">Disabled</zt-button>
```

#### Button Properties

- `type`: `'button' | 'submit' | 'reset'` - Button type (default: 'button')
- `disabled`: `boolean` - Whether the button is disabled (default: false)
- `variant`: `'primary' | 'secondary' | 'danger'` - Button style variant (default: 'primary')
- `size`: `'small' | 'medium' | 'large'` - Button size (default: 'medium')

## Development

### Setting Up the Project

This library is built using Angular CLI. To start developing:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `ng build zt-ui-components --watch`

### Creating New Components

1. Generate a new component:
   ```bash
   ng generate component component-name --project=zt-ui-components --style=scss
   ```

2. Implement the component logic in the `.ts` file
3. Style with SCSS in the `.scss` file
4. Add tests in the `.spec.ts` file
5. Export the component in `src/public-api.ts`

### Best Practices

- **Component Design**: Use Angular's standalone components for better tree-shaking
- **Styling**: Use SCSS with BEM methodology for maintainable styles
- **Inputs/Outputs**: Define clear interfaces for component APIs
- **Accessibility**: Ensure components are accessible (ARIA attributes, keyboard navigation)
- **Performance**: Use `OnPush` change detection where possible
- **Testing**: Write comprehensive unit tests and integration tests

### Styling Guidelines

- Use SCSS variables for colors, spacing, and typography
- Follow BEM naming convention: `.block__element--modifier`
- Ensure responsive design with media queries
- Use CSS custom properties for theming support

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT
