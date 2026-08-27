// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi, beforeAll, afterAll } from 'vitest';
import { ITableColumn, ITableData } from '../table.interface';
import { ITableExportStrategy } from './table-exporter.interface';
import { TableExporter } from './table-exporter';

const MOCK_COLUMNS: ITableColumn[] = [{ field: 'name', label: 'Name' }];
const MOCK_DATA: ITableData[] = [{ name: 'Alice' }];

const createMockStrategy = (overrides: Partial<ITableExportStrategy> = {}): ITableExportStrategy => ({
  extension: 'csv',
  mimeType: 'text/csv;charset=utf-8;',
  export: vi.fn().mockReturnValue('Name\r\nAlice'),
  ...overrides,
});

describe('TableExporter', () => {
  let exporter: TableExporter;

  beforeEach(() => {
    exporter = new TableExporter();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(exporter).toBeTruthy();
  });

  describe('setStrategy()', () => {
    it('should set the strategy', () => {
      const strategy = createMockStrategy();
      exporter.setStrategy(strategy);

      expect(() => exporter.export(MOCK_DATA, MOCK_COLUMNS)).not.toThrow();
    });
  });

  describe('export()', () => {
    it('should throw when no strategy is set', () => {
      expect(() => exporter.export(MOCK_DATA, MOCK_COLUMNS)).toThrow('No export strategy set.');
    });

    it('should delegate to the strategy and return its result', () => {
      const strategy = createMockStrategy();
      exporter.setStrategy(strategy);

      const result = exporter.export(MOCK_DATA, MOCK_COLUMNS);

      expect(strategy.export).toHaveBeenCalledWith(MOCK_DATA, MOCK_COLUMNS);
      expect(result).toBe('Name\r\nAlice');
    });
  });

  describe('download()', () => {
    beforeAll(() => {
      vi.useFakeTimers();
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('should throw when no strategy is set', () => {
      expect(() => exporter.download(MOCK_DATA, MOCK_COLUMNS, 'file')).toThrow('No export strategy set.');
    });

    it('should create a blob with correct mimeType and trigger a download', () => {
      const strategy = createMockStrategy();
      exporter.setStrategy(strategy);

      const mockAnchor = { href: '', download: '', click: vi.fn() } as unknown as HTMLAnchorElement;
      const mockUrl = 'blob:mock-url';

      vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor);
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockAnchor);
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockAnchor);
      vi.spyOn(URL, 'createObjectURL').mockReturnValue(mockUrl);
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);

      exporter.download(MOCK_DATA, MOCK_COLUMNS, 'my-export');

      expect(strategy.export).toHaveBeenCalledWith(MOCK_DATA, MOCK_COLUMNS);
      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(mockAnchor.href).toBe(mockUrl);
      expect(mockAnchor.download).toBe('my-export.csv');
      expect(mockAnchor.click).toHaveBeenCalledOnce();
    });

    it('should append the anchor immediately and remove it after setTimeout', () => {
      const strategy = createMockStrategy();
      exporter.setStrategy(strategy);

      const mockAnchor = { href: '', download: '', click: vi.fn() } as unknown as HTMLAnchorElement;
      const appendSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockAnchor);
      const removeSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockAnchor);

      vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor);
      vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);

      exporter.download(MOCK_DATA, MOCK_COLUMNS, 'file');

      expect(appendSpy).toHaveBeenCalledWith(mockAnchor);
      expect(removeSpy).not.toHaveBeenCalled();

      vi.runAllTimers();

      expect(removeSpy).toHaveBeenCalledWith(mockAnchor);
    });

    it('should revoke the object URL inside setTimeout', () => {
      const strategy = createMockStrategy();
      exporter.setStrategy(strategy);

      const mockAnchor = { href: '', download: '', click: vi.fn() } as unknown as HTMLAnchorElement;
      const mockUrl = 'blob:mock-url';

      vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor);
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockAnchor);
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockAnchor);
      vi.spyOn(URL, 'createObjectURL').mockReturnValue(mockUrl);
      const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);

      exporter.download(MOCK_DATA, MOCK_COLUMNS, 'file');

      expect(revokeSpy).not.toHaveBeenCalled();

      vi.runAllTimers();

      expect(revokeSpy).toHaveBeenCalledWith(mockUrl);
    });
  });
});
