import { Component, signal } from '@angular/core';
import { ButtonComponent, TextareaInputComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-textarea',
  imports: [ButtonComponent, CodeBlock, DocPager, TextareaInputComponent],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class Textarea {
  /**
   * Snippet for importing `TextareaInputComponent`.
   */
  protected readonly importSnippet = `import { TextareaInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [TextareaInputComponent]
})`;

  /**
   * Basic usage markup - label, placeholder, hint and `value` binding.
   */
  protected readonly basicSnippet = `<rng-textarea-input
  label="Description"
  placeholder="Enter a description..."
  hint="Keep it concise"
  [(value)]="description" />`;

  /**
   * Basic two-way binding handler snippet.
   */
  protected readonly basicTsSnippet = `description = signal<string>('');`;

  /**
   * Placeholder markup.
   */
  protected readonly placeholderSnippet = `<rng-textarea-input
  label="Description"
  placeholder="Enter a description..."
  [(value)]="description" />

<rng-textarea-input
  label="Feedback"
  placeholder="Share your feedback..."
  [(value)]="feedback" />`;

  /**
   * Hint markup - helper text below the textarea.
   */
  protected readonly hintSnippet = `<rng-textarea-input
  label="Description"
  hint="Keep it concise"
  [(value)]="description" />`;

  /**
   * Error state markup - `error` + `errorMessage` overrides `hint`.
   */
  protected readonly errorSnippet = `<rng-textarea-input
  label="Description"
  [error]="true"
  errorMessage="Description is required" />`;

  /**
   * Hint vs errorMessage markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-textarea-input
  label="Description"
  hint="Keep it concise"
  [(value)]="description" />

<!-- error overrides hint -->
<rng-textarea-input
  label="Description"
  hint="Keep it concise"
  [error]="true"
  errorMessage="Description is required" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-textarea-input
  label="Feedback"
  [disabled]="true" />

<rng-textarea-input
  label="Feedback with value"
  [disabled]="true"
  value="Cannot edit this" />`;

  /**
   * Readonly state markup.
   */
  protected readonly readonlySnippet = `<rng-textarea-input
  label="Read-only notes"
  [readonly]="true"
  [(value)]="notes" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-textarea-input
  label="Description"
  [required]="true"
  [(value)]="description" />`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-textarea-input
  label="Description"
  name="description"
  [(value)]="description" />`;

  /**
   * States combined snippet for reference.
   */
  protected readonly statesSnippet = `<rng-textarea-input [disabled]="true" label="Disabled" />
<rng-textarea-input [readonly]="true" [value]="notes" label="Read-only" />
<rng-textarea-input [required]="true" label="Required" />
<rng-textarea-input [error]="true" errorMessage="Invalid value" label="Error" />
<rng-textarea-input name="description" label="With name attribute" />
<rng-textarea-input [rows]="6" label="With custom rows" />`;

  /**
   * Rows markup - custom visible rows.
   */
  protected readonly rowsSnippet = `<!-- Default is 4 rows -->
<rng-textarea-input
  label="Bio"
  [rows]="8"
  [(value)]="bio" />

<!-- Compact - 2 rows -->
<rng-textarea-input
  label="Comment"
  [rows]="2"
  [(value)]="comment" />`;

  /**
   * Character count markup - counter without limit.
   */
  protected readonly showCharCountSnippet = `<rng-textarea-input
  label="Notes"
  [showCharCount]="true"
  [(value)]="notes" />`;

  /**
   * Max length markup - hard cap + counter.
   */
  protected readonly maxLengthSnippet = `<rng-textarea-input
  label="Bio"
  [maxLength]="500"
  [(value)]="bio" />

<!-- With initial value - counter starts at current length -->
<rng-textarea-input
  label="Summary"
  [maxLength]="100"
  [(value)]="summary" />`;

  /**
   * Max length with hint markup.
   */
  protected readonly maxLengthHintSnippet = `<rng-textarea-input
  label="Bio"
  hint="Max 500 characters"
  [maxLength]="500"
  [(value)]="bio" />`;

  /**
   * Auto resize markup - grows to fit content.
   */
  protected readonly autoResizeSnippet = `<rng-textarea-input
  label="Notes"
  [autoResize]="true"
  [(value)]="notes" />

<!-- Resizes via onInput which sets height to scrollHeight -->
`;

  /**
   * Auto resize + max length markup.
   */
  protected readonly autoResizeMaxLengthSnippet = `<rng-textarea-input
  label="Summary"
  [autoResize]="true"
  [maxLength]="300"
  [(value)]="summary" />`;

  /**
   * Char count vs max length markup.
   */
  protected readonly charCountVsMaxLengthSnippet = `<!-- Counter only - no limit -->
<rng-textarea-input
  label="Notes"
  [showCharCount]="true"
  [(value)]="notes" />

<!-- Counter with limit - hard cap + red when at limit -->
<rng-textarea-input
  label="Bio"
  [maxLength]="500"
  [(value)]="bio" />`;

  /**
   * Two-way binding and `valueChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-textarea-input [(value)]="description" label="Two-way binding" />

<!-- Explicit output handling -->
<rng-textarea-input
  [value]="description()"
  (valueChange)="onDescriptionChange($event)"
  label="With valueChange handler" />`;

  /**
   * Handler for `valueChange`.
   */
  protected readonly valueChangeTsSnippet = `description = signal<string>('');

onDescriptionChange(value: string): void {
  this.description.set(value);
  console.log('description:', value);
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { TextareaInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [TextareaInputComponent]
})
export class ExampleComponent {
  form = form({
    description: '',
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-textarea-input
  label="Description"
  [formField]="form.controls.description" />`;

  /**
   * Full example combining label, placeholder, hint, rows, autoResize and maxLength.
   */
  protected readonly fullSnippet = `<rng-textarea-input
  label="Description"
  placeholder="Enter a description..."
  hint="Keep it concise"
  [(value)]="description" />

<rng-textarea-input
  label="Feedback (auto-resize)"
  placeholder="Share your feedback..."
  [autoResize]="true"
  [(value)]="feedback" />

<rng-textarea-input
  label="Bio (max 500)"
  placeholder="Tell us about yourself..."
  [maxLength]="500"
  [(value)]="bio" />

<rng-textarea-input
  label="Notes (custom rows + counter)"
  [rows]="6"
  [showCharCount]="true"
  [(value)]="notes" />

<p>Bio is "{{ bio() || 'empty' }}" ({{ bio().length }} / 500)</p>`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { TextareaInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [TextareaInputComponent]
})
export class ExampleComponent {
  description = signal<string>('');
  feedback = signal<string>('');
  bio = signal<string>('');
  notes = signal<string>('');

  onDescriptionChange(value: string): void {
    this.description.set(value);
  }
}`;

  protected basicValue = signal<string>('');
  protected placeholderFeedbackValue = signal<string>('');
  protected hintValue = signal<string>('');
  protected errorValue = signal<string>('');
  protected disabledValue = signal<string>('Cannot edit this');
  protected readonlyValue = signal<string>('readonly-value');
  protected requiredValue = signal<string>('');
  protected nameValue = signal<string>('');
  protected rowsDefaultValue = signal<string>('');
  protected rowsCompactValue = signal<string>('');
  protected showCharCountValue = signal<string>('Hello world');
  protected maxLengthValue = signal<string>('');
  protected maxLengthSummaryValue = signal<string>('Short summary');
  protected autoResizeValue = signal<string>('');
  protected autoResizeMaxLengthValue = signal<string>('');
  protected twoWayValue = signal<string>('Initial description');
  protected fullDescriptionValue = signal<string>('');
  protected fullFeedbackValue = signal<string>('');
  protected fullBioValue = signal<string>('');
  protected fullNotesValue = signal<string>('');

  /**
   * Handles `valueChange` from the two-way binding demo.
   *
   * @param value The new string value.
   *
   * @returns void
   */
  protected onTwoWayValueChange(value: string): void {
    this.twoWayValue.set(value);
  }

  /**
   * Handles `valueChange` from the full description demo.
   *
   * @param value The new string value.
   *
   * @returns void
   */
  protected onFullDescriptionChange(value: string): void {
    this.fullDescriptionValue.set(value);
  }

  /**
   * Handles `valueChange` from the full feedback demo.
   *
   * @param value The new string value.
   *
   * @returns void
   */
  protected onFullFeedbackChange(value: string): void {
    this.fullFeedbackValue.set(value);
  }

  /**
   * Handles `valueChange` from the full bio demo.
   *
   * @param value The new string value.
   *
   * @returns void
   */
  protected onFullBioChange(value: string): void {
    this.fullBioValue.set(value);
  }

  /**
   * Handles `valueChange` from the full notes demo.
   *
   * @param value The new string value.
   *
   * @returns void
   */
  protected onFullNotesChange(value: string): void {
    this.fullNotesValue.set(value);
  }

  /**
   * Clears the full example values.
   *
   * @returns void
   */
  protected clearFullValues(): void {
    this.fullDescriptionValue.set('');
    this.fullFeedbackValue.set('');
    this.fullBioValue.set('');
    this.fullNotesValue.set('');
  }
}
