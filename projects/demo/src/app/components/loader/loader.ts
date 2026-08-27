import { Component, inject, signal } from '@angular/core';
import {
  ButtonComponent,
  CardComponent,
  InlineLoaderComponent,
  LoaderComponent,
  LoaderService,
} from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-loader',
  imports: [CodeBlock, DocPager, ButtonComponent, CardComponent, LoaderComponent, InlineLoaderComponent],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  private readonly loaderService = inject(LoaderService);

  protected readonly isInlineLoading = signal(false);
  protected readonly isCardLoading = signal(false);

  /**
   * Snippet for importing `LoaderComponent`, `InlineLoaderComponent` and `LoaderService`.
   */
  protected readonly importSnippet = `import { LoaderComponent, InlineLoaderComponent, LoaderService } from '@im4all/roolith-ng';

@Component({
  imports: [LoaderComponent, InlineLoaderComponent]
})`;

  /**
   * Snippet for placing `rng-loader` in the root layout.
   */
  protected readonly setupSnippet = `<!-- app.component.html - place once in root layout -->
<rng-loader />`;

  /**
   * Snippet for injecting `LoaderService`.
   */
  protected readonly injectSnippet = `import { LoaderService } from '@im4all/roolith-ng';

@Component({ ... })
export class MyComponent {
  private loaderService = inject(LoaderService);
}`;

  /**
   * Blocking loader - default message.
   */
  protected readonly blockingSnippet = `this.loaderService.show();`;

  /**
   * Hide snippet.
   */
  protected readonly hideSnippet = `this.loaderService.hide();`;

  /**
   * Blocking loader with custom message.
   */
  protected readonly blockingCustomSnippet = `this.loaderService.show('Saving changes...');`;

  /**
   * Non-blocking loader - default message.
   */
  protected readonly nonBlockingSnippet = `this.loaderService.showNonBlocking();`;

  /**
   * Non-blocking loader with custom message.
   */
  protected readonly nonBlockingCustomSnippet = `this.loaderService.showNonBlocking('Loading data...');`;

  /**
   * Async operation with loader and `finally`.
   */
  protected readonly asyncSnippet = `async loadData(): Promise<void> {
  this.loaderService.show('Fetching records...');
  try {
    await this.dataService.fetchAll();
  } finally {
    this.loaderService.hide();
  }
}`;

  /**
   * Snippet for auto-hide after a timeout - demo helper.
   */
  protected readonly autoHideSnippet = `this.loaderService.show('Processing...');

setTimeout(() => {
  this.loaderService.hide();
}, 2000);`;

  /**
   * Snippet for importing `InlineLoaderComponent`.
   */
  protected readonly inlineImportSnippet = `import { InlineLoaderComponent } from '@im4all/roolith-ng';

@Component({
  imports: [InlineLoaderComponent]
})`;

  /**
   * Basic inline loader markup.
   */
  protected readonly inlineBasicSnippet = `<rng-inline-loader />`;

  /**
   * Custom label markup for inline loader.
   */
  protected readonly inlineCustomSnippet = `<rng-inline-loader>Fetching data...</rng-inline-loader>`;

  /**
   * Inline loader inside a button markup.
   */
  protected readonly inlineButtonSnippet = `<button [disabled]="isLoading()">
  @if (isLoading()) {
    <rng-inline-loader>Saving...</rng-inline-loader>
  } @else {
    Save
  }
</button>`;

  /**
   * Inline loader inside a card markup.
   */
  protected readonly inlineCardSnippet = `<rng-card header="Recent activity">
  @if (isLoading()) {
    <rng-inline-loader>Loading activity...</rng-inline-loader>
  } @else {
    <p>Activity loaded - 3 new items.</p>
  }
</rng-card>`;

  /**
   * Full component snippet combining loader service and inline loader.
   */
  protected readonly fullComponentSnippet = `import { LoaderComponent, InlineLoaderComponent, LoaderService } from '@im4all/roolith-ng';

@Component({
  imports: [LoaderComponent, InlineLoaderComponent]
})
export class ExampleComponent {
  private loaderService = inject(LoaderService);
  isLoading = signal(false);

  async save(): Promise<void> {
    this.loaderService.show('Saving changes...');
    try {
      await this.api.save();
    } finally {
      this.loaderService.hide();
    }
  }

  toggleInline(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }
}`;

  /**
   * Full template snippet.
   */
  protected readonly fullTemplateSnippet = `<!-- Global blocking loader - place once in app.component.html -->
<rng-loader />

<!-- Trigger blocking loader -->
<rng-button variant="primary" (clickEvent)="save()">Save</rng-button>

<!-- Non-blocking -->
<rng-button variant="secondary" (clickEvent)="loaderService.showNonBlocking('Loading...')">Show non-blocking</rng-button>

<!-- Inline loader -->
<rng-inline-loader>Loading...</rng-inline-loader>

<!-- Inline inside button -->
<button [disabled]="isLoading()">
  @if (isLoading()) {
    <rng-inline-loader>Saving...</rng-inline-loader>
  } @else {
    Save
  }
</button>`;

  /**
   * Shows the blocking loader with the default `Processing...` message and auto-hides after 2 seconds.
   *
   * @returns void
   */
  protected showBlocking(): void {
    this.loaderService.show();
    setTimeout(() => this.loaderService.hide(), 2000);
  }

  /**
   * Shows the blocking loader with a custom message and auto-hides after 2 seconds.
   *
   * @returns void
   */
  protected showBlockingCustom(): void {
    this.loaderService.show('Saving changes...');
    setTimeout(() => this.loaderService.hide(), 2000);
  }

  /**
   * Shows the non-blocking loader and auto-hides after 2 seconds.
   *
   * The overlay does not block interaction - you can still click other demo buttons while it is visible.
   *
   * @returns void
   */
  protected showNonBlocking(): void {
    this.loaderService.showNonBlocking();
    setTimeout(() => this.loaderService.hide(), 2000);
  }

  /**
   * Shows the non-blocking loader with a custom message and auto-hides after 2 seconds.
   *
   * @returns void
   */
  protected showNonBlockingCustom(): void {
    this.loaderService.showNonBlocking('Loading data...');
    setTimeout(() => this.loaderService.hide(), 2000);
  }

  /**
   * Simulates an async operation with the blocking loader.
   *
   * Shows `Fetching records...`, waits 2 seconds, then hides. Uses `setTimeout` to mimic `await` + `finally`.
   *
   * @returns void
   */
  protected showAsync(): void {
    this.loaderService.show('Fetching records...');
    setTimeout(() => this.loaderService.hide(), 2000);
  }

  /**
   * Toggles the inline button demo - shows `Saving...` for 2 seconds.
   *
   * @returns void
   */
  protected triggerInlineButton(): void {
    if (this.isInlineLoading()) {
      return;
    }

    this.isInlineLoading.set(true);
    setTimeout(() => this.isInlineLoading.set(false), 2000);
  }

  /**
   * Toggles the inline card demo - shows the loader inside a card for 2 seconds.
   *
   * @returns void
   */
  protected triggerCardLoading(): void {
    if (this.isCardLoading()) {
      return;
    }

    this.isCardLoading.set(true);
    setTimeout(() => this.isCardLoading.set(false), 2000);
  }
}
