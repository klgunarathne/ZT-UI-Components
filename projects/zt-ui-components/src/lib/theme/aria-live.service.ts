import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Service for managing ARIA live regions for dynamic announcements
 * Provides screen reader accessibility for status updates and notifications
 */
@Injectable({
  providedIn: 'root',
})
export class AriaLiveService {
  private liveRegion: HTMLElement | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeLiveRegion();
    }
  }

  /**
   * Announces a message to screen readers via ARIA live region
   * @param message The message to announce
   * @param priority The priority level (polite or assertive)
   * @param duration How long to show the message (ms)
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite', duration: number = 5000): void {
    if (!isPlatformBrowser(this.platformId) || !this.liveRegion) return;

    // Clear any existing content
    this.liveRegion.textContent = '';

    // Set the message
    this.liveRegion.textContent = message;

    // Set priority
    this.liveRegion.setAttribute('aria-live', priority);

    // Clear after duration
    if (duration > 0) {
      setTimeout(() => {
        if (this.liveRegion) {
          this.liveRegion.textContent = '';
        }
      }, duration);
    }
  }

  /**
   * Announces a status update (typically for form validation, loading states, etc.)
   * @param message The status message
   */
  announceStatus(message: string): void {
    this.announce(message, 'polite', 3000);
  }

  /**
   * Announces an error message (higher priority)
   * @param message The error message
   */
  announceError(message: string): void {
    this.announce(message, 'assertive', 5000);
  }

  /**
   * Announces a success message
   * @param message The success message
   */
  announceSuccess(message: string): void {
    this.announce(message, 'polite', 3000);
  }

  /**
   * Announces navigation changes or page updates
   * @param message The navigation message
   */
  announceNavigation(message: string): void {
    this.announce(message, 'polite', 2000);
  }

  /**
   * Announces data updates (like table sorting, filtering results)
   * @param message The data update message
   */
  announceDataUpdate(message: string): void {
    this.announce(message, 'polite', 2000);
  }

  /**
   * Initializes the ARIA live region
   */
  private initializeLiveRegion(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Create live region if it doesn't exist
    if (!this.liveRegion) {
      this.liveRegion = document.createElement('div');
      this.liveRegion.setAttribute('aria-live', 'polite');
      this.liveRegion.setAttribute('aria-atomic', 'true');
      this.liveRegion.setAttribute('role', 'status');
      this.liveRegion.style.position = 'absolute';
      this.liveRegion.style.left = '-10000px';
      this.liveRegion.style.width = '1px';
      this.liveRegion.style.height = '1px';
      this.liveRegion.style.overflow = 'hidden';

      document.body.appendChild(this.liveRegion);
    }
  }
}
