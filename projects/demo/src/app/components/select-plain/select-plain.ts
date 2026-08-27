import { Component, signal } from '@angular/core';
import { ISelectPlainOption, SelectPlainComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-select-plain',
  imports: [CodeBlock, DocPager, SelectPlainComponent],
  templateUrl: './select-plain.html',
  styleUrl: './select-plain.scss',
})
export class SelectPlain {
  /**
   * Snippet for importing `SelectPlainComponent`.
   */
  protected readonly importSnippet = `import { SelectPlainComponent } from '@im4all/roolith-ng';

@Component({
  imports: [SelectPlainComponent]
})`;

  /**
   * `ISelectPlainOption` interface snippet.
   */
  protected readonly interfaceSnippet = `interface ISelectPlainOption {
  value: string | number;
  label: string;
}`;

  /**
   * Basic usage markup.
   */
  protected readonly basicSnippet = `<rng-select-plain
  [data]="options"
  label="Priority"
  hint="Select a priority level"
  [(value)]="selectedOption" />`;

  /**
   * Basic component data snippet.
   */
  protected readonly basicTsSnippet = `import { signal } from '@angular/core';
import { ISelectPlainOption } from '@im4all/roolith-ng';

options: ISelectPlainOption[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

selectedOption = signal<ISelectPlainOption | undefined>(undefined);`;

  /**
   * Label markup.
   */
  protected readonly labelSnippet = `<rng-select-plain
  [data]="options"
  label="Priority"
  [(value)]="selectedOption" />

<!-- Without label -->
<rng-select-plain
  [data]="options"
  [(value)]="selectedOption" />`;

  /**
   * Hint markup.
   */
  protected readonly hintSnippet = `<rng-select-plain
  [data]="options"
  label="Priority"
  hint="Select a priority level"
  [(value)]="selectedOption" />`;

  /**
   * Error state markup.
   */
  protected readonly errorSnippet = `<rng-select-plain
  [data]="options"
  label="Priority"
  [error]="true"
  errorMessage="Priority is required"
  [(value)]="selectedOption" />`;

  /**
   * Hint vs `errorMessage` markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-select-plain
  label="Priority"
  hint="Select a priority level"
  [data]="options" />

<!-- error overrides hint -->
<rng-select-plain
  label="Priority"
  hint="Select a priority level"
  [error]="true"
  errorMessage="Priority is required"
  [data]="options" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-select-plain
  label="Disabled"
  [data]="options"
  [disabled]="true" />

<rng-select-plain
  label="Disabled with value"
  [data]="options"
  [disabled]="true"
  [value]="selectedOption" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-select-plain
  label="Priority (required)"
  [data]="options"
  [required]="true"
  [(value)]="selectedOption" />`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-select-plain
  label="Priority"
  name="priority"
  [data]="options"
  [(value)]="selectedOption" />`;

  /**
   * Number value type markup.
   */
  protected readonly numberValueSnippet = `numericOptions: ISelectPlainOption[] = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 },
];

<!-- value can be string | number - matched via strict and string coercion -->
<rng-select-plain
  [data]="numericOptions"
  label="Quantity"
  [(value)]="selectedNumeric" />`;

  /**
   * States combined snippet for reference.
   */
  protected readonly statesSnippet = `<rng-select-plain [disabled]="true" label="Disabled" [data]="options" />
<rng-select-plain [required]="true" label="Required" [data]="options" />
<rng-select-plain [error]="true" errorMessage="Priority is required" label="Error" [data]="options" />
<rng-select-plain name="priority" label="With name attribute" [data]="options" />`;

  /**
   * Two-way binding and `valueChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-select-plain [(value)]="selectedOption" [data]="options" label="Two-way binding" />

<!-- Explicit output handling -->
<rng-select-plain
  [data]="options"
  [value]="selectedOption()"
  (valueChange)="onValueChange($event)"
  label="With valueChange handler" />`;

  /**
   * Handler for `valueChange`.
   */
  protected readonly twoWayTsSnippet = `selectedOption = signal<ISelectPlainOption | undefined>(undefined);

onValueChange(value: ISelectPlainOption | undefined): void {
  this.selectedOption.set(value);
  console.log('selected:', value);
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { SelectPlainComponent, ISelectPlainOption } from '@im4all/roolith-ng';

@Component({
  imports: [SelectPlainComponent]
})
export class ExampleComponent {
  form = form({
    priority: undefined as ISelectPlainOption | undefined,
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-select-plain
  [data]="options"
  label="Priority"
  [formField]="form.controls.priority" />`;

  /**
   * Change handler notes snippet.
   */
  protected readonly changeHandlerSnippet = `// onChangeHandler(event: Event): void {
//   const { value } = event.target as HTMLSelectElement;
//   const newValue = this.data().find(
//     (option) => option.value === value || \`\${option.value}\` === \`\${value}\`
//   );
//   this.value.set(newValue);
// }
// - Finds the selected option by strict equality or string coercion
//   so numeric values (e.g. 2) match the native string value "2".
// - Sets value to undefined when no option matches.
//   Also marks touched on blur via (blur)="touched.set(true)".
// }`;

  /**
   * Full example template.
   */
  protected readonly fullSnippet = `<rng-select-plain
  [data]="options"
  label="Priority"
  hint="Select a priority level"
  [(value)]="selectedOption" />

@if (selectedOption()) {
  <p>Selected: {{ selectedOption()!.label }} ({{ selectedOption()!.value }})</p>
} @else {
  <p>No priority selected yet.</p>
}`;

  /**
   * Full component snippet.
   */
  protected readonly fullComponentSnippet = `import { signal } from '@angular/core';
import { SelectPlainComponent, ISelectPlainOption } from '@im4all/roolith-ng';

@Component({
  imports: [SelectPlainComponent]
})
export class ExampleComponent {
  options: ISelectPlainOption[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  selectedOption = signal<ISelectPlainOption | undefined>(undefined);
}`;

  protected readonly priorityOptions: ISelectPlainOption[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Urgent', value: 'urgent' },
  ];

  protected readonly statusOptions: ISelectPlainOption[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Draft', value: 'draft' },
  ];

  protected readonly numericOptions: ISelectPlainOption[] = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4 },
  ];

  protected basicSelected = signal<ISelectPlainOption | undefined>(undefined);
  protected hintSelected = signal<ISelectPlainOption | undefined>(undefined);
  protected errorSelected = signal<ISelectPlainOption | undefined>(undefined);
  protected hintVsErrorSelected = signal<ISelectPlainOption | undefined>(undefined);
  protected disabledSelected = signal<ISelectPlainOption | undefined>({ label: 'Medium', value: 'medium' });
  protected requiredSelected = signal<ISelectPlainOption | undefined>(undefined);
  protected nameSelected = signal<ISelectPlainOption | undefined>(undefined);
  protected numericSelected = signal<ISelectPlainOption | undefined>(undefined);
  protected twoWaySelected = signal<ISelectPlainOption | undefined>(undefined);
  protected fullSelected = signal<ISelectPlainOption | undefined>(undefined);

  /**
   * Handles `valueChange` from the two-way binding demo.
   *
   * @param value The newly selected option or `undefined` when no match.
   *
   * @returns void
   */
  protected onValueChange(value: ISelectPlainOption | undefined): void {
    this.twoWaySelected.set(value);
  }
}
