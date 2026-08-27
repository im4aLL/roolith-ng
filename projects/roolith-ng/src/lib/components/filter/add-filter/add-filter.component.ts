import { Component, computed, input, OnInit, output, signal, viewChild } from '@angular/core';
import {
  IFilterableField,
  IFilterCustomTemplateData,
  IFilterData,
  IFilterFieldType,
  IFilterOperator,
} from '../data-access/filter.interface';
import {
  FILTER_DATE_TYPES,
  FILTER_GENERIC_TYPES,
  FILTER_NUMBER_TYPES,
  FILTER_OPERATORS,
} from '../data-access/filter.const';
import { cloneDeep } from 'lodash-es';
import { NgTemplateOutlet } from '@angular/common';
import { DateTime } from 'luxon';
import { ButtonComponent } from '../../button/button.component';
import { DatePickerInputComponent } from '../../inputs/date-picker/date-picker-input.component';
import { NumberInputComponent } from '../../inputs/number/number-input.component';
import { IRadioOption } from '../../inputs/radio/data-access/radio-input.interface';
import { RadioInputComponent } from '../../inputs/radio/radio-input.component';
import { SearchInputComponent } from '../../inputs/search/search-input.component';
import { ISelectInput } from '../../inputs/select/data-access/select-input.interface';
import { SelectInputComponent } from '../../inputs/select/select-input.component';

@Component({
  selector: 'rng-add-filter',
  imports: [
    SelectInputComponent,
    RadioInputComponent,
    ButtonComponent,
    SearchInputComponent,
    NumberInputComponent,
    DatePickerInputComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './add-filter.component.html',
})
export class AddFilterComponent implements OnInit {
  public filterableFields = input.required<IFilterableField[]>();
  public customTemplateData = input<IFilterCustomTemplateData>({});

  public addFilterEvent = output<IFilterData>();
  public cancelFilterEvent = output<void>();

  private _genericFilterTypes = signal<ISelectInput[]>(FILTER_GENERIC_TYPES);
  private _numberFilterTypes = signal<ISelectInput[]>(FILTER_NUMBER_TYPES);
  private _dateFilterTypes = signal<ISelectInput[]>(FILTER_DATE_TYPES);
  public filterOperatorOptions = signal<IRadioOption[]>(FILTER_OPERATORS);

  public selectedField = signal<IFilterableField | undefined>(undefined);
  public selectedFieldType = computed<IFilterFieldType | null>(() => this.selectedField()?.type ?? 'string');
  public filterTypes = signal<ISelectInput[]>([]);
  public isShowOperators = signal<boolean>(false);
  public isShowSecondFilter = signal<boolean>(false);
  public isShowFirstFilter = signal<boolean>(true);
  public firstFilterType = signal<ISelectInput | undefined>(undefined);
  public secondFilterType = signal<ISelectInput | undefined>(undefined);
  public isShowCustomTemplate = computed(() => this.selectedField()?.hasTemplate ?? false);

  public operator = signal<IFilterOperator>('and');
  private _data = signal<IFilterData>({
    field: '',
    items: [
      { filterType: '', value: null },
      { filterType: '', value: null, operator: this.operator() },
    ],
  });

  private _firstSearchInputEl = viewChild('firstSearchInputEl', { read: SearchInputComponent });
  private _firstNumberInputEl = viewChild('firstNumberInputEl', { read: NumberInputComponent });
  private _firstDateInputEl = viewChild('firstDateInputEl', { read: DatePickerInputComponent });

  private _secondSearchInputEl = viewChild('secondSearchInputEl', { read: SearchInputComponent });
  private _secondNumberInputEl = viewChild('secondNumberInputEl', { read: NumberInputComponent });
  private _secondDateInputEl = viewChild('secondDateInputEl', { read: DatePickerInputComponent });

  ngOnInit(): void {
    this._init();
  }

  /**
   * Initialize filter types based on the first filterable field and set the first filter item with default filter type
   *
   * @returns void
   */
  private _init(): void {
    const [initialField] = this.filterableFields();
    if (!initialField) {
      return;
    }

    this.selectedField.set(initialField);
    const initialFilterTypeOptions = this._getFilterTypesByFieldType(initialField.type);

    this.filterTypes.set([]);
    setTimeout(() => this.filterTypes.set(initialFilterTypeOptions));

    const data = cloneDeep(this._data());
    data.field = initialField.value as string;
    data.items[0].filterType = initialFilterTypeOptions[0].value as string;
    data.items[1].filterType = initialFilterTypeOptions[0].value as string;
    this._data.set(data);
  }

  /**
   * Get filter types options based on selected field type
   *
   * @param fieldType IFilterableField['type']
   * @returns ISelectInput[]
   */
  private _getFilterTypesByFieldType(fieldType: IFilterableField['type']): ISelectInput[] {
    switch (fieldType) {
      case 'string':
        return this._genericFilterTypes();
      case 'number':
        return this._numberFilterTypes();
      case 'date':
        return this._dateFilterTypes();
      default:
        return [];
    }
  }

  /**
   * Handle field change to update filter types accordingly
   *
   * @param fieldItem ISelectInput | undefined
   * @returns void
   */
  public onFieldChange(fieldItem: ISelectInput | undefined): void {
    if (!fieldItem) {
      return;
    }

    const selectedField = this.filterableFields().find((field) => field.value === fieldItem.value);

    if (!selectedField) {
      return;
    }

    this.selectedField.set(selectedField);
    const filterTypeOptions = this._getFilterTypesByFieldType(selectedField.type);

    if (filterTypeOptions.length === 0) {
      throw new Error(`No filter types available for field type: ${selectedField.type}`);
    }

    this.filterTypes.set(filterTypeOptions);

    const data = cloneDeep(this._data());
    data.field = fieldItem.value as string;
    data.items[0].filterType = filterTypeOptions[0].value as string;
    data.items[1].filterType = filterTypeOptions[0].value as string;
    this._data.set(data);
  }

  /**
   * Handle filter type change to set the first filter item with selected filter type
   *
   * @param filterTypeValue ISelectInput | undefined
   * @returns void
   */
  public onFirstFilterTypeChange(filterTypeValue: ISelectInput | undefined): void {
    if (!filterTypeValue) {
      return;
    }

    this.firstFilterType.set(filterTypeValue);

    const data = cloneDeep(this._data());
    data.items[0].filterType = filterTypeValue.value as string;
    this._data.set(data);

    if (filterTypeValue.value === 'isEmpty' || filterTypeValue.value === 'isNotEmpty') {
      this.isShowFirstFilter.set(false);
      data.items[0].value = null;
      this._data.set(data);

      this.isShowOperators.set(true);
      this.isShowSecondFilter.set(true);
    }
  }

  /**
   * Handle search input change to set the first filter item value
   *
   * @param value string | null
   * @returns void
   */
  public onFirstSearchInputChange(value: string | null): void {
    const data = cloneDeep(this._data());
    data.items[0].value = value;
    this._data.set(data);

    this.isShowOperators.set(!!value);
    this.isShowSecondFilter.set(!!value);
  }

  /**
   * Handle number input change to set the first filter item value
   *
   * @param value
   * number | null
   * @returns void
   */
  public onFirstNumberInputChange(value: number | null): void {
    const data = cloneDeep(this._data());
    data.items[0].value = Number.isNaN(value) ? null : value;
    this._data.set(data);

    this.isShowOperators.set(!!value);
    this.isShowSecondFilter.set(!!value);
  }

  /**
   * Handle date input change to set the first filter item value
   *
   * @param value DateTime | null
   * @returns void
   */
  public onFirstDateInputChange(value: DateTime | null): void {
    const data = cloneDeep(this._data());
    data.items[0].value = value?.toISODate() ?? null;
    this._data.set(data);

    this.isShowOperators.set(!!value);
    this.isShowSecondFilter.set(!!value);
  }

  /**
   * Handle filter operator change to update the operator in filter data
   *
   * @param value string | number | null
   * @returns void
   */
  public onFilterOperatorChange(value: string | number | null): void {
    const data = cloneDeep(this._data());
    data.items[1].operator = value as IFilterOperator;
    this.operator.set(value as IFilterOperator);
    this._data.set(data);
  }

  /**
   * Handle second filter type change to set the second filter item with selected filter type
   *
   * @param value ISelectInput | undefined
   * @returns void
   */
  public onSecondFilterTypeChange(value: ISelectInput | undefined): void {
    if (!value) {
      return;
    }

    this.secondFilterType.set(value);

    const data = cloneDeep(this._data());
    data.items[1].filterType = value.value as string;
    this._data.set(data);

    if (value.value === 'isEmpty' || value.value === 'isNotEmpty') {
      this.isShowSecondFilter.set(false);
      data.items[1].value = null;
      this._data.set(data);
    }
  }

  /**
   * Handle second search input change to set the second filter item value
   *
   * @param value string | null
   * @returns void
   */
  public onSecondSearchInputChange(value: string | null): void {
    const data = cloneDeep(this._data());
    data.items[1].value = value;
    this._data.set(data);
  }

  /**
   * Handle second number input change to set the second filter item value
   *
   * @param value number | null
   * @returns void
   */
  public onSecondNumberInputChange(value: number | null): void {
    const data = cloneDeep(this._data());
    data.items[1].value = Number.isNaN(value) ? null : value;
    this._data.set(data);
  }

  /**
   * Handle second date input change to set the second filter item value
   *
   * @param value DateTime | null
   * @returns void
   */
  public onSecondDateInputChange(value: DateTime | null): void {
    const data = cloneDeep(this._data());
    data.items[1].value = value?.toISODate() ?? null;
    this._data.set(data);
  }

  /**
   * Handle add filter action to emit the current filter data and reset the form
   *
   * @returns void
   */
  public addFilter(): void {
    const data = cloneDeep(this._data());
    const { hasData, sanitizedData } = this._sanitizeFilterData(data);

    if (!hasData) {
      this.cancelFilter();
      return;
    }

    this.addFilterEvent.emit(sanitizedData);
    this.isShowOperators.set(false);
    this.isShowSecondFilter.set(false);
    this.isShowFirstFilter.set(true);
    this._resetFilterData();
  }

  /**
   * Sanitize filter data by removing items with null or empty values and resetting operator if no valid items remain
   *
   * @param data IFilterData
   * @returns { hasData: boolean; sanitizedData: IFilterData }
   */
  private _sanitizeFilterData(data: IFilterData): { hasData: boolean; sanitizedData: IFilterData } {
    const sanitizedData = cloneDeep(data);

    sanitizedData.items = sanitizedData.items.filter((item) => {
      const isEmptyValue = item.value === null || item.value === '';
      const isEmptyOperator = item.filterType === 'isEmpty' || item.filterType === 'isNotEmpty';

      return !(isEmptyValue && !isEmptyOperator);
    });

    const hasData = sanitizedData.items.length > 0;

    return {
      hasData,
      sanitizedData,
    };
  }

  /**
   * Handle cancel filter action to reset filter data and hide operators
   *
   * @return void
   */
  public cancelFilter(): void {
    this.isShowOperators.set(false);
    this.isShowSecondFilter.set(false);
    this.isShowFirstFilter.set(true);
    this._resetFilterData();
    this.cancelFilterEvent.emit();
  }

  /**
   * Reset filter data to initial state and clear search inputs
   *
   * @returns void
   */
  private _resetFilterData(): void {
    const data = cloneDeep(this._data());

    data.field = '';

    data.items = [
      { filterType: '', value: null },
      { filterType: '', value: null, operator: this.operator() },
    ];

    this._data.set(data);

    this._firstSearchInputEl()?.clearInput();
    this._firstNumberInputEl()?.clearInput();
    this._firstDateInputEl()?.clearInput();

    this._secondSearchInputEl()?.clearInput();
    this._secondNumberInputEl()?.clearInput();
    this._secondDateInputEl()?.clearInput();

    this._init();
  }

  /**
   * Public api to reset filter data, can be used by parent component to reset the form when popover is closed without saving
   *
   * @returns void
   */
  public resetFilterData(): void {
    this._resetFilterData();
  }
}
