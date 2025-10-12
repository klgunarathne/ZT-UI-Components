import { CardComponent } from '../lib/zt-card/card.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<CardComponent> = {
  title: 'Card',
  component: CardComponent,
  argTypes: {
    cardStyle: {
      options: ['elevated', 'outlined', 'flat'],
      control: { type: 'select' },
      default: 'elevated',
    },
    theme: {
      options: ['light', 'dark', 'bootstrap', 'material'],
      control: { type: 'select' },
      default: 'light',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      default: 'md',
    },
    variant: {
      options: ['default', 'primary', 'info', 'danger', 'warning', 'dark'],
      control: { type: 'select' },
      default: 'default',
    },
    hoverable: {
      control: { type: 'boolean' },
      default: false,
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const ElevatedCard: Story = {
  args: {
    cardStyle: 'elevated',
    theme: 'light',
    size: 'md',
    hoverable: false,
  },
  render: (args) => ({
    template: `
    <zt-card [cardStyle]="cardStyle" [theme]="theme" [size]="size" [hoverable]="hoverable">
      <zt-card-header>Card Title</zt-card-header>
      <zt-card-body>This is an elevated card with default styling. It has a subtle shadow and modern design.</zt-card-body>
      <zt-card-footer><button>Action</button></zt-card-footer>
    </zt-card>
    `,
    props: args,
  }),
};

export const OutlinedCard: Story = {
  args: {
    cardStyle: 'outlined',
    theme: 'light',
    size: 'md',
    hoverable: true,
  },
  render: (args) => ({
    template: `
    <zt-card [cardStyle]="cardStyle" [theme]="theme" [size]="size" [hoverable]="hoverable">
      <zt-card-header>Outlined Card</zt-card-header>
      <zt-card-body>This card has an outline border instead of a shadow. Hover over it to see the effect.</zt-card-body>
      <zt-card-footer><button>Learn More</button></zt-card-footer>
    </zt-card>
    `,
    props: args,
  }),
};

export const FlatCard: Story = {
  args: {
    cardStyle: 'flat',
    theme: 'material',
    size: 'lg',
    hoverable: true,
  },
  render: (args) => ({
    template: `
    <zt-card [cardStyle]="cardStyle" [theme]="theme" [size]="size" [hoverable]="hoverable">
      <zt-card-media><img src="https://via.placeholder.com/300x200" alt="Sample image"></zt-card-media>
      <zt-card-header>Flat Card with Media</zt-card-header>
      <zt-card-body>This is a flat card with a media section. It uses Material theme and large size.</zt-card-body>
      <zt-card-footer><button>View Details</button></zt-card-footer>
    </zt-card>
    `,
    props: args,
  }),
};

export const DarkThemeCard: Story = {
  args: {
    cardStyle: 'elevated',
    theme: 'dark',
    size: 'md',
    hoverable: false,
  },
  render: (args) => ({
    template: `
    <zt-card [cardStyle]="cardStyle" [theme]="theme" [size]="size" [hoverable]="hoverable">
      <zt-card-header>Dark Theme Card</zt-card-header>
      <zt-card-body>This card demonstrates the dark theme with elevated style.</zt-card-body>
      <zt-card-footer><button>Action</button></zt-card-footer>
    </zt-card>
    `,
    props: args,
  }),
};

export const PrimaryVariantCard: Story = {
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
      <zt-card-header>Primary Card</zt-card-header>
      <zt-card-body>This is a primary variant card with outlined style and hover effects.</zt-card-body>
      <zt-card-footer><button>Primary Action</button></zt-card-footer>
    </zt-card>
    `,
    props: args,
  }),
};

export const VariantsShowcase: Story = {
  args: {
    cardStyle: 'elevated',
    theme: 'light',
    size: 'md',
    hoverable: false
  },
  render: (args) => ({
    template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
      <zt-card cardStyle="elevated" theme="light" size="md" variant="default" [hoverable]="hoverable">
        <zt-card-header>Default</zt-card-header>
        <zt-card-body>Default variant card with hover effects.</zt-card-body>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" variant="primary" [hoverable]="hoverable">
        <zt-card-header>Primary</zt-card-header>
        <zt-card-body>Primary variant card with themed hover effects.</zt-card-body>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" variant="info" [hoverable]="hoverable">
        <zt-card-header>Info</zt-card-header>
        <zt-card-body>Info variant card with themed hover effects.</zt-card-body>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" variant="danger" [hoverable]="hoverable">
        <zt-card-header>Danger</zt-card-header>
        <zt-card-body>Danger variant card with themed hover effects.</zt-card-body>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" variant="warning" [hoverable]="hoverable">
        <zt-card-header>Warning</zt-card-header>
        <zt-card-body>Warning variant card with themed hover effects.</zt-card-body>
      </zt-card>

      <zt-card cardStyle="elevated" theme="light" size="md" variant="dark" [hoverable]="hoverable">
        <zt-card-header>Dark</zt-card-header>
        <zt-card-body>Dark variant card with themed hover effects.</zt-card-body>
      </zt-card>
    </div>
    `,
    props: args,
  }),
};
