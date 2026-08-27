import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { TableCellDirective } from './table-cell.directive';

@Component({
  template: `
    <ng-template [rngTableCell]="columnKey">content</ng-template>
  `,
  imports: [TableCellDirective],
})
class TestHostComponent {
  public columnKey: string | undefined = undefined;
  public cell = viewChild(TableCellDirective);
}

describe('TableCellDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: TableCellDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    directive = fixture.componentInstance.cell()!;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('rngTableCell', () => {
    it('should return undefined by default', () => {
      expect(directive.rngTableCell()).toBeUndefined();
    });

    it('should return the column key when provided', () => {
      vi.spyOn(directive, 'rngTableCell').mockReturnValue('name');

      expect(directive.rngTableCell()).toBe('name');
    });
  });

  describe('templateRef', () => {
    it('should inject a TemplateRef instance', () => {
      expect(directive.templateRef).toBeInstanceOf(TemplateRef);
    });
  });
});
