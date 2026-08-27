import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MessageType } from './data-access/message.interface';
import { IconNameType } from '../icon/data-access/icon.interface';

@Component({
  selector: 'rng-message',
  imports: [ButtonComponent],
  templateUrl: './message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  /**
   * Input properties
   */
  public showClose = input<boolean>(false);
  public icon = input<IconNameType | null>(null);
  public type = input<MessageType>('default');

  /**
   * Output events
   */
  public closeEvent = output<void>();

  /**
   * Local states
   */
  public isShow = signal(true);

  /**
   * A mapping of message types to their corresponding default icon names.
   * This mapping is used to determine which icon to display based on the type of the message when no custom icon is provided.
   */
  private readonly _iconClassMapping: Record<MessageType, IconNameType> = {
    success: 'check',
    danger: 'alert',
    warning: 'info',
    info: 'info',
    primary: 'info',
    default: 'info',
  };

  /**
   * Computes the class name for the icon based on the provided icon input or the type of the message.
   * If the icon input is provided, it returns a class name in the format 'rng-icon--{icon}';
   * otherwise, it returns a class name based on the message type using the _iconClassMapping.
   *
   * @returns string - The computed class name for the icon.
   */
  public iconClassName = computed<string>(() => {
    if (this.icon()) {
      return `rng-icon--${this.icon()}`;
    }

    return `rng-icon--${this._iconClassMapping[this.type()]}`;
  });

  /**
   * Computes the class name for the message based on its type.
   * If the type is 'default', it returns an empty string; otherwise, it returns a class name in the format 'rng-message--{type}'.
   *
   * @returns string - The computed class name for the message.
   */
  public messageClassName = computed<string>(() => {
    if (this.type() === 'default') {
      return '';
    }

    return `rng-message--${this.type()}`;
  });

  /**
   * Closes the message and emits the close event.
   *
   * @returns void
   */
  public close(): void {
    this.isShow.set(false);

    this.closeEvent.emit();
  }
}
