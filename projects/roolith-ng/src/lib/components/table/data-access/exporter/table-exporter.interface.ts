import { ITableColumn, ITableData } from '../table.interface';

export interface ITableExportStrategy {
  readonly extension: string;
  readonly mimeType: string;

  export(data: ITableData[], columns: ITableColumn[]): string;
}

export interface ITableExporter {
  setStrategy(strategy: ITableExportStrategy): void;
  export(data: ITableData[], columns: ITableColumn[]): string;
  download(data: ITableData[], columns: ITableColumn[], filename: string): void;
}
