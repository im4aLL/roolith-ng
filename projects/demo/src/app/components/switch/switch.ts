import { Component, signal } from '@angular/core';
import { ButtonComponent, SwitchInputComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-switch',
  imports: [ButtonComponent, CodeBlock, DocPager, SwitchInputComponent],
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
})
export class Switch {
  /**
   * Snippet for importing `SwitchInputComponent`.
   */
  protected readonly importSnippet = `import { SwitchInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [SwitchInputComponent]
})`;

  /**
   * Basic usage markup - label and `value` binding.
   */
  protected readonly basicSnippet = `<rng-switch-input
  label="Enable notifications"
  [(value)]="isEnabled" />`;

  /**
   * Basic setup - signal state.
   */
  protected readonly basicTsSnippet = `isEnabled = signal(false);`;

  /**
   * With hint markup - helper text below the switch.
   */
  protected readonly hintSnippet = `<rng-switch-input
  label="Dark mode"
  hint="Applies to the entire application"
  [(value)]="isDarkMode" />`;

  /**
   * Hint helper snippet.
   */
  protected readonly hintTsSnippet = `isDarkMode = signal(false);`;

  /**
   * Label only markup.
   */
  protected readonly labelSnippet = `<rng-switch-input
  label="Enable notifications"
  [(value)]="isEnabled" />`;

  /**
   * No label markup - switch without text.
   */
  protected readonly noLabelSnippet = `<rng-switch-input [(value)]="isEnabled" />`;

  /**
   * Error state markup - `error` + `errorMessage` overrides `hint`.
   */
  protected readonly errorSnippet = `<rng-switch-input
  label="Enable notifications"
  [error]="true"
  errorMessage="This field is required" />`;

  /**
   * Hint vs errorMessage markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-switch-input
  label="Dark mode"
  hint="Applies to the entire application"
  [(value)]="isDarkMode" />

<!-- error overrides hint -->
<rng-switch-input
  label="Dark mode"
  hint="Applies to the entire application"
  [error]="true"
  errorMessage="You must enable this option" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-switch-input
  label="Feature flag"
  [disabled]="true"
  [value]="true" />

<rng-switch-input
  label="Enable notifications"
  [disabled]="true"
  [(value)]="isEnabled" />`;

  /**
   * Readonly state markup.
   */
  protected readonly readonlySnippet = `<rng-switch-input
  label="Read-only option"
  [readonly]="true"
  [(value)]="isEnabled" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-switch-input
  label="Accept terms"
  [required]="true"
  [(value)]="isAccepted" />`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-switch-input
  label="Enable notifications"
  name="notifications"
  [(value)]="isEnabled" />`;

  /**
   * States combined snippet for reference.
   */
  protected readonly statesSnippet = `<rng-switch-input [disabled]="true" label="Disabled" />
<rng-switch-input [readonly]="true" [value]="true" label="Read-only" />
<rng-switch-input [required]="true" label="Required" />
<rng-switch-input [error]="true" errorMessage="Selection required" label="Error" />
<rng-switch-input name="notifications" label="With name attribute" />`;

  /**
   * Two-way binding and `checkedChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-switch-input [(value)]="isEnabled" label="Two-way binding" />

<!-- Explicit output handling -->
<rng-switch-input
  [value]="isEnabled()"
  (checkedChange)="onCheckedChange($event)"
  label="With checkedChange handler" />`;

  /**
   * Handler for `checkedChange`.
   */
  protected readonly checkedChangeTsSnippet = `isEnabled = signal(false);

onCheckedChange(checked: boolean): void {
  this.isEnabled.set(checked);
  console.log('checked:', checked);
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { SwitchInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [SwitchInputComponent]
})
export class ExampleComponent {
  form = form({
    notifications: false,
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-switch-input
  label="Enable notifications"
  [formField]="form.controls.notifications" />`;

  /**
   * Full example combining label, hint, error and states.
   */
  protected readonly fullSnippet = `<rng-switch-input
  label="Enable notifications"
  hint="Receive updates about your account"
  [(value)]="notifications" />

<rng-switch-input
  label="Dark mode"
  hint="Applies to the entire application"
  [(value)]="darkMode" />

<rng-switch-input
  label="Marketing emails"
  hint="Get notified about new features"
  [error]="marketingError()"
  [errorMessage]="marketingError() ? 'You must accept marketing to continue' : null"
  [(value)]="marketing" />

<rng-switch-input
  label="Feature flag"
  [(value)]="featureFlag" />

<p>Notifications: {{ notifications() }} | Dark mode: {{ darkMode() }} | Marketing: {{ marketing() }} | Feature: {{ featureFlag() }}</p>`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { SwitchInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [SwitchInputComponent]
})
export class ExampleComponent {
  notifications = signal(false);
  darkMode = signal(true);
  marketing = signal(false);
  featureFlag = signal(true);

  marketingError = signal(false);
}`;

  protected basicValue = signal(false);
  protected hintValue = signal(false);
  protected hintValue2 = signal(true);
  protected labelValue = signal(false);
  protected noLabelValue = signal(true);
  protected errorValue = signal(false);
  protected hintErrorValue = signal(false);
  protected disabledValue = signal(false);
  protected disabledCheckedValue = signal(true);
  protected readonlyValue = signal(true);
  protected requiredValue = signal(false);
  protected nameValue = signal(false);
  protected twoWayValue = signal(false);
  protected fullNotifications = signal(false);
  protected fullDarkMode = signal(true);
  protected fullMarketing = signal(false);
  protected fullMarketingError = signal(false);
  protected fullFeatureFlag = signal(true);

  /**
   * Handles `checkedChange` from the two-way binding demo.
   *
   * @param checked The new checked state.
   *
   * @returns void
   */
  protected onTwoWayCheckedChange(checked: boolean): void {
    this.twoWayValue.set(checked);
  }

  /**
   * Handles `checkedChange` from the full notifications demo.
   *
   * @param checked The new checked state.
   *
   * @returns void
   */
  protected onFullNotificationsChange(checked: boolean): void {
    this.fullNotifications.set(checked);
  }

  /**
   * Clears all values in the full example.
   *
   * @returns void
   */
  protected clearFullValues(): void {
    this.fullNotifications.set(false);
    this.fullDarkMode.set(false);
    this.fullMarketing.set(false);
    this.fullFeatureFlag.set(false);
    this.fullMarketingError.set(false);
  }

  /**
   * Toggles the marketing error state in the full example.
   *
   * @returns void
   */
  protected toggleFullMarketingError(): void {
    this.fullMarketingError.update((value) => !value);
  }
}
