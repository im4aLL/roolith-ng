import { Component, signal } from '@angular/core';
import { ButtonComponent, ITabContent, ITabItem, TabComponent, TabContentOfDirective } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-tab',
  imports: [CodeBlock, DocPager, TabComponent, TabContentOfDirective, ButtonComponent],
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
})
export class Tab {
  /**
   * Snippet for importing `TabComponent` and `TabContentOfDirective`.
   */
  protected readonly importSnippet = `import { TabComponent, TabContentOfDirective, ITabItem, ITabContent } from '@im4all/roolith-ng';

@Component({
  imports: [TabComponent, TabContentOfDirective]
})`;

  /**
   * `ITabItem` interface shape (alias for `IToggleGroupItem`).
   */
  protected readonly itemInterfaceSnippet = `import { ITabItem } from '@im4all/roolith-ng';

// ITabItem is an alias for IToggleGroupItem
interface ITabItem {
  label: string;
  value: string | number;
}`;

  /**
   * `ITabContent` interface shape.
   */
  protected readonly contentInterfaceSnippet = `import { ITabContent } from '@im4all/roolith-ng';

interface ITabContent {
  key: string | number; // must match ITabItem.value
  content: string;       // default body text
  header?: string;       // optional heading above body
}`;

  /**
   * Basic data snippet - parallel arrays matched by `value` / `key`.
   */
  protected readonly basicDataSnippet = `import { signal } from '@angular/core';
import { ITabItem, ITabContent } from '@im4all/roolith-ng';

tabs = signal<ITabItem[]>([
  { label: 'Tab 1', value: 'tab-1' },
  { label: 'Tab 2', value: 'tab-2' },
  { label: 'Tab 3', value: 'tab-3' },
]);

tabContents = signal<ITabContent[]>([
  { key: 'tab-1', header: 'Tab 1', content: 'Tab 1 content here.' },
  { key: 'tab-2', content: 'Tab 2 content here.' },
  { key: 'tab-3', content: 'Tab 3 content here.' },
]);`;

  /**
   * Basic template markup.
   */
  protected readonly basicSnippet = `<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  (changeEvent)="onTabChange($event)" />`;

  /**
   * Handler for `changeEvent`.
   */
  protected readonly changeHandlerSnippet = `import { ITabItem } from '@im4all/roolith-ng';

onTabChange(item: ITabItem): void {
  console.log(item);
}`;

  /**
   * Default selected tab markup via static `value`.
   */
  protected readonly valueSnippet = `<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  value="tab-2" />`;

  /**
   * Property-bound `value` via signal.
   */
  protected readonly valueSignalSnippet = `<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  [value]="activeTab()"
  (changeEvent)="onTabChange($event)" />`;

  /**
   * Signal state for the active tab.
   */
  protected readonly valueSignalTsSnippet = `activeTab = signal<string | number>('tab-1');

onTabChange(item: ITabItem): void {
  console.log('Selected tab:', item);
  // value is initial-only (read in ngOnInit) - update your own state here if needed
}`;

  /**
   * Note about `value` being initial-only.
   */
  protected readonly valueInitNoteSnippet = `// TabComponent reads value only in ngOnInit via _setInitialSelectedItem().
// Subsequent updates to activeTab() do not re-select the tab.
// Track the active tab yourself via (changeEvent) if you need it.`;

  /**
   * Custom pane template markup via `rngTabContentOf`.
   */
  protected readonly customTemplateSnippet = `<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  (changeEvent)="onTabChange($event)">
  <ng-template
    rngTabContentOf="tab-2"
    let-item>
    <h6 class="rng-tab__hl">{{ item.header }}</h6>
    <div class="rng-tab__text">{{ item.content }}. This text indicates that this is a custom template for tab 2</div>
    <rng-button variant="primary">Button in custom tab content</rng-button>
  </ng-template>
</rng-tab>`;

  /**
   * Simple text fallback custom snippet.
   */
  protected readonly customSimpleSnippet = `<rng-tab
  [items]="tabs()"
  [contents]="tabContents()">
  <ng-template
    rngTabContentOf="tab-1"
    let-tab>
    <h5>{{ tab.header }}</h5>
    <p>Custom <strong>tab 1</strong> content goes here.</p>
  </ng-template>
</rng-tab>`;

  /**
   * Multiple custom templates markup.
   */
  protected readonly multipleCustomSnippet = `<rng-tab
  [items]="tabs()"
  [contents]="tabContents()">
  <ng-template rngTabContentOf="tab-1" let-tab>
    <h5>{{ tab.header }}</h5>
    <p>Rich content for {{ tab.key }}.</p>
  </ng-template>
  <ng-template rngTabContentOf="tab-2" let-tab>
    <div class="my-card">
      <h6>{{ tab.header }}</h6>
      <p>{{ tab.content }}</p>
      <rng-button variant="primary">Action</rng-button>
    </div>
  </ng-template>
  <!-- tab-3 falls back to the default header + content rendering -->
</rng-tab>`;

  /**
   * Directive import snippet.
   */
  protected readonly directiveSnippet = `import { TabContentOfDirective } from '@im4all/roolith-ng';

@Component({
  imports: [TabComponent, TabContentOfDirective]
})`;

  /**
   * Vertical / block / flip layout markup - all 5 variants used in practice.
   */
  protected readonly layoutSnippet = `<!-- default (horizontal) -->
<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  (changeEvent)="onTabChange($event)" />

<!-- vertical -->
<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  [vertical]="true"
  (changeEvent)="onTabChange($event)" />

<!-- vertical + flip -->
<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  [vertical]="true"
  [flip]="true"
  (changeEvent)="onTabChange($event)" />

<!-- block (full-width bar) -->
<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  [block]="true"
  (changeEvent)="onTabChange($event)" />

<!-- block + flip -->
<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  [block]="true"
  [flip]="true"
  (changeEvent)="onTabChange($event)" />`;

  /**
   * Numeric keys markup.
   */
  protected readonly numericSnippet = `tabs = signal<ITabItem[]>([
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
]);

tabContents = signal<ITabContent[]>([
  { key: 1, header: 'One', content: 'First pane.' },
  { key: 2, content: 'Second pane.' },
]);`;

  /**
   * Full example component.
   */
  protected readonly fullSnippet = `import { Component, signal } from '@angular/core';
import { TabComponent, TabContentOfDirective, ITabItem, ITabContent } from '@im4all/roolith-ng';

@Component({
  imports: [TabComponent, TabContentOfDirective]
})
export class ExampleComponent {
  tabs = signal<ITabItem[]>([
    { label: 'Overview', value: 'overview' },
    { label: 'Details', value: 'details' },
    { label: 'History', value: 'history' },
  ]);

  tabContents = signal<ITabContent[]>([
    { key: 'overview', header: 'Overview', content: 'Overview content here.' },
    { key: 'details', header: 'Details', content: 'Details content here.' },
    { key: 'history', content: 'History content here.' },
  ]);

  lastChange: ITabItem | null = null;

  onTabChange(item: ITabItem): void {
    this.lastChange = item;
  }
}`;

  /**
   * Full example template.
   */
  protected readonly fullTemplateSnippet = `<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  [value]="activeTab()"
  (changeEvent)="onTabChange($event)">
  <ng-template
    rngTabContentOf="overview"
    let-tab>
    <h5>{{ tab.header }}</h5>
    <p>Custom <strong>overview</strong> with rich HTML.</p>
    <rng-button variant="primary">Action</rng-button>
  </ng-template>
</rng-tab>

@if (lastChange) {
  <p>Last change: {{ lastChange.label }} ({{ lastChange.value }})</p>
}`;

  protected readonly basicTabs = signal<ITabItem[]>([
    { label: 'Tab 1', value: 'tab-1' },
    { label: 'Tab 2', value: 'tab-2' },
    { label: 'Tab 3', value: 'tab-3' },
  ]);

  protected readonly basicContents = signal<ITabContent[]>([
    { key: 'tab-1', header: 'Tab 1', content: 'Tab 1 content here.' },
    { key: 'tab-2', content: 'Tab 2 content here.' },
    { key: 'tab-3', content: 'Tab 3 content here.' },
  ]);

  protected readonly withValueTabs = signal<ITabItem[]>([
    { label: 'Tab 1', value: 'tab-1' },
    { label: 'Tab 2', value: 'tab-2' },
    { label: 'Tab 3', value: 'tab-3' },
  ]);

  protected readonly withValueContents = signal<ITabContent[]>([
    { key: 'tab-1', header: 'Tab 1', content: 'Tab 1 content here.' },
    { key: 'tab-2', header: 'Tab 2', content: 'Tab 2 content here.' },
    { key: 'tab-3', content: 'Tab 3 content here.' },
  ]);

  protected readonly customTabs = signal<ITabItem[]>([
    { label: 'Tab 1', value: 'tab-1' },
    { label: 'Tab 2', value: 'tab-2' },
    { label: 'Tab 3', value: 'tab-3' },
  ]);

  protected readonly customContents = signal<ITabContent[]>([
    { key: 'tab-1', header: 'Tab 1', content: 'Tab 1 content here.' },
    { key: 'tab-2', header: 'Tab 2', content: 'Tab 2 content here.' },
    { key: 'tab-3', header: 'Tab 3', content: 'Tab 3 content here.' },
  ]);

  protected readonly layoutTabs = signal<ITabItem[]>([
    { label: 'Tab 1', value: 'tab-1' },
    { label: 'Tab 2', value: 'tab-2' },
    { label: 'Tab 3', value: 'tab-3' },
  ]);

  protected readonly layoutContents = signal<ITabContent[]>([
    { key: 'tab-1', header: 'Content for Tab 1', content: 'This is the content for Tab 1' },
    { key: 'tab-2', header: 'Content for Tab 2', content: 'This is the content for Tab 2' },
    { key: 'tab-3', header: 'Content for Tab 3', content: 'This is the content for Tab 3' },
  ]);

  protected readonly fullTabs = signal<ITabItem[]>([
    { label: 'Overview', value: 'overview' },
    { label: 'Details', value: 'details' },
    { label: 'History', value: 'history' },
  ]);

  protected readonly fullContents = signal<ITabContent[]>([
    { key: 'overview', header: 'Overview', content: 'Overview content here.' },
    { key: 'details', header: 'Details', content: 'Details content here.' },
    { key: 'history', content: 'History content here.' },
  ]);

  protected readonly activeTab = signal<string | number>('tab-1');
  protected readonly activeTabLayout = signal<string | number>('tab-1');
  protected lastEvent: ITabItem | null = null;
  protected fullLastEvent: ITabItem | null = null;

  /**
   * Handles `changeEvent` from the basic tab demo.
   *
   * @param item The tab item that was selected.
   *
   * @returns void
   */
  protected onTabChange(item: ITabItem): void {
    this.lastEvent = item;
  }

  /**
   * Handles `changeEvent` from the layout demos and keeps a signal in sync if you need it.
   *
   * @param item The tab item that was selected.
   *
   * @returns void
   */
  protected onLayoutChange(item: ITabItem): void {
    this.activeTabLayout.set(item.value);
    this.lastEvent = item;
  }

  /**
   * Handles `changeEvent` from the full example.
   *
   * @param item The tab item that was selected.
   *
   * @returns void
   */
  protected onFullChange(item: ITabItem): void {
    this.fullLastEvent = item;
  }
}
