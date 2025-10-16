import { Injectable } from '@angular/core';
import { ThemeConfig, ThemeValidationResult } from './theme.types';

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
      const spacings = ['small', 'medium', 'large'];
      spacings.forEach(size => {
        const value = theme.spacing?.[size as keyof typeof theme.spacing];
        if (value && !this.isValidCssSize(value)) {
          warnings.push(`Spacing '${size}' should be a valid CSS size value`);
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

    const validation = this.validateTheme(merged);
    return validation.isValid ? merged : null;
  }
}
