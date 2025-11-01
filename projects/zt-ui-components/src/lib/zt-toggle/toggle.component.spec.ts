import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default unchecked state', () => {
    expect(component.checked).toBe(false);
    expect(component.ariaChecked).toBe(false);
  });

  it('should toggle checked state on click', () => {
    component.onToggleClick();
    expect(component.checked).toBe(true);
    expect(component.ariaChecked).toBe(true);

    component.onToggleClick();
    expect(component.checked).toBe(false);
    expect(component.ariaChecked).toBe(false);
  });

  it('should emit toggleChange event on click', () => {
    spyOn(component.toggleChange, 'emit');

    component.onToggleClick();
    expect(component.toggleChange.emit).toHaveBeenCalledWith(true);

    component.onToggleClick();
    expect(component.toggleChange.emit).toHaveBeenCalledWith(false);
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    component.checked = false;

    component.onToggleClick();
    expect(component.checked).toBe(false);
  });

  it('should handle keyboard events', () => {
    spyOn(component.toggleChange, 'emit');

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    component.onKeyDown(spaceEvent);
    expect(component.toggleChange.emit).toHaveBeenCalledWith(true);

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(enterEvent);
    expect(component.toggleChange.emit).toHaveBeenCalledWith(false);
  });

  it('should not respond to keyboard when disabled', () => {
    component.disabled = true;
    spyOn(component.toggleChange, 'emit');

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    component.onKeyDown(spaceEvent);
    expect(component.toggleChange.emit).not.toHaveBeenCalled();
  });

  it('should set correct ARIA attributes', () => {
    expect(component.role).toBe('switch');
    expect(component.ariaChecked).toBe(false);
    expect(component.ariaDisabled).toBe(false);

    component.checked = true;
    expect(component.ariaChecked).toBe(true);

    component.disabled = true;
    expect(component.ariaDisabled).toBe(true);
  });

  it('should set correct tabindex', () => {
    expect(component.tabIndex).toBe(0);

    component.disabled = true;
    expect(component.tabIndex).toBe(-1);
  });

  it('should apply correct CSS classes', () => {
    component.size = 'zt-lg';
    component.variant = 'rounded';
    component.theme = 'dark';
    component.checked = true;

    const classes = component.toggleClass;
    expect(classes).toContain('zt-lg');
    expect(classes).toContain('theme-dark');
    expect(classes).toContain('zt-toggle-rounded');
    expect(classes).toContain('zt-toggle-checked');
  });

  it('should emit focus and blur events', () => {
    spyOn(component.focus, 'emit');
    spyOn(component.blur, 'emit');

    component.onFocus();
    expect(component.focus.emit).toHaveBeenCalled();

    component.onBlur();
    expect(component.blur.emit).toHaveBeenCalled();
  });

  it('should handle label attributes', () => {
    component.label = 'Test Label';
    expect(component.ariaLabel).toBe('Test Label');

    component.label = '';
    expect(component.ariaLabel).toBeNull();
  });
});
