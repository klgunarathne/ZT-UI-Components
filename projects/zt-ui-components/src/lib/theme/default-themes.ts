import { ThemeConfig, ThemeName } from './theme.types';

/**
 * Default light theme configuration
 */
export const LIGHT_THEME: ThemeConfig = {
  name: 'light',
  colors: {
    textBlack: '#000000',
    textWhite: '#ffffff',
    textPrimary: '#007bff',
    default: '#f8f9fa',
    defaultHoverBg: '#e9ecef',
    defaultHoverBorder: '#adb5bd',
    defaultPressed: '#dee2e6',
    primary: '#007bff',
    primaryHoverBg: '#0056b3',
    primaryHoverBorder: '#004085',
    primaryPressed: '#004085',
    success: '#28a745',
    successHoverBg: '#1e7e34',
    successHoverBorder: '#155724',
    successPressed: '#155724',
    info: '#17a2b8',
    infoHoverBg: '#117a8b',
    infoHoverBorder: '#0c5460',
    infoPressed: '#0c5460',
    warning: '#ffc107',
    warningHoverBg: '#e0a800',
    warningHoverBorder: '#d39e00',
    warningPressed: '#d39e00',
    danger: '#dc3545',
    dangerHoverBg: '#c82333',
    dangerHoverBorder: '#bd2130',
    dangerPressed: '#bd2130',
    dark: '#343a40',
    darkHoverBg: '#23272b',
    darkHoverBorder: '#1d2124',
    darkPressed: '#1d2124',
    link: 'transparent',
    linkHoverBg: 'rgba(0, 123, 255, 0.1)',
    linkHoverBorder: '#007bff',
    linkPressed: 'rgba(0, 123, 255, 0.2)',
  },
  borderRadius: 4,
  borderSize: 1,
  fontFamily: 'Segoe UI, sans-serif',
  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

/**
 * Default dark theme configuration
 */
export const DARK_THEME: ThemeConfig = {
  name: 'dark',
  colors: {
    textBlack: '#000000',
    textWhite: '#ffffff',
    textPrimary: '#4dabf7',
    default: '#2d3748',
    defaultHoverBg: '#4a5568',
    defaultHoverBorder: '#718096',
    defaultPressed: '#1a202c',
    primary: '#4dabf7',
    primaryHoverBg: '#3182ce',
    primaryHoverBorder: '#2c5282',
    primaryPressed: '#2a69ac',
    success: '#48bb78',
    successHoverBg: '#38a169',
    successHoverBorder: '#2f855a',
    successPressed: '#276749',
    info: '#4fd1c9',
    infoHoverBg: '#38b2ac',
    infoHoverBorder: '#319795',
    infoPressed: '#2c7a7b',
    warning: '#ed8936',
    warningHoverBg: '#dd6b20',
    warningHoverBorder: '#c05621',
    warningPressed: '#9c4221',
    danger: '#f56565',
    dangerHoverBg: '#e53e3e',
    dangerHoverBorder: '#c53030',
    dangerPressed: '#9b2c2c',
    dark: '#1a202c',
    darkHoverBg: '#2d3748',
    darkHoverBorder: '#4a5568',
    darkPressed: '#718096',
    link: 'transparent',
    linkHoverBg: 'rgba(77, 171, 247, 0.1)',
    linkHoverBorder: '#4dabf7',
    linkPressed: 'rgba(77, 171, 247, 0.2)',
  },
  borderRadius: 4,
  borderSize: 1,
  fontFamily: 'Segoe UI, sans-serif',
  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

/**
 * Bootstrap theme configuration
 */
export const BOOTSTRAP_THEME: ThemeConfig = {
  name: 'bootstrap',
  colors: {
    textBlack: '#000000',
    textWhite: '#ffffff',
    textPrimary: '#007bff',
    default: '#f8f9fa',
    defaultHoverBg: '#e9ecef',
    defaultHoverBorder: '#adb5bd',
    defaultPressed: '#dee2e6',
    primary: '#007bff',
    primaryHoverBg: '#0056b3',
    primaryHoverBorder: '#004085',
    primaryPressed: '#004085',
    success: '#28a745',
    successHoverBg: '#1e7e34',
    successHoverBorder: '#155724',
    successPressed: '#155724',
    info: '#17a2b8',
    infoHoverBg: '#117a8b',
    infoHoverBorder: '#0c5460',
    infoPressed: '#0c5460',
    warning: '#ffc107',
    warningHoverBg: '#e0a800',
    warningHoverBorder: '#d39e00',
    warningPressed: '#d39e00',
    danger: '#dc3545',
    dangerHoverBg: '#c82333',
    dangerHoverBorder: '#bd2130',
    dangerPressed: '#bd2130',
    dark: '#343a40',
    darkHoverBg: '#23272b',
    darkHoverBorder: '#1d2124',
    darkPressed: '#1d2124',
    link: 'transparent',
    linkHoverBg: 'rgba(0, 123, 255, 0.1)',
    linkHoverBorder: '#007bff',
    linkPressed: 'rgba(0, 123, 255, 0.2)',
  },
  borderRadius: 4,
  borderSize: 1,
  fontFamily: 'Segoe UI, sans-serif',
  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

/**
 * Material Design theme configuration
 */
export const MATERIAL_THEME: ThemeConfig = {
  name: 'material',
  colors: {
    textBlack: '#000000',
    textWhite: '#ffffff',
    textPrimary: '#6200ee',
    default: '#ffffff',
    defaultHoverBg: '#f5f5f5',
    defaultHoverBorder: '#e0e0e0',
    defaultPressed: '#eeeeee',
    primary: '#6200ee',
    primaryHoverBg: '#4c00d4',
    primaryHoverBorder: '#3b00a1',
    primaryPressed: '#3b00a1',
    success: '#4caf50',
    successHoverBg: '#388e3c',
    successHoverBorder: '#2e7d32',
    successPressed: '#2e7d32',
    info: '#2196f3',
    infoHoverBg: '#1976d2',
    infoHoverBorder: '#1565c0',
    infoPressed: '#1565c0',
    warning: '#ff9800',
    warningHoverBg: '#f57c00',
    warningHoverBorder: '#ef6c00',
    warningPressed: '#ef6c00',
    danger: '#f44336',
    dangerHoverBg: '#d32f2f',
    dangerHoverBorder: '#b71c1c',
    dangerPressed: '#b71c1c',
    dark: '#212121',
    darkHoverBg: '#424242',
    darkHoverBorder: '#616161',
    darkPressed: '#616161',
    link: 'transparent',
    linkHoverBg: 'rgba(98, 0, 238, 0.1)',
    linkHoverBorder: '#6200ee',
    linkPressed: 'rgba(98, 0, 238, 0.2)',
  },
  borderRadius: 4,
  borderSize: 1,
  fontFamily: 'Roboto, sans-serif',
  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

/**
 * Registry of all predefined themes
 */
export const THEME_REGISTRY: Record<ThemeName, ThemeConfig> = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
  bootstrap: BOOTSTRAP_THEME,
  material: MATERIAL_THEME,
};

/**
 * Get a theme by name with fallback to light theme
 */
export function getThemeByName(name: ThemeName): ThemeConfig {
  return THEME_REGISTRY[name] || LIGHT_THEME;
}
