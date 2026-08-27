import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { IDialogFooterButton } from './data-access/dialog.interface';
import { vi } from 'vitest';

const mockButtons: IDialogFooterButton[] = [
  { label: 'Cancel', value: 'cancel' },
  { label: 'Confirm', value: 'confirm', variant: 'primary' },
];

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    fixture.componentRef.setInput('header', 'Test Dialog');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('buttons computed', () => {
    it('should return empty array when no footerButtons are provided', () => {
      expect(component.buttons()).toEqual([]);
    });

    it('should reverse the button order', async () => {
      fixture.componentRef.setInput('footerButtons', mockButtons);
      await fixture.whenStable();

      expect(component.buttons()[0].value).toBe('confirm');
      expect(component.buttons()[1].value).toBe('cancel');
    });

    it('should assign default variant when variant is not set', async () => {
      fixture.componentRef.setInput('footerButtons', [{ label: 'Cancel', value: 'cancel' }]);
      await fixture.whenStable();

      expect(component.buttons()[0].variant).toBe('default');
    });

    it('should preserve variant when it is already set', async () => {
      fixture.componentRef.setInput('footerButtons', mockButtons);
      await fixture.whenStable();

      const confirmBtn = component.buttons().find((btn) => btn.value === 'confirm');
      expect(confirmBtn?.variant).toBe('primary');
    });
  });

  describe('hasButtons computed', () => {
    it('should return false when footerButtons is empty', () => {
      expect(component.hasButtons()).toBe(false);
    });

    it('should return true when footerButtons has items', async () => {
      fixture.componentRef.setInput('footerButtons', mockButtons);
      await fixture.whenStable();

      expect(component.hasButtons()).toBe(true);
    });
  });

  describe('close', () => {
    it('should emit closeEvent', () => {
      let emitCount = 0;
      component.closeEvent.subscribe(() => emitCount++);

      component.close();

      expect(emitCount).toBe(1);
    });
  });

  describe('action', () => {
    it('should emit actionEvent with the provided value', () => {
      const emitted: string[] = [];
      component.actionEvent.subscribe((value) => emitted.push(value));

      component.action('confirm');

      expect(emitted).toEqual(['confirm']);
    });
  });

  describe('onKeydown', () => {
    it('should call close when Escape key is pressed', () => {
      const closeSpy = vi.spyOn(component, 'close');
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy).toHaveBeenCalled();
    });

    it('should not call close for other keys', () => {
      const closeSpy = vi.spyOn(component, 'close');
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(closeSpy).not.toHaveBeenCalled();
    });
  });
});
