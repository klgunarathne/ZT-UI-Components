import { ZtToastComponent } from '../lib/zt-toast/zt-toast.component';
import { ZtToastModule } from '../lib/zt-toast/zt-toast.module';
import { ZtToastService } from '../lib/zt-toast/zt-toast.service';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<ZtToastComponent> = {
  title: 'Components/Toast',
  component: ZtToastComponent,
  decorators: [
    moduleMetadata({
      imports: [ZtToastModule],
      providers: [ZtToastService],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A custom toast notification component that provides success, error, info, and warning messages with customizable options including position, duration, dismissible behavior, and progress indicators.',
      },
    },
  },
  argTypes: {
    position: {
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
      control: { type: 'select' },
      description: 'Position of the toast container on the screen',
    },
    showDemoButtons: {
      control: { type: 'boolean' },
      description: 'Show demo buttons to trigger different toast types',
    },
  },
};

export default meta;
type Story = StoryObj<ZtToastComponent>;

export const Default: Story = {
  args: {
    position: 'top-right',
    showDemoButtons: true,
  },
  parameters: {
    docs: {
      description: 'Default toast component with demo buttons to test all toast types.',
    },
  },
  render: (args) => ({
    template: `
      <div style="padding: 20px; height: 100vh; background: #f5f5f5;">
        <h3>Toast Notifications Demo</h3>
        <p>Use the buttons below to trigger different types of toast notifications.</p>
        <zt-toast [position]="position" [showDemoButtons]="showDemoButtons"></zt-toast>
      </div>
    `,
    props: args,
  }),
};

export const SuccessToast: Story = {
  parameters: {
    docs: {
      description: 'Demonstrates a success toast notification.',
    },
  },
  render: () => ({
    template: `
      <div style="padding: 20px; height: 100vh; background: #f5f5f5;">
        <h3>Success Toast</h3>
        <p>Click the button below to trigger a success toast notification.</p>
        <zt-toast position="top-right" showDemoButtons="false"></zt-toast>
      </div>
    `,
  }),
};

export const ErrorToast: Story = {
  parameters: {
    docs: {
      description: 'Demonstrates an error toast notification.',
    },
  },
  render: () => ({
    template: `
      <div style="padding: 20px; height: 100vh; background: #f5f5f5;">
        <h3>Error Toast</h3>
        <p>This story shows the error toast type. Use the Default story to interact with all toast types.</p>
        <zt-toast position="top-right" showDemoButtons="false"></zt-toast>
      </div>
    `,
  }),
};

export const InfoToast: Story = {
  parameters: {
    docs: {
      description: 'Demonstrates an info toast notification.',
    },
  },
  render: () => ({
    template: `
      <div style="padding: 20px; height: 100vh; background: #f5f5f5;">
        <h3>Info Toast</h3>
        <p>This story shows the info toast type. Use the Default story to interact with all toast types.</p>
        <zt-toast position="top-right" showDemoButtons="false"></zt-toast>
      </div>
    `,
  }),
};

export const WarningToast: Story = {
  parameters: {
    docs: {
      description: 'Demonstrates a warning toast notification.',
    },
  },
  render: () => ({
    template: `
      <div style="padding: 20px; height: 100vh; background: #f5f5f5;">
        <h3>Warning Toast</h3>
        <p>This story shows the warning toast type. Use the Default story to interact with all toast types.</p>
        <zt-toast position="top-right" showDemoButtons="false"></zt-toast>
      </div>
    `,
  }),
};

export const DifferentPositions: Story = {
  parameters: {
    docs: {
      description: 'Demonstrates toast notifications in different positions.',
    },
  },
  render: () => ({
    template: `
      <div style="padding: 20px; height: 100vh; background: #f5f5f5;">
        <h3>Different Positions</h3>
        <p>This story shows multiple toast containers in different positions. Use the Default story to interact with the toasts.</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
          <div>
            <h4>Top Positions</h4>
            <zt-toast position="top-right" showDemoButtons="false"></zt-toast>
            <zt-toast position="top-left" showDemoButtons="false"></zt-toast>
            <zt-toast position="top-center" showDemoButtons="false"></zt-toast>
          </div>
          <div>
            <h4>Bottom Positions</h4>
            <zt-toast position="bottom-right" showDemoButtons="false"></zt-toast>
            <zt-toast position="bottom-left" showDemoButtons="false"></zt-toast>
            <zt-toast position="bottom-center" showDemoButtons="false"></zt-toast>
          </div>
        </div>
      </div>
    `,
  }),
};

export const NonDismissible: Story = {
  parameters: {
    docs: {
      description: 'Demonstrates non-dismissible toast notifications that auto-hide after a set duration.',
    },
  },
  render: () => ({
    template: `
      <div style="padding: 20px; height: 100vh; background: #f5f5f5;">
        <h3>Non-Dismissible Toasts</h3>
        <p>This story demonstrates non-dismissible toasts. Use the Default story to see interactive examples.</p>
        <zt-toast position="top-right" showDemoButtons="false"></zt-toast>
      </div>
    `,
  }),
};

export const LongDuration: Story = {
  parameters: {
    docs: {
      description: 'Demonstrates toast notifications with longer duration.',
    },
  },
  render: () => ({
    template: `
      <div style="padding: 20px; height: 100vh; background: #f5f5f5;">
        <h3>Long Duration Toasts</h3>
        <p>This story demonstrates toasts with longer duration. Use the Default story to see interactive examples.</p>
        <zt-toast position="top-right" showDemoButtons="false"></zt-toast>
      </div>
    `,
  }),
};

export const MultipleToasts: Story = {
  parameters: {
    docs: {
      description: 'Demonstrates multiple toast notifications displayed simultaneously.',
    },
  },
  render: () => ({
    template: `
      <div style="padding: 20px; height: 100vh; background: #f5f5f5;">
        <h3>Multiple Toasts</h3>
        <p>This story demonstrates multiple toasts. Use the Default story to see interactive examples with multiple notifications.</p>
        <zt-toast position="top-right" showDemoButtons="false"></zt-toast>
      </div>
    `,
  }),
};

export const WithProgress: Story = {
  parameters: {
    docs: {
      description: 'Demonstrates toast notifications with progress indicators.',
    },
  },
  render: () => ({
    template: `
      <div style="padding: 20px; height: 100vh; background: #f5f5f5;">
        <h3>Toasts with Progress</h3>
        <p>This story demonstrates toasts with progress indicators. Use the Default story to see interactive examples.</p>
        <zt-toast position="top-right" showDemoButtons="false"></zt-toast>
      </div>
    `,
  }),
};
