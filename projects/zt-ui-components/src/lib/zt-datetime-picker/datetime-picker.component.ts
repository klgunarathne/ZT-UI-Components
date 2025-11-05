import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeConfig } from '../theme/theme.types';
import { KeyboardNavigationDirective } from '../theme/keyboard-navigation.directive';

/**
 * A comprehensive datetime picker component that provides date and time selection functionality with various styles, themes, and accessibility features.
 *
 * The datetime picker component supports multiple visual variants, sizes, and integrates seamlessly with the ZT-UI-Components theming system.
 * It provides full accessibility support with ARIA attributes, keyboard navigation, and screen reader compatibility.
 *
 * @example
 * <!-- Basic usage with two-way binding -->
 * <zt-datetime-picker [(selectedDate)]="appointmentDate" label="Appointment Date & Time"></zt-datetime-picker>
 *
 * @example
 * <!-- Advanced usage with event handling -->
 * <zt-datetime-picker
 *   [selectedDate]="meetingDate"
 *   [variant]="'rounded'"
 *   [size]="'zt-lg'"
 *   [theme]="'dark'"
 *   [disabled]="false"
 *   [showLabel]="true"
 *   [showTime]="true"
 *   [minDate]="minDate"
 *   [maxDate]="maxDate"
 *   label="Meeting Date & Time"
 *   (dateChange)="onDateChange($event)"
 *   (focus)="onFocus()"
 *   (blur)="onBlur()">
 * </zt-datetime-picker>
 *
 * @example
 * <!-- With theme override -->
 * <zt-datetime-picker [ztTheme]="customTheme" [selectedDate]="eventDate" label="Event Date & Time"></zt-datetime-picker>
 */
@Component({
  selector: 'zt-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, KeyboardNavigationDirective],
  hostDirectives: [KeyboardNavigationDirective],
})
export class DatetimePickerComponent implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef) {}

  /**
   * The currently selected date and time.
   * Supports two-way data binding with `[(selectedDate)]`.
   * @default null
   */
  @Input() selectedDate: Date | null = null;

  /**
   * The start date for range selection.
   * When set, enables range selection mode.
   * @default null
   */
  @Input() startDate: Date | null = null;

  /**
   * The end date for range selection.
   * When set, enables range selection mode.
   * @default null
   */
  @Input() endDate: Date | null = null;

  /**
   * Label for the start date input in range mode.
   * @default 'Start Date'
   */
  @Input() startLabel = 'Start Date';

  /**
   * Label for the end date input in range mode.
   * @default 'End Date'
   */
  @Input() endLabel = 'End Date';

  /**
   * Whether the datetime picker is disabled.
   * When disabled, the picker cannot be interacted with and appears visually muted.
   * @default false
   */
  @Input() disabled = false;

  /**
   * The visual variant of the datetime picker.
   * - 'default': Standard picker with rounded corners
   * - 'rounded': Fully rounded picker (pill-shaped)
   * - 'square': Square picker with minimal rounding
   * @default 'default'
   */
  @Input() variant: 'default' | 'rounded' | 'square' = 'default';

  /**
   * The size of the datetime picker.
   * - 'zt-sm': Small size
   * - 'zt-md': Medium size - default
   * - 'zt-lg': Large size
   * @default 'zt-md'
   */
  @Input() size: 'zt-sm' | 'zt-md' | 'zt-lg' = 'zt-md';

  /**
   * The theme of the datetime picker.
   * Supports predefined themes: light, dark, bootstrap, material.
   * @default 'light'
   * @deprecated Use global theming or ztTheme directive for local overrides
   */
  @Input() theme: 'light' | 'dark' | 'bootstrap' | 'material' = 'light';

  /**
   * Local theme override for this datetime picker component.
   * Allows customizing colors, border radius, and other theme properties for this specific instance.
   * Takes precedence over the global theme.
   */
  @Input() ztTheme?: Partial<ThemeConfig>;

  /**
   * Label text for the datetime picker (accessibility).
   * Used for screen readers and as fallback text when showLabel is false.
   * @default ''
   */
  @Input() label = '';

  /**
   * Whether to show the label text visually next to the datetime picker.
   * When true, displays the label text beside the picker.
   * @default false
   */
  @Input() showLabel = false;

  /**
   * Whether to show time selection in addition to date selection.
   * When true, includes time picker functionality.
   * @default true
   */
  @Input() showTime = true;

  /**
   * The minimum selectable date.
   * Dates before this date will be disabled.
   * @default null
   */
  @Input() minDate: Date | null = null;

  /**
   * The maximum selectable date.
   * Dates after this date will be disabled.
   * @default null
   */
  @Input() maxDate: Date | null = null;

  /**
   * The date format string for display.
   * Uses Angular's date pipe format.
   * @default 'medium'
   */
  @Input() dateFormat = 'medium';

  /**
   * The locale for localization (e.g., 'en', 'es', 'fr').
   * Affects month names, day names, and button labels.
   * @default 'en'
   */
  @Input() locale = 'en';

  /**
   * Emitted when the selected date changes.
   * Provides the new selected date (Date object or null).
   */
  @Output() dateChange = new EventEmitter<Date | null>();

  /**
   * Emitted when the date range changes.
   * Provides the start and end dates as an object { startDate, endDate }.
   */
  @Output() rangeChange = new EventEmitter<{ startDate: Date | null; endDate: Date | null }>();

  /**
   * Emitted when the start date changes.
   * Supports two-way data binding with [(startDate)].
   */
  @Output() startDateChange = new EventEmitter<Date | null>();

  /**
   * Emitted when the end date changes.
   * Supports two-way data binding with [(endDate)].
   */
  @Output() endDateChange = new EventEmitter<Date | null>();

  /**
   * Emitted when the datetime picker receives focus.
   * Useful for tracking user interaction and implementing custom focus behaviors.
   */
  @Output() focus = new EventEmitter<void>();

  /**
   * Emitted when the datetime picker loses focus.
   * Useful for validation, saving state, or triggering side effects.
   */
  @Output() blur = new EventEmitter<void>();

  /**
   * Whether the calendar dropdown is currently open.
   */
  isOpen = false;

  /**
   * Whether the start calendar dropdown is currently open in range mode.
   */
  isStartOpen = false;

  /**
   * Whether the end calendar dropdown is currently open in range mode.
   */
  isEndOpen = false;

  /**
   * The current view date for calendar navigation.
   */
  currentViewDate: Date = new Date();

  /**
   * The current view date for start calendar in range mode.
   */
  currentViewDateStart: Date = new Date();

  /**
   * The current view date for end calendar in range mode.
   */
  currentViewDateEnd: Date = new Date();

  /**
   * Whether range selection mode is enabled.
   */
  @Input() isRangeMode = false;

  /**
   * The selected date formatted for display.
   */
  get formattedDate(): string {
    if (!this.selectedDate) return '';
    return this.formatDate(this.selectedDate);
  }

  /**
   * The start date formatted for display in range mode.
   */
  get formattedStartDate(): string {
    if (!this.startDate) return '';
    return this.formatDate(this.startDate);
  }

  /**
   * The end date formatted for display in range mode.
   */
  get formattedEndDate(): string {
    if (!this.endDate) return '';
    return this.formatDate(this.endDate);
  }

  /**
   * Reference to the input element.
   */
  @ViewChild('dateInput') dateInput?: ElementRef<HTMLInputElement>;

  /**
   * Dynamically applies CSS classes to the datetime picker element
   */
  @HostBinding('class') get datetimePickerClass(): string {
    let classes = [this.size, `theme-${this.theme}`, `zt-datetime-picker-${this.variant}`];
    if (this.disabled) {
      classes.push('zt-datetime-picker-disabled');
    }
    if (this.isOpen) {
      classes.push('zt-datetime-picker-open');
    }
    return classes.join(' ');
  }

  /**
   * Sets the tabindex attribute for keyboard navigation
   */
  @HostBinding('attr.tabindex') get tabIndex(): number {
    return this.disabled ? -1 : 0;
  }

  /**
   * Sets the role attribute for screen readers
   */
  @HostBinding('attr.role') get role(): string {
    return 'combobox';
  }

  /**
   * Sets the aria-expanded attribute for screen readers
   */
  @HostBinding('attr.aria-expanded') get ariaExpanded(): boolean {
    return this.isOpen;
  }

  /**
   * Sets the aria-haspopup attribute for screen readers
   */
  @HostBinding('attr.aria-haspopup') get ariaHaspopup(): string {
    return 'dialog';
  }

  /**
   * Sets the aria-label attribute if no label is provided
   */
  @HostBinding('attr.aria-label') get ariaLabel(): string | null {
    return this.label || null;
  }

  ngOnInit(): void {
    if (this.ztTheme) {
      this.applyLocalTheme();
    }
    if (this.selectedDate) {
      this.currentViewDate = new Date(this.selectedDate);
    }
    if (this.isRangeMode) {
      this.currentViewDateStart = this.startDate ? new Date(this.startDate) : new Date();
      this.currentViewDateEnd = this.endDate ? new Date(this.endDate) : new Date();
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  /**
   * Toggles the calendar dropdown open/closed
   */
  toggleCalendar(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
  }

  /**
   * Toggles the start calendar dropdown in range mode
   */
  toggleStartCalendar(): void {
    if (this.disabled) return;
    this.isStartOpen = !this.isStartOpen;
    this.isEndOpen = false; // Close end calendar if open
  }

  /**
   * Toggles the end calendar dropdown in range mode
   */
  toggleEndCalendar(): void {
    if (this.disabled) return;
    this.isEndOpen = !this.isEndOpen;
    this.isStartOpen = false; // Close start calendar if open
  }

  /**
   * Opens the calendar dropdown
   */
  openCalendar(): void {
    if (this.disabled) return;
    this.isOpen = true;
  }

  /**
   * Closes the calendar dropdown
   */
  closeCalendar(): void {
    this.isOpen = false;
  }

  /**
   * Closes the start calendar dropdown
   */
  closeStartCalendar(): void {
    this.isStartOpen = false;
  }

  /**
   * Closes the end calendar dropdown
   */
  closeEndCalendar(): void {
    this.isEndOpen = false;
  }

  /**
   * Selects a date from the calendar
   */
  selectDate(date: Date): void {
    if (this.isRangeMode) {
      this.selectDateRange(date);
    } else {
      this.selectSingleDate(date);
    }
  }

  /**
   * Selects a date from the start calendar in range mode
   */
  selectStartDate(date: Date): void {
    this.startDate = new Date(date);
    this.currentViewDateStart = new Date(date);
    this.startDateChange.emit(this.startDate);
    this.rangeChange.emit({ startDate: this.startDate, endDate: this.endDate });
  }

  /**
   * Selects a date from the end calendar in range mode
   */
  selectEndDate(date: Date): void {
    this.endDate = new Date(date);
    this.currentViewDateEnd = new Date(date);
    this.endDateChange.emit(this.endDate);
    this.rangeChange.emit({ startDate: this.startDate, endDate: this.endDate });
  }

  /**
   * Selects a single date
   */
  private selectSingleDate(date: Date): void {
    this.selectedDate = new Date(date);
    if (this.showTime) {
      // Preserve time if it exists
      if (this.selectedDate) {
        const hours = this.selectedDate.getHours();
        const minutes = this.selectedDate.getMinutes();
        date.setHours(hours, minutes);
      }
    }
    this.selectedDate = date;
    this.currentViewDate = new Date(date);
    this.dateChange.emit(this.selectedDate);
    // Keep calendar open for time selection or further interaction
  }

  /**
   * Selects a date range (legacy method for backward compatibility)
   */
  private selectDateRange(date: Date): void {
    const selectedDate = new Date(date);

    if (!this.startDate) {
      // First selection - set start date
      this.startDate = selectedDate;
      this.endDate = null;
    } else if (!this.endDate) {
      // Second selection - set end date
      if (selectedDate < this.startDate) {
        // If selected date is before start date, swap them
        this.endDate = this.startDate;
        this.startDate = selectedDate;
      } else {
        this.endDate = selectedDate;
      }
      this.rangeChange.emit({ startDate: this.startDate, endDate: this.endDate });
      // Close calendar after range selection
      this.closeCalendar();
    } else {
      // Reset and start new range
      this.startDate = selectedDate;
      this.endDate = null;
    }

    this.currentViewDate = new Date(selectedDate);
  }

  /**
   * Updates the selected time
   */
  selectTime(hours: number, minutes: number): void {
    if (!this.selectedDate) {
      this.selectedDate = new Date();
    }
    this.selectedDate.setHours(hours, minutes);
    this.dateChange.emit(this.selectedDate);
  }

  /**
   * Updates the start time in range mode
   */
  selectStartTime(hours: number, minutes: number): void {
    if (!this.startDate) {
      this.startDate = new Date();
    }
    this.startDate.setHours(hours, minutes);
    this.startDateChange.emit(this.startDate);
    this.rangeChange.emit({ startDate: this.startDate, endDate: this.endDate });
  }

  /**
   * Updates the end time in range mode
   */
  selectEndTime(hours: number, minutes: number): void {
    if (!this.endDate) {
      this.endDate = new Date();
    }
    this.endDate.setHours(hours, minutes);
    this.endDateChange.emit(this.endDate);
    this.rangeChange.emit({ startDate: this.startDate, endDate: this.endDate });
  }

  /**
   * Navigates to the previous month
   */
  previousMonth(): void {
    this.currentViewDate = new Date(this.currentViewDate.getFullYear(), this.currentViewDate.getMonth() - 1, 1);
  }

  /**
   * Navigates to the next month
   */
  nextMonth(): void {
    this.currentViewDate = new Date(this.currentViewDate.getFullYear(), this.currentViewDate.getMonth() + 1, 1);
  }

  /**
   * Navigates to the previous month for start calendar
   */
  previousMonthStart(): void {
    this.currentViewDateStart = new Date(this.currentViewDateStart.getFullYear(), this.currentViewDateStart.getMonth() - 1, 1);
  }

  /**
   * Navigates to the next month for start calendar
   */
  nextMonthStart(): void {
    this.currentViewDateStart = new Date(this.currentViewDateStart.getFullYear(), this.currentViewDateStart.getMonth() + 1, 1);
  }

  /**
   * Navigates to the previous month for end calendar
   */
  previousMonthEnd(): void {
    this.currentViewDateEnd = new Date(this.currentViewDateEnd.getFullYear(), this.currentViewDateEnd.getMonth() - 1, 1);
  }

  /**
   * Navigates to the next month for end calendar
   */
  nextMonthEnd(): void {
    this.currentViewDateEnd = new Date(this.currentViewDateEnd.getFullYear(), this.currentViewDateEnd.getMonth() + 1, 1);
  }

  /**
   * Gets the days in the current month view
   */
  getDaysInMonth(): Date[] {
    const year = this.currentViewDate.getFullYear();
    const month = this.currentViewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(date);
    }

    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    // Add days from next month to fill the last week
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }

    return days;
  }

  /**
   * Gets the days in the start month view for range mode
   */
  getDaysInMonthStart(): Date[] {
    const year = this.currentViewDateStart.getFullYear();
    const month = this.currentViewDateStart.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(date);
    }

    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    // Add days from next month to fill the last week
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }

    return days;
  }

  /**
   * Gets the days in the end month view for range mode
   */
  getDaysInMonthEnd(): Date[] {
    const year = this.currentViewDateEnd.getFullYear();
    const month = this.currentViewDateEnd.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(date);
    }

    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    // Add days from next month to fill the last week
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }

    return days;
  }

  /**
   * Checks if a date is today
   */
  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  /**
   * Checks if a date is selected
   */
  isSelected(date: Date): boolean {
    if (this.isRangeMode) {
      return this.isDateInRange(date);
    } else {
      if (!this.selectedDate) return false;
      return date.toDateString() === this.selectedDate.toDateString();
    }
  }

  /**
   * Checks if a date is within the selected range
   */
  isDateInRange(date: Date): boolean {
    if (!this.startDate) return false;

    const dateStr = date.toDateString();
    const startStr = this.startDate.toDateString();

    if (this.endDate) {
      const endStr = this.endDate.toDateString();
      return dateStr >= startStr && dateStr <= endStr;
    } else {
      return dateStr === startStr;
    }
  }

  /**
   * Checks if a date is in the current month
   */
  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentViewDate.getMonth();
  }

  /**
   * Checks if a date is in the current month for start calendar
   */
  isCurrentMonthStart(date: Date): boolean {
    return date.getMonth() === this.currentViewDateStart.getMonth();
  }

  /**
   * Checks if a date is in the current month for end calendar
   */
  isCurrentMonthEnd(date: Date): boolean {
    return date.getMonth() === this.currentViewDateEnd.getMonth();
  }

  /**
   * Checks if a date is disabled (outside min/max range)
   */
  isDisabled(date: Date): boolean {
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  /**
   * Handles keyboard events for accessibility
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleCalendar();
        break;
      case 'Escape':
        this.closeCalendar();
        break;
      case 'ArrowDown':
        if (!this.isOpen) {
          event.preventDefault();
          this.openCalendar();
        }
        break;
    }
  }

  /**
   * Handles focus events
   */
  onFocus(): void {
    this.focus.emit();
  }

  /**
   * Handles blur events
   */
  onBlur(): void {
    // Delay closing to allow for calendar interactions
    setTimeout(() => {
      if (!this.elementRef.nativeElement.contains(document.activeElement)) {
        this.closeCalendar();
      }
    }, 150);
    this.blur.emit();
  }

  /**
   * Handles clicks outside the component to close the dropdown
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeCalendar();
    }
    if (this.isStartOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeStartCalendar();
    }
    if (this.isEndOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeEndCalendar();
    }
  }

  /**
   * Formats a date for display
   */
  private formatDate(date: Date): string {
    if (this.showTime) {
      return date.toLocaleString();
    } else {
      return date.toLocaleDateString();
    }
  }

  /**
   * Handles hour selection change
   */
  onHourChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const hours = +target.value;
    this.selectTime(hours, this.selectedDate?.getMinutes() || 0);
  }

  /**
   * Handles minute selection change
   */
  onMinuteChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const minutes = +target.value;
    this.selectTime(this.selectedDate?.getHours() || 0, minutes);
  }

  /**
   * Handles month selection change
   */
  onMonthChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const month = +target.value;
    this.currentViewDate = new Date(this.currentViewDate.getFullYear(), month, 1);
  }

  /**
   * Handles year selection change
   */
  onYearChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const year = +target.value;
    this.currentViewDate = new Date(year, this.currentViewDate.getMonth(), 1);
  }

  /**
   * Handles month selection change for start calendar
   */
  onMonthChangeStart(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const month = +target.value;
    this.currentViewDateStart = new Date(this.currentViewDateStart.getFullYear(), month, 1);
  }

  /**
   * Handles year selection change for start calendar
   */
  onYearChangeStart(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const year = +target.value;
    this.currentViewDateStart = new Date(year, this.currentViewDateStart.getMonth(), 1);
  }

  /**
   * Handles month selection change for end calendar
   */
  onMonthChangeEnd(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const month = +target.value;
    this.currentViewDateEnd = new Date(this.currentViewDateEnd.getFullYear(), month, 1);
  }

  /**
   * Handles year selection change for end calendar
   */
  onYearChangeEnd(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const year = +target.value;
    this.currentViewDateEnd = new Date(year, this.currentViewDateEnd.getMonth(), 1);
  }

  /**
   * Gets localized month names
   */
  getMonthNames(): string[] {
    const months = {
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'es': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    };
    return months[this.locale as keyof typeof months] || months['en'];
  }

  /**
   * Gets localized day names
   */
  getDayNames(): string[] {
    const days = {
      'en': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      'es': ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      'fr': ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    };
    return days[this.locale as keyof typeof days] || days['en'];
  }

  /**
   * Gets localized button labels
   */
  getLocalizedLabels(): { cancel: string; ok: string; from: string; to: string; selectTime: string; hour: string; minute: string } {
    const labels = {
      'en': { cancel: 'Cancel', ok: 'OK', from: 'From', to: 'To', selectTime: 'Select Time', hour: 'Hour', minute: 'Minute' },
      'es': { cancel: 'Cancelar', ok: 'Aceptar', from: 'Desde', to: 'Hasta', selectTime: 'Seleccionar Hora', hour: 'Hora', minute: 'Minuto' },
      'fr': { cancel: 'Annuler', ok: 'OK', from: 'De', to: 'À', selectTime: 'Sélectionner l\'heure', hour: 'Heure', minute: 'Minute' }
    };
    return labels[this.locale as keyof typeof labels] || labels['en'];
  }

  /**
   * Gets range of years for year selector
   */
  getYearRange(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      years.push(year);
    }
    return years;
  }

  /**
   * Adjusts hour by the specified amount
   */
  adjustHour(delta: number): void {
    if (!this.selectedDate) {
      this.selectedDate = new Date();
    }
    const newHour = (this.selectedDate.getHours() + delta + 24) % 24;
    this.selectTime(newHour, this.selectedDate.getMinutes());
  }

  /**
   * Adjusts start hour by the specified amount
   */
  adjustStartHour(delta: number): void {
    if (!this.startDate) {
      this.startDate = new Date();
    }
    const newHour = (this.startDate.getHours() + delta + 24) % 24;
    this.selectStartTime(newHour, this.startDate.getMinutes());
  }

  /**
   * Adjusts end hour by the specified amount
   */
  adjustEndHour(delta: number): void {
    if (!this.endDate) {
      this.endDate = new Date();
    }
    const newHour = (this.endDate.getHours() + delta + 24) % 24;
    this.selectEndTime(newHour, this.endDate.getMinutes());
  }

  /**
   * Adjusts minute by the specified amount
   */
  adjustMinute(delta: number): void {
    if (!this.selectedDate) {
      this.selectedDate = new Date();
    }
    const newMinute = (this.selectedDate.getMinutes() + delta + 60) % 60;
    this.selectTime(this.selectedDate.getHours(), newMinute);
  }

  /**
   * Adjusts start minute by the specified amount
   */
  adjustStartMinute(delta: number): void {
    if (!this.startDate) {
      this.startDate = new Date();
    }
    const newMinute = (this.startDate.getMinutes() + delta + 60) % 60;
    this.selectStartTime(this.startDate.getHours(), newMinute);
  }

  /**
   * Adjusts end minute by the specified amount
   */
  adjustEndMinute(delta: number): void {
    if (!this.endDate) {
      this.endDate = new Date();
    }
    const newMinute = (this.endDate.getMinutes() + delta + 60) % 60;
    this.selectEndTime(this.endDate.getHours(), newMinute);
  }

  /**
   * Handles hour input change
   */
  onHourInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const hour = Math.max(0, Math.min(23, +target.value || 0));
    this.selectTime(hour, this.selectedDate?.getMinutes() || 0);
  }

  /**
   * Handles start hour input change
   */
  onStartHourInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const hour = Math.max(0, Math.min(23, +target.value || 0));
    this.selectStartTime(hour, this.startDate?.getMinutes() || 0);
  }

  /**
   * Handles end hour input change
   */
  onEndHourInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const hour = Math.max(0, Math.min(23, +target.value || 0));
    this.selectEndTime(hour, this.endDate?.getMinutes() || 0);
  }

  /**
   * Handles minute input change
   */
  onMinuteInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const minute = Math.max(0, Math.min(59, +target.value || 0));
    this.selectTime(this.selectedDate?.getHours() || 0, minute);
  }

  /**
   * Handles start minute input change
   */
  onStartMinuteInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const minute = Math.max(0, Math.min(59, +target.value || 0));
    this.selectStartTime(this.startDate?.getHours() || 0, minute);
  }

  /**
   * Handles end minute input change
   */
  onEndMinuteInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const minute = Math.max(0, Math.min(59, +target.value || 0));
    this.selectEndTime(this.endDate?.getHours() || 0, minute);
  }

  /**
   * Sets time to a specific hour and minute
   */
  setTime(hour: number, minute: number): void {
    this.selectTime(hour, minute);
  }

  /**
   * Sets start time to a specific hour and minute
   */
  setStartTime(hour: number, minute: number): void {
    this.selectStartTime(hour, minute);
  }

  /**
   * Sets end time to a specific hour and minute
   */
  setEndTime(hour: number, minute: number): void {
    this.selectEndTime(hour, minute);
  }

  /**
   * Applies local theme override to the component
   */
  private applyLocalTheme(): void {
    if (!this.ztTheme) return;

    const hostElement = this.elementRef.nativeElement;

    if (this.ztTheme.colors) {
      Object.entries(this.ztTheme.colors).forEach(([key, value]) => {
        const cssVar = `--zt-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        hostElement.style.setProperty(cssVar, value);
      });
    }

    if (this.ztTheme.borderRadius !== undefined) {
      hostElement.style.setProperty('--zt-border-radius', `${this.ztTheme.borderRadius}px`);
    }

    if (this.ztTheme.borderSize !== undefined) {
      hostElement.style.setProperty('--zt-border-size', `${this.ztTheme.borderSize}px`);
    }
  }
}
