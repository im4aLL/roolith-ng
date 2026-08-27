import { Component, signal } from '@angular/core';
import { DateTimePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-date-time-picker',
  imports: [CodeBlock, DocPager, DateTimePickerInputComponent],
  templateUrl: './date-time-picker.html',
  styleUrl: './date-time-picker.scss',
})
export class DateTimePicker {
  /**
   * Snippet for importing `DateTimePickerInputComponent`.
   */
  protected readonly importSnippet = `import { DateTimePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';

@Component({
  imports: [DateTimePickerInputComponent]
})`;

  /**
   * Basic usage markup - label, placeholder and two-way `value` binding.
   */
  protected readonly basicSnippet = `<rng-date-time-picker-input
  label="Schedule"
  placeholder="Select date and time..."
  [(value)]="scheduledAt" />`;

  /**
   * Basic two-way binding handler snippet.
   */
  protected readonly basicTsSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

scheduledAt = signal<DateTime | null>(null);`;

  /**
   * With `hint` markup - helper text below the field.
   */
  protected readonly hintSnippet = `<rng-date-time-picker-input
  label="Schedule"
  hint="Choose a date and time in the next 7 days"
  [(value)]="scheduledAt" />`;

  /**
   * Custom display `format` markup using Luxon `DateTimeFormatOptions`.
   */
  protected readonly formatSnippet = `<rng-date-time-picker-input
  label="Appointment"
  [format]="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
  [(value)]="appointmentAt" />`;

  /**
   * Handler for the custom format demo.
   */
  protected readonly formatTsSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

appointmentAt = signal<DateTime | null>(DateTime.fromISO('2024-06-15T14:30:00'));`;

  /**
   * Error state markup - `error` + `errorMessage` overrides `hint`.
   */
  protected readonly errorSnippet = `<rng-date-time-picker-input
  label="Schedule"
  [error]="true"
  errorMessage="Please select a valid date and time" />`;

  /**
   * Hint vs errorMessage markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-date-time-picker-input
  label="Schedule"
  hint="Choose a future date and time"
  [(value)]="scheduledAt" />

<!-- error overrides hint -->
<rng-date-time-picker-input
  label="Schedule"
  hint="Choose a future date and time"
  [error]="true"
  errorMessage="Date and time are required" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-date-time-picker-input
  label="Schedule"
  placeholder="Select date and time"
  [disabled]="true" />

<rng-date-time-picker-input
  label="Disabled with value"
  [disabled]="true"
  [value]="selectedDateTime" />`;

  /**
   * Readonly state markup.
   */
  protected readonly readonlySnippet = `<rng-date-time-picker-input
  label="Schedule"
  [readonly]="true"
  [(value)]="scheduledAt" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-date-time-picker-input
  label="Schedule"
  [required]="true"
  [(value)]="scheduledAt" />`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-date-time-picker-input
  label="Schedule"
  name="scheduledAt"
  [(value)]="scheduledAt" />`;

  /**
   * Placeholder markup.
   */
  protected readonly placeholderSnippet = `<rng-date-time-picker-input
  placeholder="e.g. Jun 15, 2024 03:30 PM"
  [(value)]="scheduledAt" />

<rng-date-time-picker-input
  label="With label and placeholder"
  placeholder="Select date and time"
  [(value)]="scheduledAt" />`;

  /**
   * Pre-set value markup - initializing from an existing DateTime.
   */
  protected readonly presetSnippet = `<rng-date-time-picker-input
  label="Start date & time"
  [value]="existingDateTime" />`;

  /**
   * Handler for the pre-set value demo.
   */
  protected readonly presetTsSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

existingDateTime = signal<DateTime | null>(DateTime.fromISO('2024-06-15T14:30:00'));`;

  /**
   * Time selection note - picking date closes popover, time stays inline.
   */
  protected readonly timeSelectionSnippet = `<!-- Date selection closes the popover; time is adjusted inline -->
<rng-date-time-picker-input
  label="Schedule"
  [(value)]="scheduledAt" />

<!-- Selected value includes both date and time -->
<!-- e.g. 2024-06-15T15:30:00.000+06:00 -->`;

  /**
   * Two-way binding and `valueChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-date-time-picker-input [(value)]="selectedDateTime" label="Schedule" />

<!-- Explicit output handling -->
<rng-date-time-picker-input
  [value]="selectedDateTime()"
  (valueChange)="onDateTimeChange($event)"
  label="Schedule" />`;

  /**
   * Handler for `valueChange`.
   */
  protected readonly valueChangeTsSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

selectedDateTime = signal<DateTime | null>(null);

onDateTimeChange(date: DateTime | null): void {
  this.selectedDateTime.set(date);
  console.log('selected:', date?.toISO());
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { DateTimePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';

@Component({
  imports: [DateTimePickerInputComponent]
})
export class ExampleComponent {
  form = form({
    scheduledAt: null as DateTime | null,
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-date-time-picker-input
  label="Schedule"
  [formField]="form.controls.scheduledAt" />`;

  /**
   * Resetting the value by resetting the model to `null`.
   */
  protected readonly clearSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

scheduledAt = signal<DateTime | null>(DateTime.fromISO('2024-06-15T14:30:00'));

clear(): void {
  this.scheduledAt.set(null);
}`;

  /**
   * Full example combining label, placeholder, format, hint and time display.
   */
  protected readonly fullSnippet = `<rng-date-time-picker-input
  label="Event schedule"
  placeholder="Select date and time"
  hint="Must be a future date and time"
  [format]="{ year: 'numeric', month: 'long', day: 'numeric' }"
  [(value)]="eventDateTime" />

@if (eventDateTime()) {
  <p>Selected: {{ eventDateTime()?.toISO() }}</p>
}`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { DateTimePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';

@Component({
  imports: [DateTimePickerInputComponent]
})
export class ExampleComponent {
  eventDateTime = signal<DateTime | null>(null);
  appointmentAt = signal<DateTime | null>(DateTime.fromISO('2024-06-15T14:30:00'));
}`;

  protected basicDateTime = signal<DateTime | null>(null);
  protected hintDateTime = signal<DateTime | null>(null);
  protected formatDateTime = signal<DateTime | null>(DateTime.fromISO('2024-06-15T14:30:00'));
  protected formatDateTimeNumeric = signal<DateTime | null>(DateTime.fromISO('1990-06-15T09:15:00'));
  protected errorDateTime = signal<DateTime | null>(null);
  protected disabledDateTime = signal<DateTime | null>(DateTime.fromISO('2024-06-15T15:30:00'));
  protected readonlyDateTime = signal<DateTime | null>(DateTime.fromISO('2024-06-15T09:00:00'));
  protected requiredDateTime = signal<DateTime | null>(null);
  protected nameDateTime = signal<DateTime | null>(null);
  protected placeholderDateTime = signal<DateTime | null>(null);
  protected presetDateTime = signal<DateTime | null>(DateTime.fromISO('2024-06-15T14:30:00'));
  protected twoWayDateTime = signal<DateTime | null>(null);
  protected fullDateTime = signal<DateTime | null>(null);
  protected eventDateTime = signal<DateTime | null>(null);

  // Expose DateTime for template use if needed (formatting helpers).
  protected readonly DateTime = DateTime;

  /**
   * Handles `valueChange` from the two-way binding demo.
   *
   * @param date The newly selected date and time.
   *
   * @returns void
   */
  protected onDateTimeChange(date: DateTime | null): void {
    this.twoWayDateTime.set(date);
  }

  /**
   * Clears the full example date and time.
   *
   * @returns void
   */
  protected clearFullDateTime(): void {
    this.fullDateTime.set(null);
    this.eventDateTime.set(null);
  }
}
