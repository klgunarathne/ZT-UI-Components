/**
 * Theme color palette interface
 */
export interface ThemeColors {
  // Text colors
  textBlack: string;
  textWhite: string;
  textPrimary: string;

  // Background colors
  default: string;
  defaultHoverBg: string;
  defaultHoverBorder: string;
  defaultPressed: string;

  // Semantic colors
  primary: string;
  primaryHoverBg: string;
  primaryHoverBorder: string;
  primaryPressed: string;

  success: string;
  successHoverBg: string;
  successHoverBorder: string;
  successPressed: string;

  info: string;
  infoHoverBg: string;
  infoHoverBorder: string;
  infoPressed: string;

  warning: string;
  warningHoverBg: string;
  warningHoverBorder: string;
  warningPressed: string;

  danger: string;
  dangerHoverBg: string;
  dangerHoverBorder: string;
  dangerPressed: string;

  dark: string;
  darkHoverBg: string;
  darkHoverBorder: string;
  darkPressed: string;

  // Link colors
  link: string;
  linkHoverBg: string;
  linkHoverBorder: string;
  linkPressed: string;
}

/**
 * Theme spacing scale interface
 */
export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

/**
 * Theme shadow/elevation system interface
 */
export interface ThemeShadows {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

/**
 * Theme animation timing interface
 */
export interface ThemeAnimations {
  fast: string;
  normal: string;
  slow: string;
  bounce: string;
}

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  borderRadius: number;
  borderSize: number;
  fontFamily?: string;
  fontSize?: {
    small: string;
    medium: string;
    large: string;
  };
  spacing?: ThemeSpacing;
  shadows?: ThemeShadows;
  animations?: ThemeAnimations;
  breakpoints?: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

/**
 * Predefined theme names
 */
export type ThemeName = 'light' | 'dark' | 'bootstrap' | 'material';

/**
 * Theme context for components
 */
export interface ThemeContext {
  globalTheme: ThemeConfig;
  componentOverrides?: Partial<ThemeConfig>;
}

/**
 * Theme validation result
 */
export interface ThemeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
