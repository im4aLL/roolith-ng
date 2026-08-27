import { Component, signal } from '@angular/core';
import { ISelectInput, SelectInputComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-select-input',
  imports: [CodeBlock, DocPager, SelectInputComponent],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
})
export class SelectInput {
  /**
   * Snippet for importing `SelectInputComponent`.
   */
  protected readonly importSnippet = `import { SelectInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [SelectInputComponent]
})`;

  /**
   * `ISelectInput` interface snippet.
   */
  protected readonly interfaceSnippet = `interface ISelectInput {
  label: string;
  value: string | number | null;
  icon?: string;
  subtext?: string;
}`;

  /**
   * Basic usage markup.
   */
  protected readonly basicSnippet = `<rng-select-input
  [data]="options"
  label="Status"
  placeholder="Select a status..."
  [(value)]="selectedOption" />`;

  /**
   * Basic component data snippet.
   */
  protected readonly basicTsSnippet = `import { signal } from '@angular/core';
import { ISelectInput } from '@im4all/roolith-ng';

options: ISelectInput[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

selectedOption = signal<ISelectInput | undefined>(undefined);`;

  /**
   * Searchable markup - free-text filtering.
   */
  protected readonly searchableSnippet = `<rng-select-input
  [data]="options"
  label="Country"
  placeholder="Search and select..."
  [searchable]="true"
  [(value)]="selectedOption" />`;

  /**
   * Search behavior note - `filteredData` uses case-insensitive `includes`.
   */
  protected readonly searchableTsSnippet = `// filteredData = data.filter((item) =>
//   item.label.toLowerCase().includes(inputValue.toLowerCase())
// )
// When searchable is false, typing buffers keystrokes and focuses the first matching option (typeahead, 300ms debounce).
// When searchable is true, the input filters the list in real time via inputValue().

onInput(value: string): void {
  this.inputValue.set(value);
}`;

  /**
   * With clear button markup.
   */
  protected readonly showClearSnippet = `<rng-select-input
  [data]="options"
  label="Category"
  [showClear]="true"
  [(value)]="selectedOption" />
<!-- Clear button appears via isShowClearButton() when showClear() && !!value() -->
<!-- Clicking it calls onClear($event) which clears value and inputValue and re-opens the list -->`;

  /**
   * Hint markup.
   */
  protected readonly hintSnippet = `<rng-select-input
  [data]="countries"
  label="Country"
  hint="Pick a country"
  [(value)]="selectedCountry" />`;

  /**
   * Error state markup.
   */
  protected readonly errorSnippet = `<rng-select-input
  [data]="countries"
  label="Country"
  [error]="true"
  errorMessage="Country is required"
  [(value)]="selectedCountry" />`;

  /**
   * Hint vs `errorMessage` markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-select-input
  label="Country"
  hint="Pick a country"
  [data]="countries" />

<!-- error overrides hint -->
<rng-select-input
  label="Country"
  hint="Pick a country"
  [error]="true"
  errorMessage="Country is required"
  [data]="countries" />`;

  /**
   * Custom option template markup - `#rngSelectInputOptionTemplate`.
   */
  protected readonly customTemplateSnippet = `<rng-select-input
  [data]="countries"
  label="Project"
  [(value)]="selectedCountry">
  <ng-template
    #rngSelectInputOptionTemplate
    let-item>
    <div class="rng-input-list__item-content">
      <div class="rng-input-list__item-content-hl">{{ item.label }}</div>
      <div class="rng-input-list__item-content-body">{{ item.subtext }}</div>
    </div>
  </ng-template>
</rng-select-input>`;

  /**
   * Custom option data with `icon` and `subtext`.
   */
  protected readonly customTemplateDataSnippet = `countries: ISelectInput[] = [
  { label: 'United States', value: 'us', icon: 'https://flagcdn.com/w20/us.png', subtext: 'North America' },
  { label: 'United Kingdom', value: 'uk', icon: 'https://flagcdn.com/w20/gb.png', subtext: 'Europe' },
  { label: 'Canada', value: 'ca', icon: 'https://flagcdn.com/w20/ca.png', subtext: 'North America' },
  { label: 'Germany', value: 'de', icon: 'https://flagcdn.com/w20/de.png', subtext: 'Europe' },
  { label: 'Japan', value: 'jp', icon: 'https://flagcdn.com/w20/jp.png', subtext: 'Asia' },
];`;

  /**
   * Custom option template markup with flags.
   */
  protected readonly customFlagTemplateSnippet = `<rng-select-input
  [data]="countries"
  label="Country (custom row)"
  [(value)]="selectedCountry">
  <ng-template #rngSelectInputOptionTemplate let-item>
    <img
      [src]="item.icon"
      [alt]="item.label"
      width="20"
      height="15"
      style="width: 1.25rem; height: 0.9375rem; object-fit: cover; border-radius: 0.125rem; margin-top: 0.1875rem; flex-shrink: 0;"
      loading="lazy" />
    <span class="rng-input-list__item-content" style="margin-left: 0.25rem;">
      <span class="rng-input-list__item-content-hl">{{ item.label }}</span>
      @if (item.subtext) {
        <span class="rng-input-list__item-content-body">{{ item.subtext }}</span>
      }
    </span>
  </ng-template>
</rng-select-input>`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-select-input
  label="Disabled"
  [data]="countries"
  [disabled]="true" />

<rng-select-input
  label="Disabled with value"
  [data]="countries"
  [disabled]="true"
  [value]="selectedCountry" />`;

  /**
   * Readonly state markup.
   */
  protected readonly readonlySnippet = `<rng-select-input
  label="Readonly"
  [data]="countries"
  [readonly]="true"
  [(value)]="selectedCountry" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-select-input
  label="Country (required)"
  [data]="countries"
  [required]="true"
  [(value)]="selectedCountry" />`;

  /**
   * `rightAligned` markup.
   */
  protected readonly rightAlignedSnippet = `<rng-select-input
  [data]="countries"
  label="Right aligned dropdown"
  [rightAligned]="true"
  [(value)]="selectedCountry" />`;

  /**
   * `dropdownWidth` markup.
   */
  protected readonly dropdownWidthSnippet = `<rng-select-input
  [data]="countries"
  label="Fixed dropdown width"
  [dropdownWidth]="320"
  [(value)]="selectedCountry" />
<!-- Renders as [style.width.px]="dropdownWidth()" on rng-input-list -->`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-select-input
  label="Country"
  name="country"
  [data]="countries"
  [(value)]="selectedCountry" />`;

  /**
   * Combined states snippet for reference.
   */
  protected readonly statesSnippet = `<rng-select-input [disabled]="true" label="Disabled" [data]="countries" />
<rng-select-input [readonly]="true" label="Readonly" [data]="countries" />
<rng-select-input [required]="true" label="Required" [data]="countries" />
<rng-select-input [rightAligned]="true" label="Right aligned" [data]="countries" />
<rng-select-input [dropdownWidth]="320" label="Dropdown width 320px" [data]="countries" />
<rng-select-input name="country" label="With name attribute" [data]="countries" />`;

  /**
   * Two-way binding and `valueChange` markup.
   */
  protected readonly twoWaySnippet = `<rng-select-input [(value)]="selectedCountry" [data]="countries" label="Two-way binding" />

<!-- Explicit binding -->
<rng-select-input
  [data]="countries"
  [value]="selectedCountry()"
  (valueChange)="onValueChange($event)"
  label="With valueChange handler" />`;

  /**
   * Handler for `valueChange`.
   */
  protected readonly twoWayTsSnippet = `selectedCountry = signal<ISelectInput | undefined>(undefined);

onValueChange(value: ISelectInput | undefined): void {
  this.selectedCountry.set(value);
  console.log('selected:', value);
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { SelectInputComponent, ISelectInput } from '@im4all/roolith-ng';

@Component({
  imports: [SelectInputComponent]
})
export class ExampleComponent {
  form = form({
    country: undefined as ISelectInput | undefined,
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-select-input
  [data]="countries"
  label="Country"
  [formField]="form.controls.country" />`;

  /**
   * Keyboard navigation notes snippet.
   */
  protected readonly keyboardSnippet = `// Click / Enter on field -> onInputFocusHandler() which calls showFocus().showOptions() and sets isActive(true)
// ArrowDown -> _focusNextOption() wraps to first
// ArrowUp   -> _focusPreviousOption() wraps to last
// Escape    -> hideOptions()
// Enter/Space on focused option -> onSelectHandler(item) sets value and clears inputValue
// Click outside -> removeFocus().hideOptions() and _restorePreviousValue()
// Typeahead (when searchable=false): buffer keystrokes, debounce 300ms, focus first match via _focusWithBufferedValue
// Overflow -> _calculateListPosition() checks window.innerHeight - inputRect.bottom vs list.offsetHeight and toggles isShowListOnTop() -> rng-input-list--top`;

  /**
   * Full example template.
   */
  protected readonly fullSnippet = `<rng-select-input
  [data]="countries"
  label="Country"
  placeholder="Select a country..."
  hint="Search, clear, or pick a custom row"
  [searchable]="true"
  [showClear]="true"
  [dropdownWidth]="280"
  [(value)]="selectedCountry">
  <ng-template #rngSelectInputOptionTemplate let-item>
    <img
      [src]="item.icon"
      [alt]="item.label"
      width="20"
      height="15"
      style="width: 1.25rem; height: 0.9375rem; object-fit: cover; border-radius: 0.125rem; margin-top: 0.1875rem; flex-shrink: 0;"
      loading="lazy" />
    <span class="rng-input-list__item-content" style="margin-left: 0.25rem;">
      <span class="rng-input-list__item-content-hl">{{ item.label }}</span>
      @if (item.subtext) {
        <span class="rng-input-list__item-content-body">{{ item.subtext }}</span>
      }
    </span>
  </ng-template>
</rng-select-input>

@if (selectedCountry()) {
  <p>Selected: {{ selectedCountry()!.label }} ({{ selectedCountry()!.value }})</p>
} @else {
  <p>No country selected yet - try searching for "ger".</p>
}`;

  /**
   * Full component snippet.
   */
  protected readonly fullComponentSnippet = `import { signal } from '@angular/core';
import { SelectInputComponent, ISelectInput } from '@im4all/roolith-ng';

@Component({
  imports: [SelectInputComponent]
})
export class ExampleComponent {
  countries: ISelectInput[] = [
    { label: 'United States', value: 'us', icon: 'https://flagcdn.com/w20/us.png', subtext: 'North America' },
    { label: 'Canada', value: 'ca', icon: 'https://flagcdn.com/w20/ca.png', subtext: 'North America' },
    { label: 'United Kingdom', value: 'uk', icon: 'https://flagcdn.com/w20/gb.png', subtext: 'Europe' },
    { label: 'Germany', value: 'de', icon: 'https://flagcdn.com/w20/de.png', subtext: 'Europe' },
    { label: 'Japan', value: 'jp', icon: 'https://flagcdn.com/w20/jp.png', subtext: 'Asia' },
    { label: 'Australia', value: 'au', icon: 'https://flagcdn.com/w20/au.png', subtext: 'Oceania' },
  ];

  selectedCountry = signal<ISelectInput | undefined>(undefined);
}`;

  protected readonly statusOptions: ISelectInput[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Draft', value: 'draft' },
  ];

  protected readonly countries: ISelectInput[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'Bangladesh', value: 'bd' },
  ];

  protected readonly countriesWithMeta: ISelectInput[] = [
    { label: 'United States', value: 'us', icon: 'https://flagcdn.com/w20/us.png', subtext: 'North America' },
    { label: 'United Kingdom', value: 'uk', icon: 'https://flagcdn.com/w20/gb.png', subtext: 'Europe' },
    { label: 'Canada', value: 'ca', icon: 'https://flagcdn.com/w20/ca.png', subtext: 'North America' },
    { label: 'Australia', value: 'au', icon: 'https://flagcdn.com/w20/au.png', subtext: 'Oceania' },
    { label: 'Germany', value: 'de', icon: 'https://flagcdn.com/w20/de.png', subtext: 'Europe' },
    { label: 'France', value: 'fr', icon: 'https://flagcdn.com/w20/fr.png', subtext: 'Europe' },
    { label: 'Japan', value: 'jp', icon: 'https://flagcdn.com/w20/jp.png', subtext: 'Asia' },
    { label: 'Bangladesh', value: 'bd', icon: 'https://flagcdn.com/w20/bd.png', subtext: 'Asia' },
  ];

  protected basicSelected = signal<ISelectInput | undefined>(undefined);
  protected searchableSelected = signal<ISelectInput | undefined>(undefined);
  protected showClearSelected = signal<ISelectInput | undefined>(undefined);
  protected hintSelected = signal<ISelectInput | undefined>(undefined);
  protected errorSelected = signal<ISelectInput | undefined>(undefined);
  protected customSelected = signal<ISelectInput | undefined>(undefined);
  protected disabledSelected = signal<ISelectInput | undefined>({ label: 'United States', value: 'us' });
  protected readonlySelected = signal<ISelectInput | undefined>({ label: 'Canada', value: 'ca' });
  protected requiredSelected = signal<ISelectInput | undefined>(undefined);
  protected rightAlignedSelected = signal<ISelectInput | undefined>(undefined);
  protected dropdownWidthSelected = signal<ISelectInput | undefined>(undefined);
  protected nameSelected = signal<ISelectInput | undefined>(undefined);
  protected twoWaySelected = signal<ISelectInput | undefined>(undefined);
  protected fullSelected = signal<ISelectInput | undefined>(undefined);

  /**
   * Handles `valueChange` from the two-way binding demo.
   *
   * @param value The newly selected option or `undefined` when cleared.
   *
   * @returns void
   */
  protected onValueChange(value: ISelectInput | undefined): void {
    this.twoWaySelected.set(value);
  }
}
