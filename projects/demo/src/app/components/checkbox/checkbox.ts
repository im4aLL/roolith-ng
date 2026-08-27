import { Component, computed, signal } from '@angular/core';
import { CheckboxInputComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-checkbox',
  imports: [CodeBlock, DocPager, CheckboxInputComponent],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  /**
   * Snippet for importing `CheckboxInputComponent`.
   */
  protected readonly importSnippet = `import { CheckboxInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [CheckboxInputComponent]
})`;

  /**
   * Basic usage markup - label projected into the default slot.
   */
  protected readonly basicSnippet = `<rng-checkbox-input [(checked)]="isAgreed">
  I agree with the
  <a href="/terms">terms and conditions</a>
</rng-checkbox-input>`;

  /**
   * Basic two-way binding handler snippet.
   */
  protected readonly basicTsSnippet = `isAgreed = signal(false);`;

  /**
   * Standalone (no label) markup - icon-only checkbox.
   */
  protected readonly standaloneSnippet = `<rng-checkbox-input [checked]="true" [standalone]="true" />

<rng-checkbox-input [checked]="false" [standalone]="true" />`;

  /**
   * Indeterminate state markup - standalone with indeterminate.
   */
  protected readonly indeterminateSnippet = `<rng-checkbox-input
  [checked]="false"
  [standalone]="true"
  [indeterminate]="true" />`;

  /**
   * Indeterminate select-all pattern markup.
   */
  protected readonly indeterminateSelectAllSnippet = `<!-- Parent checkbox reflects children state -->
<rng-checkbox-input
  [checked]="allChecked()"
  [indeterminate]="isIndeterminate()"
  (checkedChange)="onParentChange($event)">
  Select all
</rng-checkbox-input>

<rng-checkbox-input [(checked)]="task1Checked">Task 1</rng-checkbox-input>
<rng-checkbox-input [(checked)]="task2Checked">Task 2</rng-checkbox-input>
<rng-checkbox-input [(checked)]="task3Checked">Task 3</rng-checkbox-input>`;

  /**
   * Handler for the select-all indeterminate demo.
   */
  protected readonly indeterminateSelectAllTsSnippet = `task1Checked = signal(false);
task2Checked = signal(true);
task3Checked = signal(false);

allChecked = computed(() => this.task1Checked() && this.task2Checked() && this.task3Checked());
someChecked = computed(() => this.task1Checked() || this.task2Checked() || this.task3Checked());
isIndeterminate = computed(() => this.someChecked() && !this.allChecked());

onParentChange(checked: boolean): void {
  this.task1Checked.set(checked);
  this.task2Checked.set(checked);
  this.task3Checked.set(checked);
}`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-checkbox-input [disabled]="true" [checked]="false">Disabled unchecked</rng-checkbox-input>
<rng-checkbox-input [disabled]="true" [checked]="true">Disabled checked</rng-checkbox-input>
<rng-checkbox-input [disabled]="true" [checked]="false" [standalone]="true" />`;

  /**
   * Error state markup.
   */
  protected readonly errorSnippet = `<rng-checkbox-input [error]="true" [(checked)]="agreed">I agree to the terms</rng-checkbox-input>`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-checkbox-input [required]="true" [(checked)]="agreed">Accept terms (required)</rng-checkbox-input>`;

  /**
   * States combined snippet for reference.
   */
  protected readonly statesSnippet = `<rng-checkbox-input [disabled]="true">Disabled</rng-checkbox-input>
<rng-checkbox-input [error]="true">Error</rng-checkbox-input>
<rng-checkbox-input [required]="true">Required</rng-checkbox-input>
<rng-checkbox-input name="acceptTerms">With name attribute</rng-checkbox-input>`;

  /**
   * Rich label markup - HTML content projected beside the checkbox.
   */
  protected readonly richLabelSnippet = `<rng-checkbox-input [(checked)]="isAgreed">
  I agree with the
  <a href="/terms">terms and conditions</a>
</rng-checkbox-input>

<rng-checkbox-input [(checked)]="subscribed">
  Subscribe to <strong>newsletter</strong> and <em>product updates</em>
</rng-checkbox-input>`;

  /**
   * Two-way binding and `checkedChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-checkbox-input [(checked)]="isChecked">Two-way binding</rng-checkbox-input>

<!-- Explicit output handling -->
<rng-checkbox-input [checked]="isChecked()" (checkedChange)="onCheckedChange($event)">
  With checkedChange
</rng-checkbox-input>`;

  /**
   * Handler for `checkedChange`.
   */
  protected readonly checkedChangeTsSnippet = `isChecked = signal(false);

onCheckedChange(checked: boolean): void {
  this.isChecked.set(checked);
  console.log('checked:', checked);
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { CheckboxInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [CheckboxInputComponent]
})
export class ExampleComponent {
  form = form({
    agreed: false,
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-checkbox-input [formField]="form.controls.agreed">Accept terms</rng-checkbox-input>`;

  /**
   * Full example combining label, standalone, indeterminate and states.
   */
  protected readonly fullSnippet = `<rng-checkbox-input [(checked)]="agreed">
  I agree with the <a href="/terms">terms</a>
</rng-checkbox-input>

<rng-checkbox-input [checked]="true" [standalone]="true" />

<rng-checkbox-input [checked]="false" [standalone]="true" [indeterminate]="true" />

<rng-checkbox-input [disabled]="true">Disabled</rng-checkbox-input>
<rng-checkbox-input [error]="true">Error state</rng-checkbox-input>`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { CheckboxInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [CheckboxInputComponent]
})
export class ExampleComponent {
  agreed = signal(false);
  standaloneChecked = signal(true);
  indeterminate = signal(true);
}`;

  protected basicChecked = signal(false);
  protected standaloneChecked = signal(true);
  protected standaloneUnchecked = signal(false);
  protected indeterminateChecked = signal(false);
  protected indeterminate = signal(true);
  protected disabledChecked = signal(false);
  protected errorChecked = signal(false);
  protected requiredChecked = signal(false);
  protected richChecked = signal(false);
  protected richChecked2 = signal(false);
  protected isChecked = signal(false);
  protected withNameChecked = signal(false);
  protected fullChecked = signal(false);
  protected fullErrorChecked = signal(false);
  protected task1Checked = signal(false);
  protected task2Checked = signal(true);
  protected task3Checked = signal(false);

  protected allChecked = computed(() => this.task1Checked() && this.task2Checked() && this.task3Checked());
  protected someChecked = computed(() => this.task1Checked() || this.task2Checked() || this.task3Checked());
  protected isIndeterminate = computed(() => this.someChecked() && !this.allChecked());

  /**
   * Handles `checkedChange` from the two-way binding demo.
   *
   * @param checked The new checked state.
   *
   * @returns void
   */
  protected onCheckedChange(checked: boolean): void {
    this.isChecked.set(checked);
  }

  /**
   * Handles parent checkbox change in the select-all indeterminate demo.
   *
   * Sets all child checkboxes to the same checked state.
   * The parent `indeterminate` is derived and auto-clears when `checked` becomes `true`.
   *
   * @param checked The new checked state from the parent.
   *
   * @returns void
   */
  protected onParentChange(checked: boolean): void {
    this.task1Checked.set(checked);
    this.task2Checked.set(checked);
    this.task3Checked.set(checked);
  }
}
