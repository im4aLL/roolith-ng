import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { INav } from './data-access/nav.interface';
import { vi } from 'vitest';

const createNavItem = (overrides: Partial<INav> = {}): INav => ({
  id: 'item',
  name: 'Item',
  link: '/item',
  isActive: false,
  count: null,
  icon: null,
  ...overrides,
});

const mockNavData: INav[] = [
  createNavItem({ id: 'item-one', name: 'Item One', link: '/item-one' }),
  createNavItem({
    id: 'item-two',
    name: 'Item Two',
    link: '#',
    children: [
      createNavItem({ id: 'item-two-a', name: 'Item Two A', link: '/item-two-a' }),
      createNavItem({ id: 'item-two-b', name: 'Item Two B', link: '/item-two-b' }),
    ],
  }),
];

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    fixture.componentRef.setInput('data', structuredClone(mockNavData));
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('typeClassName', () => {
    it('should return rng-nav--warning for warning type', async () => {
      fixture.componentRef.setInput('type', 'warning');
      await fixture.whenStable();

      expect(component.typeClassName()).toBe('rng-nav--warning');
    });

    it('should return rng-nav--info for info type', async () => {
      fixture.componentRef.setInput('type', 'info');
      await fixture.whenStable();

      expect(component.typeClassName()).toBe('rng-nav--info');
    });

    it('should return empty string for default type', () => {
      expect(component.typeClassName()).toBe('');
    });
  });

  describe('_dataEffect', () => {
    it('should populate items signal from data input', () => {
      expect(component.items()).toEqual(structuredClone(mockNavData));
    });

    it('should update items when data input changes', async () => {
      const newData: INav[] = [createNavItem({ id: 'new', name: 'New', link: '/new' })];
      fixture.componentRef.setInput('data', newData);
      await fixture.whenStable();

      expect(component.items()).toEqual(newData);
    });
  });

  describe('toggleSubmenu', () => {
    it('should do nothing when item has no children', () => {
      const item = component.items()[0];
      component.toggleSubmenu(item);

      expect(component.items()[0].isOpen).toBeFalsy();
    });

    it('should toggle isOpen on item with children', () => {
      const item = component.items()[1];
      component.toggleSubmenu(item);

      expect(component.items()[1].isOpen).toBe(true);
    });

    it('should collapse other open submenus when collapsed is true', async () => {
      fixture.componentRef.setInput('collapsed', true);
      await fixture.whenStable();

      component.items.update((items) => items.map((i, idx) => ({ ...i, isOpen: idx === 0 })));
      const item = component.items()[1];
      component.toggleSubmenu(item);

      expect(component.items()[0].isOpen).toBe(false);
    });

    it('should not collapse other submenus when collapsed is false', () => {
      component.items.update((items) => items.map((i, idx) => ({ ...i, isOpen: idx === 0 })));
      const item = component.items()[1];
      component.toggleSubmenu(item);

      expect(component.items()[0].isOpen).toBe(true);
    });
  });

  describe('menuItemClickHandler', () => {
    it('should call preventDefault on the event', () => {
      const event = new MouseEvent('click');
      const spy = vi.spyOn(event, 'preventDefault');
      component.menuItemClickHandler(event, component.items()[0]);

      expect(spy).toHaveBeenCalled();
    });

    it('should emit clickEvent when item has no children', () => {
      const emitted: INav[] = [];
      component.clickEvent.subscribe((item) => emitted.push(item));
      const event = new MouseEvent('click');
      const item = component.items()[0];
      component.menuItemClickHandler(event, item);

      expect(emitted).toEqual([item]);
    });

    it('should not emit clickEvent when item has children', () => {
      const emitted: INav[] = [];
      component.clickEvent.subscribe((item) => emitted.push(item));
      const event = new MouseEvent('click');
      component.menuItemClickHandler(event, component.items()[1]);

      expect(emitted).toHaveLength(0);
    });
  });

  describe('childMenuItemClickHandler', () => {
    it('should call preventDefault and emit the child item', () => {
      const emitted: INav[] = [];
      component.clickEvent.subscribe((item) => emitted.push(item));
      const event = new MouseEvent('click');
      const preventSpy = vi.spyOn(event, 'preventDefault');
      const child = component.items()[1].children![0];
      component.childMenuItemClickHandler(event, child);

      expect(preventSpy).toHaveBeenCalled();
      expect(emitted).toEqual([child]);
    });
  });

  describe('childItemClickHandler', () => {
    it('should call stopPropagation on the event', () => {
      const event = new MouseEvent('click');
      const spy = vi.spyOn(event, 'stopPropagation');
      const parent = component.items()[1];
      const child = parent.children![0];
      component.childItemClickHandler(event, parent, child);

      expect(spy).toHaveBeenCalled();
    });

    it('should set isActive on the parent item', () => {
      const event = new MouseEvent('click');
      const parent = component.items()[1];
      const child = parent.children![0];
      component.childItemClickHandler(event, parent, child);

      expect(component.items()[1].isActive).toBe(true);
    });

    it('should set isActive only on the clicked child', () => {
      const event = new MouseEvent('click');
      const parent = component.items()[1];
      const child = parent.children![0];
      component.childItemClickHandler(event, parent, child);

      const children = component.items()[1].children!;
      expect(children[0].isActive).toBe(true);
      expect(children[1].isActive).toBe(false);
    });

    it('should reset active state on all other items before setting new active state', () => {
      const event = new MouseEvent('click');
      component.items.update((items) => items.map((i) => ({ ...i, isActive: true })));
      const parent = component.items()[1];
      const child = parent.children![0];
      component.childItemClickHandler(event, parent, child);

      expect(component.items()[0].isActive).toBe(false);
    });
  });

  describe('_resetActiveState', () => {
    it('should set isActive to false on all items and their children', () => {
      component.items.update((items) =>
        items.map((item) => ({
          ...item,
          isActive: true,
          children: item.children?.map((child) => ({ ...child, isActive: true })),
        })),
      );

      component['_resetActiveState']();

      for (const item of component.items()) {
        expect(item.isActive).toBe(false);
        for (const child of item.children ?? []) {
          expect(child.isActive).toBe(false);
        }
      }
    });
  });
});
