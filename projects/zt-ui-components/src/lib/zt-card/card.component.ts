import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A modern, flexible card component that supports various styles, themes, and sizes.
 * It provides content projection for header, body, footer, and media sections.
 *
 * @example
 * <zt-card cardStyle="elevated" theme="light" size="md">
 *   <zt-card-header>Card Title</zt-card-header>
 *   <zt-card-body>Card content goes here.</zt-card-body>
 *   <zt-card-footer><button>Action</button></zt-card-footer>
 * </zt-card>
 */
@Component({
  selector: 'zt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class CardComponent {
  /**
   * The visual style of the card.
   * @default 'elevated'
   */
  @Input() cardStyle: 'elevated' | 'outlined' | 'flat' = 'elevated';

  /**
   * The theme of the card component.
   * @default 'light'
   */
  @Input() theme: 'light' | 'dark' | 'material' | 'bootstrap' = 'light';

  /**
   * The size of the card component.
   * @default 'md'
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the card has hover effects.
   * @default false
   */
  @Input() hoverable = false;

  /**
   * The variant of the card that affects its color scheme.
   * @default 'default'
   */
  @Input() variant: 'default' | 'primary' | 'info' | 'danger' | 'warning' | 'dark' = 'default';

  /**
   * Dynamically applies CSS classes to the card element based on style, size, theme, hoverable, and variant.
   * @returns A string of CSS classes.
   */
  @HostBinding('class') get cardClass(): string {
    return `${this.cardStyle} ${this.size} theme-${this.theme} variant-${this.variant}${this.hoverable ? ' hoverable' : ''}`;
  }
}
