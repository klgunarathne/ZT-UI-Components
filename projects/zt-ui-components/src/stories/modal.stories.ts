import { ZtModalComponent } from '../lib/zt-modal/zt-modal.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ZtModalComponent> = {
  title: 'Components/Modal',
  component: ZtModalComponent,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl', 'fullscreen'],
      control: { type: 'select' },
    },
    theme: {
      options: ['light', 'dark', 'bootstrap', 'material'],
      control: { type: 'select' },
      default: 'light',
    },
    isOpen: {
      control: { type: 'boolean' },
    },
    closable: {
      control: { type: 'boolean' },
    },
    backdropClosable: {
      control: { type: 'boolean' },
    },
    title: {
      control: { type: 'text' },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A flexible modal component with theming support, accessibility features, and customizable content areas.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ZtModalComponent>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Default Modal',
    size: 'md',
    theme: 'light',
    closable: true,
    backdropClosable: true,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable"
        (onClose)="onClose()"
        (onOpen)="onOpen()">

        <div modal-body>
          <p>This is the default modal with standard content. You can customize the body and footer as needed.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div modal-footer>
          <button class="btn btn-secondary" (click)="closeModal()">Close</button>
          <button class="btn btn-primary" (click)="saveModal()">Save Changes</button>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      onClose: () => console.log('Modal closed'),
      onOpen: () => console.log('Modal opened'),
      closeModal: () => {
        args.isOpen = false;
      },
      saveModal: () => {
        console.log('Saving...');
        args.isOpen = false;
      },
    },
  }),
};

export const Small: Story = {
  args: {
    isOpen: true,
    title: 'Small Modal',
    size: 'sm',
    theme: 'light',
    closable: true,
    backdropClosable: true,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable">

        <div modal-body>
          <p>This is a small modal with limited content space.</p>
        </div>

        <div modal-footer>
          <button class="btn btn-primary" (click)="closeModal()">OK</button>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      closeModal: () => {
        args.isOpen = false;
      },
    },
  }),
};

export const Large: Story = {
  args: {
    isOpen: true,
    title: 'Large Modal',
    size: 'lg',
    theme: 'light',
    closable: true,
    backdropClosable: true,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable">

        <div modal-body>
          <h4>Large Modal Content</h4>
          <p>This large modal can accommodate extensive content, including lists, forms, and multimedia elements.</p>

          <div style="margin: 1rem 0;">
            <h5>Features:</h5>
            <ul>
              <li>Responsive design that adapts to screen sizes</li>
              <li>Keyboard navigation and focus management</li>
              <li>Multiple theme support</li>
              <li>Accessibility compliant with ARIA attributes</li>
              <li>Customizable header, body, and footer sections</li>
            </ul>
          </div>

          <div style="background: #f8f9fa; padding: 1rem; border-radius: 0.25rem; margin: 1rem 0;">
            <strong>Tip:</strong> Use this modal for detailed forms, image galleries, or complex user interactions.
          </div>
        </div>

        <div modal-footer>
          <button class="btn btn-secondary" (click)="closeModal()">Cancel</button>
          <button class="btn btn-success" (click)="confirmModal()">Confirm</button>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      closeModal: () => {
        args.isOpen = false;
      },
      confirmModal: () => {
        console.log('Confirmed!');
        args.isOpen = false;
      },
    },
  }),
};

export const ExtraLarge: Story = {
  args: {
    isOpen: true,
    title: 'Extra Large Modal',
    size: 'xl',
    theme: 'light',
    closable: true,
    backdropClosable: true,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable">

        <div modal-body>
          <h3>Extra Large Modal</h3>
          <p>This extra large modal provides maximum space for content, ideal for data tables, detailed forms, or multi-step wizards.</p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
            <div style="background: #e9ecef; padding: 1rem; border-radius: 0.25rem;">
              <h5>Column 1</h5>
              <p>Content for the first column.</p>
            </div>
            <div style="background: #e9ecef; padding: 1rem; border-radius: 0.25rem;">
              <h5>Column 2</h5>
              <p>Content for the second column.</p>
            </div>
          </div>

          <div style="background: #d1ecf1; padding: 1rem; border-radius: 0.25rem; margin: 1rem 0;">
            <strong>Note:</strong> This modal size is perfect for complex layouts and extensive information display.
          </div>
        </div>

        <div modal-footer>
          <button class="btn btn-secondary" (click)="closeModal()">Close</button>
          <button class="btn btn-primary" (click)="proceedModal()">Proceed</button>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      closeModal: () => {
        args.isOpen = false;
      },
      proceedModal: () => {
        console.log('Proceeding...');
        args.isOpen = false;
      },
    },
  }),
};

export const Fullscreen: Story = {
  args: {
    isOpen: true,
    title: 'Fullscreen Modal',
    size: 'fullscreen',
    theme: 'light',
    closable: true,
    backdropClosable: false,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable">

        <div modal-body style="height: calc(100vh - 200px); overflow-y: auto;">
          <h2>Fullscreen Modal</h2>
          <p>This fullscreen modal utilizes the entire viewport for maximum content space.</p>

          <div style="margin: 2rem 0;">
            <h4>Perfect for:</h4>
            <ul>
              <li>Image galleries and media viewers</li>
              <li>Complex data visualization</li>
              <li>Multi-step forms or wizards</li>
              <li>Full-screen editing interfaces</li>
              <li>Document viewers</li>
            </ul>
          </div>

          <div style="background: linear-gradient(45deg, #f8f9fa, #e9ecef); padding: 2rem; border-radius: 0.5rem; margin: 2rem 0;">
            <h5>Content Area</h5>
            <p>This area can contain any type of content, including scrollable sections, interactive elements, and rich media.</p>
          </div>
        </div>

        <div modal-footer>
          <button class="btn btn-secondary" (click)="closeModal()">Exit Fullscreen</button>
          <button class="btn btn-primary" (click)="finishModal()">Finish</button>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      closeModal: () => {
        args.isOpen = false;
      },
      finishModal: () => {
        console.log('Finished!');
        args.isOpen = false;
      },
    },
  }),
};

export const WithoutHeader: Story = {
  args: {
    isOpen: true,
    size: 'md',
    theme: 'light',
    closable: false,
    backdropClosable: true,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable">

        <div modal-body>
          <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; color: #28a745; margin-bottom: 1rem;">✓</div>
            <h2>Success!</h2>
            <p>Your operation has been completed successfully. You can now continue with your tasks.</p>
          </div>
        </div>

        <div modal-footer>
          <button class="btn btn-primary" (click)="continueModal()" style="width: 100%;">Continue</button>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      continueModal: () => {
        args.isOpen = false;
      },
    },
  }),
};

export const ConfirmationDialog: Story = {
  args: {
    isOpen: true,
    title: 'Confirm Action',
    size: 'sm',
    theme: 'light',
    closable: true,
    backdropClosable: false,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable">

        <div modal-body>
          <div style="text-align: center; padding: 1rem;">
            <div style="font-size: 3rem; color: #ffc107; margin-bottom: 1rem;">⚠️</div>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </div>
        </div>

        <div modal-footer>
          <button class="btn btn-secondary" (click)="cancelModal()">Cancel</button>
          <button class="btn btn-danger" (click)="deleteModal()">Delete</button>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      cancelModal: () => {
        args.isOpen = false;
      },
      deleteModal: () => {
        console.log('Item deleted!');
        args.isOpen = false;
      },
    },
  }),
};

export const DarkTheme: Story = {
  args: {
    isOpen: true,
    title: 'Dark Theme Modal',
    size: 'md',
    theme: 'dark',
    closable: true,
    backdropClosable: true,
  },
  render: (args) => ({
    template: `
      <div style="background: #1a1a1a; padding: 20px; min-height: 100vh;">
        <zt-modal
          [isOpen]="isOpen"
          [title]="title"
          [size]="size"
          [theme]="theme"
          [closable]="closable"
          [backdropClosable]="backdropClosable">

          <div modal-body>
            <p>This modal uses the dark theme, perfect for dark mode applications or nighttime usage.</p>
            <div style="background: #2d2d2d; padding: 1rem; border-radius: 0.25rem; margin: 1rem 0;">
              <code style="color: #61dafb;">const theme = 'dark';</code>
            </div>
            <p>The dark theme provides better contrast in low-light environments and reduces eye strain.</p>
          </div>

          <div modal-footer>
            <button class="btn btn-secondary" (click)="closeModal()">Close</button>
            <button class="btn btn-primary" (click)="applyModal()">Apply Theme</button>
          </div>
        </zt-modal>
      </div>
    `,
    props: {
      ...args,
      closeModal: () => {
        args.isOpen = false;
      },
      applyModal: () => {
        console.log('Dark theme applied!');
        args.isOpen = false;
      },
    },
  }),
};

export const BootstrapTheme: Story = {
  args: {
    isOpen: true,
    title: 'Bootstrap Theme Modal',
    size: 'md',
    theme: 'bootstrap',
    closable: true,
    backdropClosable: true,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable">

        <div modal-body>
          <p>This modal uses the Bootstrap theme with classic styling and subtle background colors.</p>
          <div class="alert alert-info" role="alert">
            <strong>Bootstrap Theme:</strong> Familiar Bootstrap modal appearance with enhanced accessibility.
          </div>
          <p>The Bootstrap theme maintains consistency with Bootstrap-based applications.</p>
        </div>

        <div modal-footer>
          <button class="btn btn-secondary" (click)="closeModal()">Close</button>
          <button class="btn btn-primary" (click)="saveModal()">Save Changes</button>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      closeModal: () => {
        args.isOpen = false;
      },
      saveModal: () => {
        console.log('Saved with Bootstrap theme!');
        args.isOpen = false;
      },
    },
  }),
};

export const MaterialTheme: Story = {
  args: {
    isOpen: true,
    title: 'Material Theme Modal',
    size: 'md',
    theme: 'material',
    closable: true,
    backdropClosable: true,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable">

        <div modal-body>
          <p>This modal uses the Material Design theme with modern styling and subtle shadows.</p>
          <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>Material Theme:</strong> Clean, modern design inspired by Material Design principles.
          </div>
          <p>The Material theme provides a contemporary look with enhanced depth and visual hierarchy.</p>
        </div>

        <div modal-footer>
          <button class="btn btn-secondary" (click)="closeModal()">Cancel</button>
          <button class="btn btn-primary" (click)="confirmModal()">Confirm</button>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      closeModal: () => {
        args.isOpen = false;
      },
      confirmModal: () => {
        console.log('Confirmed with Material theme!');
        args.isOpen = false;
      },
    },
  }),
};

export const CustomContent: Story = {
  args: {
    isOpen: true,
    title: 'Custom Content Modal',
    size: 'lg',
    theme: 'light',
    closable: true,
    backdropClosable: true,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable">

        <div modal-body>
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
            <div style="flex: 1;">
              <h5>Form Section</h5>
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem;">Name:</label>
                <input type="text" class="form-control" placeholder="Enter your name">
              </div>
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem;">Email:</label>
                <input type="email" class="form-control" placeholder="Enter your email">
              </div>
            </div>
            <div style="flex: 1;">
              <h5>Preview</h5>
              <div style="background: #f8f9fa; padding: 1rem; border-radius: 0.25rem; height: 120px;">
                <p style="margin: 0;">Form preview will appear here...</p>
              </div>
            </div>
          </div>

          <div style="background: #e9ecef; padding: 1rem; border-radius: 0.25rem;">
            <strong>Custom Content:</strong> This modal demonstrates how to include forms, images, and complex layouts within the modal body.
          </div>
        </div>

        <div modal-footer>
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <button class="btn btn-outline-secondary" (click)="resetModal()">Reset</button>
            <div>
              <button class="btn btn-secondary" (click)="closeModal()" style="margin-right: 0.5rem;">Cancel</button>
              <button class="btn btn-primary" (click)="submitModal()">Submit</button>
            </div>
          </div>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      closeModal: () => {
        args.isOpen = false;
      },
      resetModal: () => {
        console.log('Form reset!');
      },
      submitModal: () => {
        console.log('Form submitted!');
        args.isOpen = false;
      },
    },
  }),
};

export const NonClosable: Story = {
  args: {
    isOpen: true,
    title: 'Non-Closable Modal',
    size: 'md',
    theme: 'light',
    closable: false,
    backdropClosable: false,
  },
  render: (args) => ({
    template: `
      <zt-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [theme]="theme"
        [closable]="closable"
        [backdropClosable]="backdropClosable">

        <div modal-body>
          <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; color: #007bff; margin-bottom: 1rem;">⏳</div>
            <h3>Processing...</h3>
            <p>Please wait while we process your request. This modal cannot be closed until the operation completes.</p>
            <div style="margin-top: 2rem;">
              <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
              </div>
            </div>
          </div>
        </div>

        <div modal-footer>
          <button class="btn btn-primary" (click)="completeModal()" style="width: 100%;">Complete Process</button>
        </div>
      </zt-modal>
    `,
    props: {
      ...args,
      completeModal: () => {
        console.log('Process completed!');
        args.isOpen = false;
      },
    },
  }),
};
