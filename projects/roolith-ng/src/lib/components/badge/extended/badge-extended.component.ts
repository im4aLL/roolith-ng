import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'rng-badge-extended',
  imports: [NgTemplateOutlet],
  templateUrl: './badge-extended.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeExtendedComponent {
  public text = input<string>();
  public extendedContent = contentChild<TemplateRef<string>>('rngBadgeExtendedContent');

  public hasExtendedContent = computed(() => !!this.extendedContent());
}
