import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { IFilterData, IFilter, IFilterableField } from './data-access/filter.interface';
import { vi } from 'vitest';

const mockFilterableFields: IFilterableField[] = [
  { value: 'name', label: 'Name', type: 'string' },
  { value: 'age', label: 'Age', type: 'number' },
];

const mockFilterData: IFilterData = {
  field: 'name',
  items: [{ filterType: 'contains', value: 'John', operator: 'and' }],
};

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    fixture.componentRef.setInput('filterableFields', mockFilterableFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
    vi.spyOn(component as any, '_closePopover').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onAddFilter', () => {
    it('should call _addFilter with the provided data', () => {
      const addFilterSpy = vi.spyOn(component as any, '_addFilter');
      component.onAddFilter(mockFilterData);

      expect(addFilterSpy).toHaveBeenCalledWith(mockFilterData);
    });

    it('should call _closePopover', () => {
      const closeSpy = vi.spyOn(component as any, '_closePopover');
      component.onAddFilter(mockFilterData);

      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('onCancelFilter', () => {
    it('should call _closePopover', () => {
      const closeSpy = vi.spyOn(component as any, '_closePopover');
      component.onCancelFilter();

      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('onRemoveFilter', () => {
    it('should remove the matching filter item and emit changeEvent', () => {
      component['_filterData'].set([mockFilterData]);
      const emitted: IFilterData[][] = [];
      component.changeEvent.subscribe((data) => emitted.push(data));
      const filterToRemove: IFilter = { field: 'name', filterType: 'contains', value: 'John', operator: 'and' };
      component.onRemoveFilter(filterToRemove);

      expect(emitted[0]).toEqual([]);
    });

    it('should emit globalSearchRemoveEvent when filter field is *', () => {
      const globalData: IFilterData = {
        field: '*',
        items: [{ filterType: 'contains', value: 'test', operator: 'and' }],
      };
      component['_filterData'].set([globalData]);
      let emitCount = 0;
      component.globalSearchRemoveEvent.subscribe(() => emitCount++);
      component.onRemoveFilter({ field: '*', filterType: 'contains', value: 'test', operator: 'and' });

      expect(emitCount).toBe(1);
    });

    it('should do nothing when filter field does not exist', () => {
      const emitted: IFilterData[][] = [];
      component.changeEvent.subscribe((data) => emitted.push(data));
      component.onRemoveFilter({ field: 'nonexistent', filterType: 'contains', value: 'x', operator: 'and' });

      expect(emitted).toHaveLength(0);
    });
  });

  describe('addFilter', () => {
    it('should call _addFilter with the provided data', () => {
      const addFilterSpy = vi.spyOn(component as any, '_addFilter');
      component.addFilter(mockFilterData);

      expect(addFilterSpy).toHaveBeenCalledWith(mockFilterData);
    });

    it('should call closeAddFilterPopover', () => {
      const closeSpy = vi.spyOn(component, 'closeAddFilterPopover');
      component.addFilter(mockFilterData);

      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('value input effect', () => {
    it('should call _addFilter for each item when value input is set', async () => {
      const addFilterSpy = vi.spyOn(component as any, '_addFilter');
      fixture.componentRef.setInput('value', [mockFilterData]);
      await fixture.whenStable();

      expect(addFilterSpy).toHaveBeenCalledWith(mockFilterData);
    });
  });

  describe('_closePopover', () => {
    beforeEach(() => {
      vi.mocked((component as any)['_closePopover']).mockRestore?.();
    });

    it('should call closePopover on the popover ref when it exists', () => {
      const mockPopover = { closePopover: vi.fn() };
      vi.spyOn(component as any, '_popoverRef').mockReturnValue(mockPopover);
      component['_closePopover']();

      expect(mockPopover.closePopover).toHaveBeenCalled();
    });

    it('should not throw when popover ref is undefined', () => {
      vi.spyOn(component as any, '_popoverRef').mockReturnValue(undefined);

      expect(() => component['_closePopover']()).not.toThrow();
    });
  });

  describe('_addFilter', () => {
    it('should add a new filter entry when the field does not exist', () => {
      const emitted: IFilterData[][] = [];
      component.changeEvent.subscribe((data) => emitted.push(data));
      component['_addFilter'](mockFilterData);

      expect(emitted[0]).toEqual([mockFilterData]);
    });

    it('should append items to an existing field entry', () => {
      component['_filterData'].set([
        { field: 'name', items: [{ filterType: 'equals', value: 'Jane', operator: 'and' }] },
      ]);
      const extra: IFilterData = { field: 'name', items: [{ filterType: 'contains', value: 'John', operator: 'and' }] };
      const emitted: IFilterData[][] = [];
      component.changeEvent.subscribe((data) => emitted.push(data));
      component['_addFilter'](extra);

      expect(emitted[0][0].items).toHaveLength(2);
    });

    it('should emit changeEvent with updated filter data', () => {
      const emitted: IFilterData[][] = [];
      component.changeEvent.subscribe((data) => emitted.push(data));
      component['_addFilter'](mockFilterData);

      expect(emitted).toHaveLength(1);
    });
  });

  describe('_transformItemToFilter', () => {
    it('should map filterType to a human-readable label', () => {
      const result = component['_transformItemToFilter'](
        { filterType: 'contains', value: 'John', operator: 'and' },
        'name',
      );

      expect(result._forHuman).toContain('contains');
    });

    it('should use Any Field label when fieldName is *', () => {
      const result = component['_transformItemToFilter']({ filterType: 'contains', value: 'x', operator: 'and' }, '*');

      expect(result._forHuman).toContain('Any Field');
    });

    it('should include the value in the label when value is present', () => {
      const result = component['_transformItemToFilter'](
        { filterType: 'contains', value: 'John', operator: 'and' },
        'name',
      );

      expect(result._forHuman).toContain("'John'");
    });

    it('should not include a value in the label when value is empty', () => {
      const result = component['_transformItemToFilter']({ filterType: 'isEmpty', value: '', operator: 'and' }, 'name');

      expect(result._forHuman).not.toContain("'");
    });

    it('should prefix the label with Or when operator is or', () => {
      const result = component['_transformItemToFilter'](
        { filterType: 'contains', value: 'x', operator: 'or' },
        'name',
      );

      expect(result._forHuman).toContain('Or');
    });

    it('should return correct field, filterType, operator and value', () => {
      const result = component['_transformItemToFilter']({ filterType: 'equals', value: 42, operator: 'and' }, 'age');

      expect(result.field).toBe('age');
      expect(result.filterType).toBe('equals');
      expect(result.operator).toBe('and');
      expect(result.value).toBe(42);
    });
  });
});
