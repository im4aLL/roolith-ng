import { Component, signal } from '@angular/core';
import { ButtonComponent, ProgressComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-progress',
  imports: [CodeBlock, DocPager, ProgressComponent, ButtonComponent],
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
})
export class Progress {
  /**
   * Snippet for importing `ProgressComponent`.
   */
  protected readonly importSnippet = `import { ProgressComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ProgressComponent]
})`;

  /**
   * Basic usage markup - label with default `max` 100.
   */
  protected readonly basicSnippet = `<rng-progress
  label="File upload"
  [value]="70" />`;

  /**
   * Custom `max` markup - value relative to a custom maximum.
   */
  protected readonly customMaxSnippet = `<rng-progress
  label="Tasks completed"
  [value]="3"
  [max]="10" />`;

  /**
   * Without label markup - bar with percentage only.
   */
  protected readonly withoutLabelSnippet = `<rng-progress [value]="45" />`;

  /**
   * Without `showValue` markup - label only, no percentage.
   */
  protected readonly withoutShowValueSnippet = `<rng-progress
  label="Loading"
  [value]="60"
  [showValue]="false" />`;

  /**
   * Bar only markup - no header when `label` is `null` and `showValue` is `false`.
   */
  protected readonly barOnlySnippet = `<rng-progress
  [value]="55"
  [showValue]="false" />`;

  /**
   * Dynamic value (signal binding) - TypeScript.
   */
  protected readonly dynamicTsSnippet = `uploadProgress = signal<number>(0);`;

  /**
   * Dynamic value (signal binding) - template.
   */
  protected readonly dynamicSnippet = `<rng-progress
  label="Uploading..."
  [value]="uploadProgress()" />`;

  /**
   * Clamping behavior markup - values outside `0-max` are clamped.
   */
  protected readonly clampingSnippet = `<!-- Clamped to 100% - value exceeds max -->
<rng-progress label="Overfilled" [value]="150" [max]="100" />

<!-- Clamped to 0% - negative value -->
<rng-progress label="Negative" [value]="-20" />

<!-- Guarded division - max 0 returns 0% -->
<rng-progress label="No capacity" [value]="50" [max]="0" />`;

  /**
   * Interactive controls markup - buttons driving a signal.
   */
  protected readonly interactiveSnippet = `<rng-progress
  label="Upload progress"
  [value]="progress()" />

<rng-button size="small" (clickEvent)="decrease()">-10</rng-button>
<rng-button size="small" (clickEvent)="increase()">+10</rng-button>
<rng-button size="small" variant="ghost" (clickEvent)="reset()">Reset</rng-button>`;

  /**
   * Interactive controls - component.
   */
  protected readonly interactiveTsSnippet = `progress = signal<number>(60);

increase(): void {
  this.progress.update((value) => Math.min(100, value + 10));
}

decrease(): void {
  this.progress.update((value) => Math.max(0, value - 10));
}

reset(): void {
  this.progress.set(0);
}`;

  /**
   * Full example combining `label`, `value`, `max` and `showValue`.
   */
  protected readonly fullSnippet = `<rng-progress
  label="File upload"
  [value]="70" />

<rng-progress
  label="Tasks completed"
  [value]="3"
  [max]="10" />

<rng-progress [value]="45" />

<rng-progress
  label="Loading"
  [value]="60"
  [showValue]="false" />

<rng-progress
  label="Uploading..."
  [value]="uploadProgress()" />`;

  /**
   * Full component snippet.
   */
  protected readonly fullComponentSnippet = `import { ProgressComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ProgressComponent]
})
export class ExampleComponent {
  uploadProgress = signal<number>(0);

  simulateUpload(): void {
    let value = 0;
    const timer = setInterval(() => {
      value += 10;
      this.uploadProgress.set(value);
      if (value >= 100) clearInterval(timer);
    }, 300);
  }
}`;

  protected readonly interactiveProgress = signal<number>(60);
  protected readonly uploadProgress = signal<number>(35);
  protected readonly clampingOver = signal<number>(150);
  protected readonly clampingNegative = signal<number>(-20);
  private uploadTimer: ReturnType<typeof setInterval> | undefined;

  /**
   * Increases the interactive progress by 10, clamped to 100.
   *
   * @returns void
   */
  protected increase(): void {
    this.interactiveProgress.update((value) => Math.min(100, value + 10));
  }

  /**
   * Decreases the interactive progress by 10, clamped to 0.
   *
   * @returns void
   */
  protected decrease(): void {
    this.interactiveProgress.update((value) => Math.max(0, value - 10));
  }

  /**
   * Resets the interactive progress to 0.
   *
   * @returns void
   */
  protected reset(): void {
    this.interactiveProgress.set(0);
  }

  /**
   * Sets the interactive progress to 60.
   *
   * @returns void
   */
  protected resetToDefault(): void {
    this.interactiveProgress.set(60);
  }

  /**
   * Simulates an upload by incrementing `uploadProgress` until 100.
   *
   * Increments by 10 every 300ms and clears the timer when complete.
   * No-op while an upload is already in progress.
   *
   * @returns void
   */
  protected simulateUpload(): void {
    if (this.uploadTimer) {
      return;
    }

    this.uploadProgress.set(0);

    let value = 0;
    this.uploadTimer = setInterval(() => {
      value += 10;
      this.uploadProgress.set(value);

      if (value >= 100) {
        clearInterval(this.uploadTimer);
        this.uploadTimer = undefined;
      }
    }, 300);
  }

  /**
   * Resets the upload progress and clears any active timer.
   *
   * @returns void
   */
  protected resetUpload(): void {
    if (this.uploadTimer) {
      clearInterval(this.uploadTimer);
      this.uploadTimer = undefined;
    }

    this.uploadProgress.set(35);
  }
}
