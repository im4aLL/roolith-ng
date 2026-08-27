import { beforeEach, describe, expect, it } from 'vitest';
import { ITableColumn, ITableData } from '../table.interface';
import { TableCsvExportStrategy } from './table-csv-export.strategy';

describe('TableCsvExportStrategy', () => {
  let strategy: TableCsvExportStrategy;

  beforeEach(() => {
    strategy = new TableCsvExportStrategy();
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });

  it('should have correct extension and mimeType', () => {
    expect(strategy.extension).toBe('csv');
    expect(strategy.mimeType).toBe('text/csv;charset=utf-8;');
  });

  describe('export()', () => {
    it('should return empty string when data is empty', () => {
      const columns: ITableColumn[] = [{ field: 'name', label: 'Name' }];

      expect(strategy.export([], columns)).toBe('');
    });

    it('should return empty string when columns is empty', () => {
      const data: ITableData[] = [{ name: 'Alice' }];

      expect(strategy.export(data, [])).toBe('');
    });

    it('should produce a header row from column labels', () => {
      const columns: ITableColumn[] = [
        { field: 'firstName', label: 'First Name' },
        { field: 'age', label: 'Age' },
      ];
      const data: ITableData[] = [{ firstName: 'Alice', age: 30 }];

      const [headerRow] = strategy.export(data, columns).split('\r\n');

      expect(headerRow).toBe('First Name,Age');
    });

    it('should produce data rows mapped by column field', () => {
      const columns: ITableColumn[] = [
        { field: 'name', label: 'Name' },
        { field: 'age', label: 'Age' },
      ];
      const data: ITableData[] = [{ name: 'Alice', age: 30 }];

      const [, dataRow] = strategy.export(data, columns).split('\r\n');

      expect(dataRow).toBe('Alice,30');
    });

    it('should only include fields defined in columns', () => {
      const columns: ITableColumn[] = [{ field: 'name', label: 'Name' }];
      const data: ITableData[] = [{ name: 'Alice', secret: 'hidden' }];

      const result = strategy.export(data, columns);

      expect(result).not.toContain('hidden');
      expect(result).toContain('Alice');
    });

    it('should serialize multiple rows separated by CRLF', () => {
      const columns: ITableColumn[] = [{ field: 'id', label: 'ID' }];
      const data: ITableData[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      const rows = strategy.export(data, columns).split('\r\n');

      expect(rows).toHaveLength(4); // header + 3 data rows
      expect(rows[1]).toBe('1');
      expect(rows[3]).toBe('3');
    });

    it('should use empty string for missing field values', () => {
      const columns: ITableColumn[] = [
        { field: 'name', label: 'Name' },
        { field: 'missing', label: 'Missing' },
      ];
      const data: ITableData[] = [{ name: 'Alice' }];

      const [, dataRow] = strategy.export(data, columns).split('\r\n');

      expect(dataRow).toBe('Alice,');
    });

    describe('cell escaping', () => {
      it('should wrap cells containing a comma in double quotes', () => {
        const columns: ITableColumn[] = [{ field: 'value', label: 'Value' }];
        const data: ITableData[] = [{ value: 'hello, world' }];

        const [, dataRow] = strategy.export(data, columns).split('\r\n');

        expect(dataRow).toBe('"hello, world"');
      });

      it('should escape double quotes inside a cell by doubling them', () => {
        const columns: ITableColumn[] = [{ field: 'value', label: 'Value' }];
        const data: ITableData[] = [{ value: 'say "hi"' }];

        const [, dataRow] = strategy.export(data, columns).split('\r\n');

        expect(dataRow).toBe('"say ""hi"""');
      });

      it('should wrap cells containing a newline in double quotes', () => {
        const columns: ITableColumn[] = [{ field: 'value', label: 'Value' }];
        const data: ITableData[] = [{ value: 'line1\nline2' }];

        const [, dataRow] = strategy.export(data, columns).split('\r\n');

        expect(dataRow).toBe('"line1\nline2"');
      });

      it('should not wrap plain cells without special characters', () => {
        const columns: ITableColumn[] = [{ field: 'value', label: 'Value' }];
        const data: ITableData[] = [{ value: 'simple' }];

        const [, dataRow] = strategy.export(data, columns).split('\r\n');

        expect(dataRow).toBe('simple');
      });

      it('should escape column labels in the header row', () => {
        const columns: ITableColumn[] = [{ field: 'value', label: 'First, Last' }];
        const data: ITableData[] = [{ value: 'test' }];

        const [headerRow] = strategy.export(data, columns).split('\r\n');

        expect(headerRow).toBe('"First, Last"');
      });
    });
  });
});
