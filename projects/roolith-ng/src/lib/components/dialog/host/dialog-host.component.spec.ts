import { signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { IDialogConfig } from '../data-access/dialog.interface';
import { DialogService } from '../data-access/dialog.service';
import { DialogHostComponent } from './dialog-host.component';

describe('DialogHostComponent', () => {
  let component: DialogHostComponent;
  let fixture: ComponentFixture<DialogHostComponent>;
  let configSignal: WritableSignal<IDialogConfig>;
  let isOpenSignal: WritableSignal<boolean>;
  let mockDialogService: Pick<DialogService, 'config' | 'isOpen' | 'emitEvent' | 'close'>;

  beforeEach(async () => {
    configSignal = signal(createMockDialogConfig());
    isOpenSignal = signal(false);
    mockDialogService = {
      config: configSignal.asReadonly(),
      isOpen: isOpenSignal.asReadonly(),
      emitEvent: vi.fn(),
      close: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DialogHostComponent],
      providers: [{ provide: DialogService, useValue: mockDialogService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogHostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('header', () => {
    it('should return dialog config header', () => {
      expect(component.header()).toBe('Confirm action');
    });
  });

  describe('width', () => {
    it('should return dialog config width when provided', () => {
      expect(component.width()).toBe(640);
    });

    it('should return default width when config width is missing', () => {
      configSignal.set(createMockDialogConfig({ width: undefined }));

      expect(component.width()).toBe(500);
    });
  });

  describe('subheader', () => {
    it('should return dialog config subheader when provided', () => {
      expect(component.subheader()).toBe('Review before continuing');
    });

    it('should return undefined when subheader is missing', () => {
      configSignal.set(createMockDialogConfig({ subheader: undefined }));

      expect(component.subheader()).toBeUndefined();
    });
  });

  describe('content', () => {
    it('should return dialog config content', () => {
      expect(component.content()).toBe('Are you sure?');
    });
  });

  describe('footerButtons', () => {
    it('should return dialog config action buttons', () => {
      expect(component.footerButtons()).toEqual([
        { label: 'Confirm', value: 'confirm', variant: 'primary' },
        { label: 'Cancel', value: 'cancel' },
      ]);
    });

    it('should return empty array when action buttons are missing', () => {
      configSignal.set(createMockDialogConfig({ actionButtons: undefined }));

      expect(component.footerButtons()).toEqual([]);
    });
  });

  describe('isDialogOpen', () => {
    it('should return false when dialog service is closed', () => {
      expect(component.isDialogOpen()).toBe(false);
    });

    it('should return true when dialog service is open', () => {
      isOpenSignal.set(true);

      expect(component.isDialogOpen()).toBe(true);
    });
  });

  describe('onDialogActionEvent', () => {
    it('should emit dialog service event with action name', () => {
      component.onDialogActionEvent('confirm');

      expect(mockDialogService.emitEvent).toHaveBeenCalledWith('confirm');
    });
  });

  describe('onDialogCloseEvent', () => {
    it('should close dialog service', () => {
      component.onDialogCloseEvent();

      expect(mockDialogService.close).toHaveBeenCalledOnce();
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
