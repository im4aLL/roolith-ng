import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { TooltipPositionType } from './data-access/tooltip.interface';
import { TooltipComponent } from './tooltip.component';

@Component({
  selector: 'rng-test-host-tooltip',
  imports: [TooltipComponent],
  template: `
    <rng-tooltip text="Fallback tooltip">
      <button type="button">Hover me</button>
      <ng-template #rngTooltipContent>
        <span class="custom-tooltip-content">Template tooltip</span>
      </ng-template>
    </rng-tooltip>
  `,
})
class TestHostTooltipComponent {}

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent, TestHostTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('positionClassName', () => {
    it('should return an empty class when position is not provided', () => {
      expect(component.positionClassName()).toBe('');
    });

    it.each([
      ['top', 'rng-tooltip--top'],
      ['bottom', 'rng-tooltip--bottom'],
      ['left', 'rng-tooltip--left'],
      ['right', 'rng-tooltip--right'],
    ] as [TooltipPositionType, string][])('should return %s position class', async (position, expectedClass) => {
      fixture.componentRef.setInput('position', position);
      await fixture.whenStable();

      expect(component.positionClassName()).toBe(expectedClass);
    });
  });

  describe('hasContentTemplate', () => {
    it('should return false when content template is not projected', () => {
      expect(component.hasContentTemplate()).toBe(false);
    });

    it('should return true when content template is projected', async () => {
      const hostFixture = TestBed.createComponent(TestHostTooltipComponent);
      await hostFixture.whenStable();
      const tooltip = hostFixture.debugElement.children[0].componentInstance as TooltipComponent;

      expect(tooltip.hasContentTemplate()).toBe(true);
    });
  });
});
