import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { ITabItem } from './data-access/tab.interface';
import { TabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('customTemplateData', () => {
    it('should return empty object when there are no custom templates', () => {
      expect(component.customTemplateData()).toEqual({});
    });
  });

  describe('ngOnInit', () => {
    it('should set the initial selected item', () => {
      const setInitialSelectedItemSpy = vi.spyOn(component as any, '_setInitialSelectedItem');

      component.ngOnInit();

      expect(setInitialSelectedItemSpy).toHaveBeenCalledOnce();
    });
  });

  describe('onTabChange', () => {
    it('should set selected item', () => {
      const item = createMockTabItem({ label: 'Details', value: 'details' });

      component.onTabChange(item);

      expect(component.selectedItem()).toEqual(item);
    });

    it('should emit changed item', () => {
      const emitSpy = vi.spyOn(component.changeEvent, 'emit');
      const item = createMockTabItem({ label: 'Details', value: 'details' });

      component.onTabChange(item);

      expect(emitSpy).toHaveBeenCalledWith(item);
    });
  });

  describe('_setInitialSelectedItem', () => {
    it('should set selected item to null when items are empty', () => {
      component.selectedItem.set(createMockTabItem());
      fixture.componentRef.setInput('items', []);

      component['_setInitialSelectedItem']();

      expect(component.selectedItem()).toBeNull();
    });

    it('should select item matching value input', async () => {
      const items = [
        createMockTabItem({ label: 'Overview', value: 'overview' }),
        createMockTabItem({ label: 'Details', value: 'details' }),
      ];
      fixture.componentRef.setInput('items', items);
      fixture.componentRef.setInput('value', 'details');
      await fixture.whenStable();

      component['_setInitialSelectedItem']();

      expect(component.selectedItem()).toEqual(items[1]);
    });

    it('should select first item when value input is null', async () => {
      const items = [
        createMockTabItem({ label: 'Overview', value: 'overview' }),
        createMockTabItem({ label: 'Details', value: 'details' }),
      ];
      fixture.componentRef.setInput('items', items);
      fixture.componentRef.setInput('value', null);
      await fixture.whenStable();

      component['_setInitialSelectedItem']();

      expect(component.selectedItem()).toEqual(items[0]);
    });

    it('should select first item when value input does not match an item', async () => {
      const items = [
        createMockTabItem({ label: 'Overview', value: 'overview' }),
        createMockTabItem({ label: 'Details', value: 'details' }),
      ];
      fixture.componentRef.setInput('items', items);
      fixture.componentRef.setInput('value', 'missing');
      await fixture.whenStable();

      component['_setInitialSelectedItem']();

      expect(component.selectedItem()).toEqual(items[0]);
    });
  });
});

/**
 * Creates a mock tab item.
 *
 * @param overrides Partial<ITabItem>
 * @returns ITabItem
 */
function createMockTabItem(overrides: Partial<ITabItem> = {}): ITabItem {
  return {
    label: 'Overview',
    value: 'overview',
    ...overrides,
  };
}
