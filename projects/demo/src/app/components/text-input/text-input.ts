import { Component, signal } from '@angular/core';
import { ButtonComponent, TextInputComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-text-input',
  imports: [ButtonComponent, CodeBlock, DocPager, TextInputComponent],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInput {
  /**
   * Snippet for importing `TextInputComponent`.
   */
  protected readonly importSnippet = `import { TextInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [TextInputComponent]
})`;

  /**
   * Basic usage markup - label, placeholder, hint and `value` binding.
   */
  protected readonly basicSnippet = `<rng-text-input
  label="Full name"
  placeholder="e.g. John Doe"
  hint="As it appears on your passport"
  [(value)]="name" />`;

  /**
   * Basic two-way binding handler snippet.
   */
  protected readonly basicTsSnippet = `name = signal<string>('');`;

  /**
   * Placeholder markup.
   */
  protected readonly placeholderSnippet = `<rng-text-input
  label="Full name"
  placeholder="e.g. John Doe"
  [(value)]="name" />

<rng-text-input
  label="Email"
  placeholder="you@example.com"
  [(value)]="email" />`;

  /**
   * Type variants markup - `text`, `password`, `email` and `hidden`.
   */
  protected readonly typeSnippet = `<!-- Default text -->
<rng-text-input
  label="Full name"
  type="text"
  placeholder="John Doe"
  [(value)]="name" />

<!-- Password -->
<rng-text-input
  label="Password"
  type="password"
  placeholder="Enter your password"
  [(value)]="password" />

<!-- Email -->
<rng-text-input
  label="Email"
  type="email"
  placeholder="you@example.com"
  [(value)]="email" />

<!-- Hidden -->
<rng-text-input
  type="hidden"
  [(value)]="token" />`;

  /**
   * Handler snippet for type demo.
   */
  protected readonly typeTsSnippet = `name = signal<string>('');
password = signal<string>('');
email = signal<string>('');
token = signal<string>('hidden-token');`;

  /**
   * Hint markup - helper text below the input.
   */
  protected readonly hintSnippet = `<rng-text-input
  label="Full name"
  hint="As it appears on your passport"
  [(value)]="name" />`;

  /**
   * Error state markup - `error` + `errorMessage` overrides `hint`.
   */
  protected readonly errorSnippet = `<rng-text-input
  label="Email"
  type="email"
  [error]="true"
  errorMessage="Please enter a valid email address" />`;

  /**
   * Hint vs errorMessage markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-text-input
  label="Full name"
  hint="As it appears on your passport"
  [(value)]="name" />

<!-- error overrides hint -->
<rng-text-input
  label="Full name"
  hint="As it appears on your passport"
  [error]="true"
  errorMessage="Full name is required" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-text-input
  label="Username"
  [disabled]="true" />

<rng-text-input
  label="Username with value"
  [disabled]="true"
  value="johndoe" />`;

  /**
   * Readonly state markup.
   */
  protected readonly readonlySnippet = `<rng-text-input
  label="Read-only username"
  [readonly]="true"
  [(value)]="username" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-text-input
  label="Full name"
  [required]="true"
  [(value)]="name" />`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-text-input
  label="Full name"
  name="fullName"
  [(value)]="name" />`;

  /**
   * Validation markup - `minLength`, `maxLength` and `pattern`.
   */
  protected readonly validationSnippet = `<!-- Minimum 3 characters -->
<rng-text-input
  label="Username"
  [minLength]="3"
  hint="At least 3 characters"
  [(value)]="username" />

<!-- Maximum 20 characters -->
<rng-text-input
  label="Bio"
  [maxLength]="20"
  hint="Max 20 characters"
  [(value)]="bio" />

<!-- Pattern - letters only -->
<rng-text-input
  label="City"
  [pattern]="[cityPattern]"
  hint="Letters and spaces only"
  [(value)]="city" />

<!-- Combined constraints -->
<rng-text-input
  label="Username"
  [minLength]="3"
  [maxLength]="12"
  [pattern]="[alphanumPattern]"
  hint="3-12 alphanumeric characters"
  [(value)]="username" />`;

  /**
   * Handler snippet for validation demo - regex patterns.
   */
  protected readonly validationTsSnippet = `username = signal<string>('');
bio = signal<string>('');
city = signal<string>('');

cityPattern = /^[a-zA-Z\\s]+$/;
alphanumPattern = /^[a-zA-Z0-9]+$/;`;

  /**
   * States combined snippet for reference.
   */
  protected readonly statesSnippet = `<rng-text-input [disabled]="true" label="Disabled" />
<rng-text-input [readonly]="true" [value]="username" label="Read-only" />
<rng-text-input [required]="true" label="Required" />
<rng-text-input [error]="true" errorMessage="Invalid value" label="Error" />
<rng-text-input name="fullName" label="With name attribute" />
<rng-text-input [minLength]="3" [maxLength]="20" label="With validation" />`;

  /**
   * Two-way binding and `valueChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-text-input [(value)]="name" label="Two-way binding" />

<!-- Explicit output handling -->
<rng-text-input
  [value]="name()"
  (valueChange)="onNameChange($event)"
  label="With valueChange handler" />`;

  /**
   * Handler for `valueChange`.
   */
  protected readonly valueChangeTsSnippet = `name = signal<string>('');

onNameChange(value: string): void {
  this.name.set(value);
  console.log('name:', value);
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { TextInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [TextInputComponent]
})
export class ExampleComponent {
  form = form({
    name: '',
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-text-input
  label="Full name"
  [formField]="form.controls.name" />`;

  /**
   * Full example combining label, placeholder, hint, types and states.
   */
  protected readonly fullSnippet = `<rng-text-input
  label="Full name"
  placeholder="e.g. John Doe"
  hint="As it appears on your passport"
  [(value)]="fullName" />

<rng-text-input
  label="Email"
  type="email"
  placeholder="you@example.com"
  hint="We will never share your email"
  [(value)]="fullEmail" />

<rng-text-input
  label="Password"
  type="password"
  placeholder="Enter password"
  hint="At least 8 characters"
  [minLength]="8"
  [(value)]="fullPassword" />

<p>Full name is "{{ fullName() || 'empty' }}"</p>`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { TextInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [TextInputComponent]
})
export class ExampleComponent {
  fullName = signal<string>('');
  fullEmail = signal<string>('');
  fullPassword = signal<string>('');

  onNameChange(value: string): void {
    this.fullName.set(value);
  }
}`;

  protected basicValue = signal<string>('');
  protected placeholderNameValue = signal<string>('');
  protected placeholderEmailValue = signal<string>('');
  protected typeTextValue = signal<string>('');
  protected typePasswordValue = signal<string>('');
  protected typeEmailValue = signal<string>('');
  protected typeHiddenValue = signal<string>('hidden-token');
  protected hintValue = signal<string>('');
  protected errorValue = signal<string>('');
  protected disabledValue = signal<string>('johndoe');
  protected readonlyValue = signal<string>('readonly-value');
  protected requiredValue = signal<string>('');
  protected nameValue = signal<string>('');
  protected minLengthValue = signal<string>('');
  protected maxLengthValue = signal<string>('');
  protected patternValue = signal<string>('');
  protected combinedValidationValue = signal<string>('');
  protected twoWayValue = signal<string>('John Doe');
  protected fullNameValue = signal<string>('');
  protected fullEmailValue = signal<string>('');
  protected fullPasswordValue = signal<string>('');

  protected readonly cityPattern = /^[a-zA-Z\s]+$/;
  protected readonly alphanumPattern = /^[a-zA-Z0-9]+$/;

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
   * Handles `valueChange` from the full name demo.
   *
   * @param value The new string value.
   *
   * @returns void
   */
  protected onFullNameChange(value: string): void {
    this.fullNameValue.set(value);
  }

  /**
   * Handles `valueChange` from the full email demo.
   *
   * @param value The new string value.
   *
   * @returns void
   */
  protected onFullEmailChange(value: string): void {
    this.fullEmailValue.set(value);
  }

  /**
   * Handles `valueChange` from the full password demo.
   *
   * @param value The new string value.
   *
   * @returns void
   */
  protected onFullPasswordChange(value: string): void {
    this.fullPasswordValue.set(value);
  }

  /**
   * Clears the full example values.
   *
   * @returns void
   */
  protected clearFullValues(): void {
    this.fullNameValue.set('');
    this.fullEmailValue.set('');
    this.fullPasswordValue.set('');
  }
}
