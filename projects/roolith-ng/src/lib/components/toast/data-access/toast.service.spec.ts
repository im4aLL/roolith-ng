import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { IToast } from './toast.interface';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
    service.clear();
  });

  afterEach(() => {
    service.clear();
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('clear', () => {
    it('should remove all toast items', () => {
      service.items.set([createMockToast({ _id: 'toast-1' })]);

      service.clear();

      expect(service.items()).toEqual([]);
    });

    it('should clear pending timeout ids', () => {
      vi.useFakeTimers();
      const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
      service['_timeoutIds'] = [1, 2];

      service.clear();

      expect(clearTimeoutSpy).toHaveBeenCalledTimes(2);
      expect(service['_timeoutIds']).toEqual([]);
    });
  });

  describe('show', () => {
    it('should add a toast with a generated id', () => {
      const toast = createMockToast();

      service.show(toast);

      expect(service.items()).toHaveLength(1);
      expect(service.items()[0]._id).toBeTruthy();
      expect(service.items()[0]).toMatchObject({
        type: 'success',
        message: 'Saved successfully',
        title: 'Success',
      });
    });

    it('should add new toast items before existing items', () => {
      const firstToast = createMockToast({ message: 'First' });
      const secondToast = createMockToast({ message: 'Second' });

      service.show(firstToast);
      service.show(secondToast);

      expect(service.items().map((toast) => toast.message)).toEqual(['Second', 'First']);
    });

    it('should limit toast items to max items', () => {
      service.show(createMockToast({ message: 'First' }));
      service.show(createMockToast({ message: 'Second' }));
      service.show(createMockToast({ message: 'Third' }));
      service.show(createMockToast({ message: 'Fourth' }));

      expect(service.items().map((toast) => toast.message)).toEqual(['Fourth', 'Third', 'Second']);
    });

    it('should call auto remove with the provided toast', () => {
      const toast = createMockToast();
      const autoRemoveToastSpy = vi.spyOn(service as any, '_autoRemoveToast');

      service.show(toast);

      expect(autoRemoveToastSpy).toHaveBeenCalledWith(toast);
    });
  });

  describe('success', () => {
    it('should show a success toast with default title', () => {
      const showSpy = vi.spyOn(service, 'show').mockImplementation(() => undefined);

      service.success('Saved successfully');

      expect(showSpy).toHaveBeenCalledWith({
        type: 'success',
        message: 'Saved successfully',
        title: 'Success',
      });
    });

    it('should show a success toast with custom title', () => {
      const showSpy = vi.spyOn(service, 'show').mockImplementation(() => undefined);

      service.success('Saved successfully', 'Done');

      expect(showSpy).toHaveBeenCalledWith({
        type: 'success',
        message: 'Saved successfully',
        title: 'Done',
      });
    });
  });

  describe('error', () => {
    it('should show an error toast with default title', () => {
      const showSpy = vi.spyOn(service, 'show').mockImplementation(() => undefined);

      service.error('Save failed');

      expect(showSpy).toHaveBeenCalledWith({
        type: 'error',
        message: 'Save failed',
        title: 'Error',
      });
    });

    it('should show an error toast with custom title', () => {
      const showSpy = vi.spyOn(service, 'show').mockImplementation(() => undefined);

      service.error('Save failed', 'Failed');

      expect(showSpy).toHaveBeenCalledWith({
        type: 'error',
        message: 'Save failed',
        title: 'Failed',
      });
    });
  });

  describe('info', () => {
    it('should show an info toast with default title', () => {
      const showSpy = vi.spyOn(service, 'show').mockImplementation(() => undefined);

      service.info('Loading data');

      expect(showSpy).toHaveBeenCalledWith({
        type: 'info',
        message: 'Loading data',
        title: 'Info',
      });
    });

    it('should show an info toast with custom title', () => {
      const showSpy = vi.spyOn(service, 'show').mockImplementation(() => undefined);

      service.info('Loading data', 'Notice');

      expect(showSpy).toHaveBeenCalledWith({
        type: 'info',
        message: 'Loading data',
        title: 'Notice',
      });
    });
  });

  describe('_autoRemoveToast', () => {
    it('should not create a timeout when toast has no id', () => {
      vi.useFakeTimers();
      const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');

      service['_autoRemoveToast'](createMockToast());

      expect(setTimeoutSpy).not.toHaveBeenCalled();
    });

    it('should mark and remove toast after timeout durations', () => {
      vi.useFakeTimers();
      const toast = createMockToast({ _id: 'toast-1' });
      service.items.set([toast]);

      service['_autoRemoveToast'](toast);
      vi.advanceTimersByTime(5000);

      expect(service.items()[0]._isClosing).toBe(true);

      vi.advanceTimersByTime(300);

      expect(service.items()).toEqual([]);
    });
  });

  describe('_markItemAsClosing', () => {
    it('should set closing flag for the matching toast', () => {
      service.items.set([createMockToast({ _id: 'toast-1' }), createMockToast({ _id: 'toast-2' })]);

      service['_markItemAsClosing']('toast-1');

      expect(service.items()).toEqual([
        createMockToast({ _id: 'toast-1', _isClosing: true }),
        createMockToast({ _id: 'toast-2' }),
      ]);
    });
  });

  describe('_removeItemById', () => {
    it('should remove the matching toast', () => {
      service.items.set([createMockToast({ _id: 'toast-1' }), createMockToast({ _id: 'toast-2' })]);

      service['_removeItemById']('toast-1');

      expect(service.items()).toEqual([createMockToast({ _id: 'toast-2' })]);
    });
  });
});

/**
 * Creates a mock toast item.
 *
 * @param overrides Partial<IToast>
 * @returns IToast
 */
function createMockToast(overrides: Partial<IToast> = {}): IToast {
  return {
    type: 'success',
    message: 'Saved successfully',
    title: 'Success',
    ...overrides,
  };
}
