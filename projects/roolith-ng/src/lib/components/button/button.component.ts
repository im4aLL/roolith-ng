import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonSizeType, ButtonVariantType, IconPositionType } from './data-access/button.interface';
import { NgTemplateOutlet } from '@angular/common';
import { IconNameType } from '../icon/data-access/icon.interface';

@Component({
  selector: 'rng-button',
  imports: [NgTemplateOutlet],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public variant = input<ButtonVariantType>('default');
  public size = input<ButtonSizeType>('default');
  public icon = input<IconNameType | null>(null);
  public iconPosition = input<IconPositionType>('left');
  public showLoading = input<boolean>(false);
  public block = input<boolean>(false);
  public clickEvent = output<void>();
  public disabled = input<boolean>(false);
  public key = input<string | null>(null);
  public styleClass = input<string | null>(null);

  public variantClassName = computed<string>(() => {
    if (this.variant() === 'default') {
      return '';
    }

    return `rng-button--${this.variant()}`;
  });

  public sizeClassName = computed<string>(() => {
    if (this.size() === 'default') {
      return '';
    }

    return `rng-button--${this.size()}`;
  });

  public classNames = computed<string>(() => {
    const classNames = [this.variantClassName(), this.sizeClassName()];

    if (this.showLoading()) {
      classNames.push('rng-button--loading');
    }

    if (this.block()) {
      classNames.push('rng-button--block');
    }

    if (this.disabled()) {
      classNames.push('rng-button--disabled');
    }

    if (this.styleClass()) {
      classNames.push(this.styleClass()!);
    }

    return classNames.filter(Boolean).join(' ');
  });

  public hasIcon = computed<boolean>(() => Boolean(this.icon()));

  /**
   * Handle click event of the button. If showLoading is true, prevent the default action and do not emit the click event.
   *
   * @param event Event
   * @returns void
   */
  public onClickHandler(event: Event): void {
    if (this.showLoading()) {
      event.preventDefault();
      return;
    }

    this.clickEvent.emit();
  }
}
