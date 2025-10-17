import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeConfig } from '../theme/theme.types';

/**
 * A modern, flexible card component that supports various styles, themes, and sizes.
 * It provides content projection for header, body, footer, and media sections.
 *
 * @example
 * <zt-card cardStyle="elevated" theme="light" size="md">
 *   <div class="card-header">Card Title</div>
 *   <div class="card-body">Card content goes here.</div>
 *   <div class="card-footer"><button>Action</button></div>
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
export class CardComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}
  /**
   * The visual style of the card.
   * @default 'elevated'
   */
  @Input() cardStyle: 'elevated' | 'outlined' | 'flat' = 'elevated';

  /**
   * The theme of the card component.
   * @default 'light'
   * @deprecated Use global theming or ztTheme directive for local overrides
   */
  @Input() theme: 'light' | 'dark' | 'material' | 'bootstrap' = 'light';

  /**
   * Local theme override for this card component.
   * Takes precedence over global theme.
   */
  @Input() ztTheme?: Partial<ThemeConfig>;

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

  /**
   * Applies theme overrides if specified
   */
  ngOnInit(): void {
    if (this.ztTheme) {
      this.applyLocalTheme();
    }
  }

  /**
   * Applies local theme override to the component
   */
  private applyLocalTheme(): void {
    if (!this.ztTheme) return;

    const hostElement = this.elementRef.nativeElement;

    if (this.ztTheme.colors) {
      Object.entries(this.ztTheme.colors).forEach(([key, value]) => {
        const cssVar = `--zt-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        hostElement.style.setProperty(cssVar, value);
      });
    }

    if (this.ztTheme.borderRadius !== undefined) {
      hostElement.style.setProperty('--zt-border-radius', `${this.ztTheme.borderRadius}px`);
    }

    if (this.ztTheme.borderSize !== undefined) {
      hostElement.style.setProperty('--zt-border-size', `${this.ztTheme.borderSize}px`);
    }

    if (this.ztTheme.fontFamily) {
      hostElement.style.setProperty('--zt-font-family', this.ztTheme.fontFamily);
    }
  }
}
