import { ZtToastXComponent } from '../../../zt-toast-x/src/lib/zt-toast-x';
import { ZtToastXModule } from '../../../zt-toast-x/src/lib/zt-toast-x.module';
import { ZtToastXService } from '../../../zt-toast-x/src/lib/zt-toast-x.service';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<ZtToastXComponent> = {
  title: 'UI Components/ZT-Toast-X',
  component: ZtToastXComponent,
  decorators: [
    moduleMetadata({
      imports: [ZtToastXModule],
      providers: [ZtToastXService],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# ZT-Toast-X Component

A comprehensive, standalone toast notification component for Angular applications. This component provides a complete toast notification system built from scratch without external dependencies, offering full customization and accessibility features.

## Key Features

🎨 **Multiple Toast Types**: Four distinct visual styles (success, error, info, warning) with appropriate color coding and icons for immediate recognition

📍 **Flexible Positioning**: Six strategic screen positions for optimal UX

⏱️ **Smart Auto-dismiss**: Configurable duration with automatic cleanup

❌ **Manual Dismissal**: Optional close buttons with hover states

📊 **Progress Indicators**: Visual progress bars showing remaining time

📱 **Responsive Design**: Adaptive layouts for mobile and desktop

🎭 **Smooth Animations**: CSS-based slide-in animations for professional feel

♿ **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

🧪 **Development Tools**: Built-in demo buttons for testing and Storybook integration

🔧 **Zero Dependencies**: Pure Angular implementation, no external libraries required

## Usage

### Standalone Component Setup

\`\`\`typescript
import { Component } from '@angular/core';
import { ZtToastXComponent, ZtToastXService } from 'zt-toast-x';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ZtToastXComponent],
  template: \`
    <button (click)="showToast()">Show Toast</button>
    <zt-toast-x position="top-right"></zt-toast-x>
  \`,
  providers: [ZtToastXService]
})
export class AppComponent {
  constructor(private toastService: ZtToastXService) {}

  showToast() {
    this.toastService.success('Hello from ZT-Toast-X!');
  }
}
\`\`\`

### Module-based Application Setup

\`\`\`typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZtToastXModule } from 'zt-toast-x';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ZtToastXModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
\`\`\`

### Service Integration

\`\`\`typescript
import { Component } from '@angular/core';
import { ZtToastXService } from 'zt-toast-x';

@Component({...})
export class MyComponent {
  constructor(private toastService: ZtToastXService) {}

  showSuccess() {
    this.toastService.success('Data saved successfully!', 'Save Complete');
  }

  showCustomToast() {
    this.toastService.show({
      type: 'info',
      message: 'Custom notification with options',
      title: 'Custom Toast',
      duration: 10000,
      position: 'top-center',
      dismissible: true,
      showProgress: true
    });
  }
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`position\` | \`'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'\` | \`'top-right'\` | Position of the toast container on the screen |
| \`showDemoButtons\` | \`boolean\` | \`false\` | Show demo buttons to trigger different toast types |

## Toast Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`type\` | \`'success' \| 'error' \| 'info' \| 'warning'\` | - | Type of toast that determines styling and icon |
| \`title\` | \`string\` | - | Optional title for the toast |
| \`message\` | \`string\` | - | Main message content (required) |
| \`duration\` | \`number\` | \`5000\` | Auto-dismiss duration in milliseconds (0 = never auto-dismiss) |
| \`position\` | \`string\` | \`'top-right'\` | Position on screen where toast appears |
| \`dismissible\` | \`boolean\` | \`true\` | Whether the toast can be manually dismissed by clicking |
| \`showProgress\` | \`boolean\` | \`true\` | Whether to show a progress bar indicating time remaining |


## Guidelines

### Positioning
- Use \`top-right\` for most applications (standard UX pattern)
- Reserve \`top-center\` for important system-wide notifications
- Use bottom positions for less intrusive notifications
- Consider mobile responsiveness when choosing positions

### Duration
- Keep durations between 3-7 seconds for optimal UX
- Use longer durations (8-15 seconds) for critical information
- Set duration to 0 for notifications that require user action
- Always provide manual dismissal for long-duration toasts

### Accessibility
- All toasts include proper ARIA labels and roles
- Close buttons have descriptive labels
- Color combinations meet WCAG contrast requirements
- Keyboard navigation is supported

### Performance
- Component uses efficient change detection strategies
- Automatic cleanup prevents memory leaks
- RxJS observables ensure reactive updates
- CSS animations are hardware-accelerated

### Best Practices
- Limit simultaneous toasts to 3-5 maximum
- Use appropriate toast types for semantic meaning
- Provide clear, concise messages
- Test on mobile devices for responsive behavior
- Consider user preferences for positioning and duration
        `,
      },
    },
  },
  argTypes: {
    position: {
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
      control: { type: 'select' },
      description: 'Position of the toast container on the screen',
      table: {
        type: { summary: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'" },
        defaultValue: { summary: "'top-right'" },
      },
    },
    showDemoButtons: {
      control: { type: 'boolean' },
      description: 'Show demo buttons to trigger different toast types (useful for development and testing)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ZtToastXComponent>;

export const Overview: Story = {
  args: {
    position: 'top-right',
    showDemoButtons: true,
  },
  parameters: {
    docs: {
      description: 'Complete ZT-Toast-X component overview with interactive demo buttons. Use the controls below to test different positions and configurations.',
    },
  },
  render: (args) => ({
    template: `
      <div style="padding: 20px; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <div style="max-width: 800px; margin: 0 auto;">
          <h1 style="margin-bottom: 10px; font-size: 2.5rem;">ZT-Toast-X</h1>
          <p style="margin-bottom: 30px; font-size: 1.2rem; opacity: 0.9;">
            A comprehensive toast notification system for Angular applications
          </p>

          <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 12px; margin-bottom: 30px;">
            <h2 style="margin-bottom: 20px; color: white;">Interactive Demo</h2>
            <p style="margin-bottom: 20px; opacity: 0.9;">
              Use the demo buttons below to trigger different types of toast notifications.
              Adjust the position using the controls in the panel above.
            </p>
            <zt-toast-x [position]="position" [showDemoButtons]="showDemoButtons"></zt-toast-x>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
              <h3 style="margin-bottom: 10px;">🎨 Multiple Types</h3>
              <p>Four distinct visual styles with appropriate color coding and icons.</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
              <h3 style="margin-bottom: 10px;">📍 Flexible Positioning</h3>
              <p>Six strategic screen positions for optimal user experience.</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
              <h3 style="margin-bottom: 10px;">⏱️ Smart Auto-dismiss</h3>
              <p>Configurable duration with automatic cleanup and progress indicators.</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;">
              <h3 style="margin-bottom: 10px;">♿ Accessibility</h3>
              <p>ARIA labels, keyboard navigation, and screen reader support.</p>
            </div>
          </div>
        </div>
      </div>
    `,
    props: args,
  }),
};

export const BasicUsage: Story = {
  args: {
    position: 'top-right',
    showDemoButtons: false,
  },
  parameters: {
    docs: {
      description: 'Basic usage example showing the component with default settings.',
    },
  },
  render: (args) => ({
    template: `
      <div style="padding: 20px; min-height: 400px; background: #f8f9fa;">
        <h3 style="margin-bottom: 20px;">Basic ZT-Toast-X Usage</h3>
        <p style="margin-bottom: 20px;">This example shows the component with default settings. Use the controls to adjust position.</p>
        <zt-toast-x [position]="position" [showDemoButtons]="showDemoButtons"></zt-toast-x>
      </div>
    `,
    props: args,
  }),
};

export const WithDemoButtons: Story = {
  args: {
    position: 'bottom-left',
    showDemoButtons: true,
  },
  parameters: {
    docs: {
      description: 'Interactive demo with built-in buttons to test all toast types and configurations.',
    },
  },
  render: (args) => ({
    template: `
      <div style="padding: 20px; min-height: 400px; background: #f8f9fa;">
        <h3 style="margin-bottom: 20px;">Interactive Demo</h3>
        <p style="margin-bottom: 20px;">Click the demo buttons below to see different toast types in action.</p>
        <zt-toast-x [position]="position" [showDemoButtons]="showDemoButtons"></zt-toast-x>
      </div>
    `,
    props: args,
  }),
};

export const PositioningExamples: Story = {
  parameters: {
    docs: {
      description: 'Demonstrates all available positioning options for the toast container.',
    },
  },
  render: () => ({
    template: `
      <div style="padding: 20px; min-height: 600px; background: #f8f9fa;">
        <h3 style="margin-bottom: 20px;">Positioning Examples</h3>
        <p style="margin-bottom: 30px;">This example shows toast containers in different screen positions.</p>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
          <div style="border: 2px dashed #dee2e6; padding: 20px; border-radius: 8px; text-align: center;">
            <h4 style="margin-bottom: 10px;">Top Left</h4>
            <zt-toast-x position="top-left" showDemoButtons="false"></zt-toast-x>
          </div>
          <div style="border: 2px dashed #dee2e6; padding: 20px; border-radius: 8px; text-align: center;">
            <h4 style="margin-bottom: 10px;">Top Center</h4>
            <zt-toast-x position="top-center" showDemoButtons="false"></zt-toast-x>
          </div>
          <div style="border: 2px dashed #dee2e6; padding: 20px; border-radius: 8px; text-align: center;">
            <h4 style="margin-bottom: 10px;">Top Right</h4>
            <zt-toast-x position="top-right" showDemoButtons="false"></zt-toast-x>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
          <div style="border: 2px dashed #dee2e6; padding: 20px; border-radius: 8px; text-align: center;">
            <h4 style="margin-bottom: 10px;">Bottom Left</h4>
            <zt-toast-x position="bottom-left" showDemoButtons="false"></zt-toast-x>
          </div>
          <div style="border: 2px dashed #dee2e6; padding: 20px; border-radius: 8px; text-align: center;">
            <h4 style="margin-bottom: 10px;">Bottom Center</h4>
            <zt-toast-x position="bottom-center" showDemoButtons="false"></zt-toast-x>
          </div>
          <div style="border: 2px dashed #dee2e6; padding: 20px; border-radius: 8px; text-align: center;">
            <h4 style="margin-bottom: 10px;">Bottom Right</h4>
            <zt-toast-x position="bottom-right" showDemoButtons="false"></zt-toast-x>
          </div>
        </div>
      </div>
    `,
  }),
};
