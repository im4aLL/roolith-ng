import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonSizeType } from '../button/data-access/button.interface';
import { IconComponent } from '../icon/icon.component';
import { IconNameType } from '../icon/data-access/icon.interface';

@Component({
  selector: 'rng-button-split',
  imports: [IconComponent],
  templateUrl: './button-split.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSplitComponent {
  public actionIcon = input<IconNameType>('chevron-down');
  public size = input<ButtonSizeType>('default');
  public clickEvent = output<void>();

  public classNames = computed<string>(() => {
    const classes = [];

    if (this.size() !== 'default') {
      classes.push(`rng-button-split--${this.size()}`);
    }

    return classes.join(' ');
  });

  /**
   * Handle click event of the action icon button.
   *
   * @returns void
   */
  public onClickHandler(): void {
    this.clickEvent.emit();
  }
}
