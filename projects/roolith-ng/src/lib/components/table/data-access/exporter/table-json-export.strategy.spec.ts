import { beforeEach, describe, expect, it } from 'vitest';
import { ITableColumn, ITableData } from '../table.interface';
import { TableJsonExportStrategy } from './table-json-export.strategy';

describe('TableJsonExportStrategy', () => {
  let strategy: TableJsonExportStrategy;

  beforeEach(() => {
    strategy = new TableJsonExportStrategy();
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });

  it('should have correct extension and mimeType', () => {
    expect(strategy.extension).toBe('json');
    expect(strategy.mimeType).toBe('application/json;charset=utf-8;');
  });

  describe('export()', () => {
    it('should return empty array string when data is empty', () => {
      const columns: ITableColumn[] = [{ field: 'name', label: 'Name' }];

      expect(strategy.export([], columns)).toBe('[]');
    });

    it('should return empty array string when columns is empty', () => {
      const data: ITableData[] = [{ name: 'Alice' }];

      expect(strategy.export(data, [])).toBe('[]');
    });

    it('should serialize data using column labels as camelCase keys', () => {
      const columns: ITableColumn[] = [
        { field: 'firstName', label: 'First Name' },
        { field: 'age', label: 'Age' },
      ];
      const data: ITableData[] = [{ firstName: 'Alice', age: 30 }];

      const result = JSON.parse(strategy.export(data, columns));

      expect(result).toEqual([{ firstName: 'Alice', age: 30 }]);
    });

    it('should only include fields defined in columns', () => {
      const columns: ITableColumn[] = [{ field: 'name', label: 'Name' }];
      const data: ITableData[] = [{ name: 'Alice', secret: 'hidden' }];

      const result = JSON.parse(strategy.export(data, columns));

      expect(result[0]).not.toHaveProperty('secret');
      expect(result[0]).toHaveProperty('name', 'Alice');
    });

    it('should convert multi-word column labels to camelCase keys', () => {
      const columns: ITableColumn[] = [{ field: 'totalCost', label: 'Total Cost USD' }];
      const data: ITableData[] = [{ totalCost: 99.9 }];

      const result = JSON.parse(strategy.export(data, columns));

      expect(result[0]).toHaveProperty('totalCostUsd', 99.9);
    });

    it('should use null for missing field values', () => {
      const columns: ITableColumn[] = [
        { field: 'name', label: 'Name' },
        { field: 'missing', label: 'Missing' },
      ];
      const data: ITableData[] = [{ name: 'Alice' }];

      const result = JSON.parse(strategy.export(data, columns));

      expect(result[0].missing).toBeNull();
    });

    it('should serialize multiple rows', () => {
      const columns: ITableColumn[] = [{ field: 'id', label: 'ID' }];
      const data: ITableData[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      const result = JSON.parse(strategy.export(data, columns));

      expect(result).toHaveLength(3);
      expect(result[2].id).toBe(3);
    });

    it('should return pretty-printed JSON (2-space indent)', () => {
      const columns: ITableColumn[] = [{ field: 'id', label: 'ID' }];
      const data: ITableData[] = [{ id: 1 }];

      const result = strategy.export(data, columns);

      expect(result).toBe(JSON.stringify([{ id: 1 }], null, 2));
    });
  });
});
