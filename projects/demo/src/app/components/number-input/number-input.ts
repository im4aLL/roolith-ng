import { Component, signal } from '@angular/core';
import { ButtonComponent, NumberInputComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-number-input',
  imports: [ButtonComponent, CodeBlock, DocPager, NumberInputComponent],
  templateUrl: './number-input.html',
  styleUrl: './number-input.scss',
})
export class NumberInput {
  /**
   * Snippet for importing `NumberInputComponent`.
   */
  protected readonly importSnippet = `import { NumberInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [NumberInputComponent]
})`;

  /**
   * Basic usage markup - label, placeholder and `value` binding.
   */
  protected readonly basicSnippet = `<rng-number-input
  label="Quantity"
  placeholder="0"
  [(value)]="quantity" />`;

  /**
   * Basic two-way binding handler snippet.
   */
  protected readonly basicTsSnippet = `quantity = signal<number | null>(null);`;

  /**
   * Placeholder markup.
   */
  protected readonly placeholderSnippet = `<rng-number-input
  label="Quantity"
  placeholder="Enter quantity"
  [(value)]="quantity" />

<rng-number-input
  label="Age"
  placeholder="0"
  [(value)]="age" />`;

  /**
   * Min / max / step markup - integers and decimals.
   */
  protected readonly minMaxStepSnippet = `<!-- Integers with step 1 -->
<rng-number-input
  label="Rating"
  [min]="1"
  [max]="10"
  [step]="1"
  [(value)]="rating" />

<!-- Decimals with step 0.5 -->
<rng-number-input
  label="Rating"
  [min]="1"
  [max]="10"
  [step]="0.5"
  [(value)]="rating" />

<!-- Only minimum -->
<rng-number-input
  label="Age"
  [min]="0"
  [(value)]="age" />

<!-- Only maximum -->
<rng-number-input
  label="Score"
  [max]="100"
  [(value)]="score" />`;

  /**
   * Handler snippet for min / max / step demo.
   */
  protected readonly minMaxStepTsSnippet = `rating = signal<number | null>(5);
age = signal<number | null>(null);
score = signal<number | null>(null);`;

  /**
   * Hint markup - helper text below the input.
   */
  protected readonly hintSnippet = `<rng-number-input
  label="Quantity"
  hint="Enter a value between 1 and 10"
  [(value)]="quantity" />`;

  /**
   * Error state markup - `error` + `errorMessage` overrides `hint`.
   */
  protected readonly errorSnippet = `<rng-number-input
  label="Age"
  [error]="true"
  errorMessage="Age must be a positive number" />`;

  /**
   * Hint vs errorMessage markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-number-input
  label="Quantity"
  hint="Enter a quantity"
  [(value)]="quantity" />

<!-- error overrides hint -->
<rng-number-input
  label="Quantity"
  hint="Enter a quantity"
  [error]="true"
  errorMessage="Quantity is required" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-number-input
  label="Quantity"
  [disabled]="true" />

<rng-number-input
  label="Quantity with value"
  [disabled]="true"
  [value]="4" />`;

  /**
   * Readonly state markup.
   */
  protected readonly readonlySnippet = `<rng-number-input
  label="Read-only quantity"
  [readonly]="true"
  [(value)]="quantity" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-number-input
  label="Quantity"
  [required]="true"
  [(value)]="quantity" />`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-number-input
  label="Quantity"
  name="quantity"
  [(value)]="quantity" />`;

  /**
   * States combined snippet for reference.
   */
  protected readonly statesSnippet = `<rng-number-input [disabled]="true" label="Disabled" />
<rng-number-input [readonly]="true" [value]="42" label="Read-only" />
<rng-number-input [required]="true" label="Required" />
<rng-number-input [error]="true" errorMessage="Invalid value" label="Error" />
<rng-number-input name="quantity" label="With name attribute" />`;

  /**
   * Two-way binding and `valueChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-number-input [(value)]="quantity" label="Two-way binding" />

<!-- Explicit output handling -->
<rng-number-input
  [value]="quantity()"
  (valueChange)="onQuantityChange($event)"
  label="With valueChange handler" />`;

  /**
   * Handler for `valueChange`.
   */
  protected readonly valueChangeTsSnippet = `quantity = signal<number | null>(null);

onQuantityChange(value: number | null): void {
  this.quantity.set(value);
  console.log('quantity:', value);
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { NumberInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [NumberInputComponent]
})
export class ExampleComponent {
  form = form({
    quantity: null as number | null,
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-number-input
  label="Quantity"
  [formField]="form.controls.quantity" />`;

  /**
   * Clear input markup.
   */
  protected readonly clearSnippet = `<rng-number-input #quantityInput label="Quantity" [(value)]="quantity" />
<button type="button" (click)="quantityInput.clearInput()">Clear</button>`;

  /**
   * Full example combining label, placeholder, hint, min/max/step and states.
   */
  protected readonly fullSnippet = `<rng-number-input
  label="Quantity"
  placeholder="0"
  hint="Enter a quantity between 1 and 10"
  [min]="1"
  [max]="10"
  [step]="1"
  [(value)]="quantity" />

<p>Quantity is {{ quantity() ?? 'empty' }}</p>

<rng-number-input
  label="Rating"
  hint="Decimal with step 0.5"
  [min]="1"
  [max]="10"
  [step]="0.5"
  [(value)]="rating" />`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { NumberInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [NumberInputComponent]
})
export class ExampleComponent {
  quantity = signal<number | null>(2);
  rating = signal<number | null>(7.5);

  onQuantityChange(value: number | null): void {
    this.quantity.set(value);
  }
}`;

  protected basicValue = signal<number | null>(4);
  protected placeholderValue = signal<number | null>(null);
  protected placeholderAgeValue = signal<number | null>(null);
  protected hintValue = signal<number | null>(null);
  protected errorValue = signal<number | null>(null);
  protected ratingValue = signal<number | null>(5);
  protected ratingDecimalValue = signal<number | null>(7.5);
  protected minOnlyValue = signal<number | null>(null);
  protected maxOnlyValue = signal<number | null>(null);
  protected disabledValue = signal<number | null>(10);
  protected readonlyValue = signal<number | null>(42);
  protected requiredValue = signal<number | null>(null);
  protected nameValue = signal<number | null>(null);
  protected twoWayValue = signal<number | null>(7);
  protected fullQuantity = signal<number | null>(2);
  protected fullRating = signal<number | null>(7.5);

  /**
   * Handles `valueChange` from the two-way binding demo.
   *
   * @param value The new numeric value or `null` when empty.
   *
   * @returns void
   */
  protected onTwoWayValueChange(value: number | null): void {
    this.twoWayValue.set(value);
  }

  /**
   * Handles `valueChange` from the full quantity demo.
   *
   * @param value The new numeric value or `null` when empty.
   *
   * @returns void
   */
  protected onFullQuantityChange(value: number | null): void {
    this.fullQuantity.set(value);
  }

  /**
   * Handles `valueChange` from the full rating demo.
   *
   * @param value The new numeric value or `null` when empty.
   *
   * @returns void
   */
  protected onFullRatingChange(value: number | null): void {
    this.fullRating.set(value);
  }

  /**
   * Clears the full example values.
   *
   * @returns void
   */
  protected clearFullValues(): void {
    this.fullQuantity.set(null);
    this.fullRating.set(null);
  }
}
