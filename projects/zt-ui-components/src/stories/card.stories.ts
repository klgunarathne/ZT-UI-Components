import { CardComponent } from '../lib/zt-card/card.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  argTypes: {
    cardStyle: {
      options: ['elevated', 'outlined', 'flat'],
      control: { type: 'select' },
      description: 'Visual style of the card',
    },
    theme: {
      options: ['light', 'dark', 'bootstrap', 'material'],
      control: { type: 'select' },
      description: 'Theme variant for the card',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      description: 'Size of the card (affects padding)',
    },
    variant: {
      options: ['default', 'primary', 'info', 'danger', 'warning', 'dark'],
      control: { type: 'select' },
      description: 'Color variant affecting header and footer styling',
    },
    hoverable: {
      control: { type: 'boolean' },
      description: 'Enable hover effects',
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

// Basic card examples
export const BasicCard: Story = {
  args: {
    cardStyle: 'elevated',
    theme: 'light',
    size: 'md',
    variant: 'default',
    hoverable: false,
  },
  render: (args) => ({
    template: `
    <zt-card [cardStyle]="cardStyle" [theme]="theme" [size]="size" [variant]="variant" [hoverable]="hoverable">
      <div class="card-header">Basic Card</div>
      <div class="card-body">This is a basic card component demonstrating the default styling with elevated style.</div>
      <div class="card-footer"><button>Action</button></div>
    </zt-card>
    `,
    props: args,
  }),
};

export const InteractiveCard: Story = {
  args: {
    cardStyle: 'outlined',
    theme: 'light',
    size: 'md',
    variant: 'primary',
    hoverable: true,
  },
  render: (args) => ({
    template: `
    <zt-card [cardStyle]="cardStyle" [theme]="theme" [size]="size" [variant]="variant" [hoverable]="hoverable">
      <div class="card-header">Interactive Card</div>
      <div class="card-body">This card demonstrates hover effects. Try hovering over it to see the interaction.</div>
      <div class="card-footer"><button>Interactive Action</button></div>
    </zt-card>
    `,
    props: args,
  }),
};

// User registration form example
export const UserRegistration: Story = {
  args: {
    cardStyle: 'elevated',
    theme: 'light',
    size: 'md',
    variant: 'default',
    hoverable: false,
  },
  render: (args) => ({
    template: `
    <zt-card [cardStyle]="cardStyle" [theme]="theme" [size]="size" [variant]="variant" [hoverable]="hoverable">
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
    `,
    props: args,
  }),
};

// Card styles showcase
export const CardStylesShowcase: Story = {
  args: {
    theme: 'light',
    size: 'md',
    variant: 'default',
    hoverable: true,
  },
  render: (args) => ({
    template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
      <zt-card cardStyle="elevated" [theme]="theme" [size]="size" [variant]="variant" [hoverable]="hoverable">
        <div class="card-header">Elevated Style</div>
        <div class="card-body">Elevated cards have shadows and borders for a raised appearance.</div>
        <div class="card-footer"><button>Elevated Action</button></div>
      </zt-card>

      <zt-card cardStyle="outlined" [theme]="theme" [size]="size" [variant]="variant" [hoverable]="hoverable">
        <div class="card-header">Outlined Style</div>
        <div class="card-body">Outlined cards use borders instead of shadows for definition.</div>
        <div class="card-footer"><button>Outlined Action</button></div>
      </zt-card>

      <zt-card cardStyle="flat" [theme]="theme" [size]="size" [variant]="variant" [hoverable]="hoverable">
        <div class="card-header">Flat Style</div>
        <div class="card-body">Flat cards have no shadows or borders, perfect for subtle designs.</div>
        <div class="card-footer"><button>Flat Action</button></div>
      </zt-card>
    </div>
    `,
    props: args,
  }),
};

// Size variations
export const SizeVariations: Story = {
  args: {
    cardStyle: 'elevated',
    theme: 'light',
    variant: 'info',
    hoverable: true,
  },
  render: (args) => ({
    template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
      <zt-card cardStyle="elevated" theme="light" size="sm" [variant]="variant" [hoverable]="hoverable">
        <div class="card-header">Small Card</div>
        <div class="card-body">Small cards have reduced padding for compact layouts.</div>
        <div class="card-footer"><button>Small</button></div>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" [variant]="variant" [hoverable]="hoverable">
        <div class="card-header">Medium Card</div>
        <div class="card-body">Medium cards are the default size with balanced padding.</div>
        <div class="card-footer"><button>Medium</button></div>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="lg" [variant]="variant" [hoverable]="hoverable">
        <div class="card-header">Large Card</div>
        <div class="card-body">Large cards have increased padding for prominent content.</div>
        <div class="card-footer"><button>Large</button></div>
      </zt-card>
    </div>
    `,
    props: args,
  }),
};

// Theme showcase
export const ThemeShowcase: Story = {
  args: {
    cardStyle: 'elevated',
    size: 'md',
    variant: 'primary',
    hoverable: true,
  },
  render: (args) => ({
    template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
      <zt-card cardStyle="elevated" theme="light" [size]="size" [variant]="variant" [hoverable]="hoverable">
        <div class="card-header">Light Theme</div>
        <div class="card-body">Light theme uses bright backgrounds and dark text for optimal readability.</div>
        <div class="card-footer"><button>Light</button></div>
      </zt-card>

      <zt-card cardStyle="elevated" theme="dark" [size]="size" [variant]="variant" [hoverable]="hoverable">
        <div class="card-header">Dark Theme</div>
        <div class="card-body">Dark theme uses dark backgrounds and light text for comfortable viewing.</div>
        <div class="card-footer"><button>Dark</button></div>
      </zt-card>

      <zt-card cardStyle="elevated" theme="bootstrap" [size]="size" [variant]="variant" [hoverable]="hoverable">
        <div class="card-header">Bootstrap Theme</div>
        <div class="card-body">Bootstrap theme follows Bootstrap design principles and colors.</div>
        <div class="card-footer"><button>Bootstrap</button></div>
      </zt-card>

      <zt-card cardStyle="elevated" theme="material" [size]="size" [variant]="variant" [hoverable]="hoverable">
        <div class="card-header">Material Theme</div>
        <div class="card-body">Material theme follows Material Design guidelines with rounded corners.</div>
        <div class="card-footer"><button>Material</button></div>
      </zt-card>
    </div>
    `,
    props: args,
  }),
};

// All variants showcase
export const AllVariantsShowcase: Story = {
  args: {
    cardStyle: 'elevated',
    theme: 'light',
    size: 'md',
    hoverable: true,
  },
  render: (args) => ({
    template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
      <zt-card cardStyle="elevated" theme="light" size="md" variant="default" [hoverable]="hoverable">
        <div class="card-header">Default Variant</div>
        <div class="card-body">Default variant uses standard colors and styling without accent colors.</div>
        <div class="card-footer"><button>Default Action</button></div>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" variant="primary" [hoverable]="hoverable">
        <div class="card-header">Primary Variant</div>
        <div class="card-body">Primary variant uses blue colors for headers and footer borders.</div>
        <div class="card-footer"><button>Primary Action</button></div>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" variant="info" [hoverable]="hoverable">
        <div class="card-header">Info Variant</div>
        <div class="card-body">Info variant uses teal/cyan colors for informational content.</div>
        <div class="card-footer"><button>Info Action</button></div>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" variant="danger" [hoverable]="hoverable">
        <div class="card-header">Danger Variant</div>
        <div class="card-body">Danger variant uses red colors for warnings and errors.</div>
        <div class="card-footer"><button>Danger Action</button></div>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" variant="warning" [hoverable]="hoverable">
        <div class="card-header">Warning Variant</div>
        <div class="card-body">Warning variant uses yellow/orange colors for cautions.</div>
        <div class="card-footer"><button>Warning Action</button></div>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" variant="dark" [hoverable]="hoverable">
        <div class="card-header">Dark Variant</div>
        <div class="card-body">Dark variant uses dark gray colors for subtle styling.</div>
        <div class="card-footer"><button>Dark Action</button></div>
      </zt-card>
    </div>
    `,
    props: args,
  }),
};

// Outlined variants with enhanced borders
export const OutlinedVariantsShowcase: Story = {
  args: {
    cardStyle: 'outlined',
    theme: 'light',
    size: 'md',
    hoverable: true,
  },
  render: (args) => ({
    template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
      <zt-card cardStyle="outlined" theme="light" size="md" variant="primary" [hoverable]="hoverable">
        <div class="card-header">Primary Outlined</div>
        <div class="card-body">Outlined style with primary variant features blue border and header styling.</div>
        <div class="card-footer"><button>Primary</button></div>
      </zt-card>

      <zt-card cardStyle="outlined" theme="light" size="md" variant="info" [hoverable]="hoverable">
        <div class="card-header">Info Outlined</div>
        <div class="card-body">Outlined style with info variant uses teal border and accent colors.</div>
        <div class="card-footer"><button>Info</button></div>
      </zt-card>

      <zt-card cardStyle="outlined" theme="light" size="md" variant="danger" [hoverable]="hoverable">
        <div class="card-header">Danger Outlined</div>
        <div class="card-body">Outlined style with danger variant features red border and styling.</div>
        <div class="card-footer"><button>Danger</button></div>
      </zt-card>

      <zt-card cardStyle="outlined" theme="light" size="md" variant="warning" [hoverable]="hoverable">
        <div class="card-header">Warning Outlined</div>
        <div class="card-body">Outlined style with warning variant uses yellow border and accents.</div>
        <div class="card-footer"><button>Warning</button></div>
      </zt-card>

      <zt-card cardStyle="outlined" theme="light" size="md" variant="dark" [hoverable]="hoverable">
        <div class="card-header">Dark Outlined</div>
        <div class="card-body">Outlined style with dark variant uses dark gray border and styling.</div>
        <div class="card-footer"><button>Dark</button></div>
      </zt-card>
    </div>
    `,
    props: args,
  }),
};

// Media cards
export const MediaCards: Story = {
  args: {
    cardStyle: 'elevated',
    theme: 'light',
    size: 'lg',
    variant: 'info',
    hoverable: true,
  },
  render: (args) => ({
    template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
      <zt-card [cardStyle]="cardStyle" [theme]="theme" [size]="size" [variant]="variant" [hoverable]="hoverable">
        <div class="card-media">
          <img src="https://picsum.photos/300/200?random=1" alt="Random image">
        </div>
        <div class="card-header">Card with Media</div>
        <div class="card-body">This card demonstrates how media content is displayed above the card content.</div>
        <div class="card-footer"><button>View Media</button></div>
      </zt-card>

      <zt-card cardStyle="outlined" theme="material" size="lg" variant="primary" [hoverable]="hoverable">
        <div class="card-media">
          <img src="https://picsum.photos/300/200?random=2" alt="Random image">
        </div>
        <div class="card-header">Material Design Card</div>
        <div class="card-body">Material theme with rounded corners and primary variant styling.</div>
        <div class="card-footer"><button>Material Action</button></div>
      </zt-card>
    </div>
    `,
    props: args,
  }),
};

// Complete showcase combining all features
export const CompleteShowcase: Story = {
  args: {
    hoverable: true,
  },
  render: (args) => ({
    template: `
    <div style="padding: 20px;">
      <h2 style="margin-bottom: 20px; color: #333;">Card Component Showcase</h2>

      <div style="margin-bottom: 40px;">
        <h3 style="margin-bottom: 16px; color: #666;">Card Styles</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
          <zt-card cardStyle="elevated" theme="light" size="md" variant="primary" [hoverable]="hoverable">
            <div class="card-header">Elevated Card</div>
            <div class="card-body">Elevated cards use shadows and borders for depth.</div>
            <div class="card-footer"><button>Elevated</button></div>
          </zt-card>

          <zt-card cardStyle="outlined" theme="light" size="md" variant="info" [hoverable]="hoverable">
            <div class="card-header">Outlined Card</div>
            <div class="card-body">Outlined cards use borders for clear definition.</div>
            <div class="card-footer"><button>Outlined</button></div>
          </zt-card>

          <zt-card cardStyle="flat" theme="light" size="md" variant="warning" [hoverable]="hoverable">
            <div class="card-header">Flat Card</div>
            <div class="card-body">Flat cards are minimal with no shadows or borders.</div>
            <div class="card-footer"><button>Flat</button></div>
          </zt-card>
        </div>
      </div>

      <div style="margin-bottom: 40px;">
        <h3 style="margin-bottom: 16px; color: #666;">Color Variants</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <zt-card cardStyle="elevated" theme="light" size="sm" variant="primary" [hoverable]="hoverable">
            <div class="card-header">Primary</div>
            <div class="card-body">Blue accent colors</div>
          </zt-card>

          <zt-card cardStyle="elevated" theme="light" size="sm" variant="info" [hoverable]="hoverable">
            <div class="card-header">Info</div>
            <div class="card-body">Teal accent colors</div>
          </zt-card>

          <zt-card cardStyle="elevated" theme="light" size="sm" variant="danger" [hoverable]="hoverable">
            <div class="card-header">Danger</div>
            <div class="card-body">Red accent colors</div>
          </zt-card>

          <zt-card cardStyle="elevated" theme="light" size="sm" variant="warning" [hoverable]="hoverable">
            <div class="card-header">Warning</div>
            <div class="card-body">Yellow accent colors</div>
          </zt-card>

          <zt-card cardStyle="elevated" theme="light" size="sm" variant="dark" [hoverable]="hoverable">
            <div class="card-header">Dark</div>
            <div class="card-body">Dark gray accents</div>
          </zt-card>
        </div>
      </div>

      <div style="margin-bottom: 40px;">
        <h3 style="margin-bottom: 16px; color: #666;">Themes</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <zt-card cardStyle="elevated" theme="light" size="md" variant="primary" [hoverable]="hoverable">
            <div class="card-header">Light Theme</div>
            <div class="card-body">Bright theme for light backgrounds.</div>
          </zt-card>

          <zt-card cardStyle="elevated" theme="dark" size="md" variant="primary" [hoverable]="hoverable">
            <div class="card-header">Dark Theme</div>
            <div class="card-body">Dark theme for dark backgrounds.</div>
          </zt-card>

          <zt-card cardStyle="elevated" theme="bootstrap" size="md" variant="primary" [hoverable]="hoverable">
            <div class="card-header">Bootstrap</div>
            <div class="card-body">Bootstrap design system colors.</div>
          </zt-card>

          <zt-card cardStyle="elevated" theme="material" size="md" variant="primary" [hoverable]="hoverable">
            <div class="card-header">Material</div>
            <div class="card-body">Material Design guidelines.</div>
          </zt-card>
        </div>
      </div>
    </div>
    `,
    props: args,
  }),
};
