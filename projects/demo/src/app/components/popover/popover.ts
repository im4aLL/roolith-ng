import { Component, signal } from '@angular/core';
import {
  ButtonComponent,
  IPopoverChangeEvent,
  PopoverComponent,
  PopoverTargetDirective,
} from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-popover',
  imports: [CodeBlock, DocPager, ButtonComponent, PopoverComponent, PopoverTargetDirective],
  templateUrl: './popover.html',
  styleUrl: './popover.scss',
})
export class Popover {
  /**
   * Snippet for importing `IMPORT_POPOVER`.
   */
  protected readonly importSnippet = `import { IMPORT_POPOVER } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_POPOVER]
})`;

  /**
   * Snippet for importing `PopoverComponent` and `PopoverTargetDirective` individually.
   */
  protected readonly importIndividualSnippet = `import { PopoverComponent, PopoverTargetDirective } from '@im4all/roolith-ng';

@Component({
  imports: [PopoverComponent, PopoverTargetDirective]
})`;

  /**
   * Snippet for the `rngPopoverTarget` directive and `rng-popover` linkage.
   */
  protected readonly targetSnippet = `<!-- Trigger - wrapper with rngPopoverTarget -->
<div rngPopoverTarget="info">
  <rng-button>Show Info</rng-button>
</div>

<!-- Panel - name must match the target value -->
<rng-popover name="info">
  <p>This is the popover content.</p>
</rng-popover>`;

  /**
   * Basic popover template markup.
   */
  protected readonly basicSnippet = `<div rngPopoverTarget="info">
  <rng-button>Show Info</rng-button>
</div>

<rng-popover name="info">
  <p>This is the popover content.</p>
</rng-popover>`;

  /**
   * With `header` and `subtext` as string inputs.
   */
  protected readonly withHeaderSnippet = `<div rngPopoverTarget="details">
  <rng-button
    variant="ghost"
    icon="info">
    Details
  </rng-button>
</div>

<rng-popover
  name="details"
  header="Popover Title"
  subtext="Last updated 5 minutes ago">
  <p>Detailed information goes here.</p>
</rng-popover>`;

  /**
   * With `header` and `subtext` via template projection.
   */
  protected readonly withTemplateSnippet = `<div rngPopoverTarget="details">
  <rng-button
    variant="ghost"
    icon="info">
    Details
  </rng-button>
</div>

<rng-popover name="details">
  <ng-template #rngPopoverHeader>Popover Title</ng-template>
  <ng-template #rngPopoverSubtext>Last updated 5 minutes ago</ng-template>

  <p>Detailed information goes here.</p>
</rng-popover>`;

  /**
   * Rich body content via default `ng-content`.
   */
  protected readonly richContentSnippet = `<rng-popover name="info">
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <strong>Heads up!</strong>
    <p style="margin: 0;">You can project any markup - lists, buttons or custom layouts - into the default slot.</p>
    <rng-button size="xsmall" (clickEvent)="infoPopover.closePopover()">Got it</rng-button>
  </div>
</rng-popover>`;

  /**
   * Fixed `alignment` markup.
   */
  protected readonly alignmentSnippet = `<!-- Always opens to the right -->
<rng-popover
  name="menu"
  alignment="right">
  <p>Right-aligned content.</p>
</rng-popover>

<!-- Always opens above -->
<rng-popover
  name="menu"
  alignment="top">
  <p>Top-aligned content.</p>
</rng-popover>

<!-- Always opens above and to the right -->
<rng-popover
  name="menu"
  alignment="top-right">
  <p>Top-right-aligned content.</p>
</rng-popover>`;

  /**
   * Listening to `changeEvent`.
   */
  protected readonly changeEventSnippet = `<rng-popover
  name="info"
  (changeEvent)="onPopoverChange($event)">
  Content
</rng-popover>`;

  /**
   * Handler for `IPopoverChangeEvent`.
   */
  protected readonly changeEventHandlerSnippet = `import { IPopoverChangeEvent } from '@im4all/roolith-ng';

onPopoverChange(event: IPopoverChangeEvent): void {
  console.log(event.type); // 'open' | 'close'
}`;

  /**
   * Programmatic close via `closePopover()`.
   */
  protected readonly closeSnippet = `<div rngPopoverTarget="info">
  <rng-button>Open</rng-button>
</div>

<rng-popover name="info" #infoPopover>
  <p>Popover content with a close action.</p>
  <rng-button
    size="xsmall"
    variant="dark"
    (clickEvent)="infoPopover.closePopover()">
    Close
  </rng-button>
</rng-popover>`;

  /**
   * Handler for programmatic close via `viewChild` (alternative).
   */
  protected readonly closeTsSnippet = `import { viewChild } from '@angular/core';
import { PopoverComponent } from '@im4all/roolith-ng';

popover = viewChild<PopoverComponent>('infoPopover');

close(): void {
  this.popover()?.closePopover();
}`;

  /**
   * Full example combining `rngPopoverTarget`, `header`, `subtext`, `alignment` and `changeEvent`.
   */
  protected readonly fullSnippet = `import { IMPORT_POPOVER, ButtonComponent, IPopoverChangeEvent } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_POPOVER, ButtonComponent]
})
export class ExampleComponent {
  onPopoverChange(event: IPopoverChangeEvent): void {
    console.log('Popover:', event.type);
  }
}`;

  /**
   * Full template snippet.
   */
  protected readonly fullTemplateSnippet = `<div rngPopoverTarget="details">
  <rng-button
    variant="ghost"
    icon="info">
    Details
  </rng-button>
</div>

<rng-popover
  name="details"
  header="Popover Title"
  subtext="Last updated 5 minutes ago"
  (changeEvent)="onPopoverChange($event)">
  <p>Detailed information goes here.</p>
  <rng-button size="xsmall" (clickEvent)="detailsPopover.closePopover()">Dismiss</rng-button>
</rng-popover>`;

  protected readonly lastChange = signal<IPopoverChangeEvent | null>(null);
  protected readonly lastChangeSource = signal<string | null>(null);

  /**
   * Handles `changeEvent` from any `rng-popover` demo and stores the last event.
   *
   * The native `toggle` event is forwarded as `{ type: 'open' | 'close' }`.
   * Close fires when the popover is dismissed via outside click, Escape or `hidePopover()`.
   *
   * @param event The popover change event payload.
   * @param source Label identifying which demo emitted the event.
   *
   * @returns void
   */
  protected onPopoverChange(event: IPopoverChangeEvent, source: string): void {
    this.lastChange.set(event);
    this.lastChangeSource.set(source);
  }
}
