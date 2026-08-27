import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('inputs', () => {
    it('should initialize default input values', () => {
      expect(component.name()).toBe('drawer');
      expect(component.header()).toBeNull();
      expect(component.subheader()).toBeNull();
    });

    it('should use provided input values', async () => {
      fixture.componentRef.setInput('name', 'details-drawer');
      fixture.componentRef.setInput('header', 'Details');
      fixture.componentRef.setInput('subheader', 'More information');
      await fixture.whenStable();

      expect(component.name()).toBe('details-drawer');
      expect(component.header()).toBe('Details');
      expect(component.subheader()).toBe('More information');
    });
  });

  describe('_onToggle', () => {
    it('should emit close event when drawer is closed', () => {
      const emitSpy = vi.spyOn(component.closeEvent, 'emit');

      component['_onToggle']({ newState: 'closed' } as ToggleEvent);

      expect(emitSpy).toHaveBeenCalledOnce();
    });

    it('should emit open event when drawer is opened', () => {
      const emitSpy = vi.spyOn(component.openEvent, 'emit');

      component['_onToggle']({ newState: 'open' } as ToggleEvent);

      expect(emitSpy).toHaveBeenCalledOnce();
    });
  });

  describe('ngOnDestroy', () => {
    it('should remove toggle event listener when drawer element exists', () => {
      const removeEventListener = vi.fn();
      vi.spyOn(component as any, '_drawerEl').mockReturnValue({ nativeElement: { removeEventListener } });

      component.ngOnDestroy();

      expect(removeEventListener).toHaveBeenCalledWith('toggle', component['_onToggle']);
    });

    it('should not throw when drawer element is missing', () => {
      vi.spyOn(component as any, '_drawerEl').mockReturnValue(undefined);

      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('close', () => {
    it('should call native hidePopover when drawer element exists', () => {
      const hidePopover = vi.fn();
      vi.spyOn(component as any, '_drawerEl').mockReturnValue({
        nativeElement: { hidePopover, removeEventListener: vi.fn() },
      });

      component.close();

      expect(hidePopover).toHaveBeenCalledOnce();
    });

    it('should not throw when drawer element is missing', () => {
      vi.spyOn(component as any, '_drawerEl').mockReturnValue(undefined);

      expect(() => component.close()).not.toThrow();
    });
  });

  describe('open', () => {
    it('should call native showPopover when drawer element exists', () => {
      const showPopover = vi.fn();
      vi.spyOn(component as any, '_drawerEl').mockReturnValue({
        nativeElement: { showPopover, removeEventListener: vi.fn() },
      });

      component.open();

      expect(showPopover).toHaveBeenCalledOnce();
    });

    it('should not throw when drawer element is missing', () => {
      vi.spyOn(component as any, '_drawerEl').mockReturnValue(undefined);

      expect(() => component.open()).not.toThrow();
    });
  });
});
