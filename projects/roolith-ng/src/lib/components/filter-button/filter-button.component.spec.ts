import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { IPopoverChangeEvent } from '../popover/index';
import { IFilterButtonItem } from './data-access/filter-button.interface';
import { FilterButtonComponent } from './filter-button.component';

describe('FilterButtonComponent', () => {
  let component: FilterButtonComponent;
  let fixture: ComponentFixture<FilterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('items effect', () => {
    it('should sync internal items and filtered items from input', async () => {
      const items = createMockItems();

      fixture.componentRef.setInput('items', items);
      await fixture.whenStable();

      expect(component._items()).toEqual(items);
      expect(component.filteredItems()).toEqual(items);
    });
  });

  describe('selectedItems', () => {
    it('should return selected items', () => {
      component._items.set(createMockItems());

      expect(component.selectedItems()).toEqual([createMockItem('Active', 'active', true)]);
    });
  });

  describe('hasSelectedItems', () => {
    it('should return true when selected items exist', () => {
      component._items.set(createMockItems());

      expect(component.hasSelectedItems()).toBe(true);
    });

    it('should return false when selected items do not exist', () => {
      component._items.set([createMockItem('Active', 'active')]);

      expect(component.hasSelectedItems()).toBe(false);
    });
  });

  describe('selectedCount', () => {
    it('should return selected items count', () => {
      component._items.set(createMockItems());

      expect(component.selectedCount()).toBe(1);
    });
  });

  describe('isDisabled', () => {
    it('should return true when items input is empty', () => {
      expect(component.isDisabled()).toBe(true);
    });

    it('should return false when items input has items', async () => {
      fixture.componentRef.setInput('items', createMockItems());
      await fixture.whenStable();

      expect(component.isDisabled()).toBe(false);
    });
  });

  describe('onSearchInputChange', () => {
    it('should reset filtered items when search term is null', () => {
      const items = createMockItems();
      component._items.set(items);
      component.filteredItems.set([]);

      component.onSearchInputChange(null);

      expect(component.filteredItems()).toEqual(items);
    });

    it('should reset filtered items when search term is empty', () => {
      const items = createMockItems();
      component._items.set(items);
      component.filteredItems.set([]);

      component.onSearchInputChange('');

      expect(component.filteredItems()).toEqual(items);
    });

    it('should filter items by label case-insensitively', () => {
      component._items.set(createMockItems());

      component.onSearchInputChange('act');

      expect(component.filteredItems()).toEqual([
        createMockItem('Active', 'active', true),
        createMockItem('Inactive', 'inactive'),
      ]);
    });
  });

  describe('clearFilters', () => {
    it('should reset filtered items and internal items from input', async () => {
      const items = createMockItems();
      fixture.componentRef.setInput('items', items);
      component._items.set([createMockItem('Draft', 'draft', true)]);
      component.filteredItems.set([]);
      await fixture.whenStable();

      component.clearFilters();

      expect(component.filteredItems()).toEqual(items);
      expect(component._items()).toEqual(items);
    });

    it('should emit clear event with selected items payload', async () => {
      const emitSpy = vi.spyOn(component.changeEvent, 'emit');
      const items = createMockItems();
      fixture.componentRef.setInput('items', items);
      await fixture.whenStable();

      component.clearFilters();

      expect(emitSpy).toHaveBeenCalledWith({ type: 'clear', payload: [createMockItem('Active', 'active', true)] });
    });
  });

  describe('onItemCheckedChange', () => {
    it('should update checked state in internal items and filtered items', () => {
      const items = createMockItems();
      component._items.set(items);
      component.filteredItems.set(items);

      component.onItemCheckedChange(createMockItem('Inactive', 'inactive'), true);

      expect(component._items()[1].selected).toBe(true);
      expect(component.filteredItems()[1].selected).toBe(true);
    });

    it('should emit change event with selected items payload', () => {
      const emitSpy = vi.spyOn(component.changeEvent, 'emit');
      const items = createMockItems();
      component._items.set(items);
      component.filteredItems.set(items);

      component.onItemCheckedChange(createMockItem('Inactive', 'inactive'), true);

      expect(emitSpy).toHaveBeenCalledWith({
        type: 'change',
        payload: [createMockItem('Active', 'active', true), createMockItem('Inactive', 'inactive', true)],
      });
    });

    it('should keep other items unchanged', () => {
      const items = createMockItems();
      component._items.set(items);
      component.filteredItems.set(items);

      component.onItemCheckedChange(createMockItem('Inactive', 'inactive'), true);

      expect(component._items()[0]).toEqual(createMockItem('Active', 'active', true));
      expect(component._items()[2]).toEqual(createMockItem('Pending', 'pending'));
    });
  });

  describe('onPopoverChangeEvent', () => {
    it('should return when popover is not opened', () => {
      const focus = vi.fn();
      vi.spyOn(component as any, '_searchInputComponentEl').mockReturnValue({ focus });

      component.onPopoverChangeEvent({ type: 'close' } as IPopoverChangeEvent);

      expect(focus).not.toHaveBeenCalled();
    });

    it('should focus search input when popover is opened', () => {
      const focus = vi.fn();
      vi.spyOn(component as any, '_searchInputComponentEl').mockReturnValue({ focus });

      component.onPopoverChangeEvent({ type: 'open' } as IPopoverChangeEvent);

      expect(focus).toHaveBeenCalledOnce();
    });
  });
});

/**
 * Creates mock filter button items.
 *
 * @returns IFilterButtonItem[]
 */
function createMockItems(): IFilterButtonItem[] {
  return [
    createMockItem('Active', 'active', true),
    createMockItem('Inactive', 'inactive'),
    createMockItem('Pending', 'pending'),
  ];
}

/**
 * Creates a mock filter button item.
 *
 * @param label string
 * @param value string
 * @param selected boolean
 * @returns IFilterButtonItem
 */
function createMockItem(label: string, value: string, selected?: boolean): IFilterButtonItem {
  return { label, value, ...(selected === undefined ? {} : { selected }) };
}
