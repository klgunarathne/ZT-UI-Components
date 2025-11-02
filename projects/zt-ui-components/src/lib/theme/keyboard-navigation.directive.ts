import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AriaLiveService } from './aria-live.service';

/**
 * Directive for enhanced keyboard navigation support
 * Provides arrow key navigation, focus management, and accessibility announcements
 */
@Directive({
  selector: '[ztKeyboardNavigation]',
  standalone: true
})
export class KeyboardNavigationDirective implements OnDestroy {
  private destroy$ = new Subject<void>();

  /**
   * Enable arrow key navigation
   */
  @Input() enableArrowNavigation = true;

  /**
   * Enable home/end key navigation
   */
  @Input() enableHomeEndNavigation = true;

  /**
   * Enable page up/down navigation
   */
  @Input() enablePageNavigation = false;

  /**
   * CSS selector for focusable elements within the host
   */
  @Input() focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  /**
   * Whether to wrap around when reaching the end/start
   */
  @Input() wrapAround = false;

  /**
   * Event emitted when navigation occurs
   */
  @Output() navigationChange = new EventEmitter<{direction: string, element: HTMLElement}>();

  /**
   * Event emitted when enter key is pressed
   */
  @Output() enterKey = new EventEmitter<HTMLElement>();

  /**
   * Event emitted when escape key is pressed
   */
  @Output() escapeKey = new EventEmitter<HTMLElement>();

  private focusableElements: HTMLElement[] = [];
  private currentFocusIndex = -1;

  constructor(
    private elementRef: ElementRef,
    private ariaLiveService: AriaLiveService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Update the list of focusable elements
   */
  updateFocusableElements(): void {
    const hostElement = this.elementRef.nativeElement;
    this.focusableElements = Array.from(
      hostElement.querySelectorAll(this.focusableSelector)
    ) as HTMLElement[];
  }

  /**
   * Handle keyboard events
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.enableArrowNavigation && !this.enableHomeEndNavigation && !this.enablePageNavigation) {
      return;
    }

    this.updateFocusableElements();

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        if (this.enableArrowNavigation) {
          event.preventDefault();
          this.navigateNext();
        }
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        if (this.enableArrowNavigation) {
          event.preventDefault();
          this.navigatePrevious();
        }
        break;

      case 'Home':
        if (this.enableHomeEndNavigation) {
          event.preventDefault();
          this.navigateToStart();
        }
        break;

      case 'End':
        if (this.enableHomeEndNavigation) {
          event.preventDefault();
          this.navigateToEnd();
        }
        break;

      case 'PageUp':
        if (this.enablePageNavigation) {
          event.preventDefault();
          this.navigatePageUp();
        }
        break;

      case 'PageDown':
        if (this.enablePageNavigation) {
          event.preventDefault();
          this.navigatePageDown();
        }
        break;

      case 'Enter':
        this.enterKey.emit(event.target as HTMLElement);
        break;

      case 'Escape':
        this.escapeKey.emit(event.target as HTMLElement);
        break;
    }
  }

  /**
   * Navigate to the next focusable element
   */
  private navigateNext(): void {
    if (this.focusableElements.length === 0) return;

    this.currentFocusIndex++;
    if (this.currentFocusIndex >= this.focusableElements.length) {
      this.currentFocusIndex = this.wrapAround ? 0 : this.focusableElements.length - 1;
    }

    this.focusElement(this.currentFocusIndex, 'next');
  }

  /**
   * Navigate to the previous focusable element
   */
  private navigatePrevious(): void {
    if (this.focusableElements.length === 0) return;

    this.currentFocusIndex--;
    if (this.currentFocusIndex < 0) {
      this.currentFocusIndex = this.wrapAround ? this.focusableElements.length - 1 : 0;
    }

    this.focusElement(this.currentFocusIndex, 'previous');
  }

  /**
   * Navigate to the first focusable element
   */
  private navigateToStart(): void {
    if (this.focusableElements.length === 0) return;
    this.currentFocusIndex = 0;
    this.focusElement(0, 'start');
  }

  /**
   * Navigate to the last focusable element
   */
  private navigateToEnd(): void {
    if (this.focusableElements.length === 0) return;
    this.currentFocusIndex = this.focusableElements.length - 1;
    this.focusElement(this.currentFocusIndex, 'end');
  }

  /**
   * Navigate page up (useful for lists/grids)
   */
  private navigatePageUp(): void {
    if (this.focusableElements.length === 0) return;
    const pageSize = 5; // Configurable?
    this.currentFocusIndex = Math.max(0, this.currentFocusIndex - pageSize);
    this.focusElement(this.currentFocusIndex, 'page-up');
  }

  /**
   * Navigate page down (useful for lists/grids)
   */
  private navigatePageDown(): void {
    if (this.focusableElements.length === 0) return;
    const pageSize = 5; // Configurable?
    this.currentFocusIndex = Math.min(this.focusableElements.length - 1, this.currentFocusIndex + pageSize);
    this.focusElement(this.currentFocusIndex, 'page-down');
  }

  /**
   * Focus an element and emit events
   */
  private focusElement(index: number, direction: string): void {
    const element = this.focusableElements[index];
    if (element) {
      element.focus();
      this.navigationChange.emit({ direction, element });

      // Announce navigation for screen readers
      const label = element.getAttribute('aria-label') ||
                   element.textContent?.trim() ||
                   element.getAttribute('title') ||
                   `Item ${index + 1}`;
      this.ariaLiveService.announceNavigation(`Navigated to ${label}`);
    }
  }

  /**
   * Get the currently focused element index
   */
  getCurrentFocusIndex(): number {
    return this.currentFocusIndex;
  }

  /**
   * Set focus to a specific element by index
   */
  setFocusByIndex(index: number): void {
    if (index >= 0 && index < this.focusableElements.length) {
      this.currentFocusIndex = index;
      this.focusElement(index, 'direct');
    }
  }
}
