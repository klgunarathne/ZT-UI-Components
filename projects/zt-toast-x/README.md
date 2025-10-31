# ZT-Toast-X

[![npm version](https://badge.fury.io/js/zt-toast-x.svg)](https://badge.fury.io/js/zt-toast-x)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive, standalone toast notification component for Angular applications. Built from scratch without external dependencies, providing a complete toast notification system with multiple types, positions, and customization options.

## ✨ Features

- 🎨 **Multiple Toast Types**: Success, error, info, and warning notifications with distinct styling
- 📍 **Flexible Positioning**: Six positioning options (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center)
- ⏱️ **Auto-dismiss**: Configurable duration with automatic removal
- ❌ **Manual Dismissal**: Close buttons for user-initiated dismissal
- 📊 **Progress Indicators**: Visual progress bars showing time remaining
- 📱 **Responsive Design**: Mobile-friendly with adaptive layouts
- 🎭 **Smooth Animations**: CSS animations for appearance and dismissal
- ♿ **Accessibility**: ARIA labels and keyboard navigation support
- 🧪 **Demo Mode**: Built-in demo buttons for testing and development
- 🔧 **Standalone Component**: No external dependencies, works with any Angular app

## 🚀 Installation

```bash
npm install zt-toast-x
```

## 📖 Usage

### Standalone Components (Angular 14+)

```typescript
import { Component } from '@angular/core';
import { ZtToastXComponent, ZtToastXService } from 'zt-toast-x';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ZtToastXComponent],
  template: `
    <zt-toast-x position="top-right" [showDemoButtons]="true"></zt-toast-x>
  `
})
export class AppComponent {
  constructor(private toastService: ZtToastXService) {}

  showNotification() {
    this.toastService.success('Operation completed!', 'Success', {
      duration: 3000,
      dismissible: true,
      showProgress: true
    });
  }
}
```

### Module-based Applications

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZtToastXModule } from 'zt-toast-x';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ZtToastXModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 🎛️ API Reference

### ZtToastXComponent

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'top-right'` | Position where toasts appear on screen |
| `showDemoButtons` | `boolean` | `false` | Show demo buttons for testing (useful in development) |

#### Example

```html
<zt-toast-x
  position="bottom-left"
  [showDemoButtons]="isDevelopment">
</zt-toast-x>
```

### ZtToastXService

#### Methods

##### `show(toast: Omit<ZtToastX, 'id'>): void`
Display a custom toast notification.

##### `success(message: string, title?: string, options?: Partial<ZtToastX>): void`
Display a success toast.

##### `error(message: string, title?: string, options?: Partial<ZtToastX>): void`
Display an error toast.

##### `info(message: string, title?: string, options?: Partial<ZtToastX>): void`
Display an info toast.

##### `warning(message: string, title?: string, options?: Partial<ZtToastX>): void`
Display a warning toast.

##### `clear(): void`
Remove all active toasts.

#### Toast Options

```typescript
interface ZtToastX {
  id: string; // Auto-generated
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number; // Auto-dismiss duration in ms (0 = never)
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  dismissible?: boolean; // Show close button
  showProgress?: boolean; // Show progress bar
}
```

#### Examples

```typescript
constructor(private toastService: ZtToastXService) {}

// Basic usage
this.toastService.success('Data saved successfully!');
this.toastService.error('Failed to save data.');

// With title and options
this.toastService.info('New message received', 'Notification', {
  duration: 5000,
  position: 'top-center',
  showProgress: true
});

// Custom toast
this.toastService.show({
  type: 'warning',
  message: 'Please review your input',
  title: 'Validation Warning',
  duration: 0, // Never auto-dismiss
  dismissible: true
});
```

## 🎨 Styling

The component includes comprehensive CSS styling with:

- **Color-coded types**: Green (success), red (error), blue (info), yellow (warning)
- **Smooth animations**: Slide-in effect with CSS transitions
- **Responsive breakpoints**: Adapts to mobile screens
- **Customizable appearance**: Easy to override styles

### CSS Variables

You can customize the appearance by overriding CSS variables:

```css
zt-toast-x {
  --toast-border-radius: 12px;
  --toast-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  --toast-success-bg: #28a745;
  --toast-error-bg: #dc3545;
  --toast-info-bg: #17a2b8;
  --toast-warning-bg: #ffc107;
}
```

## 🏗️ Building from Source

```bash
# Clone the repository
git clone https://github.com/your-repo/zt-toast-x.git
cd zt-toast-x

# Install dependencies
npm install

# Build the library
ng build zt-toast-x

# The build artifacts will be stored in the `dist/zt-toast-x/` directory
```

## 📦 Publishing

After building:

```bash
cd dist/zt-toast-x
npm publish
```

## 🧪 Development

### Running Tests

```bash
ng test zt-toast-x
```

### Storybook

The library includes Storybook stories for development and testing:

```bash
ng run zt-toast-x:storybook
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Angular](https://angular.io/)
- Inspired by modern toast notification patterns
- Designed for developer experience and accessibility

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainers.
