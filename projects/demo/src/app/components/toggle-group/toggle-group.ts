import { Component, signal } from '@angular/core';
import { IToggleGroupItem, ToggleGroupComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-toggle-group',
  imports: [CodeBlock, DocPager, ToggleGroupComponent],
  templateUrl: './toggle-group.html',
  styleUrl: './toggle-group.scss',
})
export class ToggleGroup {
  /**
   * Snippet for importing `ToggleGroupComponent`.
   */
  protected readonly importSnippet = `import { ToggleGroupComponent, IToggleGroupItem } from '@im4all/roolith-ng';

@Component({
  imports: [ToggleGroupComponent]
})`;

  /**
   * `IToggleGroupItem` interface shape.
   */
  protected readonly interfaceSnippet = `import { IToggleGroupItem } from '@im4all/roolith-ng';

interface IToggleGroupItem {
  label: string;
  value: string | number;
}`;

  /**
   * Basic usage markup - items, value and valueChange.
   */
  protected readonly basicSnippet = `<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  (valueChange)="onToggleChange($event)" />`;

  /**
   * Basic setup - items array and signal state.
   */
  protected readonly basicTsSnippet = `import { signal } from '@angular/core';
import { IToggleGroupItem } from '@im4all/roolith-ng';

items = signal<IToggleGroupItem[]>([
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]);

activeValue = signal<string | number>('day');

onToggleChange(item: IToggleGroupItem): void {
  this.activeValue.set(item.value);
}`;

  /**
   * Vertical layout markup.
   */
  protected readonly verticalSnippet = `<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  [vertical]="true"
  (valueChange)="onToggleChange($event)" />`;

  /**
   * Block (full-width) layout markup.
   */
  protected readonly blockSnippet = `<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  [block]="true"
  (valueChange)="onToggleChange($event)" />`;

  /**
   * Vertical + block layout markup.
   */
  protected readonly verticalBlockSnippet = `<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  [vertical]="true"
  [block]="true"
  (valueChange)="onToggleChange($event)" />`;

  /**
   * All layout variants together for reference.
   */
  protected readonly layoutSnippet = `<!-- default (horizontal) -->
<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  (valueChange)="onToggleChange($event)" />

<!-- vertical -->
<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  [vertical]="true"
  (valueChange)="onToggleChange($event)" />

<!-- block (full-width) -->
<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  [block]="true"
  (valueChange)="onToggleChange($event)" />

<!-- vertical + block -->
<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  [vertical]="true"
  [block]="true"
  (valueChange)="onToggleChange($event)" />`;

  /**
   * Null value - no active item.
   */
  protected readonly nullValueSnippet = `<rng-toggle-group
  [items]="items()"
  [value]="null"
  (valueChange)="onToggleChange($event)" />`;

  /**
   * Numeric values markup - IToggleGroupItem with number values.
   */
  protected readonly numericSnippet = `items = signal<IToggleGroupItem[]>([
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 },
]);

activeValue = signal<string | number>(2);`;

  /**
   * Template for numeric values.
   */
  protected readonly numericTemplateSnippet = `<rng-toggle-group
  [items]="numericItems()"
  [value]="numericValue()"
  (valueChange)="onNumericChange($event)" />

<p>Selected: {{ numericValue() }}</p>`;

  /**
   * Handler snippet for `valueChange`.
   */
  protected readonly handlerSnippet = `onToggleChange(item: IToggleGroupItem): void {
  this.activeValue.set(item.value);
  console.log('selected:', item);
}`;

  /**
   * Alternative handler showing numeric value update.
   */
  protected readonly numericHandlerSnippet = `onNumericChange(item: IToggleGroupItem): void {
  this.numericValue.set(item.value);
}`;

  /**
   * Full example combining horizontal, vertical and block.
   */
  protected readonly fullSnippet = `import { Component, signal } from '@angular/core';
import { ToggleGroupComponent, IToggleGroupItem } from '@im4all/roolith-ng';

@Component({
  imports: [ToggleGroupComponent]
})
export class ExampleComponent {
  items = signal<IToggleGroupItem[]>([
    { label: 'Overview', value: 'overview' },
    { label: 'Details', value: 'details' },
    { label: 'History', value: 'history' },
  ]);

  activeValue = signal<string | number>('overview');
  blockValue = signal<string | number>('details');
  verticalValue = signal<string | number>('overview');

  onToggleChange(item: IToggleGroupItem): void {
    this.activeValue.set(item.value);
  }

  onBlockChange(item: IToggleGroupItem): void {
    this.blockValue.set(item.value);
  }

  onVerticalChange(item: IToggleGroupItem): void {
    this.verticalValue.set(item.value);
  }
}`;

  /**
   * Full template markup.
   */
  protected readonly fullTemplateSnippet = `<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  (valueChange)="onToggleChange($event)" />

<rng-toggle-group
  [items]="items()"
  [value]="blockValue()"
  [block]="true"
  (valueChange)="onBlockChange($event)" />

<rng-toggle-group
  [items]="items()"
  [value]="verticalValue()"
  [vertical]="true"
  (valueChange)="onVerticalChange($event)" />`;

  protected readonly basicItems = signal<IToggleGroupItem[]>([
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ]);

  protected readonly verticalItems = signal<IToggleGroupItem[]>([
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ]);

  protected readonly blockItems = signal<IToggleGroupItem[]>([
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ]);

  protected readonly verticalBlockItems = signal<IToggleGroupItem[]>([
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ]);

  protected readonly layoutItems = signal<IToggleGroupItem[]>([
    { label: 'Overview', value: 'overview' },
    { label: 'Details', value: 'details' },
    { label: 'History', value: 'history' },
  ]);

  protected readonly numericItems = signal<IToggleGroupItem[]>([
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
  ]);

  protected readonly fullItems = signal<IToggleGroupItem[]>([
    { label: 'Overview', value: 'overview' },
    { label: 'Details', value: 'details' },
    { label: 'History', value: 'history' },
  ]);

  protected basicValue = signal<string | number | null>('day');
  protected verticalValue = signal<string | number | null>('week');
  protected blockValue = signal<string | number | null>('month');
  protected verticalBlockValue = signal<string | number | null>('day');
  protected layoutValue = signal<string | number | null>('overview');
  protected numericValue = signal<string | number | null>(2);
  protected fullValue = signal<string | number | null>('overview');
  protected fullBlockValue = signal<string | number | null>('details');
  protected fullVerticalValue = signal<string | number | null>('overview');
  protected lastEvent: IToggleGroupItem | null = null;
  protected fullLastEvent: IToggleGroupItem | null = null;

  /**
   * Handles `valueChange` from the basic demo and updates the active value.
   *
   * @param item The item that was clicked.
   *
   * @returns void
   */
  protected onBasicChange(item: IToggleGroupItem): void {
    this.basicValue.set(item.value);
    this.lastEvent = item;
  }

  /**
   * Handles `valueChange` from the vertical demo.
   *
   * @param item The item that was clicked.
   *
   * @returns void
   */
  protected onVerticalChange(item: IToggleGroupItem): void {
    this.verticalValue.set(item.value);
    this.lastEvent = item;
  }

  /**
   * Handles `valueChange` from the block demo.
   *
   * @param item The item that was clicked.
   *
   * @returns void
   */
  protected onBlockChange(item: IToggleGroupItem): void {
    this.blockValue.set(item.value);
    this.lastEvent = item;
  }

  /**
   * Handles `valueChange` from the vertical + block demo.
   *
   * @param item The item that was clicked.
   *
   * @returns void
   */
  protected onVerticalBlockChange(item: IToggleGroupItem): void {
    this.verticalBlockValue.set(item.value);
    this.lastEvent = item;
  }

  /**
   * Handles `valueChange` from the layout combined demo.
   *
   * @param item The item that was clicked.
   *
   * @returns void
   */
  protected onLayoutChange(item: IToggleGroupItem): void {
    this.layoutValue.set(item.value);
    this.lastEvent = item;
  }

  /**
   * Handles `valueChange` from the numeric demo.
   *
   * @param item The item that was clicked - value may be `number`.
   *
   * @returns void
   */
  protected onNumericChange(item: IToggleGroupItem): void {
    this.numericValue.set(item.value);
    this.lastEvent = item;
  }

  /**
   * Handles `valueChange` from the full example.
   *
   * @param item The item that was clicked.
   *
   * @returns void
   */
  protected onFullChange(item: IToggleGroupItem): void {
    this.fullValue.set(item.value);
    this.fullLastEvent = item;
  }

  /**
   * Handles `valueChange` from the full block demo.
   *
   * @param item The item that was clicked.
   *
   * @returns void
   */
  protected onFullBlockChange(item: IToggleGroupItem): void {
    this.fullBlockValue.set(item.value);
    this.fullLastEvent = item;
  }

  /**
   * Handles `valueChange` from the full vertical demo.
   *
   * @param item The item that was clicked.
   *
   * @returns void
   */
  protected onFullVerticalChange(item: IToggleGroupItem): void {
    this.fullVerticalValue.set(item.value);
    this.fullLastEvent = item;
  }
}
