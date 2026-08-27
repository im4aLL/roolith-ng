import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { SortDirectionType } from '../data-access/table.interface';
import { TableSortComponent } from './table-sort.component';

describe('TableSortComponent', () => {
  let component: TableSortComponent;
  let fixture: ComponentFixture<TableSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSortComponent);
    fixture.componentRef.setInput('name', 'status');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('direction', () => {
    it.each([
      ['default'],
      ['asc'],
      ['desc'],
    ] as [SortDirectionType][])('should sync sort direction from %s input', async (direction) => {
      fixture.componentRef.setInput('direction', direction);
      await fixture.whenStable();

      expect(component._sortDirection()).toBe(direction);
    });
  });

  describe('sortDirectionIconClass', () => {
    it.each([
      ['default', 'rng-icon--sort'],
      ['asc', 'rng-icon--sort-up'],
      ['desc', 'rng-icon--sort-down'],
    ] as [SortDirectionType, string][])('should return icon class for %s direction', (direction, expectedClass) => {
      component._sortDirection.set(direction);

      expect(component.sortDirectionIconClass()).toBe(expectedClass);
    });
  });

  describe('isSortApplied', () => {
    it('should return false when sort direction is default', () => {
      component._sortDirection.set('default');

      expect(component.isSortApplied()).toBe(false);
    });

    it.each([
      ['asc'],
      ['desc'],
    ] as [SortDirectionType][])('should return true when sort direction is %s', (direction) => {
      component._sortDirection.set(direction);

      expect(component.isSortApplied()).toBe(true);
    });
  });

  describe('onSort', () => {
    it.each([
      ['default', 'asc'],
      ['asc', 'desc'],
      ['desc', 'default'],
    ] as [SortDirectionType, SortDirectionType][])('should change direction from %s to %s', (currentDirection, expectedDirection) => {
      component._sortDirection.set(currentDirection);

      component.onSort();

      expect(component._sortDirection()).toBe(expectedDirection);
    });

    it('should emit sort change with name and new direction', () => {
      const emitSpy = vi.spyOn(component.sortChange, 'emit');
      component._sortDirection.set('default');

      component.onSort();

      expect(emitSpy).toHaveBeenCalledWith({ name: 'status', direction: 'asc' });
    });
  });
});
