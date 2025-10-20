import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Modal sizes enumeration
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

/**
 * Modal component for displaying content in an overlay dialog.
 *
 * @example
 * ```typescript
 * <zt-modal
 *   [isOpen]="showModal"
 *   [size]="'md'"
 *   [title]="'Confirmation'"
 *   [closable]="true"
 *   [backdropClosable]="true"
 *   (onClose)="handleClose()"
 *   (onOpen)="handleOpen()">
 *
 *   <div modal-header>
 *     <h3>Modal Title</h3>
 *   </div>
 *
 *   <div modal-body>
 *     <p>Modal content goes here...</p>
 *   </div>
 *
 *   <div modal-footer>
 *     <button (click)="closeModal()">Close</button>
 *     <button (click)="confirmAction()">Confirm</button>
 *   </div>
 *
 * </zt-modal>
 * ```
 */
@Component({
  selector: 'zt-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zt-modal.component.html',
  styleUrls: ['./zt-modal.component.scss'],
})
export class ZtModalComponent implements OnInit, OnDestroy {
  /**
   * Controls modal visibility
   */
  @Input() isOpen: boolean = false;

  /**
   * Modal title
   */
  @Input() title: string = '';

  /**
   * Modal size
   */
  @Input() size: ModalSize = 'md';

  /**
   * Modal theme
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * Allow modal to be closed via close button or escape key
   */
  @Input() closable: boolean = true;

  /**
   * Allow modal to be closed by clicking backdrop
   */
  @Input() backdropClosable: boolean = true;

  /**
   * Custom CSS classes for the modal
   */
  @Input() customClass: string = '';

  /**
   * Z-index for the modal overlay
   */
  @Input() zIndex: number = 1050;

  /**
   * Event emitted when modal is closed
   */
  @Output() onClose = new EventEmitter<void>();

  /**
   * Event emitted when modal is opened
   */
  @Output() onOpen = new EventEmitter<void>();

  /**
   * Event emitted before modal is closed
   */
  @Output() onBeforeClose = new EventEmitter<void>();

  private previousActiveElement: Element | null = null;

  ngOnInit(): void {
    if (this.isOpen) {
      this.open();
    }
  }

  ngOnDestroy(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  /**
   * Opens the modal
   */
  open(): void {
    if (this.isOpen) return;

    this.previousActiveElement = document.activeElement as Element;
    this.isOpen = true;
    document.body.style.overflow = 'hidden';

    // Focus management for accessibility
    setTimeout(() => {
      const modalElement = this.elementRef.nativeElement.querySelector('.modal');
      if (modalElement) {
        const focusableElement = modalElement.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        if (focusableElement) {
          focusableElement.focus();
        }
      }
    }, 100);

    this.onOpen.emit();
  }

  /**
   * Closes the modal
   */
  close(): void {
    if (!this.isOpen) return;

    this.onBeforeClose.emit();

    this.isOpen = false;
    document.body.style.overflow = '';

    // Restore focus to the previously active element
    if (this.previousActiveElement) {
      (this.previousActiveElement as HTMLElement).focus();
    }
  }

  /**
   * Handles backdrop click
   */
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget && this.backdropClosable) {
      this.close();
    }
  }

  /**
   * Handles close button click
   */
  onCloseClick(): void {
    if (this.closable) {
      this.close();
    }
  }

  /**
   * Handle escape key press
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.isOpen && this.closable) {
      const keyboardEvent = event as KeyboardEvent;
      keyboardEvent.preventDefault();
      this.close();
    }
  }

  /**
   * Handle tab key for focus trap
   */
  @HostListener('document:keydown.tab', ['$event'])
  onTabKey(event: Event): void {
    if (!this.isOpen) return;

    const keyboardEvent = event as KeyboardEvent;
    const modalElement = this.elementRef.nativeElement.querySelector('.modal');
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (keyboardEvent.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        keyboardEvent.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        keyboardEvent.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Gets the CSS class for modal size
   */
  getModalSizeClass(): string {
    const baseClass = 'modal-dialog';
    const sizeClass = this.size === 'md' ? '' : `modal-${this.size}`;
    const themeClass = `theme-${this.theme}`;
    const customClass = this.customClass ? ` ${this.customClass}` : '';
    return `${baseClass} ${sizeClass} ${themeClass}${customClass}`.trim();
  }

  /**
   * Checks if modal has body content
   */
  hasBodyContent(): boolean {
    // This would need ViewChild or ContentChildren to properly detect
    // For now, return true to always show body
    return true;
  }

  /**
   * Checks if modal has footer content
   */
  hasFooterContent(): boolean {
    // This would need ViewChild or ContentChildren to properly detect
    // For now, return true to always show footer if it has content
    return true;
  }

  constructor(private elementRef: ElementRef) {}
}
