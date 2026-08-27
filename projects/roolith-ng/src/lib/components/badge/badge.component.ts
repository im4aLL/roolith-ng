import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BadgeIconColor, BadgeSizeType, BadgeType, BadgeVariant } from './data-access/badge.interface';
import { IconComponent } from '../icon/icon.component';
import { IconNameType } from '../icon/data-access/icon.interface';

@Component({
  selector: 'rng-badge',
  imports: [IconComponent],
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  public type = input<BadgeType>('default');
  public size = input<BadgeSizeType>('default');
  public variant = input<BadgeVariant>('default');
  public icon = input<IconNameType | null>(null);
  public iconColor = input<BadgeIconColor>('default');

  public typeClassName = computed<string>(() => {
    if (!this.type() || this.type() === 'default') {
      return '';
    }

    return `rng-badge--${this.type()}`;
  });

  public sizeClassName = computed<string>(() => {
    if (!this.size() || this.size() === 'default') {
      return '';
    }

    return `rng-badge--${this.size()}`;
  });

  public variantClassName = computed<string>(() => {
    if (!this.variant() || this.variant() === 'default') {
      return '';
    }

    return `rng-badge--${this.variant()}`;
  });

  public iconColorClassName = computed<string>(() => {
    if (!this.iconColor() || this.iconColor() === 'default') {
      return '';
    }

    return `rng-color-${this.iconColor()}`;
  });

  public classNames = computed<string>(() => {
    return [this.typeClassName(), this.sizeClassName(), this.variantClassName()].filter(Boolean).join(' ');
  });
}
