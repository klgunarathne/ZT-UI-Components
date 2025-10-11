import { ButtonComponent } from '../lib/zt-button/button.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ButtonComponent> = {
  title: 'Button',
  component: ButtonComponent,
  argTypes: {
    size: {
      options: ['zt-md', 'zt-sm', 'zt-lg'],
      control: { type: 'select' },
      default: 'zt-md',
    },
    theme: {
      options: ['light', 'dark', 'bootstrap', 'material'],
      control: { type: 'select' },
      default: 'light',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Button: Story = {
  args: {
    size: "zt-sm",
    outline: false,
    theme: "light",
  },
  render: (args) => ({
    template: `
    <zt-button [variant]="'default'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">default</zt-button>
    <zt-button [variant]="'primary'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">primary</zt-button>
    <zt-button [variant]="'info'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">info</zt-button>
    <zt-button [variant]="'success'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">success</zt-button>
    <zt-button [variant]="'danger'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">danger</zt-button>
    <zt-button [variant]="'warning'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">warning</zt-button>
    <zt-button [variant]="'dark'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">dark</zt-button>
    <zt-button [variant]="'link'" [outline]="false" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">link</zt-button>
    `,
    props: args,
  }),
};

export const Outline_Button: Story = {
  args: {
    size: 'zt-md',
    outline: true,
    theme: 'light',
  },
  render: (args: ButtonComponent) => ({
    template: `
    <zt-button [variant]="'default'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">default</zt-button>
    <zt-button [variant]="'primary'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">primary</zt-button>
    <zt-button [variant]="'info'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">info</zt-button>
    <zt-button [variant]="'success'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">success</zt-button>
    <zt-button [variant]="'danger'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">danger</zt-button>
    <zt-button [variant]="'warning'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">warning</zt-button>
    <zt-button [variant]="'dark'" [outline]="outline" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">dark</zt-button>
    <zt-button [variant]="'link'" [outline]="false" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">link</zt-button>
    `,
    props: args,
  }),
};

export const Round_Button: Story = {
  args: {
    size: 'zt-md',
    theme: 'light',
  },
  render: (args: ButtonComponent) => ({
    template: `
    <zt-button [variant]="'round'" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">+</zt-button>
    <zt-button [variant]="'round'" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">✓</zt-button>
    <zt-button [variant]="'round'" [size]="size" [theme]="theme" style="margin-right: 1em; margin-bottom:1em;">✕</zt-button>
    `,
    props: args,
  }),
};

export const Floating_Button: Story = {
  args: {
    theme: 'light',
    size: "zt-sm"
  },
  render: (args: ButtonComponent) => ({
    template: `
    <zt-button [variant]="'floating'" [theme]="theme">+</zt-button>
    `,
    props: args,
  }),
};
