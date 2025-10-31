/**
 * ZT-UI Components Toast Component
 *
 * A comprehensive toast notification component that displays non-intrusive messages
 * to users. Built from scratch without external dependencies, this component provides
 * a complete toast notification system with multiple types, positions, and customization options.
 *
 * Features:
 * - Multiple toast types with distinct styling (success, error, info, warning)
 * - Six positioning options (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center)
 * - Configurable duration with auto-dismiss functionality
 * - Manual dismissal with close buttons
 * - Progress indicators showing time remaining
 * - Responsive design for mobile devices
 * - Smooth CSS animations for appearance and dismissal
 * - Demo buttons for testing in development
 * - Accessibility features with ARIA labels
 *
 * @example
 * ```html
 * <zt-toast position="top-right" showDemoButtons="true"></zt-toast>
 * ```
 *
 * @example
 * ```typescript
 * constructor(private toastService: ZtToastService) {}
 *
 * showNotification() {
 *   this.toastService.success('Operation completed!', 'Success', {
 *     duration: 3000,
 *     dismissible: true,
 *     showProgress: true
 *   });
 * }
 * ```
 */

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtToastService, ZtToast } from './zt-toast.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Toast notification component that displays messages in various positions on the screen
 *
 * This component subscribes to the ZtToastService to receive toast notifications and
 * displays them with appropriate styling, animations, and interactive elements.
 * It handles the complete lifecycle of toasts including display, progress tracking,
 * and cleanup.
 */
@Component({
  selector: 'zt-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" [ngClass]="'toast-' + position">
      <div
        *ngFor="let toast of toasts"
        class="toast"
        [ngClass]="'toast-' + toast.type"
      >
        <div class="toast-icon" [ngClass]="'icon-' + toast.type"></div>
        <div class="toast-content">
          <div class="toast-title" *ngIf="toast.title">{{ toast.title }}</div>
          <div class="toast-message">{{ toast.message }}</div>
        </div>
        <button
          *ngIf="toast.dismissible"
          class="toast-close"
          (click)="removeToast(toast.id)"
          aria-label="Close toast"
        >
          ×
        </button>
        <div
          *ngIf="toast.showProgress"
          class="toast-progress"
          [style.width.%]="getProgress(toast)"
        ></div>
      </div>
    </div>

    <!-- Demo buttons for Storybook -->
    <div class="demo-buttons" *ngIf="showDemoButtons">
      <button (click)="showSuccess()">Success</button>
      <button (click)="showError()">Error</button>
      <button (click)="showInfo()">Info</button>
      <button (click)="showWarning()">Warning</button>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      max-width: 400px;
    }

    .toast-container.toast-top-right {
      top: 20px;
      right: 20px;
    }

    .toast-container.toast-top-left {
      top: 20px;
      left: 20px;
    }

    .toast-container.toast-bottom-right {
      bottom: 20px;
      right: 20px;
    }

    .toast-container.toast-bottom-left {
      bottom: 20px;
      left: 20px;
    }

    .toast-container.toast-top-center {
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
    }

    .toast-container.toast-bottom-center {
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }

    .toast {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      color: white;
      pointer-events: auto;
      position: relative;
      overflow: hidden;
      animation: slideIn 0.3s ease-out;
    }

    .toast-success {
      background-color: #28a745;
    }

    .toast-error {
      background-color: #dc3545;
    }

    .toast-info {
      background-color: #17a2b8;
    }

    .toast-warning {
      background-color: #ffc107;
      color: #212529;
    }

    .toast-icon {
      margin-right: 12px;
      font-size: 20px;
      flex-shrink: 0;
    }

    .icon-success::before {
      content: '✓';
    }

    .icon-error::before {
      content: '✕';
    }

    .icon-info::before {
      content: 'ℹ';
    }

    .icon-warning::before {
      content: '⚠';
    }

    .toast-content {
      flex: 1;
    }

    .toast-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .toast-message {
      font-size: 14px;
      line-height: 1.4;
    }

    .toast-close {
      background: none;
      border: none;
      color: inherit;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      margin-left: 12px;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .toast-close:hover {
      opacity: 1;
    }

    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      background-color: rgba(255, 255, 255, 0.3);
      transition: width 0.1s linear;
    }

    .demo-buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .demo-buttons button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .demo-buttons button:nth-child(1) {
      background-color: #28a745;
      color: white;
    }

    .demo-buttons button:nth-child(2) {
      background-color: #dc3545;
      color: white;
    }

    .demo-buttons button:nth-child(3) {
      background-color: #17a2b8;
      color: white;
    }

    .demo-buttons button:nth-child(4) {
      background-color: #ffc107;
      color: #212529;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    /* Responsive */
    @media (max-width: 480px) {
      .toast-container {
        left: 10px;
        right: 10px;
        max-width: none;
        transform: none !important;
      }

      .toast {
        margin-bottom: 8px;
      }
    }
  `]
})
/**
 * Toast component implementation class
 *
 * Manages the display and lifecycle of toast notifications. This component:
 * - Subscribes to toast service updates
 * - Tracks progress for each toast
 * - Handles manual dismissal
 * - Provides demo functionality for development
 * - Manages cleanup on component destruction
 */
export class ZtToastComponent implements OnInit, OnDestroy {
  /** Array of currently active toasts to display */
  toasts: ZtToast[] = [];

  /** Subject for managing subscription cleanup */
  private destroy$ = new Subject<void>();

  /** Map tracking timing information for progress calculation */
  private toastTimers: Map<string, { startTime: number; duration: number }> = new Map();

  /**
   * Show demo buttons for testing toast functionality
   * Useful in development and Storybook environments
   */
  @Input() showDemoButtons = false;

  /**
   * Position where toasts should appear on the screen
   * Affects the CSS classes applied to the toast container
   */
  @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-right';

  /**
   * Constructor - injects the toast service for managing notifications
   */
  constructor(private toastService: ZtToastService) {}

  /**
   * Component initialization lifecycle hook
   *
   * Sets up subscription to the toast service and initializes progress tracking
   * for any existing toasts. Uses takeUntil pattern for proper cleanup.
   */
  ngOnInit(): void {
    this.toastService.toasts
      .pipe(takeUntil(this.destroy$))
      .subscribe(toasts => {
        // Track new toasts for progress calculation
        toasts.forEach(toast => {
          if (!this.toastTimers.has(toast.id) && toast.duration && toast.duration > 0) {
            this.toastTimers.set(toast.id, {
              startTime: Date.now(),
              duration: toast.duration
            });
          }
        });

        // Remove timers for toasts that are no longer present
        this.toastTimers.forEach((_, id) => {
          if (!toasts.find(t => t.id === id)) {
            this.toastTimers.delete(id);
          }
        });

        this.toasts = toasts;
      });
  }

  /**
   * Component destruction lifecycle hook
   *
   * Cleans up all subscriptions and timers to prevent memory leaks.
   * This is crucial for proper component lifecycle management.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.toastTimers.clear();
  }

  /**
   * Manually remove a toast notification
   *
   * Called when user clicks the close button on a dismissible toast.
   * Also cleans up the associated timer.
   *
   * @param id - Unique identifier of the toast to remove
   */
  removeToast(id: string): void {
    this.toastService.remove(id);
    this.toastTimers.delete(id);
  }

  /**
   * Calculate progress percentage for a toast
   *
   * Used to display a progress bar showing how much time is remaining
   * before the toast auto-dismisses. Returns 0-100 percentage value.
   *
   * @param toast - Toast object to calculate progress for
   * @returns Progress percentage (0-100)
   */
  getProgress(toast: ZtToast): number {
    if (!toast.duration || toast.duration <= 0) {
      return 0;
    }

    const timer = this.toastTimers.get(toast.id);
    if (!timer) {
      return 100;
    }

    const elapsed = Date.now() - timer.startTime;
    const progress = Math.max(0, 100 - (elapsed / timer.duration) * 100);
    return Math.round(progress);
  }

  // Demo methods for Storybook and development testing

  /**
   * Demo method to show a success toast
   * Used in Storybook and development environments for testing
   */
  showSuccess(): void {
    this.toastService.success('Operation completed successfully!', 'Operation Complete');
  }

  /**
   * Demo method to show an error toast
   * Used in Storybook and development environments for testing
   */
  showError(): void {
    this.toastService.error('An error occurred while processing your request.', 'Error Occurred');
  }

  /**
   * Demo method to show an info toast
   * Used in Storybook and development environments for testing
   */
  showInfo(): void {
    this.toastService.info('Here is some information for you.', 'Information');
  }

  /**
   * Demo method to show a warning toast
   * Used in Storybook and development environments for testing
   */
  showWarning(): void {
    this.toastService.warning('Please be cautious with this action.', 'Caution');
  }
}
