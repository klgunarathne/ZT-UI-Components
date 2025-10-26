/**
 * ZT-UI Components Toast Service
 *
 * A comprehensive service for managing toast notifications in Angular applications.
 * Provides methods for displaying different types of toasts with customizable options.
 *
 * Features:
 * - Multiple toast types (success, error, info, warning)
 * - Configurable duration and auto-dismiss
 * - Multiple positioning options
 * - Progress indicators
 * - Manual dismissal controls
 * - Reactive state management with RxJS
 *
 * @example
 * ```typescript
 * constructor(private toastService: ZtToastService) {}
 *
 * showSuccess() {
 *   this.toastService.success('Operation completed!', 'Success');
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
export interface ZtToast {
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
export class ZtToastService {
  /** Internal subject managing the current list of active toasts */
  private toasts$ = new BehaviorSubject<ZtToast[]>([]);

  /**
   * Observable stream of current toasts
   * Components can subscribe to this to reactively display toasts
   */
  get toasts(): Observable<ZtToast[]> {
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
  show(toast: Omit<ZtToast, 'id'>): void {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ZtToast = {
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
  success(message: string, title?: string, options?: Partial<ZtToast>): void {
    this.show({ ...options, type: 'success', message, title });
  }

  /**
   * Show an error toast notification
   *
   * @param message - Main message content
   * @param title - Optional title (defaults to 'Error')
   * @param options - Additional toast configuration options
   */
  error(message: string, title?: string, options?: Partial<ZtToast>): void {
    this.show({ ...options, type: 'error', message, title });
  }

  /**
   * Show an info toast notification
   *
   * @param message - Main message content
   * @param title - Optional title (defaults to 'Info')
   * @param options - Additional toast configuration options
   */
  info(message: string, title?: string, options?: Partial<ZtToast>): void {
    this.show({ ...options, type: 'info', message, title });
  }

  /**
   * Show a warning toast notification
   *
   * @param message - Main message content
   * @param title - Optional title (defaults to 'Warning')
   * @param options - Additional toast configuration options
   */
  warning(message: string, title?: string, options?: Partial<ZtToast>): void {
    this.show({ ...options, type: 'warning', message, title });
  }
}
