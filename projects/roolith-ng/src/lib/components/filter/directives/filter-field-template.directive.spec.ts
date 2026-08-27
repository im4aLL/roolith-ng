import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { FilterFieldTemplateDirective } from './filter-field-template.directive';

@Component({
  template: `
    <ng-template [rngFilterFieldTemplate]="fieldKey">content</ng-template>
  `,
  imports: [FilterFieldTemplateDirective],
})
class TestHostComponent {
  public fieldKey: string | undefined = undefined;
  public filterField = viewChild(FilterFieldTemplateDirective);
}

describe('FilterFieldTemplateDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: FilterFieldTemplateDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    directive = fixture.componentInstance.filterField()!;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('rngFilterFieldTemplate', () => {
    it('should return undefined by default', () => {
      expect(directive.rngFilterFieldTemplate()).toBeUndefined();
    });

    it('should return the field key when provided', () => {
      vi.spyOn(directive, 'rngFilterFieldTemplate').mockReturnValue('status');

      expect(directive.rngFilterFieldTemplate()).toBe('status');
    });
  });

  describe('templateRef', () => {
    it('should inject a TemplateRef instance', () => {
      expect(directive.templateRef).toBeInstanceOf(TemplateRef);
    });
  });
});
