import { Component, signal } from '@angular/core';
import { ButtonComponent, TimePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-time-picker',
  imports: [ButtonComponent, CodeBlock, DocPager, TimePickerInputComponent],
  templateUrl: './time-picker.html',
  styleUrl: './time-picker.scss',
})
export class TimePicker {
  /**
   * Snippet for importing `TimePickerInputComponent`.
   */
  protected readonly importSnippet = `import { TimePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';

@Component({
  imports: [TimePickerInputComponent]
})`;

  /**
   * Basic usage markup - label, hint and two-way `value` binding.
   */
  protected readonly basicSnippet = `<rng-time-picker-input
  label="Start time"
  hint="12-hour format"
  [(value)]="startTime" />`;

  /**
   * Basic two-way binding handler snippet.
   */
  protected readonly basicTsSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

startTime = signal<DateTime | null>(null);`;

  /**
   * Placeholder markup.
   */
  protected readonly placeholderSnippet = `<rng-time-picker-input
  placeholder="e.g. 03:30 PM"
  [(value)]="startTime" />

<rng-time-picker-input
  label="With label and placeholder"
  placeholder="Select time"
  [(value)]="startTime" />`;

  /**
   * With `hint` markup - helper text below the field.
   */
  protected readonly hintSnippet = `<rng-time-picker-input
  label="Start time"
  hint="12-hour format with AM/PM"
  [(value)]="startTime" />`;

  /**
   * Error state markup - `error` + `errorMessage` overrides `hint`.
   */
  protected readonly errorSnippet = `<rng-time-picker-input
  label="Meeting time"
  [error]="true"
  errorMessage="Please select a valid time" />`;

  /**
   * Hint vs errorMessage markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-time-picker-input
  label="Start time"
  hint="Choose a time"
  [(value)]="startTime" />

<!-- error overrides hint -->
<rng-time-picker-input
  label="Start time"
  hint="Choose a time"
  [error]="true"
  errorMessage="Time is required" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-time-picker-input
  label="Start time"
  placeholder="Select time"
  [disabled]="true" />

<rng-time-picker-input
  label="Disabled with value"
  [disabled]="true"
  [value]="selectedTime" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-time-picker-input
  label="Start time"
  [required]="true"
  [(value)]="startTime" />`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-time-picker-input
  label="Start time"
  name="startTime"
  [(value)]="startTime" />`;

  /**
   * Pre-set value markup - initializing from an existing DateTime.
   */
  protected readonly presetSnippet = `<rng-time-picker-input
  label="Morning standup"
  [value]="morningTime" />

<rng-time-picker-input
  label="Afternoon review"
  [value]="afternoonTime" />`;

  /**
   * Handler for the pre-set value demo.
   */
  protected readonly presetTsSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

morningTime = signal<DateTime | null>(DateTime.fromObject({ hour: 9, minute: 15 }));
afternoonTime = signal<DateTime | null>(DateTime.fromObject({ hour: 15, minute: 45 })); // 03:45 PM`;

  /**
   * Time controls note - hours, minutes and AM/PM are merged via an effect.
   */
  protected readonly timeControlsSnippet = `<!-- Hours 01-12 + empty, Minutes 00-59 + empty, AM/PM via button-group -->
<rng-time-picker-input
  label="Start time"
  [(value)]="startTime" />

<!-- Value is DateTime.fromObject({ hour, minute }) with 12h conversion -->
<!-- 03 PM -> 15:00, 12 AM -> 00:00, empty hour/minute -> null -->`;

  /**
   * Two-way binding and `valueChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-time-picker-input [(value)]="selectedTime" label="Start time" />

<!-- Explicit output handling -->
<rng-time-picker-input
  [value]="selectedTime()"
  (valueChange)="onTimeChange($event)"
  label="Start time" />`;

  /**
   * Handler for `valueChange`.
   */
  protected readonly valueChangeTsSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

selectedTime = signal<DateTime | null>(null);

onTimeChange(time: DateTime | null): void {
  this.selectedTime.set(time);
  console.log('selected:', time?.toFormat('hh:mm a'));
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { TimePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';

@Component({
  imports: [TimePickerInputComponent]
})
export class ExampleComponent {
  form = form({
    startTime: null as DateTime | null,
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-time-picker-input
  label="Start time"
  [formField]="form.controls.startTime" />`;

  /**
   * Resetting the value by resetting the model to `null`.
   */
  protected readonly clearSnippet = `import { signal } from '@angular/core';
import { DateTime } from 'luxon';

startTime = signal<DateTime | null>(DateTime.fromObject({ hour: 14, minute: 30 }));

clear(): void {
  this.startTime.set(null);
}`;

  /**
   * Full example combining label, hint and live value display.
   */
  protected readonly fullSnippet = `<rng-time-picker-input
  label="Meeting time"
  hint="12-hour format"
  [(value)]="meetingTime" />

@if (meetingTime()) {
  <p>Selected: {{ meetingTime()?.toFormat('hh:mm a') }}</p>
}`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { TimePickerInputComponent } from '@im4all/roolith-ng';
import { DateTime } from 'luxon';

@Component({
  imports: [TimePickerInputComponent]
})
export class ExampleComponent {
  meetingTime = signal<DateTime | null>(null);
  eventTime = signal<DateTime | null>(DateTime.fromObject({ hour: 15, minute: 30 }));
}`;

  protected basicTime = signal<DateTime | null>(null);
  protected hintTime = signal<DateTime | null>(null);
  protected placeholderTime = signal<DateTime | null>(null);
  protected errorTime = signal<DateTime | null>(null);
  protected disabledTime = signal<DateTime | null>(DateTime.fromObject({ hour: 15, minute: 30 }));
  protected requiredTime = signal<DateTime | null>(null);
  protected nameTime = signal<DateTime | null>(null);
  protected presetTime = signal<DateTime | null>(DateTime.fromObject({ hour: 9, minute: 15 }));
  protected presetAfternoon = signal<DateTime | null>(DateTime.fromObject({ hour: 15, minute: 45 }));
  protected twoWayTime = signal<DateTime | null>(null);
  protected fullTime = signal<DateTime | null>(null);
  protected eventTime = signal<DateTime | null>(null);

  // Expose DateTime for template use if needed (formatting helpers).
  protected readonly DateTime = DateTime;

  /**
   * Handles `valueChange` from the two-way binding demo.
   *
   * @param time The newly selected time.
   *
   * @returns void
   */
  protected onTimeChange(time: DateTime | null): void {
    this.twoWayTime.set(time);
  }

  /**
   * Clears the full example times.
   *
   * @returns void
   */
  protected clearFullTime(): void {
    this.fullTime.set(null);
    this.eventTime.set(null);
  }
}
