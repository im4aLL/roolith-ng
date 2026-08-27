import { Component, computed, signal, viewChild } from '@angular/core';
import { SearchInputComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-search-input',
  imports: [CodeBlock, DocPager, SearchInputComponent],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  /**
   * Snippet for importing `SearchInputComponent`.
   */
  protected readonly importSnippet = `import { SearchInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [SearchInputComponent]
})`;

  /**
   * Basic usage markup - debounced output.
   */
  protected readonly basicSnippet = `<rng-search-input (debouncedChange)="onSearch($event)" />`;

  /**
   * Basic handler snippet for `debouncedChange`.
   */
  protected readonly basicTsSnippet = `searchQuery = signal<string | null>(null);

onSearch(value: string | null): void {
  this.searchQuery.set(value);
  console.log('search:', value);
}`;

  /**
   * Two-way binding markup via `value` model.
   */
  protected readonly twoWaySnippet = `<rng-search-input [(value)]="searchQuery" />

<!-- Explicit output handling -->
<rng-search-input
  [value]="searchQuery()"
  (valueChange)="onSearchChange($event)" />`;

  /**
   * Handler snippet for `valueChange`.
   */
  protected readonly twoWayTsSnippet = `searchQuery = signal<string | null>(null);

onSearchChange(value: string | null): void {
  this.searchQuery.set(value);
}`;

  /**
   * Custom debounce markup - longer delay.
   */
  protected readonly customDebounceSnippet = `<rng-search-input
  [debouncedTime]="500"
  (debouncedChange)="onSearch($event)" />`;

  /**
   * No debounce markup - emits immediately.
   */
  protected readonly noDebounceSnippet = `<rng-search-input
  [debouncedTime]="0"
  (debouncedChange)="onSearch($event)" />`;

  /**
   * Debounce timing comparison snippet.
   */
  protected readonly debounceSnippet = `<!-- Default 250ms -->
<rng-search-input (debouncedChange)="onSearch($event)" />

<!-- Custom 500ms -->
<rng-search-input [debouncedTime]="500" (debouncedChange)="onSearch($event)" />

<!-- No debounce -->
<rng-search-input [debouncedTime]="0" (debouncedChange)="onSearch($event)" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-search-input [disabled]="true" />

<rng-search-input [disabled]="true" [(value)]="query" />`;

  /**
   * Clear button markup - appears when input has a value.
   */
  protected readonly clearSnippet = `<!-- Clear button appears automatically when there is a value -->
<rng-search-input [(value)]="query" />

<!-- Clicking it calls clearInput() internally which resets value to '' -->`;

  /**
   * Focus method markup.
   */
  protected readonly focusSnippet = `<rng-search-input #searchInput [(value)]="query" />
<button type="button" (click)="searchInput.focus()">Focus input</button>`;

  /**
   * Focus method handler snippet.
   */
  protected readonly focusTsSnippet = `import { viewChild } from '@angular/core';
import { SearchInputComponent } from '@im4all/roolith-ng';

searchInput = viewChild<SearchInputComponent>('searchInput');

focusInput(): void {
  this.searchInput()?.focus();
}`;

  /**
   * Full example template combining two-way binding, debounced search and filter.
   */
  protected readonly fullSnippet = `<rng-search-input
  [(value)]="query"
  (debouncedChange)="onDebouncedSearch($event)" />

@if (filteredItems().length > 0) {
  <ul>
    @for (item of filteredItems(); track item) {
      <li>{{ item }}</li>
    }
  </ul>
} @else {
  <p>No results for "{{ debouncedQuery() }}"</p>
}`;

  /**
   * Full component snippet for the live filter example.
   */
  protected readonly fullComponentSnippet = `import { computed, signal } from '@angular/core';
import { SearchInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [SearchInputComponent]
})
export class ExampleComponent {
  query = signal<string | null>(null);
  debouncedQuery = signal<string | null>(null);

  items = signal<string[]>([
    'Angular', 'React', 'Vue', 'Svelte', 'Solid', 'Ember',
    'Next.js', 'Nuxt', 'Remix',
  ]);

  filteredItems = computed(() => {
    const query = this.debouncedQuery()?.toLowerCase() ?? '';

    if (!query) {
      return this.items();
    }

    return this.items().filter((item) => item.toLowerCase().includes(query));
  });

  onDebouncedSearch(value: string | null): void {
    this.debouncedQuery.set(value);
  }
}`;

  protected basicValue = signal<string | null>(null);
  protected basicDebounced = signal<string | null>(null);
  protected twoWayValue = signal<string | null>('Hello');
  protected customValue = signal<string | null>(null);
  protected customDebounced = signal<string | null>(null);
  protected noDebounceValue = signal<string | null>(null);
  protected noDebounceDebounced = signal<string | null>(null);
  protected disabledValue = signal<string | null>('Disabled text');
  protected clearableValue = signal<string | null>('Clear me');
  protected focusValue = signal<string | null>(null);
  protected fullQuery = signal<string | null>(null);
  protected fullDebouncedQuery = signal<string | null>(null);

  protected readonly searchInputRef = viewChild<SearchInputComponent>('searchInputRef');

  protected readonly fullItems = signal<string[]>([
    'Angular',
    'React',
    'Vue',
    'Svelte',
    'Solid',
    'Ember',
    'Next.js',
    'Nuxt',
    'Remix',
  ]);

  protected readonly filteredItems = computed(() => {
    const query = this.fullDebouncedQuery()?.toLowerCase() ?? '';

    if (!query) {
      return this.fullItems();
    }

    return this.fullItems().filter((item) => item.toLowerCase().includes(query));
  });

  /**
   * Handles `debouncedChange` from the basic demo.
   *
   * @param value The debounced search value or `null` when empty.
   *
   * @returns void
   */
  protected onBasicDebouncedChange(value: string | null): void {
    this.basicDebounced.set(value);
  }

  /**
   * Handles `valueChange` from the two-way binding demo.
   *
   * @param value The new search value or `null` when empty.
   *
   * @returns void
   */
  protected onTwoWayValueChange(value: string | null): void {
    this.twoWayValue.set(value);
  }

  /**
   * Handles `debouncedChange` with custom debounce timing.
   *
   * @param value The debounced search value.
   *
   * @returns void
   */
  protected onCustomDebouncedChange(value: string | null): void {
    this.customDebounced.set(value);
  }

  /**
   * Handles `debouncedChange` with no debounce.
   *
   * @param value The immediately emitted search value.
   *
   * @returns void
   */
  protected onNoDebounceDebouncedChange(value: string | null): void {
    this.noDebounceDebounced.set(value);
  }

  /**
   * Handles `debouncedChange` from the full filter example.
   *
   * @param value The debounced query used to filter the list.
   *
   * @returns void
   */
  protected onFullDebouncedChange(value: string | null): void {
    this.fullDebouncedQuery.set(value);
  }

  /**
   * Focuses the search input via the `focus()` method.
   *
   * @returns void
   */
  protected focusSearchInput(): void {
    this.searchInputRef()?.focus();
  }

  /**
   * Clears the full example query and debounced value.
   *
   * @returns void
   */
  protected clearFullQuery(): void {
    this.fullQuery.set(null);
    this.fullDebouncedQuery.set(null);
  }
}
