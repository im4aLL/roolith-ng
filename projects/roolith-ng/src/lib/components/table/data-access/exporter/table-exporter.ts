import { ITableColumn, ITableData } from '../table.interface';
import { ITableExporter, ITableExportStrategy } from './table-exporter.interface';

export class TableExporter implements ITableExporter {
  private _strategy: ITableExportStrategy | null = null;

  /**
   * Sets the active export strategy.
   *
   * @param strategy ITableExportStrategy - The export strategy to use for exporting data.
   * @returns void
   */
  public setStrategy(strategy: ITableExportStrategy): void {
    this._strategy = strategy;
  }

  /**
   * Exports data using the current strategy and returns the serialized string.
   *
   * @throws Error if no export strategy is set.
   * @param data ITableData[]
   * @param columns ITableColumn[]
   * @returns string
   */
  public export(data: ITableData[], columns: ITableColumn[]): string {
    if (!this._strategy) {
      throw new Error('No export strategy set.');
    }

    return this._strategy.export(data, columns);
  }

  /**
   * Exports data and triggers a browser file download.
   *
   * @throws Error if no export strategy is set.
   * @param data ITableData[]
   * @param columns ITableColumn[]
   * @param filename string
   * @returns void
   */
  public download(data: ITableData[], columns: ITableColumn[], filename: string): void {
    if (!this._strategy) {
      throw new Error('No export strategy set.');
    }

    const content = this._strategy.export(data, columns);
    const blob = new Blob([content], { type: this._strategy.mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    document.body.appendChild(anchor);
    anchor.href = url;
    anchor.download = `${filename}.${this._strategy.extension}`;
    anchor.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
    }, 0);
  }
}
