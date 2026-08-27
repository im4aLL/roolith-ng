import {
  Component,
  computed,
  contentChildren,
  effect,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { cloneDeep, lowerCase, startCase } from 'lodash-es';
import { uniqueId } from '../../utils/shared.helpers';
import { ButtonSplitComponent } from '../button-split/button-split.component';
import { ButtonComponent } from '../button/button.component';
import { IMPORT_POPOVER, PopoverComponent } from '../popover/index';
import { AddFilterComponent } from './add-filter/add-filter.component';
import {
  IFilter,
  IFilterableField,
  IFilterCustomTemplateData,
  IFilterData,
  IFilterItem,
} from './data-access/filter.interface';
import { FilterFieldTemplateDirective } from './directives/filter-field-template.directive';

@Component({
  selector: 'rng-filter',
  imports: [ButtonComponent, ButtonSplitComponent, ...IMPORT_POPOVER, AddFilterComponent],
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  public filterableFields = input.required<IFilterableField[]>();
  public value = input<IFilterData[]>([]);
  public changeEvent = output<IFilterData[]>();
  public globalSearchRemoveEvent = output<void>();
  private _customTemplates = contentChildren(FilterFieldTemplateDirective);

  private readonly _filterLabelMap: Record<string, string> = {
    contains: 'Contains',
    doesNotContain: 'Does not contain',
    equals: 'Equals',
    notEqualTo: 'Not equal to',
    startsWith: 'Starts with',
    endsWith: 'Ends with',
    isEmpty: 'Is empty',
    isNotEmpty: 'Is not empty',
    greaterThan: 'Greater than',
    greaterThanOrEqualTo: 'Greater than or equal to',
    lessThan: 'Less than',
    lessThanOrEqualTo: 'Less than or equal to',
    before: 'Before',
    after: 'After',
    beforeOrEqualTo: 'Before or equal to',
    afterOrEqualTo: 'After or equal to',
  };

  private _popoverRef = viewChild<PopoverComponent>('popoverComponentEl');
  private _addFilterRef = viewChild<AddFilterComponent>('addFilterComponentEl');
  private _filterData = signal<IFilterData[]>([]);
  public id = signal<string>(uniqueId());
  public filters = signal<IFilter[]>([]);

  /**
   * We have filter data but this effect is transforming filter data
   * to IFilter for display purposes
   */
  private _filterEffect = effect(() => {
    const filterData = this._filterData();
    const filters: IFilter[] = [];

    filterData.forEach((data) => {
      data.items.forEach((item) => {
        const filter = this._transformItemToFilter(item, data.field);
        filters.push(filter);
      });
    });

    this.filters.set(filters);
  });

  /**
   * If value supplied then add value to existing filter data
   * Also this effect will add filters if value changes again
   */
  private _valueEffect = effect(() => {
    const value = this.value();

    if (value.length === 0) {
      return;
    }

    untracked(() => {
      value.forEach((data) => {
        this._addFilter(data);
      });
    });
  });

  public customTemplateData = computed<IFilterCustomTemplateData>(() => {
    return this._customTemplates().reduce<IFilterCustomTemplateData>((acc, directive) => {
      const fieldName = directive.rngFilterFieldTemplate();
      if (fieldName) {
        acc[fieldName] = directive.templateRef;
      }
      return acc;
    }, {});
  });

  /**
   * Handle add filter event from AddFilterComponent, update filters state, and close popover
   *
   * @param data IFilterData
   * @return void
   */
  public onAddFilter(data: IFilterData): void {
    this._addFilter(data);
    this._closePopover();
  }

  /**
   * Handle cancel filter action, simply close the popover without updating filters state
   *
   * @return void
   */
  public onCancelFilter(): void {
    this._closePopover();
  }

  /**
   * Close the popover
   *
   * @return void
   */
  private _closePopover(): void {
    this._popoverRef()?.closePopover();
  }

  /**
   * Add or update filter in the filters state based on the incoming filter data
   *
   * @param data IFilterData
   * @returns void
   */
  private _addFilter(data: IFilterData): void {
    const currentFilters = cloneDeep(this._filterData());

    const existingFilterIndex = currentFilters.findIndex((filter) => filter.field === data.field);

    if (existingFilterIndex !== -1) {
      currentFilters[existingFilterIndex].items.push(...data.items);
    } else {
      currentFilters.push(data);
    }

    this._filterData.set(currentFilters);
    this.changeEvent.emit(currentFilters);
  }

  /**
   * Handle remove filter action to remove the filter from filters state
   *
   * @param filter IFilter
   * @returns void
   */
  public onRemoveFilter(filter: IFilter): void {
    const currentFilters = cloneDeep(this._filterData());
    const fieldIndex = currentFilters.findIndex((data) => data.field === filter.field);

    if (fieldIndex === -1) {
      return;
    }

    const fieldData = currentFilters[fieldIndex];
    fieldData.items = fieldData.items.filter(
      (item) => !(item.filterType === filter.filterType && item.value === filter.value),
    );

    if (fieldData.items.length === 0) {
      currentFilters.splice(fieldIndex, 1);
    }

    this._filterData.set(currentFilters);
    this.changeEvent.emit(currentFilters);

    if (filter.field === '*') {
      this.globalSearchRemoveEvent.emit();
    }
  }

  /**
   * Transform IFilterItem to IFilter with human-readable label for display purposes
   *
   * @param item IFilterItem
   * @param fieldName string
   * @returns IFilter
   */
  private _transformItemToFilter(item: IFilterItem, fieldName: string): IFilter {
    const filterLabel = this._filterLabelMap[item.filterType] ?? item.filterType;
    const hasValue = item.value !== null && item.value !== undefined && item.value !== '';
    const valueLabel = hasValue ? ` '${item.value}'` : '';

    return {
      field: fieldName,
      filterType: item.filterType,
      operator: item.operator ?? 'and',
      value: item.value,
      _forHuman: `${item.operator === 'or' ? 'Or ' : ''}
                  ${startCase(fieldName === '*' ? 'Any Field' : fieldName)}
                  <em>${lowerCase(filterLabel)}</em>${valueLabel}`,
    };
  }

  /**
   * Close the add filter popover
   *
   * @returns void
   */
  public closeAddFilterPopover(): void {
    this._addFilterRef()?.resetFilterData();
    this._closePopover();
  }

  /**
   * Handle add filter action from AddFilterComponent, update filters state, and close popover
   *
   * @param data IFilterData
   * @return void
   */
  public addFilter(data: IFilterData): void {
    this._addFilter(data);
    this.closeAddFilterPopover();
  }
}
