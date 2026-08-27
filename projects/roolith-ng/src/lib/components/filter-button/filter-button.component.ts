import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal, viewChild } from '@angular/core';
import { uniqueId } from '../../utils';
import { BadgeComponent } from '../badge/badge.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { CheckboxInputComponent } from '../inputs/checkbox/checkbox-input.component';
import { SearchInputComponent } from '../inputs/search/search-input.component';
import { IMPORT_POPOVER, IPopoverChangeEvent } from '../popover/index';
import { IFilterButtonItem, IFilterChangeEvent } from './data-access/filter-button.interface';

@Component({
  selector: 'rng-filter-button',
  imports: [
    IconComponent,
    BadgeComponent,
    SearchInputComponent,
    CheckboxInputComponent,
    ButtonComponent,
    ...IMPORT_POPOVER,
  ],
  templateUrl: './filter-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterButtonComponent {
  public items = input<IFilterButtonItem[]>([]);
  public maxSelectedItemsToShow = input<number>(2);
  public changeEvent = output<IFilterChangeEvent>();

  public id = signal<string>(uniqueId());
  public _items = signal<IFilterButtonItem[]>([]);
  public filteredItems = signal<IFilterButtonItem[]>([]);
  public selectedItems = computed(() => this._items().filter((item) => item.selected));
  public hasSelectedItems = computed(() => this.selectedItems().length > 0);
  public selectedCount = computed(() => this.selectedItems().length);
  public isDisabled = computed(() => this.items().length === 0);

  private _searchInputComponentEl = viewChild<SearchInputComponent>('searchInputComponentEl');

  private _itemsEffect = effect(() => {
    this._items.set(this.items());
    this.filteredItems.set(this.items());
  });

  /**
   * Handle search input changes to filter the items based on the search term.
   *
   * @param searchTerm string | null
   * @returns void
   */
  public onSearchInputChange(searchTerm: string | null): void {
    if (!searchTerm) {
      this.filteredItems.set(this._items());
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    this.filteredItems.set(this._items().filter((item) => item.label.toLowerCase().includes(lowerSearchTerm)));
  }

  /**
   * Clear all filters by resetting the filtered items to the original items list.
   *
   * @returns void
   */
  public clearFilters(): void {
    this.filteredItems.set(this.items());
    this._items.set(this.items());
    this.changeEvent.emit({ type: 'clear', payload: this.selectedItems() });
  }

  /**
   * Handle changes to the checked state of an item, updating both the main items list and the filtered items list accordingly.
   *
   * @param item IFilterButtonItem
   * @param checked boolean
   * @returns void
   */
  public onItemCheckedChange(item: IFilterButtonItem, checked: boolean): void {
    const updatedItems = this._items().map((i) => {
      if (i.value === item.value) {
        return { ...i, selected: checked };
      }

      return i;
    });

    this._items.set(updatedItems);

    const updatedFilteredItems = this.filteredItems().map((i) => {
      if (i.value === item.value) {
        return { ...i, selected: checked };
      }

      return i;
    });

    this.filteredItems.set(updatedFilteredItems);
    this.changeEvent.emit({ type: 'change', payload: this.selectedItems() });
  }

  /**
   * Handle popover change events to focus the search input when the popover is opened.
   *
   * @param event IPopoverChangeEvent
   * @returns void
   */
  public onPopoverChangeEvent(event: IPopoverChangeEvent): void {
    if (event.type !== 'open') {
      return;
    }

    this._searchInputComponentEl()?.focus();
  }
}
