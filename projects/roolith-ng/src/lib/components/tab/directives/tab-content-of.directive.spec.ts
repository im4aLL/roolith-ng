import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { TabContentOfDirective } from './tab-content-of.directive';

@Component({
  template: `
    <ng-template [rngTabContentOf]="tabKey">content</ng-template>
  `,
  imports: [TabContentOfDirective],
})
class TestHostComponent {
  public tabKey: string | number | undefined = undefined;
  public tabContent = viewChild(TabContentOfDirective);
}

describe('TabContentOfDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: TabContentOfDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    directive = fixture.componentInstance.tabContent()!;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('rngTabContentOf', () => {
    it('should return undefined by default', () => {
      expect(directive.rngTabContentOf()).toBeUndefined();
    });

    it('should return the tab key when mocked as a string', () => {
      vi.spyOn(directive, 'rngTabContentOf').mockReturnValue('settings');

      expect(directive.rngTabContentOf()).toBe('settings');
    });

    it('should return the tab key when mocked as a number', () => {
      vi.spyOn(directive, 'rngTabContentOf').mockReturnValue(2);

      expect(directive.rngTabContentOf()).toBe(2);
    });
  });

  describe('templateRef', () => {
    it('should inject a TemplateRef instance', () => {
      expect(directive.templateRef).toBeInstanceOf(TemplateRef);
    });
  });
});
