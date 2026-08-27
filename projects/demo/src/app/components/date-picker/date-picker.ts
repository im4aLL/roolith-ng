import { Component, signal } from '@angular/core';
import { DatePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-date-picker',
  imports: [CodeBlock, DocPager, DatePickerInputComponent],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
})
export class DatePicker {
  /**
   * Snippet for importing `DatePickerInputComponent`.
   */
  protected readonly importSnippet = `import { DatePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';

@Component({
  imports: [DatePickerInputComponent]
})`;

  /**
   * Basic usage markup - label, placeholder and two-way `value` binding.
   */
  protected readonly basicSnippet = `<rng-date-picker-input
  label="Start date"
  placeholder="e.g. Jan 1, 2024"
  [(value)]="startDate" />`;

  /**
   * Basic two-way binding handler snippet.
   */
  protected readonly basicTsSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

startDate = signal<DateTime | null>(null);`;

  /**
   * With `hint` markup - helper text below the field.
   */
  protected readonly hintSnippet = `<rng-date-picker-input
  label="Start date"
  hint="Choose a date within the next 30 days"
  [(value)]="startDate" />`;

  /**
   * Custom display `format` markup using Luxon `DateTimeFormatOptions`.
   */
  protected readonly formatSnippet = `<rng-date-picker-input
  label="Date of birth"
  [format]="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
  [(value)]="birthDate" />`;

  /**
   * Handler for the custom format demo.
   */
  protected readonly formatTsSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

birthDate = signal<DateTime | null>(DateTime.fromISO('1990-06-15'));`;

  /**
   * Error state markup - `error` + `errorMessage` overrides `hint`.
   */
  protected readonly errorSnippet = `<rng-date-picker-input
  label="Event date"
  [error]="true"
  errorMessage="Please select a valid date" />`;

  /**
   * Hint vs errorMessage markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-date-picker-input
  label="Start date"
  hint="Choose a future date"
  [(value)]="startDate" />

<!-- error overrides hint -->
<rng-date-picker-input
  label="Start date"
  hint="Choose a future date"
  [error]="true"
  errorMessage="Date is required" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-date-picker-input
  label="Start date"
  placeholder="Select date"
  [disabled]="true" />

<rng-date-picker-input
  label="Disabled with value"
  [disabled]="true"
  [value]="selectedDate" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-date-picker-input
  label="Start date"
  [required]="true"
  [(value)]="startDate" />`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-date-picker-input
  label="Start date"
  name="startDate"
  [(value)]="startDate" />`;

  /**
   * Placeholder markup.
   */
  protected readonly placeholderSnippet = `<rng-date-picker-input
  placeholder="e.g. Jan 1, 2024"
  [(value)]="startDate" />

<rng-date-picker-input
  label="With label and placeholder"
  placeholder="Select a date"
  [(value)]="startDate" />`;

  /**
   * Two-way binding and `valueChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-date-picker-input [(value)]="selectedDate" label="Start date" />

<!-- Explicit output handling -->
<rng-date-picker-input
  [value]="selectedDate()"
  (valueChange)="onDateChange($event)"
  label="Start date" />`;

  /**
   * Handler for `valueChange`.
   */
  protected readonly valueChangeTsSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

selectedDate = signal<DateTime | null>(null);

onDateChange(date: DateTime | null): void {
  this.selectedDate.set(date);
  console.log('selected:', date?.toISODate());
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { DatePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';

@Component({
  imports: [DatePickerInputComponent]
})
export class ExampleComponent {
  form = form({
    startDate: null as DateTime | null,
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-date-picker-input
  label="Start date"
  [formField]="form.controls.startDate" />`;

  /**
   * Clearing the value via `clearInput()` or resetting the model.
   */
  protected readonly clearSnippet = `import { viewChild } from '@angular/core';
import { DatePickerInputComponent } from '@im4all/roolith-ng';

@Component({ ... })
export class ExampleComponent {
  datePicker = viewChild(DatePickerInputComponent);

  clear(): void {
    this.datePicker()?.clearInput();
    // or reset the model directly
    // this.startDate.set(null);
  }
}`;

  /**
   * Full example combining label, placeholder, format, hint and error handling.
   */
  protected readonly fullSnippet = `<rng-date-picker-input
  label="Event date"
  placeholder="Select event date"
  hint="Must be a future date"
  [format]="{ year: 'numeric', month: 'long', day: 'numeric' }"
  [(value)]="eventDate" />

@if (eventDate()) {
  <p>Selected: {{ eventDate()?.toISODate() }}</p>
}`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { DatePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';

@Component({
  imports: [DatePickerInputComponent]
})
export class ExampleComponent {
  eventDate = signal<DateTime | null>(null);
  birthDate = signal<DateTime | null>(DateTime.fromISO('1990-06-15'));
}`;

  protected basicDate = signal<DateTime | null>(null);
  protected hintDate = signal<DateTime | null>(null);
  protected formatDate = signal<DateTime | null>(DateTime.fromISO('1990-06-15'));
  protected formatDateNumeric = signal<DateTime | null>(DateTime.fromISO('1990-06-15'));
  protected errorDate = signal<DateTime | null>(null);
  protected disabledDate = signal<DateTime | null>(DateTime.fromISO('2024-06-15'));
  protected requiredDate = signal<DateTime | null>(null);
  protected nameDate = signal<DateTime | null>(null);
  protected placeholderDate = signal<DateTime | null>(null);
  protected twoWayDate = signal<DateTime | null>(null);
  protected fullDate = signal<DateTime | null>(null);
  protected eventDate = signal<DateTime | null>(null);

  // Expose DateTime for template use if needed (formatting helpers).
  protected readonly DateTime = DateTime;

  /**
   * Handles `valueChange` from the two-way binding demo.
   *
   * @param date The newly selected date.
   *
   * @returns void
   */
  protected onDateChange(date: DateTime | null): void {
    this.twoWayDate.set(date);
  }

  /**
   * Clears the full example date.
   *
   * @returns void
   */
  protected clearFullDate(): void {
    this.fullDate.set(null);
    this.eventDate.set(null);
  }
}
