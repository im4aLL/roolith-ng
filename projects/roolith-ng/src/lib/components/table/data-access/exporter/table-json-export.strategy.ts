import { camelCase } from 'lodash-es';
import { ITableColumn, ITableData } from '../table.interface';
import { ITableExportStrategy } from './table-exporter.interface';

export class TableJsonExportStrategy implements ITableExportStrategy {
  public readonly extension = 'json';
  public readonly mimeType = 'application/json;charset=utf-8;';

  /**
   * Serializes an array of records to a JSON string.
   *
   * @param data ITableData[]
   * @param columns ITableColumn[]
   * @returns string
   */
  public export(data: ITableData[], columns: ITableColumn[]): string {
    if (data.length === 0 || columns.length === 0) {
      return '[]';
    }

    const transformed = data.map((row) =>
      columns.reduce<ITableData>(
        (acc, column) => ({ ...acc, [camelCase(column.label)]: row[column.field] ?? null }),
        {},
      ),
    );

    return JSON.stringify(transformed, null, 2);
  }
}
