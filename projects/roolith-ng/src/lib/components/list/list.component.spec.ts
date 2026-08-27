import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { IListItem } from './data-access/list.interface';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('items', () => {
    it('should be empty by default', () => {
      expect(component.items()).toEqual([]);
    });

    it('should add title as track by value when title exists', async () => {
      const items = [createMockListItem({ title: 'Overview', content: 'Overview content' })];

      fixture.componentRef.setInput('items', items);
      await fixture.whenStable();

      expect(component.items()).toEqual([
        {
          title: 'Overview',
          content: 'Overview content',
          _trackBy: 'Overview',
        },
      ]);
    });

    it('should add item index as track by value when title is missing', async () => {
      const items = [createMockListItem({ content: 'First content' }), createMockListItem({ content: 'Second content' })];

      fixture.componentRef.setInput('items', items);
      await fixture.whenStable();

      expect(component.items()).toEqual([
        {
          content: 'First content',
          _trackBy: 0,
        },
        {
          content: 'Second content',
          _trackBy: 1,
        },
      ]);
    });

    it('should overwrite existing track by value', async () => {
      const items = [createMockListItem({ title: 'Details', content: 'Details content', _trackBy: 'custom-key' })];

      fixture.componentRef.setInput('items', items);
      await fixture.whenStable();

      expect(component.items()[0]._trackBy).toBe('Details');
    });
  });
});

/**
 * Creates a mock list item.
 *
 * @param overrides Partial<IListItem>
 * @returns IListItem
 */
function createMockListItem(overrides: Partial<IListItem> = {}): IListItem {
  return {
    content: 'List content',
    ...overrides,
  };
}
