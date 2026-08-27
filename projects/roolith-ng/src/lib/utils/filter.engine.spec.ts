import { describe, expect, it, vi } from 'vitest';
import { FilterEngine } from './filter.engine';
import { IFilterData } from '../components/filter/data-access/filter.interface';

describe('FilterEngine', () => {
  let engine: FilterEngine<Record<string, unknown>>;

  it('should create', () => {
    engine = new FilterEngine([]);

    expect(engine).toBeTruthy();
  });

  describe('apply', () => {
    it('should return every row when no filters are configured', () => {
      const collection: Record<string, unknown>[] = [{ name: 'Alpha' }, { name: 'Beta' }];
      engine = new FilterEngine([]);

      expect(engine.apply(collection)).toEqual(collection);
    });

    it('should evaluate every filter group for each row', () => {
      const collection: Record<string, unknown>[] = [{ name: 'Alpha' }];
      const filters: IFilterData[] = [
        { field: 'name', items: [{ filterType: 'contains', value: 'alp' }] },
        { field: 'status', items: [{ filterType: 'equals', value: 'active' }] },
      ];
      engine = new FilterEngine(filters);
      const evaluateGroupSpy = vi.spyOn(engine as any, 'evaluateGroup').mockReturnValue(true);

      engine.apply(collection);

      expect(evaluateGroupSpy).toHaveBeenCalledTimes(2);
      expect(evaluateGroupSpy).toHaveBeenNthCalledWith(1, collection[0], filters[0]);
      expect(evaluateGroupSpy).toHaveBeenNthCalledWith(2, collection[0], filters[1]);
    });

    it('should only keep rows that match all filter groups', () => {
      const collection: Record<string, unknown>[] = [
        { name: 'Alpha', status: 'active' },
        { name: 'Alpha', status: 'inactive' },
        { name: 'Beta', status: 'active' },
      ];
      engine = new FilterEngine([
        { field: 'name', items: [{ filterType: 'contains', value: 'alp' }] },
        { field: 'status', items: [{ filterType: 'equals', value: 'active' }] },
      ]);

      expect(engine.apply(collection)).toEqual([{ name: 'Alpha', status: 'active' }]);
    });
  });

  describe('evaluateGroup', () => {
    it('should return true when any field matches a wildcard filter', () => {
      engine = new FilterEngine([]);
      const row: Record<string, unknown> = { name: 'Alpha', status: 'active' };
      const filterGroup: IFilterData = { field: '*', items: [{ filterType: 'contains', value: 'cti' }] };

      expect(engine['evaluateGroup'](row, filterGroup)).toBe(true);
    });

    it('should return false when no field matches a wildcard filter', () => {
      engine = new FilterEngine([]);
      const row: Record<string, unknown> = { name: 'Alpha', status: 'active' };
      const filterGroup: IFilterData = { field: '*', items: [{ filterType: 'contains', value: 'missing' }] };

      expect(engine['evaluateGroup'](row, filterGroup)).toBe(false);
    });

    it('should combine same-field filters with an and operator', () => {
      engine = new FilterEngine([]);
      const row: Record<string, unknown> = { name: 'Alpha' };
      const filterGroup: IFilterData = {
        field: 'name',
        items: [
          { filterType: 'contains', value: 'alp' },
          { filterType: 'contains', value: 'ha', operator: 'and' },
        ],
      };

      expect(engine['evaluateGroup'](row, filterGroup)).toBe(true);
    });

    it('should combine same-field filters with an or operator', () => {
      engine = new FilterEngine([]);
      const row: Record<string, unknown> = { name: 'Alpha' };
      const filterGroup: IFilterData = {
        field: 'name',
        items: [
          { filterType: 'contains', value: 'missing' },
          { filterType: 'contains', value: 'alp', operator: 'or' },
        ],
      };

      expect(engine['evaluateGroup'](row, filterGroup)).toBe(true);
    });

    it('should return true for non-wildcard filters with no items', () => {
      engine = new FilterEngine([]);
      const row: Record<string, unknown> = { name: 'Alpha' };
      const filterGroup: IFilterData = { field: 'name', items: [] };

      expect(engine['evaluateGroup'](row, filterGroup)).toBe(true);
    });
  });

  describe('evaluateCondition', () => {
    it('should return true for strict equal values', () => {
      engine = new FilterEngine([]);

      expect(engine['evaluateCondition'](10, { filterType: 'equals', value: 10 })).toBe(true);
    });

    it('should return false when equal values have different types', () => {
      engine = new FilterEngine([]);

      expect(engine['evaluateCondition'](10, { filterType: 'equals', value: '10' })).toBe(false);
    });

    it('should return true when value contains the filter text case-insensitively', () => {
      engine = new FilterEngine([]);

      expect(engine['evaluateCondition']('Alpha Project', { filterType: 'contains', value: 'PROJECT' })).toBe(true);
    });

    it('should stringify non-string values for contains filters', () => {
      engine = new FilterEngine([]);

      expect(engine['evaluateCondition'](12345, { filterType: 'contains', value: '34' })).toBe(true);
    });

    it('should return false for unsupported filter types', () => {
      engine = new FilterEngine([]);

      expect(engine['evaluateCondition']('Alpha', { filterType: 'startsWith', value: 'Al' })).toBe(false);
    });
  });
});
