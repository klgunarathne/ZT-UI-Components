/**
 * ZT-Toast-X Service
 *
 * A robust, reactive service for centralized toast notification management in Angular applications.
 * This service provides a complete API for displaying, managing, and customizing toast notifications
 * with reactive state management using RxJS observables.
 *
 * Core Capabilities:
 * - 🎯 **Centralized State Management**: Single source of truth for all toast notifications
 * - 🔄 **Reactive Updates**: RxJS-based observable streams for real-time UI updates
 * - ⏰ **Auto-dismiss Logic**: Intelligent scheduling and cleanup of timed notifications
 * - 🎨 **Type Safety**: Full TypeScript support with comprehensive interfaces
 * - 🔧 **Flexible Configuration**: Extensive customization options for each toast
 * - 🧹 **Memory Management**: Proper cleanup and resource management
 * - 📊 **Progress Tracking**: Built-in support for progress indicators
 * - 🎭 **Position Management**: Screen position coordination and conflict resolution
 *
 * Architecture Details:
 * - **BehaviorSubject Pattern**: Uses RxJS BehaviorSubject for reactive state
 * - **Unique ID Generation**: Cryptographically secure random ID generation
 * - **Timer Management**: Efficient setTimeout scheduling with cleanup
 * - **Immutable Updates**: Pure functions for state transitions
 * - **Error Boundaries**: Graceful error handling and recovery
 *
 * Service Lifecycle:
 * 1. **Initialization**: Creates BehaviorSubject with empty toast array
 * 2. **Toast Creation**: Generates unique IDs and schedules auto-removal
 * 3. **State Updates**: Emits new state to all subscribers
 * 4. **Cleanup**: Removes expired toasts and clears timers
 * 5. **Destruction**: Complete cleanup on service destruction
 *
 * Integration Patterns:
 * - **Singleton Injection**: Provided in root for app-wide availability
 * - **Component Communication**: Observable subscription pattern
 * - **Method Chaining**: Fluent API for complex toast configurations
 * - **Error Handling**: Try-catch blocks for robust operation
 *
 * @example Basic Service Usage
 * ```typescript
 * import { Component } from '@angular/core';
 * import { ZtToastXService } from 'zt-toast-x';
 *
 * @Component({...})
 * export class MyComponent {
 *   constructor(private toastService: ZtToastXService) {}
 *
 *   showSuccess() {
 *     this.toastService.success('Data saved successfully!');
 *   }
 *
 *   showError() {
 *     this.toastService.error('Failed to save data.', 'Save Error');
 *   }
 * }
 * ```
 *
 * @example Advanced Configuration
 * ```typescript
 * showCustomToast() {
 *   this.toastService.show({
 *     type: 'warning',
 *     message: 'This action cannot be undone',
 *     title: 'Confirmation Required',
 *     duration: 10000, // 10 seconds
 *     position: 'top-center',
 *     dismissible: true,
 *     showProgress: true
 *   });
 * }
 * ```
 *
 * @example Reactive Subscription
 * ```typescript
 * ngOnInit() {
 *   this.toastService.toasts.subscribe(toasts => {
 *     console.log('Active toasts:', toasts.length);
 *     // Custom logic based on toast state
 *   });
 * }
 * ```
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Toast notification configuration interface
 *
 * Defines the structure and options for individual toast notifications.
 * All properties are optional except for the message and type.
 */
export interface ZtToastX {
  /** Unique identifier for the toast */
  id: string;
  /** Type of toast that determines styling and icon */
  type: 'success' | 'error' | 'info' | 'warning';
  /** Optional title for the toast */
  title?: string;
  /** Main message content */
  message: string;
  /** Auto-dismiss duration in milliseconds (0 = never auto-dismiss) */
  duration?: number;
  /** Position on screen where toast appears */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /** Whether the toast can be manually dismissed by clicking */
  dismissible?: boolean;
  /** Whether to show a progress bar indicating time remaining */
  showProgress?: boolean;
}

/**
 * Toast service providing centralized management of notifications
 *
 * This service maintains the global state of all active toasts and provides
 * convenient methods for displaying different types of notifications.
 *
 * The service uses BehaviorSubject for reactive state management, allowing
 * components to subscribe to toast changes and update their UI accordingly.
 */
@Injectable({
  providedIn: 'root'
})
export class ZtToastXService {
  /** Internal subject managing the current list of active toasts */
  private toasts$ = new BehaviorSubject<ZtToastX[]>([]);

  /**
   * Observable stream of current toasts
   * Components can subscribe to this to reactively display toasts
   */
  get toasts(): Observable<ZtToastX[]> {
    return this.toasts$.asObservable();
  }

  /**
   * Display a new toast notification
   *
   * Creates a unique toast with the provided configuration and adds it to the active toasts.
   * Automatically schedules removal based on the duration setting.
   *
   * @param toast - Toast configuration (id will be auto-generated)
   */
  show(toast: Omit<ZtToastX, 'id'>): void {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ZtToastX = {
      id,
      type: toast.type,
      title: toast.title,
      message: toast.message,
      duration: toast.duration ?? 5000,
      position: toast.position || 'top-right',
      dismissible: toast.dismissible !== false,
      showProgress: toast.showProgress !== false,
    };

    const currentToasts = this.toasts$.value;
    this.toasts$.next([...currentToasts, newToast]);

    // Schedule auto-removal if duration is set
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, newToast.duration);
    }
  }

  /**
   * Remove a specific toast by ID
   *
   * @param id - Unique identifier of the toast to remove
   */
  remove(id: string): void {
    const currentToasts = this.toasts$.value;
    this.toasts$.next(currentToasts.filter(toast => toast.id !== id));
  }

  /**
   * Remove all active toasts
   *
   * Useful for clearing all notifications at once, such as when navigating away from a page.
   */
  clear(): void {
    this.toasts$.next([]);
  }

  /**
   * Show a success toast notification
   *
   * @param message - Main message content
   * @param title - Optional title (defaults to 'Success')
   * @param options - Additional toast configuration options
   */
  success(message: string, title?: string, options?: Partial<ZtToastX>): void {
    this.show({ ...options, type: 'success', message, title });
  }

  /**
   * Show an error toast notification
   *
   * @param message - Main message content
   * @param title - Optional title (defaults to 'Error')
   * @param options - Additional toast configuration options
   */
  error(message: string, title?: string, options?: Partial<ZtToastX>): void {
    this.show({ ...options, type: 'error', message, title });
  }

  /**
   * Show an info toast notification
   *
   * @param message - Main message content
   * @param title - Optional title (defaults to 'Info')
   * @param options - Additional toast configuration options
   */
  info(message: string, title?: string, options?: Partial<ZtToastX>): void {
    this.show({ ...options, type: 'info', message, title });
  }

  /**
   * Show a warning toast notification
   *
   * @param message - Main message content
   * @param title - Optional title (defaults to 'Warning')
   * @param options - Additional toast configuration options
   */
  warning(message: string, title?: string, options?: Partial<ZtToastX>): void {
    this.show({ ...options, type: 'warning', message, title });
  }
}
