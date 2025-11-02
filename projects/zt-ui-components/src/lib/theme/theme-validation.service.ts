import { Injectable } from '@angular/core';
import { ThemeConfig, ThemeValidationResult, ThemeSpacing, ThemeShadows, ThemeAnimations } from './theme.types';

/**
 * Service for validating theme configurations
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeValidationService {
  /**
   * Validates a theme configuration
   * @param theme The theme configuration to validate
   * @returns Validation result with errors and warnings
   */
  validateTheme(theme: ThemeConfig): ThemeValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required properties
    if (!theme.name || typeof theme.name !== 'string') {
      errors.push('Theme name is required and must be a string');
    }

    if (!theme.colors || typeof theme.colors !== 'object') {
      errors.push('Theme colors are required and must be an object');
    } else {
      // Validate color properties
      const requiredColors = [
        'textBlack', 'textWhite', 'textPrimary', 'default', 'primary',
        'success', 'info', 'warning', 'danger', 'dark', 'link'
      ];

      requiredColors.forEach(color => {
        if (!theme.colors[color as keyof typeof theme.colors]) {
          errors.push(`Required color '${color}' is missing`);
        } else if (!this.isValidColor(theme.colors[color as keyof typeof theme.colors] as string)) {
          errors.push(`Color '${color}' must be a valid CSS color value`);
        }
      });
    }

    // Validate border radius
    if (typeof theme.borderRadius !== 'number' || theme.borderRadius < 0) {
      errors.push('Border radius must be a non-negative number');
    }

    // Validate border size
    if (typeof theme.borderSize !== 'number' || theme.borderSize < 0) {
      errors.push('Border size must be a non-negative number');
    }

    // Validate font size if provided
    if (theme.fontSize) {
      const fontSizes = ['small', 'medium', 'large'];
      fontSizes.forEach(size => {
        const value = theme.fontSize?.[size as keyof typeof theme.fontSize];
        if (value && !this.isValidCssSize(value)) {
          warnings.push(`Font size '${size}' should be a valid CSS size value`);
        }
      });
    }

    // Validate spacing if provided
    if (theme.spacing) {
      const spacings = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
      spacings.forEach(size => {
        const value = theme.spacing?.[size as keyof ThemeSpacing];
        if (value && !this.isValidCssSize(value)) {
          warnings.push(`Spacing '${size}' should be a valid CSS size value`);
        }
      });
    }

    // Validate shadows if provided
    if (theme.shadows) {
      const shadowKeys = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
      shadowKeys.forEach(key => {
        const value = theme.shadows?.[key as keyof ThemeShadows];
        if (value && !this.isValidCssShadow(value)) {
          warnings.push(`Shadow '${key}' should be a valid CSS box-shadow value`);
        }
      });
    }

    // Validate animations if provided
    if (theme.animations) {
      const animationKeys = ['fast', 'normal', 'slow', 'bounce'];
      animationKeys.forEach(key => {
        const value = theme.animations?.[key as keyof ThemeAnimations];
        if (value && !this.isValidCssTime(value)) {
          warnings.push(`Animation '${key}' should be a valid CSS time value (e.g., '200ms', '0.2s')`);
        }
      });
    }

    // Validate breakpoints if provided
    if (theme.breakpoints) {
      const breakpointKeys = ['sm', 'md', 'lg', 'xl'];
      breakpointKeys.forEach(key => {
        const value = theme.breakpoints?.[key as keyof typeof theme.breakpoints];
        if (value && !this.isValidCssSize(value)) {
          warnings.push(`Breakpoint '${key}' should be a valid CSS size value`);
        }
      });
    }

    // Check for accessibility issues
    if (theme.colors) {
      // Check contrast ratios for critical color combinations
      const contrastIssues = this.checkContrastRatios(theme.colors);
      warnings.push(...contrastIssues);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Checks if a value is a valid CSS color
   * @param color The color value to check
   * @returns True if valid, false otherwise
   */
  private isValidColor(color: string): boolean {
    // Basic validation for hex, rgb, rgba, hsl, hsla, and named colors
    const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    const rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/;
    const hslRegex = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
    const hslaRegex = /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0|1|0?\.\d+)\)$/;
    const namedColors = [
      'black', 'white', 'red', 'green', 'blue', 'yellow', 'purple', 'orange',
      'pink', 'gray', 'grey', 'transparent'
    ];

    return hexRegex.test(color) ||
           rgbRegex.test(color) ||
           rgbaRegex.test(color) ||
           hslRegex.test(color) ||
           hslaRegex.test(color) ||
           namedColors.includes(color.toLowerCase()) ||
           color === 'transparent';
  }

  /**
   * Checks if a value is a valid CSS size
   * @param size The size value to check
   * @returns True if valid, false otherwise
   */
  private isValidCssSize(size: string): boolean {
    const sizeRegex = /^(\d+(\.\d+)?)(px|em|rem|vh|vw|vmin|vmax|%)$/;
    return sizeRegex.test(size);
  }

  /**
   * Checks if a value is a valid CSS box-shadow
   * @param shadow The shadow value to check
   * @returns True if valid, false otherwise
   */
  private isValidCssShadow(shadow: string): boolean {
    // Basic validation for box-shadow values
    const shadowRegex = /^(none|(\d+(\.\d+)?px\s+){3,4}(rgba?\(.+\)|#[0-9a-fA-F]{3,8}|\w+))$/;
    return shadow === 'none' || shadowRegex.test(shadow.replace(/\s+/g, ' ').trim());
  }

  /**
   * Checks if a value is a valid CSS time duration
   * @param time The time value to check
   * @returns True if valid, false otherwise
   */
  private isValidCssTime(time: string): boolean {
    const timeRegex = /^(\d+(\.\d+)?)(ms|s)$/;
    return timeRegex.test(time);
  }

  /**
   * Checks contrast ratios for accessibility
   * @param colors The theme colors
   * @returns Array of contrast warnings
   */
  private checkContrastRatios(colors: any): string[] {
    const warnings: string[] = [];

    // This is a simplified check - in a real implementation,
    // you would use a proper color contrast calculation library
    // For now, we'll just check for obviously problematic combinations

    const lightBgColors = ['#ffffff', '#f8f9fa', '#ffffff'];
    const darkTextColors = ['#000000', '#212121'];

    // Check if light backgrounds have dark text
    if (lightBgColors.includes(colors.default) && !darkTextColors.includes(colors.textBlack)) {
      warnings.push('Light background colors should use dark text for better contrast');
    }

    return warnings;
  }

  /**
   * Merges two theme configurations with validation
   * @param baseTheme The base theme
   * @param overrideTheme The theme to override with
   * @returns Merged theme or null if invalid
   */
  mergeThemes(baseTheme: ThemeConfig, overrideTheme: Partial<ThemeConfig>): ThemeConfig | null {
    const merged = { ...baseTheme };

    if (overrideTheme.colors) {
      merged.colors = { ...merged.colors, ...overrideTheme.colors };
    }

    if (overrideTheme.borderRadius !== undefined) {
      merged.borderRadius = overrideTheme.borderRadius;
    }

    if (overrideTheme.borderSize !== undefined) {
      merged.borderSize = overrideTheme.borderSize;
    }

    if (overrideTheme.fontFamily) {
      merged.fontFamily = overrideTheme.fontFamily;
    }

    if (overrideTheme.fontSize) {
      merged.fontSize = { ...merged.fontSize, ...overrideTheme.fontSize };
    }

    if (overrideTheme.spacing) {
      merged.spacing = { ...merged.spacing, ...overrideTheme.spacing };
    }

    if (overrideTheme.shadows) {
      merged.shadows = { ...merged.shadows, ...overrideTheme.shadows };
    }

    if (overrideTheme.animations) {
      merged.animations = { ...merged.animations, ...overrideTheme.animations };
    }

    if (overrideTheme.breakpoints) {
      merged.breakpoints = { ...merged.breakpoints, ...overrideTheme.breakpoints };
    }

    const validation = this.validateTheme(merged);
    return validation.isValid ? merged : null;
  }

  /**
   * Validates CSS custom properties for a theme
   * @param theme The theme configuration to validate
   * @returns Validation result for CSS custom properties
   */
  validateCssCustomProperties(theme: ThemeConfig): ThemeValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if all required CSS custom properties can be generated
    const requiredProperties = [
      '--zt-text-black', '--zt-text-white', '--zt-primary', '--zt-default',
      '--zt-border-radius', '--zt-border-size'
    ];

    // Validate that theme can generate all required CSS properties
    try {
      const cssProps = this.generateCssCustomProperties(theme);
      requiredProperties.forEach(prop => {
        if (!(prop in cssProps)) {
          errors.push(`Required CSS custom property '${prop}' is not generated by theme`);
        }
      });
    } catch (error) {
      errors.push(`Failed to generate CSS custom properties: ${error}`);
    }

    // Check for potential CSS conflicts
    if (theme.colors) {
      const colorKeys = Object.keys(theme.colors);
      const duplicates = colorKeys.filter((key, index) => colorKeys.indexOf(key) !== index);
      if (duplicates.length > 0) {
        warnings.push(`Duplicate color keys found: ${duplicates.join(', ')}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Generates CSS custom properties from a theme configuration
   * @param theme The theme configuration
   * @returns Object with CSS custom property names and values
   */
  private generateCssCustomProperties(theme: ThemeConfig): Record<string, string> {
    const cssProps: Record<string, string> = {};

    // Color properties
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        const cssVar = `--zt-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        cssProps[cssVar] = value;
      });
    }

    // Dimensional properties
    cssProps['--zt-border-radius'] = `${theme.borderRadius}px`;
    cssProps['--zt-border-size'] = `${theme.borderSize}px`;

    // Typography
    if (theme.fontFamily) {
      cssProps['--zt-font-family'] = theme.fontFamily;
    }

    if (theme.fontSize) {
      Object.entries(theme.fontSize).forEach(([key, value]) => {
        cssProps[`--zt-font-size-${key}`] = value;
      });
    }

    // Spacing
    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        cssProps[`--zt-spacing-${key}`] = value;
      });
    }

    // Shadows
    if (theme.shadows) {
      Object.entries(theme.shadows).forEach(([key, value]) => {
        cssProps[`--zt-shadow-${key}`] = value;
      });
    }

    // Animations
    if (theme.animations) {
      Object.entries(theme.animations).forEach(([key, value]) => {
        cssProps[`--zt-animation-${key}`] = value;
      });
    }

    // Breakpoints
    if (theme.breakpoints) {
      Object.entries(theme.breakpoints).forEach(([key, value]) => {
        cssProps[`--zt-breakpoint-${key}`] = value;
      });
    }

    return cssProps;
  }
}
