import { TestBed } from '@angular/core/testing';
import { ZTThemeService } from './theme.service';
import { ThemeValidationService } from './theme-validation.service';
import { LIGHT_THEME, DARK_THEME } from './default-themes';
import { ThemeConfig } from './theme.types';

describe('ZTThemeService', () => {
  let service: ZTThemeService;
  let validationService: ThemeValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZTThemeService, ThemeValidationService],
    });
    service = TestBed.inject(ZTThemeService);
    validationService = TestBed.inject(ThemeValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with light theme by default', () => {
    expect(service.currentTheme.name).toBe('light');
  });

  it('should set theme by name', () => {
    service.setThemeByName('dark');
    expect(service.currentTheme.name).toBe('dark');
  });

  it('should validate theme before setting', () => {
    const invalidTheme: ThemeConfig = {
      name: 'invalid',
      colors: {} as any,
      borderRadius: -1,
      borderSize: 0,
    };

    expect(() => service.setTheme(invalidTheme)).toThrow();
  });

  it('should update theme with partial overrides', () => {
    const originalPrimary = service.currentTheme.colors.primary;
    service.updateTheme({
      colors: {
        ...LIGHT_THEME.colors,
        primary: '#ff0000'
      },
    });

    expect(service.currentTheme.colors.primary).toBe('#ff0000');
    expect(service.currentTheme.colors.primary).not.toBe(originalPrimary);
  });

  it('should toggle between light and dark themes', () => {
    expect(service.currentTheme.name).toBe('light');
    service.toggleDarkMode();
    expect(service.currentTheme.name).toBe('dark');
    service.toggleDarkMode();
    expect(service.currentTheme.name).toBe('light');
  });

  it('should provide available themes', () => {
    const themes = service.getAvailableThemes();
    expect(themes).toContain('light');
    expect(themes).toContain('dark');
    expect(themes).toContain('bootstrap');
    expect(themes).toContain('material');
  });

  it('should export and import theme', () => {
    const exported = service.exportTheme();
    service.setThemeByName('dark');
    service.importTheme(exported);
    expect(service.currentTheme.name).toBe('light');
  });
});

describe('ThemeValidationService', () => {
  let service: ThemeValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeValidationService],
    });
    service = TestBed.inject(ThemeValidationService);
  });

  it('should validate valid theme', () => {
    const result = service.validateTheme(LIGHT_THEME);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should invalidate theme with missing required properties', () => {
    const invalidTheme = { ...LIGHT_THEME };
    delete (invalidTheme as any).name;

    const result = service.validateTheme(invalidTheme);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Theme name is required and must be a string');
  });

  it('should invalidate theme with invalid colors', () => {
    const invalidTheme = {
      ...LIGHT_THEME,
      colors: {
        ...LIGHT_THEME.colors,
        primary: 'invalid-color',
      },
    };

    const result = service.validateTheme(invalidTheme);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Color \'primary\' must be a valid CSS color value');
  });

  it('should merge themes correctly', () => {
    const merged = service.mergeThemes(LIGHT_THEME, {
      colors: {
        ...LIGHT_THEME.colors,
        primary: '#ff0000'
      },
    });

    expect(merged).toBeTruthy();
    expect(merged!.colors.primary).toBe('#ff0000');
    expect(merged!.name).toBe(LIGHT_THEME.name);
  });

  it('should return null when merging with invalid overrides', () => {
    const merged = service.mergeThemes(LIGHT_THEME, {
      borderRadius: -1,
    } as any);

    expect(merged).toBeNull();
  });
});
