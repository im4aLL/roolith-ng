import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFilterComponent } from './add-filter.component';
import { IFilterableField, IFilterData } from '../data-access/filter.interface';
import { DateTime } from 'luxon';
import { vi } from 'vitest';

const mockStringField: IFilterableField = { value: 'name', label: 'Name', type: 'string' };
const mockNumberField: IFilterableField = { value: 'age', label: 'Age', type: 'number' };
const mockDateField: IFilterableField = { value: 'dob', label: 'Date of Birth', type: 'date' };

const mockFilterableFields: IFilterableField[] = [mockStringField, mockNumberField, mockDateField];

describe('AddFilterComponent', () => {
  let component: AddFilterComponent;
  let fixture: ComponentFixture<AddFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFilterComponent);
    fixture.componentRef.setInput('filterableFields', mockFilterableFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('_init', () => {
    it('should set selectedField to the first filterable field', () => {
      expect(component.selectedField()).toEqual(mockStringField);
    });

    it('should set filter types for the initial field type', () => {
      vi.useFakeTimers();
      component['_init']();
      vi.runAllTimers();
      vi.useRealTimers();

      expect(component.filterTypes().length).toBeGreaterThan(0);
    });

    it('should not change selectedField when filterableFields is empty', async () => {
      component.selectedField.set(undefined);
      fixture.componentRef.setInput('filterableFields', []);
      component['_init']();

      expect(component.selectedField()).toBeUndefined();
    });
  });

  describe('_getFilterTypesByFieldType', () => {
    it('should return generic filter types for string fields', () => {
      const types = component['_getFilterTypesByFieldType']('string');

      expect(types.some((type) => type.value === 'contains')).toBe(true);
    });

    it('should return number filter types for number fields', () => {
      const types = component['_getFilterTypesByFieldType']('number');

      expect(types.some((type) => type.value === 'greaterThan')).toBe(true);
    });

    it('should return date filter types for date fields', () => {
      const types = component['_getFilterTypesByFieldType']('date');

      expect(types.some((type) => type.value === 'before')).toBe(true);
    });

    it('should return empty array for unknown field type', () => {
      const types = component['_getFilterTypesByFieldType']('unknown' as any);

      expect(types).toEqual([]);
    });
  });

  describe('onFieldChange', () => {
    it('should update selectedField when a valid field is selected', () => {
      component.onFieldChange({ value: 'age', label: 'Age' });

      expect(component.selectedField()).toEqual(mockNumberField);
    });

    it('should update filterTypes to match the new field type', () => {
      component.onFieldChange({ value: 'age', label: 'Age' });

      expect(component.filterTypes().some((type) => type.value === 'greaterThan')).toBe(true);
    });

    it('should do nothing when fieldItem is undefined', () => {
      component.onFieldChange(undefined);

      expect(component.selectedField()).toEqual(mockStringField);
    });

    it('should do nothing when fieldItem does not match a filterable field', () => {
      component.onFieldChange({ value: 'unknown', label: 'Unknown' });

      expect(component.selectedField()).toEqual(mockStringField);
    });
  });

  describe('onFirstFilterTypeChange', () => {
    it('should update firstFilterType signal', () => {
      component.onFirstFilterTypeChange({ value: 'equals', label: 'Equals' });

      expect(component.firstFilterType()?.value).toBe('equals');
    });

    it('should show operators and second filter when filterType is isEmpty', () => {
      component.onFirstFilterTypeChange({ value: 'isEmpty', label: 'Is empty' });

      expect(component.isShowOperators()).toBe(true);
      expect(component.isShowSecondFilter()).toBe(true);
    });

    it('should hide the first filter input when filterType is isEmpty', () => {
      component.onFirstFilterTypeChange({ value: 'isEmpty', label: 'Is empty' });

      expect(component.isShowFirstFilter()).toBe(false);
    });

    it('should do nothing when value is undefined', () => {
      component.onFirstFilterTypeChange(undefined);

      expect(component.firstFilterType()).toBeUndefined();
    });
  });

  describe('onFirstSearchInputChange', () => {
    it('should show operators and second filter when value is non-empty', () => {
      component.onFirstSearchInputChange('John');

      expect(component.isShowOperators()).toBe(true);
      expect(component.isShowSecondFilter()).toBe(true);
    });

    it('should hide operators and second filter when value is null', () => {
      component.isShowOperators.set(true);
      component.onFirstSearchInputChange(null);

      expect(component.isShowOperators()).toBe(false);
      expect(component.isShowSecondFilter()).toBe(false);
    });
  });

  describe('onFirstNumberInputChange', () => {
    it('should show operators when value is provided', () => {
      component.onFirstNumberInputChange(42);

      expect(component.isShowOperators()).toBe(true);
    });

    it('should store null when value is NaN', () => {
      component.onFirstNumberInputChange(NaN);

      expect(component['_data']().items[0].value).toBeNull();
    });
  });

  describe('onFirstDateInputChange', () => {
    it('should show operators and store ISO date string when date is provided', () => {
      const date = DateTime.fromISO('2024-01-15');
      component.onFirstDateInputChange(date);

      expect(component.isShowOperators()).toBe(true);
      expect(component['_data']().items[0].value).toBe('2024-01-15');
    });

    it('should store null when date is null', () => {
      component.onFirstDateInputChange(null);

      expect(component['_data']().items[0].value).toBeNull();
    });
  });

  describe('onFilterOperatorChange', () => {
    it('should update operator signal and second item operator in data', () => {
      component.onFilterOperatorChange('or');

      expect(component.operator()).toBe('or');
      expect(component['_data']().items[1].operator).toBe('or');
    });
  });

  describe('onSecondFilterTypeChange', () => {
    it('should update secondFilterType signal', () => {
      component.onSecondFilterTypeChange({ value: 'contains', label: 'Contains' });

      expect(component.secondFilterType()?.value).toBe('contains');
    });

    it('should hide second filter input when type is isNotEmpty', () => {
      component.onSecondFilterTypeChange({ value: 'isNotEmpty', label: 'Is not empty' });

      expect(component.isShowSecondFilter()).toBe(false);
    });

    it('should do nothing when value is undefined', () => {
      component.onSecondFilterTypeChange(undefined);

      expect(component.secondFilterType()).toBeUndefined();
    });
  });

  describe('onSecondSearchInputChange', () => {
    it('should update the second item value in filter data', () => {
      component.onSecondSearchInputChange('Jane');

      expect(component['_data']().items[1].value).toBe('Jane');
    });
  });

  describe('onSecondNumberInputChange', () => {
    it('should update the second item value', () => {
      component.onSecondNumberInputChange(99);

      expect(component['_data']().items[1].value).toBe(99);
    });

    it('should store null when value is NaN', () => {
      component.onSecondNumberInputChange(NaN);

      expect(component['_data']().items[1].value).toBeNull();
    });
  });

  describe('onSecondDateInputChange', () => {
    it('should store ISO date string for second item', () => {
      const date = DateTime.fromISO('2024-06-01');
      component.onSecondDateInputChange(date);

      expect(component['_data']().items[1].value).toBe('2024-06-01');
    });

    it('should store null when date is null', () => {
      component.onSecondDateInputChange(null);

      expect(component['_data']().items[1].value).toBeNull();
    });
  });

  describe('addFilter', () => {
    it('should emit addFilterEvent with sanitized data when data has items', () => {
      const emitted: IFilterData[] = [];
      component.addFilterEvent.subscribe((data) => emitted.push(data));
      component.onFirstSearchInputChange('John');
      component.addFilter();

      expect(emitted).toHaveLength(1);
      expect(emitted[0].items[0].value).toBe('John');
    });

    it('should call cancelFilter when sanitized data has no items', () => {
      const cancelSpy = vi.spyOn(component, 'cancelFilter');
      component.addFilter();

      expect(cancelSpy).toHaveBeenCalled();
    });

    it('should reset display state after adding', () => {
      component.onFirstSearchInputChange('John');
      component.addFilter();

      expect(component.isShowOperators()).toBe(false);
      expect(component.isShowSecondFilter()).toBe(false);
      expect(component.isShowFirstFilter()).toBe(true);
    });
  });

  describe('cancelFilter', () => {
    it('should emit cancelFilterEvent', () => {
      let emitCount = 0;
      component.cancelFilterEvent.subscribe(() => emitCount++);
      component.cancelFilter();

      expect(emitCount).toBe(1);
    });

    it('should reset display state', () => {
      component.isShowOperators.set(true);
      component.isShowSecondFilter.set(true);
      component.cancelFilter();

      expect(component.isShowOperators()).toBe(false);
      expect(component.isShowFirstFilter()).toBe(true);
    });
  });

  describe('_sanitizeFilterData', () => {
    it('should remove items with null value and non-empty-operator filterType', () => {
      const data: IFilterData = {
        field: 'name',
        items: [
          { filterType: 'contains', value: null },
          { filterType: 'contains', value: 'John' },
        ],
      };

      const { sanitizedData } = component['_sanitizeFilterData'](data);

      expect(sanitizedData.items).toHaveLength(1);
      expect(sanitizedData.items[0].value).toBe('John');
    });

    it('should keep items with isEmpty filterType even when value is null', () => {
      const data: IFilterData = {
        field: 'name',
        items: [{ filterType: 'isEmpty', value: null }],
      };

      const { hasData, sanitizedData } = component['_sanitizeFilterData'](data);

      expect(hasData).toBe(true);
      expect(sanitizedData.items).toHaveLength(1);
    });

    it('should return hasData false when all items are removed', () => {
      const data: IFilterData = {
        field: 'name',
        items: [{ filterType: 'contains', value: null }],
      };

      const { hasData } = component['_sanitizeFilterData'](data);

      expect(hasData).toBe(false);
    });
  });

  describe('resetFilterData', () => {
    it('should call _resetFilterData', () => {
      const spy = vi.spyOn(component as any, '_resetFilterData');
      component.resetFilterData();

      expect(spy).toHaveBeenCalled();
    });
  });
});
