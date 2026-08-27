import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { IPaginationEvent } from './data-access/pagination.interface';
import { vi } from 'vitest';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('total', 100);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('totalPages computed', () => {
    it('should compute totalPages from total / rowsPerPage', async () => {
      fixture.componentRef.setInput('total', 50);
      fixture.componentRef.setInput('perPage', 10);
      await fixture.whenStable();

      expect(component.totalPages()).toBe(5);
    });

    it('should round up when total is not divisible by perPage', async () => {
      fixture.componentRef.setInput('total', 11);
      fixture.componentRef.setInput('perPage', 10);
      await fixture.whenStable();

      expect(component.totalPages()).toBe(2);
    });
  });

  describe('isShowPagination computed', () => {
    it('should be true when totalPages > 1', async () => {
      fixture.componentRef.setInput('total', 20);
      fixture.componentRef.setInput('perPage', 10);
      await fixture.whenStable();

      expect(component.isShowPagination()).toBe(true);
    });

    it('should be false when all rows fit on one page', async () => {
      fixture.componentRef.setInput('total', 5);
      fixture.componentRef.setInput('perPage', 10);
      await fixture.whenStable();

      expect(component.isShowPagination()).toBe(false);
    });
  });

  describe('infoText computed', () => {
    it('should include total, currentPage and totalPages', async () => {
      fixture.componentRef.setInput('total', 50);
      fixture.componentRef.setInput('perPage', 10);
      await fixture.whenStable();

      expect(component.infoText()).toContain('50');
      expect(component.infoText()).toContain('1');
      expect(component.infoText()).toContain('5');
    });

    it('should use singular "record" when total is 0', async () => {
      fixture.componentRef.setInput('total', 0);
      await fixture.whenStable();

      expect(component.infoText()).toContain('Total record ');
    });
  });

  describe('selectedPageSizeOption computed', () => {
    it('should return the matching pageSizeOption for current rowsPerPage', async () => {
      fixture.componentRef.setInput('perPage', 10);
      await fixture.whenStable();

      expect(component.selectedPageSizeOption()?.value).toBe(10);
    });
  });

  describe('_perPageEffect', () => {
    it('should sync rowsPerPage with perPage input', async () => {
      fixture.componentRef.setInput('perPage', 25);
      await fixture.whenStable();

      expect(component.rowsPerPage()).toBe(25);
    });
  });

  describe('_selectedPageEffect', () => {
    it('should sync currentPage with selectedPageNumber input', async () => {
      fixture.componentRef.setInput('selectedPageNumber', 3);
      await fixture.whenStable();

      expect(component.currentPage()).toBe(3);
    });
  });

  describe('_generatePageNumbers', () => {
    it('should show all pages when total pages <= maxPageItem', async () => {
      fixture.componentRef.setInput('total', 30);
      fixture.componentRef.setInput('perPage', 10);
      await fixture.whenStable();

      expect(component.pageNumbers()).toEqual([1, 2, 3]);
    });

    it('should return empty array when total is 0', async () => {
      fixture.componentRef.setInput('total', 0);
      await fixture.whenStable();

      expect(component.pageNumbers()).toEqual([]);
    });

    it('should include null (ellipsis) when pages exceed maxPageItem on page 1', async () => {
      fixture.componentRef.setInput('total', 100);
      fixture.componentRef.setInput('perPage', 10);
      fixture.componentRef.setInput('maxPageItem', 6);
      await fixture.whenStable();

      expect(component.pageNumbers()).toContain(null);
      expect(component.pageNumbers()[0]).toBe(1);
      expect(component.pageNumbers()[component.pageNumbers().length - 1]).toBe(10);
    });

    it('should include null on both sides when current page is in the middle', async () => {
      fixture.componentRef.setInput('total', 100);
      fixture.componentRef.setInput('perPage', 10);
      fixture.componentRef.setInput('maxPageItem', 6);
      fixture.componentRef.setInput('selectedPageNumber', 5);
      await fixture.whenStable();

      const pages = component.pageNumbers();
      const nullCount = pages.filter((page) => page === null).length;

      expect(nullCount).toBe(2);
    });
  });

  describe('onPageChange', () => {
    const mockEvent = (): Event => ({ preventDefault: vi.fn() }) as unknown as Event;

    it('should go to next page and emit nextPage event', () => {
      const emitted: IPaginationEvent[] = [];
      component.changeEvent.subscribe((event) => emitted.push(event));
      component.currentPage.set(2);

      component.onPageChange(mockEvent(), { type: 'nextPage' });

      expect(component.currentPage()).toBe(3);
      expect(emitted[0]).toEqual({ page: 3, type: 'nextPage' });
    });

    it('should go to previous page and emit previousPage event', () => {
      const emitted: IPaginationEvent[] = [];
      component.changeEvent.subscribe((event) => emitted.push(event));
      component.currentPage.set(3);

      component.onPageChange(mockEvent(), { type: 'previousPage' });

      expect(component.currentPage()).toBe(2);
      expect(emitted[0]).toEqual({ page: 2, type: 'previousPage' });
    });

    it('should not go below page 1 on previousPage', () => {
      component.currentPage.set(1);

      component.onPageChange(mockEvent(), { type: 'previousPage' });

      expect(component.currentPage()).toBe(1);
    });

    it('should not exceed totalPages on nextPage', async () => {
      fixture.componentRef.setInput('total', 30);
      fixture.componentRef.setInput('perPage', 10);
      await fixture.whenStable();
      component.currentPage.set(3);

      component.onPageChange(mockEvent(), { type: 'nextPage' });

      expect(component.currentPage()).toBe(3);
    });

    it('should go to specific page on pageChange', () => {
      const emitted: IPaginationEvent[] = [];
      component.changeEvent.subscribe((event) => emitted.push(event));

      component.onPageChange(mockEvent(), { type: 'pageChange', page: 5 });

      expect(component.currentPage()).toBe(5);
      expect(emitted[0].type).toBe('pageChange');
    });

    it('should not emit when the page does not change', () => {
      component.currentPage.set(1);
      const emitted: IPaginationEvent[] = [];
      component.changeEvent.subscribe((event) => emitted.push(event));

      component.onPageChange(mockEvent(), { type: 'pageChange', page: 1 });

      expect(emitted).toHaveLength(0);
    });

    it('should call event.preventDefault', () => {
      const event = mockEvent();
      component.onPageChange(event, { type: 'pageChange', page: 2 });

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('onRowPerPageChange', () => {
    it('should update rowsPerPage and reset to page 1', () => {
      component.currentPage.set(3);

      component.onRowPerPageChange({ value: 25, label: '25 rows' });

      expect(component.rowsPerPage()).toBe(25);
      expect(component.currentPage()).toBe(1);
    });

    it('should emit pageSizeChange event with new size', () => {
      const emitted: IPaginationEvent[] = [];
      component.changeEvent.subscribe((event) => emitted.push(event));

      component.onRowPerPageChange({ value: 25, label: '25 rows' });

      expect(emitted[0]).toEqual({ page: 1, type: 'pageSizeChange', rowsPerPage: 25 });
    });

    it('should do nothing when event is undefined', () => {
      const emitted: IPaginationEvent[] = [];
      component.changeEvent.subscribe((event) => emitted.push(event));

      component.onRowPerPageChange(undefined);

      expect(emitted).toHaveLength(0);
    });

    it('should do nothing when selected size equals current rowsPerPage', () => {
      component.rowsPerPage.set(10);
      const emitted: IPaginationEvent[] = [];
      component.changeEvent.subscribe((event) => emitted.push(event));

      component.onRowPerPageChange({ value: 10, label: '10 rows' });

      expect(emitted).toHaveLength(0);
    });
  });
});
