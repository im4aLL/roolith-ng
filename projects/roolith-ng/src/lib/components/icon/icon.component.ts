import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconNameType, IconSizeType } from './data-access/icon.interface';

@Component({
  selector: 'rng-icon',
  imports: [],
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  public name = input.required<IconNameType | (string & {})>();
  public size = input<IconSizeType>('default');
  public styleClass = input<string>();
  public width = input<number | null>(null);
  public custom = input<boolean>(false);

  public iconClassName = computed(() => this.custom() ? this.name() : `rng-icon--${this.name()}`);
  public iconSizeClassName = computed(() => {
    if (!this.size() || this.size() === 'default') {
      return '';
    }

    return `rng-icon--${this.size()}`;
  });

  public classNames = computed(() => {
    if (this.custom()) {
      return [this.iconClassName(), this.iconSizeClassName(), this.styleClass()].filter(Boolean).join(' ');
    }

    return ['rng-icon', this.iconClassName(), this.iconSizeClassName(), this.styleClass()].filter(Boolean).join(' ');
  });
}
