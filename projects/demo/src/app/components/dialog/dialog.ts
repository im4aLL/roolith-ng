import { Component, DestroyRef, effect, inject, Injector } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  ButtonComponent,
  DialogComponent,
  DialogHostComponent,
  DialogService,
  IDialogEvent,
} from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-dialog',
  imports: [CodeBlock, DocPager, ButtonComponent, DialogComponent, DialogHostComponent],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {
  private readonly dialogService = inject(DialogService);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private currentEffect: ReturnType<typeof effect> | null = null;

  /**
   * Snippet for importing `DialogHostComponent`, `DialogComponent` and `DialogService`.
   */
  protected readonly importSnippet = `import { DialogHostComponent, DialogComponent, DialogService } from '@im4all/roolith-ng';

@Component({
  imports: [DialogHostComponent, DialogComponent]
})`;

  /**
   * Snippet for placing the dialog host in the root layout.
   */
  protected readonly hostSnippet = `<!-- app.component.html - place once in root layout -->
<rng-dialog-host />`;

  /**
   * Snippet for injecting `DialogService`.
   */
  protected readonly injectSnippet = `import { DialogService } from '@im4all/roolith-ng';

@Component({ ... })
export class MyComponent {
  private dialogService = inject(DialogService);
}`;

  /**
   * Confirmation dialog snippet via `DialogService`.
   */
  protected readonly confirmationSnippet = `const { event, destroy } = this.dialogService.open({
  header: 'Delete Record',
  content: 'Are you sure you want to delete this record?',
  actionButtons: [
    { label: 'Delete', value: 'confirm', variant: 'danger' },
    { label: 'Cancel', value: 'cancel' },
  ],
});

effect(() => {
  const e = event();
  if (!e) return;
  if (e.value === 'confirm') {
    this.deleteRecord();
  }
  destroy();
});`;

  /**
   * Dialog with subheader and custom width.
   */
  protected readonly subheaderSnippet = `this.dialogService.open({
  header: 'Upload File',
  subheader: 'Supported formats: PDF, XLSX',
  width: 600,
  actionButtons: [
    { label: 'Upload', value: 'upload', variant: 'primary' },
    { label: 'Cancel', value: 'cancel' },
  ],
});`;

  /**
   * Default dialog snippet - no config uses built-in Confirmation defaults.
   */
  protected readonly defaultSnippet = `const { event, destroy } = this.dialogService.open();
// Opens with: header "Confirmation", content "Are you sure you want to proceed with this action?"
// buttons: Yes (primary) + Cancel`;

  /**
   * Direct `rng-dialog` usage without the service - template markup.
   */
  protected readonly directSnippet = `<rng-dialog
  header="Confirm Action"
  subheader="This cannot be undone"
  [width]="480"
  [footerButtons]="buttons"
  (actionEvent)="onAction($event)"
  (closeEvent)="onClose()">
  <p>Custom dialog body content goes here.</p>
</rng-dialog>`;

  /**
   * Direct `rng-dialog` handler snippet.
   */
  protected readonly directHandlerSnippet = `buttons = [
  { label: 'Confirm', value: 'confirm', variant: 'primary' },
  { label: 'Cancel', value: 'cancel' },
];

onAction(value: string): void {
  console.log('Action:', value);
  this.showDialog = false;
}

onClose(): void {
  console.log('Dialog closed via X or Escape');
  this.showDialog = false;
}`;

  /**
   * Observable pattern via `toObservable` + `takeUntilDestroyed`.
   *
   * Alternative to `effect` - subscribes to the `event` signal as an observable and destroys on `confirm`.
   */
  protected readonly observableSnippet = `import { DestroyRef, inject, Injector } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DialogService } from '@im4all/roolith-ng';

export class MyComponent {
  private dialogService = inject(DialogService);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);

  openWithObservable(): void {
    const dialog = this.dialogService.open({
      id: 'confirm-dialog',
      header: 'Dialog opened via service',
      content:
        'This dialog was opened using the DialogService. You can customize the content and header by passing different values to the open method.',
      actionButtons: [
        { label: 'Cancel', value: 'cancel' },
        { label: 'Confirm', value: 'confirm', variant: 'primary' },
      ],
    });

    toObservable(dialog.event, { injector: this.injector })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (event) => {
          console.log('Dialog event from observable:', event);

          if (event?.value === 'confirm') {
            dialog.destroy();
          }
        },
        error: (error) => {
          console.error('Error in dialog event observable:', error);
        },
      });
  }
}`;

  /**
   * Effect handler for `DialogService` events (including Escape close).
   *
   * Pressing Escape triggers `closeEvent` -> host calls `DialogService.close()` which emits `'close'`.
   */
  protected readonly effectSnippet = `const { event, destroy } = this.dialogService.open({
  header: 'Delete Record',
  content: 'Are you sure you want to delete this record?',
  actionButtons: [
    { label: 'Delete', value: 'confirm', variant: 'danger' },
    { label: 'Cancel', value: 'cancel' },
  ],
});

effect(() => {
  const e = event();
  if (!e) return;
  if (e.value === 'close') {
    console.log('Dialog dismissed via X or Escape');
  } else if (e.value === 'confirm') {
    this.deleteRecord();
  }
  destroy();
});`;

  /**
   * Full component example combining service and direct usage.
   */
  protected readonly fullComponentSnippet = `import { DialogHostComponent, DialogComponent, DialogService } from '@im4all/roolith-ng';

@Component({
  imports: [DialogHostComponent, DialogComponent]
})
export class ExampleComponent {
  private dialogService = inject(DialogService);

  openDialog(): void {
    const { event, destroy } = this.dialogService.open({
      header: 'Delete Record',
      content: 'Are you sure you want to delete this record?',
      subheader: 'This cannot be undone',
      width: 480,
      actionButtons: [
        { label: 'Delete', value: 'confirm', variant: 'danger' },
        { label: 'Cancel', value: 'cancel' },
      ],
    });

    effect(() => {
      const e = event();
      if (!e) return;
      if (e.value === 'confirm') {
        this.deleteRecord();
      }
      destroy();
    });
  }

  deleteRecord(): void {
    console.log('Record deleted');
  }
}`;

  /**
   * Full template snippet for the `rng-dialog-host` setup and direct usage.
   */
  protected readonly fullTemplateSnippet = `<!-- Root layout -->
<rng-dialog-host />

<!-- Trigger -->
<rng-button variant="danger" (clickEvent)="openDialog()">Delete record</rng-button>

<!-- Direct usage without service -->
@if (showDirect) {
  <rng-dialog
    header="Confirm Action"
    subheader="This cannot be undone"
    [width]="480"
    [footerButtons]="buttons"
    (actionEvent)="onDirectAction($event)"
    (closeEvent)="onDirectClose()">
    <p>Custom dialog body content goes here.</p>
  </rng-dialog>
}`;

  protected lastEvent: IDialogEvent | null = null;
  protected lastAction: string | null = null;
  protected showDirectDialog = false;
  protected directLastAction: string | null = null;

  protected readonly directButtons = [
    { label: 'Confirm', value: 'confirm', variant: 'primary' as const },
    { label: 'Cancel', value: 'cancel' as const },
  ];

  /**
   * Opens a confirmation dialog via `DialogService` with custom header, content and footer buttons.
   *
   * @returns void
   */
  protected openConfirmation(): void {
    this.clearEffect();
    const { event, destroy } = this.dialogService.open({
      header: 'Delete Record',
      content: 'Are you sure you want to delete this record?',
      actionButtons: [
        { label: 'Delete', value: 'confirm', variant: 'danger' },
        { label: 'Cancel', value: 'cancel' },
      ],
    });

    this.currentEffect = effect(
      () => {
        const e = event();
        if (!e) {
          return;
        }
        this.lastEvent = e;
        this.lastAction = e.value;
        destroy();
        this.clearEffect();
      },
      { injector: this.injector },
    );
  }

  /**
   * Opens a dialog with a subheader and custom width.
   *
   * @returns void
   */
  protected openWithSubheader(): void {
    this.clearEffect();
    const { event, destroy } = this.dialogService.open({
      header: 'Upload File',
      subheader: 'Supported formats: PDF, XLSX',
      width: 600,
      content: 'Choose a file to upload. Maximum size is 10 MB.',
      actionButtons: [
        { label: 'Upload', value: 'upload', variant: 'primary' },
        { label: 'Cancel', value: 'cancel' },
      ],
    });

    this.currentEffect = effect(
      () => {
        const e = event();
        if (!e) {
          return;
        }
        this.lastEvent = e;
        this.lastAction = e.value;
        destroy();
        this.clearEffect();
      },
      { injector: this.injector },
    );
  }

  /**
   * Opens the default dialog with no config (uses built-in defaults).
   *
   * @returns void
   */
  protected openDefault(): void {
    this.clearEffect();
    const { event, destroy } = this.dialogService.open();

    this.currentEffect = effect(
      () => {
        const e = event();
        if (!e) {
          return;
        }
        this.lastEvent = e;
        this.lastAction = e.value;
        destroy();
        this.clearEffect();
      },
      { injector: this.injector },
    );
  }

  /**
   * Opens a dialog via `DialogService` using the observable pattern.
   *
   * Uses `toObservable(dialog.event)` + `takeUntilDestroyed` instead of `effect`.
   * Demonstrates `id: 'confirm-dialog'`, custom `header`/`content` and handling `confirm` via subscription.
   *
   * @returns void
   */
  protected openViaObservable(): void {
    this.clearEffect();

    const dialog = this.dialogService.open({
      id: 'confirm-dialog',
      header: 'Dialog opened via service',
      content:
        'This dialog was opened using the DialogService. You can customize the content and header by passing different values to the open method.',
      actionButtons: [
        { label: 'Cancel', value: 'cancel' },
        { label: 'Confirm', value: 'confirm', variant: 'primary' },
      ],
    });

    toObservable(dialog.event, { injector: this.injector })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (event) => {
          if (!event) {
            return;
          }

          this.lastEvent = event;
          this.lastAction = event.value;

          if (event.value === 'confirm' || event.value === 'cancel' || event.value === 'close') {
            dialog.destroy();
          }
        },
        error: (error) => {
          console.error('Error in dialog event observable:', error);
        },
      });
  }

  /**
   * Toggles the direct `rng-dialog` example.
   *
   * @returns void
   */
  protected toggleDirectDialog(): void {
    this.showDirectDialog = !this.showDirectDialog;
    if (this.showDirectDialog) {
      this.directLastAction = null;
    }
  }

  /**
   * Handles `actionEvent` from the direct `rng-dialog`.
   *
   * @param value The value of the clicked footer button.
   *
   * @returns void
   */
  protected onDirectAction(value: string): void {
    this.directLastAction = value;
    this.showDirectDialog = false;
  }

  /**
   * Handles `closeEvent` from the direct `rng-dialog` (X button or Escape).
   *
   * @returns void
   */
  protected onDirectClose(): void {
    this.directLastAction = 'close';
    this.showDirectDialog = false;
  }

  /**
   * Clears the pending service effect if any.
   *
   * @returns void
   */
  private clearEffect(): void {
    if (this.currentEffect) {
      this.currentEffect.destroy();
      this.currentEffect = null;
    }
  }
}
