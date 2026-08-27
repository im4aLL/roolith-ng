import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { TableHeaderCheckboxComponent } from './table-header-checkbox.component';

describe('TableHeaderCheckboxComponent', () => {
  let component: TableHeaderCheckboxComponent;
  let fixture: ComponentFixture<TableHeaderCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHeaderCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableHeaderCheckboxComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('disabled', () => {
    it('should be false by default', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should use disabled input value', async () => {
      fixture.componentRef.setInput('disabled', true);
      await fixture.whenStable();

      expect(component.disabled()).toBe(true);
    });
  });

  describe('indeterminate', () => {
    it('should be false by default', () => {
      expect(component.indeterminate()).toBe(false);
    });
  });

  describe('fieldValue', () => {
    it('should be false by default', () => {
      expect(component.fieldValue()).toBe(false);
    });
  });

  describe('onChange', () => {
    it('should update field value with checked state', () => {
      const event = createCheckboxChangeEvent(true);

      component.onChange(event);

      expect(component.fieldValue()).toBe(true);
    });

    it('should update field value with unchecked state', () => {
      component.fieldValue.set(true);
      const event = createCheckboxChangeEvent(false);

      component.onChange(event);

      expect(component.fieldValue()).toBe(false);
    });

    it('should emit checked state', () => {
      const emitSpy = vi.spyOn(component.changeEvent, 'emit');
      const event = createCheckboxChangeEvent(true);

      component.onChange(event);

      expect(emitSpy).toHaveBeenCalledWith(true);
    });

    it('should emit unchecked state', () => {
      const emitSpy = vi.spyOn(component.changeEvent, 'emit');
      const event = createCheckboxChangeEvent(false);

      component.onChange(event);

      expect(emitSpy).toHaveBeenCalledWith(false);
    });
  });
});

/**
 * Creates a checkbox change event.
 *
 * @param isChecked boolean
 * @returns Event
 */
function createCheckboxChangeEvent(isChecked: boolean): Event {
  return { target: { checked: isChecked } } as unknown as Event;
}
