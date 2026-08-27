import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';
import { IDialogConfig, IDialogEvent } from './dialog.interface';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('open', () => {
    it('should open dialog with default config', () => {
      const dialogRef = service.open();

      expect(service.isOpen()).toBe(true);
      expect(service.config()).toMatchObject({
        header: 'Confirmation',
        content: 'Are you sure you want to proceed with this action?',
        width: 400,
        actionButtons: [
          { label: 'Yes', value: 'yes', variant: 'primary' },
          { label: 'Cancel', value: 'cancel' },
        ],
      });
      expect(dialogRef.id).toBe(service.config().id);
      expect(dialogRef.id.startsWith('dialog-')).toBe(true);
    });

    it('should open dialog with provided config', () => {
      const config = createMockDialogConfig();

      const dialogRef = service.open(config);

      expect(service.isOpen()).toBe(true);
      expect(service.config()).toEqual(config);
      expect(dialogRef.id).toBe('dialog-1');
    });

    it('should merge provided config with default config', () => {
      service.open({ header: 'Custom header' });

      expect(service.config().header).toBe('Custom header');
      expect(service.config().content).toBe('Are you sure you want to proceed with this action?');
      expect(service.config().width).toBe(400);
    });

    it('should create dialog event signal', () => {
      const dialogRef = service.open(createMockDialogConfig());

      expect(dialogRef.event()).toBeNull();
    });

    it('should return destroy function that closes dialog by id', () => {
      const dialogRef = service.open(createMockDialogConfig());

      dialogRef.destroy();

      expect(service.isOpen()).toBe(false);
      expect(service['_event'].has(dialogRef.id)).toBe(false);
    });
  });

  describe('close', () => {
    it('should emit close event and close current dialog', () => {
      const dialogRef = service.open(createMockDialogConfig());
      const emitEventSpy = vi.spyOn(service, 'emitEvent');

      service.close();

      expect(emitEventSpy).toHaveBeenCalledWith('close');
      expect(service.isOpen()).toBe(false);
      expect(service['_event'].has(dialogRef.id)).toBe(false);
    });
  });

  describe('_closeById', () => {
    it('should delete event by id and close dialog', () => {
      service.open(createMockDialogConfig());

      service['_closeById']('dialog-1');

      expect(service.isOpen()).toBe(false);
      expect(service['_event'].has('dialog-1')).toBe(false);
    });
  });

  describe('config', () => {
    it('should return readonly config signal', () => {
      service.open(createMockDialogConfig({ header: 'Readonly header' }));

      expect(service.config().header).toBe('Readonly header');
    });
  });

  describe('isOpen', () => {
    it('should return readonly open state signal', () => {
      expect(service.isOpen()).toBe(false);

      service.open(createMockDialogConfig());

      expect(service.isOpen()).toBe(true);
    });
  });

  describe('emitEvent', () => {
    it('should set event signal for current dialog', () => {
      const dialogRef = service.open(createMockDialogConfig());

      service.emitEvent('confirm');

      expect(dialogRef.event()).toEqual({ id: 'dialog-1', value: 'confirm' });
    });

    it('should return when event signal does not exist', () => {
      service.open(createMockDialogConfig());
      service['_event'].delete('dialog-1');

      expect(() => service.emitEvent('confirm')).not.toThrow();
    });
  });
});

/**
 * Creates a mock dialog config.
 *
 * @param overrides Partial<IDialogConfig>
 * @returns IDialogConfig
 */
function createMockDialogConfig(overrides: Partial<IDialogConfig> = {}): IDialogConfig {
  return {
    id: 'dialog-1',
    header: 'Confirm action',
    subheader: 'Review before continuing',
    content: 'Are you sure?',
    width: 640,
    actionButtons: [
      { label: 'Confirm', value: 'confirm', variant: 'primary' },
      { label: 'Cancel', value: 'cancel' },
    ],
    ...overrides,
  };
}
