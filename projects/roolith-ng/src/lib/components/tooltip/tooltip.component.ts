import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, input, TemplateRef } from '@angular/core';
import { TooltipPositionType } from './data-access/tooltip.interface';

@Component({
  selector: 'rng-tooltip',
  imports: [NgTemplateOutlet],
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  public text = input<string>('');
  public position = input<TooltipPositionType>();
  public tooltipContent = contentChild<TemplateRef<string>>('rngTooltipContent');
  public width = input<string | null>(null);

  public positionClassName = computed<string>(() => {
    switch (this.position()) {
      case 'top':
        return 'rng-tooltip--top';
      case 'bottom':
        return 'rng-tooltip--bottom';
      case 'left':
        return 'rng-tooltip--left';
      case 'right':
        return 'rng-tooltip--right';
      default:
        return '';
    }
  });

  public hasContentTemplate = computed<boolean>(() => !!this.tooltipContent());
}
