import { Component, inject } from '@angular/core';
import { ButtonComponent, ToastComponent, ToastService } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-toast',
  imports: [CodeBlock, DocPager, ButtonComponent, ToastComponent],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  private readonly toastService = inject(ToastService);

  /**
   * Snippet for importing `ToastComponent` and `ToastService`.
   */
  protected readonly importSnippet = `import { ToastComponent, ToastService } from '@im4all/roolith-ng';

@Component({
  imports: [ToastComponent]
})`;

  /**
   * Snippet for placing `rng-toast` in the root layout.
   */
  protected readonly hostSnippet = `<!-- app.component.html - place once in root layout -->
<rng-toast />`;

  /**
   * Snippet for injecting `ToastService`.
   */
  protected readonly injectSnippet = `import { ToastService } from '@im4all/roolith-ng';

@Component({ ... })
export class MyComponent {
  private toastService = inject(ToastService);
}`;

  /**
   * Success toast snippet.
   */
  protected readonly successSnippet = `this.toastService.success('Record saved successfully.');`;

  /**
   * Error toast snippet.
   */
  protected readonly errorSnippet = `this.toastService.error('Failed to load data. Please try again.');`;

  /**
   * Info toast snippet.
   */
  protected readonly infoSnippet = `this.toastService.info('Your session will expire in 5 minutes.');`;

  /**
   * Toast with custom title snippet.
   */
  protected readonly customTitleSnippet = `this.toastService.success('All 12 records were imported.', 'Import Complete');
this.toastService.error('Connection timed out.', 'Network Error');`;

  /**
   * Fully custom toast via `show()` snippet.
   */
  protected readonly showSnippet = `this.toastService.show({
  type: 'info',
  title: 'Heads up',
  message: 'A new version is available. Refresh to update.'
});`;

  /**
   * Dismiss all toasts snippet.
   */
  protected readonly clearSnippet = `this.toastService.clear();`;

  /**
   * Async operation snippet - success or error toast after a save.
   */
  protected readonly asyncSnippet = `async saveRecord(): Promise<void> {
  try {
    await this.dataService.save(this.form.value);
    this.toastService.success('Record saved successfully.', 'Saved');
  } catch {
    this.toastService.error('Could not save the record.', 'Error');
  }
}`;

  /**
   * Full component example combining setup, service injection and all toast types.
   */
  protected readonly fullComponentSnippet = `import { ToastComponent, ToastService } from '@im4all/roolith-ng';

@Component({
  imports: [ToastComponent]
})
export class ExampleComponent {
  private toastService = inject(ToastService);

  saveRecord(): void {
    this.toastService.success('Record saved successfully.', 'Saved');
  }

  handleError(): void {
    this.toastService.error('Could not save the record.', 'Error');
  }

  notify(): void {
    this.toastService.info('Your session will expire in 5 minutes.');
  }

  showCustom(): void {
    this.toastService.show({
      type: 'info',
      title: 'Heads up',
      message: 'A new version is available. Refresh to update.'
    });
  }

  clearAll(): void {
    this.toastService.clear();
  }
}`;

  /**
   * Full template snippet for the `rng-toast` host and trigger buttons.
   */
  protected readonly fullTemplateSnippet = `<!-- Root layout -->
<rng-toast />

<!-- Triggers -->
<rng-button (clickEvent)="saveRecord()">Save record</rng-button>
<rng-button (clickEvent)="handleError()">Show error</rng-button>
<rng-button (clickEvent)="notify()">Show info</rng-button>`;

  /**
   * Shows a success toast.
   *
   * Uses the default title `Success` when no custom title is provided.
   *
   * @returns void
   */
  protected showSuccess(): void {
    this.toastService.success('Record saved successfully.');
  }

  /**
   * Shows a success toast with a custom title.
   *
   * @returns void
   */
  protected showSuccessWithTitle(): void {
    this.toastService.success('All 12 records were imported.', 'Import Complete');
  }

  /**
   * Shows an error toast.
   *
   * @returns void
   */
  protected showError(): void {
    this.toastService.error('Failed to load data. Please try again.');
  }

  /**
   * Shows an error toast with a custom title.
   *
   * @returns void
   */
  protected showErrorWithTitle(): void {
    this.toastService.error('Connection timed out.', 'Network Error');
  }

  /**
   * Shows an info toast.
   *
   * @returns void
   */
  protected showInfo(): void {
    this.toastService.info('Your session will expire in 5 minutes.');
  }

  /**
   * Shows a fully custom toast via `show()`.
   *
   * @returns void
   */
  protected showCustom(): void {
    this.toastService.show({
      type: 'info',
      title: 'Heads up',
      message: 'A new version is available. Refresh to update.',
    });
  }

  /**
   * Shows a custom success toast via `show()`.
   *
   * @returns void
   */
  protected showCustomSuccess(): void {
    this.toastService.show({
      type: 'success',
      title: 'Deployed',
      message: 'Version 2.4.0 is now live on production.',
    });
  }

  /**
   * Dismisses all active toasts immediately.
   *
   * @returns void
   */
  protected clearAll(): void {
    this.toastService.clear();
  }

  /**
   * Simulates an async save and shows a toast on success or error.
   *
   * Randomly succeeds or fails to demonstrate both branches.
   *
   * @returns void
   */
  protected async saveRecord(): Promise<void> {
    const succeeds = Math.random() > 0.5;

    // simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (succeeds) {
      this.toastService.success('Record saved successfully.', 'Saved');
    } else {
      this.toastService.error('Could not save the record.', 'Error');
    }
  }

  /**
   * Fires 5 toasts in quick succession to demonstrate the max-items limit.
   *
   * Only 3 are visible - older ones are dropped when the limit is reached.
   *
   * @returns void
   */
  protected showBurst(): void {
    this.toastService.info('Message 1 - you will see only the last 3.', 'Info 1');
    this.toastService.success('Message 2 - older toasts are dropped.', 'Info 2');
    this.toastService.error('Message 3 - limit is 3 visible toasts.', 'Info 3');
    this.toastService.info('Message 4 - newest appears on top.', 'Info 4');
    this.toastService.success('Message 5 - try dismissing or waiting 5s.', 'Info 5');
  }
}
