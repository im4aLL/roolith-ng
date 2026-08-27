import { Component, signal } from '@angular/core';
import { IMultiSelectInputOption, MultiSelectInputComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-multi-select',
  imports: [CodeBlock, DocPager, MultiSelectInputComponent],
  templateUrl: './multi-select.html',
  styleUrl: './multi-select.scss',
})
export class MultiSelect {
  /**
   * Snippet for importing `MultiSelectInputComponent`.
   */
  protected readonly importSnippet = `import { MultiSelectInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [MultiSelectInputComponent]
})`;

  /**
   * `IMultiSelectInputOption` interface snippet.
   */
  protected readonly interfaceSnippet = `interface IMultiSelectInputOption {
  label: string;
  value: string | number | null;
  icon?: string;
  subtext?: string;
}`;

  /**
   * Basic usage markup.
   */
  protected readonly basicSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Countries"
  placeholder="Select countries..."
  [(value)]="selectedCountries" />`;

  /**
   * Basic component data snippet.
   */
  protected readonly basicTsSnippet = `import { signal } from '@angular/core';
import { IMultiSelectInputOption } from '@im4all/roolith-ng';

countries: IMultiSelectInputOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
];

selectedCountries = signal<IMultiSelectInputOption[]>([]);`;

  /**
   * Searchable markup - free-text filtering.
   */
  protected readonly searchableSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Countries"
  placeholder="Search and select..."
  [searchable]="true"
  [(value)]="selectedCountries" />`;

  /**
   * Search behavior note - `filteredData` uses case-insensitive `includes`.
   */
  protected readonly searchableTsSnippet = `// filteredData = data.filter((item) =>
//   item.label.toLowerCase().includes(inputValue.toLowerCase())
// )
// When searchable is false, typing buffers keystrokes and focuses the first matching option (typeahead, 300ms debounce).
// When searchable is true, the input filters the list in real time.`;

  /**
   * Hint markup.
   */
  protected readonly hintSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Countries"
  hint="Pick one or more countries"
  [(value)]="selectedCountries" />`;

  /**
   * Error state markup.
   */
  protected readonly errorSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Countries"
  [error]="true"
  errorMessage="At least one country is required"
  [(value)]="selectedCountries" />`;

  /**
   * Hint vs `errorMessage` markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-multi-select-input
  label="Countries"
  hint="Pick one or more countries"
  [data]="countries" />

<!-- error overrides hint -->
<rng-multi-select-input
  label="Countries"
  hint="Pick one or more countries"
  [error]="true"
  errorMessage="At least one country is required"
  [data]="countries" />`;

  /**
   * Limit visible chips markup - `maxChipsShown`.
   */
  protected readonly maxChipsSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Countries"
  [maxChipsShown]="2"
  [(value)]="selectedCountries" />
<!-- If 5 items are selected: 2 chips + "3 more selected" badge -->`;

  /**
   * `maxChipsShown` explanation snippet.
   */
  protected readonly maxChipsTsSnippet = `// visibleChips = value().slice(0, maxChipsShown())
// remainingCount = Math.max(0, value().length - maxChipsShown())
// Default is 5. When remainingCount > 0 a "N more selected" badge is shown.`;

  /**
   * Select All / Deselect All markup.
   */
  protected readonly selectAllSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Countries"
  [allowSelectAll]="true"
  [(value)]="selectedCountries" />
<!-- Select All sets value to all items in data -->
<!-- Deselect All clears value -->`;

  /**
   * Custom option template markup - `#rngMultiSelectInputOptionTemplate`.
   */
  protected readonly customTemplateSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Countries"
  [(value)]="selectedCountries">
  <ng-template
    #rngMultiSelectInputOptionTemplate
    let-item>
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
</rng-multi-select-input>`;

  /**
   * Custom option data with `icon` and `subtext`.
   */
  protected readonly customTemplateDataSnippet = `countries: IMultiSelectInputOption[] = [
  { label: 'United States', value: 'us', icon: 'https://flagcdn.com/w20/us.png', subtext: 'North America' },
  { label: 'United Kingdom', value: 'uk', icon: 'https://flagcdn.com/w20/gb.png', subtext: 'Europe' },
  { label: 'Canada', value: 'ca', icon: 'https://flagcdn.com/w20/ca.png', subtext: 'North America' },
  { label: 'Germany', value: 'de', icon: 'https://flagcdn.com/w20/de.png', subtext: 'Europe' },
  { label: 'Japan', value: 'jp', icon: 'https://flagcdn.com/w20/jp.png', subtext: 'Asia' },
];`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-multi-select-input
  label="Disabled"
  [data]="countries"
  [disabled]="true" />

<rng-multi-select-input
  label="Disabled with value"
  [data]="countries"
  [disabled]="true"
  [value]="selectedCountries" />`;

  /**
   * Readonly state markup.
   */
  protected readonly readonlySnippet = `<rng-multi-select-input
  label="Readonly"
  [data]="countries"
  [readonly]="true"
  [(value)]="selectedCountries" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-multi-select-input
  label="Countries (required)"
  [data]="countries"
  [required]="true"
  [(value)]="selectedCountries" />`;

  /**
   * `rightAligned` markup.
   */
  protected readonly rightAlignedSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Right aligned dropdown"
  [rightAligned]="true"
  [(value)]="selectedCountries" />`;

  /**
   * `dropdownWidth` markup.
   */
  protected readonly dropdownWidthSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Fixed dropdown width"
  [dropdownWidth]="320"
  [(value)]="selectedCountries" />
<!-- Renders as [style.minWidth.px]="dropdownWidth()" on rng-input-list -->`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-multi-select-input
  label="Countries"
  name="countries"
  [data]="countries"
  [(value)]="selectedCountries" />`;

  /**
   * Combined states snippet for reference.
   */
  protected readonly statesSnippet = `<rng-multi-select-input [disabled]="true" label="Disabled" [data]="countries" />
<rng-multi-select-input [readonly]="true" label="Readonly" [data]="countries" />
<rng-multi-select-input [required]="true" label="Required" [data]="countries" />
<rng-multi-select-input [rightAligned]="true" label="Right aligned" [data]="countries" />
<rng-multi-select-input [dropdownWidth]="320" label="Dropdown width 320px" [data]="countries" />
<rng-multi-select-input name="countries" label="With name attribute" [data]="countries" />`;

  /**
   * Two-way binding and `valueChange` markup.
   */
  protected readonly twoWaySnippet = `<rng-multi-select-input [(value)]="selectedCountries" [data]="countries" label="Two-way binding" />

<!-- Explicit binding -->
<rng-multi-select-input
  [data]="countries"
  [value]="selectedCountries()"
  (valueChange)="onValueChange($event)"
  label="With valueChange handler" />`;

  /**
   * Handler for `valueChange`.
   */
  protected readonly twoWayTsSnippet = `selectedCountries = signal<IMultiSelectInputOption[]>([]);

onValueChange(value: IMultiSelectInputOption[]): void {
  this.selectedCountries.set(value);
  console.log('selected:', value);
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { MultiSelectInputComponent, IMultiSelectInputOption } from '@im4all/roolith-ng';

@Component({
  imports: [MultiSelectInputComponent]
})
export class ExampleComponent {
  form = form({
    countries: [] as IMultiSelectInputOption[],
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Countries"
  [formField]="form.controls.countries" />`;

  /**
   * Keyboard navigation notes snippet.
   */
  protected readonly keyboardSnippet = `// ArrowDown -> _focusNextOption() wraps to first
// ArrowUp   -> _focusPreviousOption() wraps to last
// Escape    -> hideOptions()
// Enter/Space on focused option -> onSelectHandler(item)
// Click outside -> removeFocus().hideOptions()
// Typeahead (when searchable=false): buffer keystrokes, debounce 300ms, focus first match`;

  /**
   * Full example template.
   */
  protected readonly fullSnippet = `<rng-multi-select-input
  [data]="countries"
  label="Countries"
  placeholder="Select countries..."
  hint="Search, use Select All, or pick a custom row"
  [searchable]="true"
  [allowSelectAll]="true"
  [maxChipsShown]="3"
  [dropdownWidth]="280"
  [(value)]="selectedCountries">
  <ng-template #rngMultiSelectInputOptionTemplate let-item>
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
</rng-multi-select-input>

@if (selectedCountries().length > 0) {
  <p>Selected: {{ selectedCountries().length }} country(ies)</p>
  <ul>
    @for (item of selectedCountries(); track item.value) {
      <li>{{ item.label }} ({{ item.value }})</li>
    }
  </ul>
}`;

  /**
   * Full component snippet.
   */
  protected readonly fullComponentSnippet = `import { signal } from '@angular/core';
import { MultiSelectInputComponent, IMultiSelectInputOption } from '@im4all/roolith-ng';

@Component({
  imports: [MultiSelectInputComponent]
})
export class ExampleComponent {
  countries: IMultiSelectInputOption[] = [
    { label: 'United States', value: 'us', icon: 'https://flagcdn.com/w20/us.png', subtext: 'North America' },
    { label: 'Canada', value: 'ca', icon: 'https://flagcdn.com/w20/ca.png', subtext: 'North America' },
    { label: 'United Kingdom', value: 'uk', icon: 'https://flagcdn.com/w20/gb.png', subtext: 'Europe' },
    { label: 'Germany', value: 'de', icon: 'https://flagcdn.com/w20/de.png', subtext: 'Europe' },
    { label: 'Japan', value: 'jp', icon: 'https://flagcdn.com/w20/jp.png', subtext: 'Asia' },
    { label: 'Australia', value: 'au', icon: 'https://flagcdn.com/w20/au.png', subtext: 'Oceania' },
  ];

  selectedCountries = signal<IMultiSelectInputOption[]>([]);
}`;

  protected readonly countries: IMultiSelectInputOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'Bangladesh', value: 'bd' },
  ];

  protected readonly countriesWithMeta: IMultiSelectInputOption[] = [
    { label: 'United States', value: 'us', icon: 'https://flagcdn.com/w20/us.png', subtext: 'North America' },
    { label: 'United Kingdom', value: 'uk', icon: 'https://flagcdn.com/w20/gb.png', subtext: 'Europe' },
    { label: 'Canada', value: 'ca', icon: 'https://flagcdn.com/w20/ca.png', subtext: 'North America' },
    { label: 'Australia', value: 'au', icon: 'https://flagcdn.com/w20/au.png', subtext: 'Oceania' },
    { label: 'Germany', value: 'de', icon: 'https://flagcdn.com/w20/de.png', subtext: 'Europe' },
    { label: 'France', value: 'fr', icon: 'https://flagcdn.com/w20/fr.png', subtext: 'Europe' },
    { label: 'Japan', value: 'jp', icon: 'https://flagcdn.com/w20/jp.png', subtext: 'Asia' },
    { label: 'Bangladesh', value: 'bd', icon: 'https://flagcdn.com/w20/bd.png', subtext: 'Asia' },
  ];

  protected basicSelected = signal<IMultiSelectInputOption[]>([]);
  protected searchableSelected = signal<IMultiSelectInputOption[]>([]);
  protected hintSelected = signal<IMultiSelectInputOption[]>([]);
  protected errorSelected = signal<IMultiSelectInputOption[]>([]);
  protected maxChipsSelected = signal<IMultiSelectInputOption[]>([
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Germany', value: 'de' },
    { label: 'Japan', value: 'jp' },
    { label: 'Australia', value: 'au' },
  ]);
  protected maxChipsSelected2 = signal<IMultiSelectInputOption[]>([]);
  protected selectAllSelected = signal<IMultiSelectInputOption[]>([]);
  protected customSelected = signal<IMultiSelectInputOption[]>([]);
  protected disabledSelected = signal<IMultiSelectInputOption[]>([
    { label: 'United States', value: 'us' },
  ]);
  protected readonlySelected = signal<IMultiSelectInputOption[]>([
    { label: 'Canada', value: 'ca' },
  ]);
  protected requiredSelected = signal<IMultiSelectInputOption[]>([]);
  protected rightAlignedSelected = signal<IMultiSelectInputOption[]>([]);
  protected dropdownWidthSelected = signal<IMultiSelectInputOption[]>([]);
  protected nameSelected = signal<IMultiSelectInputOption[]>([]);
  protected twoWaySelected = signal<IMultiSelectInputOption[]>([]);
  protected formSelected = signal<IMultiSelectInputOption[]>([]);
  protected fullSelected = signal<IMultiSelectInputOption[]>([]);

  /**
   * Handles `valueChange` from the two-way binding demo.
   *
   * @param value The newly selected options.
   *
   * @returns void
   */
  protected onValueChange(value: IMultiSelectInputOption[]): void {
    this.twoWaySelected.set(value);
  }
}
