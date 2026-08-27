import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonSizeType } from '../data-access/button.interface';

@Component({
  selector: 'rng-button-group',
  imports: [],
  templateUrl: './button-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupComponent {
  public labels = input<string[]>([]);
  public activeLabel = input<string | null>(null);
  public labelSelected = output<string>();
  public size = input<ButtonSizeType>('default');

  private _buttonSizeClassMap: Record<ButtonSizeType, string> = {
    default: '',
    small: 'rng-button--small',
    xsmall: 'rng-button--xsmall',
    large: 'rng-button--large',
  };

  private _buttonGroupSizeClassMap: Record<ButtonSizeType, string> = {
    default: '',
    small: 'rng-button-group--small',
    xsmall: 'rng-button-group--xsmall',
    large: 'rng-button-group--large',
  };

  public buttonSizeClass = computed(() => this._buttonSizeClassMap[this.size()]);
  public buttonGroupSizeClass = computed(() => this._buttonGroupSizeClassMap[this.size()]);

  /**
   * Handle label click event
   *
   * @param event MouseEvent
   * @param label string
   * @returns void
   */
  public labelClickHandler(event: MouseEvent, label: string): void {
    event.preventDefault();

    this.labelSelected.emit(label);
  }
}
