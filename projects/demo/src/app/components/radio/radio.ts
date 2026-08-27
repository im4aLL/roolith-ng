import { Component, signal } from '@angular/core';
import { ButtonComponent, RadioInputComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-radio',
  imports: [CodeBlock, DocPager, RadioInputComponent, ButtonComponent],
  templateUrl: './radio.html',
  styleUrl: './radio.scss',
})
export class Radio {
  /**
   * Snippet for importing `RadioInputComponent`.
   */
  protected readonly importSnippet = `import { RadioInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [RadioInputComponent]
})`;

  /**
   * `IRadioOption` interface shape.
   */
  protected readonly interfaceSnippet = `interface IRadioOption {
  label: string;
  value: string | number;
}`;

  /**
   * Basic usage markup - options, label, hint and `value` binding.
   */
  protected readonly basicSnippet = `<rng-radio-input
  [options]="options"
  label="Preferred contact"
  hint="We will only use this to reach you"
  [(value)]="selectedValue" />`;

  /**
   * Basic setup - options array and signal state.
   */
  protected readonly basicTsSnippet = `import { signal } from '@angular/core';
import { IRadioOption } from '@im4all/roolith-ng';

options: IRadioOption[] = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'SMS', value: 'sms' },
];

selectedValue = signal<string | number | null>('email');`;

  /**
   * Inline layout markup - horizontal options.
   */
  protected readonly inlineSnippet = `<rng-radio-input
  [options]="sizeOptions"
  label="Size"
  [inline]="true"
  [(value)]="selectedSize" />`;

  /**
   * Handler for inline layout options.
   */
  protected readonly inlineTsSnippet = `sizeOptions: IRadioOption[] = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

selectedSize = signal<string | number | null>('medium');`;

  /**
   * Label markup - group label above the radios.
   */
  protected readonly labelSnippet = `<rng-radio-input
  [options]="options"
  label="Preferred contact"
  [(value)]="selectedValue" />`;

  /**
   * Hint markup - helper text below the group.
   */
  protected readonly hintSnippet = `<rng-radio-input
  [options]="options"
  label="Preferred contact"
  hint="We will only use this to reach you"
  [(value)]="selectedValue" />`;

  /**
   * Error state markup - `error` + `errorMessage` overrides `hint`.
   */
  protected readonly errorSnippet = `<rng-radio-input
  [options]="options"
  label="Preferred contact"
  [error]="true"
  errorMessage="Please select a contact method" />`;

  /**
   * Hint vs errorMessage markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-radio-input
  [options]="options"
  label="Preferred contact"
  hint="We will only use this to reach you"
  [(value)]="selectedValue" />

<!-- error overrides hint -->
<rng-radio-input
  [options]="options"
  label="Preferred contact"
  hint="We will only use this to reach you"
  [error]="true"
  errorMessage="Please select a contact method" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-radio-input
  [options]="options"
  label="Preferred contact"
  [disabled]="true" />

<rng-radio-input
  [options]="options"
  label="Preferred contact"
  [disabled]="true"
  [value]="'email'" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-radio-input
  [options]="options"
  label="Preferred contact"
  [required]="true"
  [(value)]="selectedValue" />`;

  /**
   * Name attribute markup - shared `name` for the group.
   */
  protected readonly nameSnippet = `<rng-radio-input
  [options]="options"
  label="Preferred contact"
  name="contactMethod"
  [(value)]="selectedValue" />`;

  /**
   * States combined snippet for reference.
   */
  protected readonly statesSnippet = `<rng-radio-input [disabled]="true" label="Disabled" [options]="options" />
<rng-radio-input [required]="true" label="Required" [options]="options" />
<rng-radio-input [error]="true" errorMessage="Selection required" label="Error" [options]="options" />
<rng-radio-input [inline]="true" label="Inline" [options]="options" />
<rng-radio-input name="contactMethod" label="With name attribute" [options]="options" />`;

  /**
   * Numeric values markup - options with `number` values.
   */
  protected readonly numericSnippet = `priorityOptions: IRadioOption[] = [
  { label: 'Low', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'High', value: 3 },
];`;

  /**
   * Template for numeric values.
   */
  protected readonly numericTemplateSnippet = `<rng-radio-input
  [options]="priorityOptions"
  label="Priority"
  [(value)]="selectedPriority" />

<p>Selected: {{ selectedPriority() }}</p>`;

  /**
   * Two-way binding and `valueChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-radio-input [(value)]="selectedValue" label="Two-way binding" [options]="options" />

<!-- Explicit output handling -->
<rng-radio-input
  [value]="selectedValue()"
  (valueChange)="onValueChange($event)"
  label="With valueChange handler"
  [options]="options" />`;

  /**
   * Handler for `valueChange`.
   */
  protected readonly valueChangeTsSnippet = `selectedValue = signal<string | number | null>(null);

onValueChange(value: string | number | null): void {
  this.selectedValue.set(value);
  console.log('selected:', value);
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { RadioInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [RadioInputComponent]
})
export class ExampleComponent {
  form = form({
    contact: 'email' as string | null,
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-radio-input
  [options]="options"
  label="Preferred contact"
  [formField]="form.controls.contact" />`;

  /**
   * Full example combining label, hint, inline, error and states.
   */
  protected readonly fullSnippet = `<rng-radio-input
  [options]="contactOptions"
  label="Preferred contact"
  hint="We will only use this to reach you"
  [(value)]="contactValue" />

<rng-radio-input
  [options]="sizeOptions"
  label="Size (inline)"
  [inline]="true"
  [(value)]="sizeValue" />

<rng-radio-input
  [options]="contactOptions"
  label="Priority (numeric values)"
  [(value)]="priorityValue" />

<p>Contact: {{ contactValue() ?? 'none' }} | Size: {{ sizeValue() ?? 'none' }} | Priority: {{ priorityValue() ?? 'none' }}</p>`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { RadioInputComponent, IRadioOption } from '@im4all/roolith-ng';

@Component({
  imports: [RadioInputComponent]
})
export class ExampleComponent {
  contactOptions: IRadioOption[] = [
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'SMS', value: 'sms' },
  ];

  sizeOptions: IRadioOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  priorityOptions: IRadioOption[] = [
    { label: 'Low', value: 1 },
    { label: 'Medium', value: 2 },
    { label: 'High', value: 3 },
  ];

  contactValue = signal<string | number | null>('email');
  sizeValue = signal<string | number | null>('medium');
  priorityValue = signal<string | number | null>(2);
}`;

  protected readonly contactOptions = [
    { label: 'Email', value: 'email' as string | number },
    { label: 'Phone', value: 'phone' as string | number },
    { label: 'SMS', value: 'sms' as string | number },
  ];

  protected readonly sizeOptions = [
    { label: 'Small', value: 'small' as string | number },
    { label: 'Medium', value: 'medium' as string | number },
    { label: 'Large', value: 'large' as string | number },
  ];

  protected readonly priorityOptions = [
    { label: 'Low', value: 1 as string | number },
    { label: 'Medium', value: 2 as string | number },
    { label: 'High', value: 3 as string | number },
  ];

  protected readonly notificationOptions = [
    { label: 'All messages', value: 'all' as string | number },
    { label: 'Mentions only', value: 'mentions' as string | number },
    { label: 'Nothing', value: 'none' as string | number },
  ];

  protected basicValue = signal<string | number | null>('email');
  protected inlineValue = signal<string | number | null>('medium');
  protected hintValue = signal<string | number | null>(null);
  protected errorValue = signal<string | number | null>(null);
  protected disabledValue = signal<string | number | null>('phone');
  protected requiredValue = signal<string | number | null>(null);
  protected nameValue = signal<string | number | null>('sms');
  protected numericValue = signal<string | number | null>(2);
  protected twoWayValue = signal<string | number | null>('email');
  protected fullContactValue = signal<string | number | null>('email');
  protected fullSizeValue = signal<string | number | null>('medium');
  protected fullPriorityValue = signal<string | number | null>(2);
  protected fullNotificationValue = signal<string | number | null>('all');

  /**
   * Handles `valueChange` from the two-way binding demo.
   *
   * @param value The newly selected value or `null` when none.
   *
   * @returns void
   */
  protected onTwoWayValueChange(value: string | number | null): void {
    this.twoWayValue.set(value);
  }

  /**
   * Handles `valueChange` from the full contact demo.
   *
   * @param value The newly selected value.
   *
   * @returns void
   */
  protected onFullContactChange(value: string | number | null): void {
    this.fullContactValue.set(value);
  }

  /**
   * Clears all values in the full example.
   *
   * @returns void
   */
  protected clearFullValues(): void {
    this.fullContactValue.set(null);
    this.fullSizeValue.set(null);
    this.fullPriorityValue.set(null);
    this.fullNotificationValue.set(null);
  }
}
