import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { IBreadcrumbItem } from './data-access/breadcrumb.interface';
import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data', () => {
    it('should be empty by default', () => {
      expect(component.data()).toEqual([]);
    });

    it('should use data input value', async () => {
      const data = createMockBreadcrumbItems();

      fixture.componentRef.setInput('data', data);
      await fixture.whenStable();

      expect(component.data()).toEqual(data);
    });
  });

  describe('onClickHandler', () => {
    it('should prevent default event behavior', () => {
      const event = createMouseEvent();
      const item = createMockBreadcrumbItem();

      component.onClickHandler(event, item);

      expect(event.preventDefault).toHaveBeenCalledOnce();
    });

    it('should emit clicked breadcrumb item', () => {
      const emitSpy = vi.spyOn(component.clickEvent, 'emit');
      const item = createMockBreadcrumbItem();

      component.onClickHandler(createMouseEvent(), item);

      expect(emitSpy).toHaveBeenCalledWith(item);
    });
  });
});

/**
 * Creates mock breadcrumb items.
 *
 * @returns IBreadcrumbItem[]
 */
function createMockBreadcrumbItems(): IBreadcrumbItem[] {
  return [createMockBreadcrumbItem('Home', '/'), createMockBreadcrumbItem('Dashboard', '/dashboard')];
}

/**
 * Creates a mock breadcrumb item.
 *
 * @param label string
 * @param link string
 * @returns IBreadcrumbItem
 */
function createMockBreadcrumbItem(label = 'Home', link = '/'): IBreadcrumbItem {
  return { label, link };
}

/**
 * Creates a mock mouse event.
 *
 * @returns MouseEvent
 */
function createMouseEvent(): MouseEvent {
  return { preventDefault: vi.fn() } as unknown as MouseEvent;
}
