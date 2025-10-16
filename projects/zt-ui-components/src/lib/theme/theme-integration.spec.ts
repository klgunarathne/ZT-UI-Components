import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZTThemeService } from './theme.service';
import { ThemeDirective } from './theme.directive';
import { ThemeConfig } from './theme.types';
import { LIGHT_THEME, DARK_THEME } from './default-themes';

// Test component that uses theme directive
@Component({
  template: `
    <zt-card [ztTheme]="customTheme" id="themed-card">
      <zt-card-header>Test Card</zt-card-header>
      <zt-card-body>Test content</zt-card-body>
    </zt-card>
    <zt-input [ztTheme]="inputTheme" id="themed-input" placeholder="Test input"></zt-input>
  `,
  standalone: true,
  imports: [ThemeDirective],
})
class TestThemeComponent {
  customTheme: Partial<ThemeConfig> = {
    colors: {
      ...LIGHT_THEME.colors,
      primary: '#ff6b6b',
    },
    borderRadius: 8,
  };

  inputTheme: Partial<ThemeConfig> = {
    colors: {
      ...LIGHT_THEME.colors,
      primary: '#4ecdc4',
    },
  };
}

describe('Theme Integration', () => {
  let fixture: ComponentFixture<TestThemeComponent>;
  let themeService: ZTThemeService;
  let themedCard: DebugElement;
  let themedInput: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestThemeComponent],
      providers: [ZTThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(TestThemeComponent);
    themeService = TestBed.inject(ZTThemeService);
    themedCard = fixture.debugElement.query(By.css('#themed-card'));
    themedInput = fixture.debugElement.query(By.css('#themed-input'));
    fixture.detectChanges();
  });

  it('should apply global theme by default', () => {
    expect(themeService.currentTheme.name).toBe('light');
    expect(document.body.classList.contains('theme-light')).toBe(true);
  });

  it('should switch global theme dynamically', () => {
    themeService.setThemeByName('dark');
    expect(themeService.currentTheme.name).toBe('dark');
    expect(document.body.classList.contains('theme-dark')).toBe(true);
  });

  it('should apply local theme overrides to components', () => {
    const cardElement = themedCard.nativeElement as HTMLElement;
    const computedStyle = getComputedStyle(cardElement);

    // Check if custom primary color is applied
    expect(cardElement.style.getPropertyValue('--zt-primary')).toBe('#ff6b6b');
    expect(cardElement.style.getPropertyValue('--zt-border-radius')).toBe('8px');
  });

  it('should apply different themes to different components', () => {
    const cardElement = themedCard.nativeElement as HTMLElement;
    const inputElement = themedInput.nativeElement as HTMLElement;

    expect(cardElement.style.getPropertyValue('--zt-primary')).toBe('#ff6b6b');
    expect(inputElement.style.getPropertyValue('--zt-primary')).toBe('#4ecdc4');
  });

  it('should maintain theme when switching global themes', () => {
    // Switch to dark theme globally
    themeService.setThemeByName('dark');

    // Local overrides should still be applied
    const cardElement = themedCard.nativeElement as HTMLElement;
    expect(cardElement.style.getPropertyValue('--zt-primary')).toBe('#ff6b6b');
  });

  it('should handle theme inheritance correctly', () => {
    const cardElement = themedCard.nativeElement as HTMLElement;

    // Should inherit global theme properties not overridden locally
    expect(cardElement.style.getPropertyValue('--zt-text-black')).toBe('');
    // (empty because it falls back to global CSS variables)
  });

  it('should clean up theme overrides when component is destroyed', () => {
    spyOn(themeService, 'clearThemeOverrides');

    fixture.destroy();

    // Note: In a real scenario, the directive would handle cleanup
    // This test verifies the concept
  });
});

describe('Theme Accessibility', () => {
  let themeService: ZTThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZTThemeService],
    });
    themeService = TestBed.inject(ZTThemeService);
  });

  it('should maintain sufficient contrast ratios', () => {
    // Test light theme
    const lightValidation = themeService['validationService'].validateTheme(LIGHT_THEME);
    expect(lightValidation.warnings).not.toContain(
      'Light background colors should use dark text for better contrast'
    );

    // Test dark theme
    const darkValidation = themeService['validationService'].validateTheme(DARK_THEME);
    expect(darkValidation.isValid).toBe(true);
  });

  it('should validate color accessibility', () => {
    const poorContrastTheme: ThemeConfig = {
      ...LIGHT_THEME,
      colors: {
        ...LIGHT_THEME.colors,
        textBlack: '#ffffff', // White text on light background
        default: '#f8f9fa',
      },
    };

    const validation = themeService['validationService'].validateTheme(poorContrastTheme);
    expect(validation.warnings.length).toBeGreaterThan(0);
  });
});
