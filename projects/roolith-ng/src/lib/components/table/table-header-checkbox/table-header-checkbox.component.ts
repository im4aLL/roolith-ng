import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'rng-table-header-checkbox',
  imports: [],
  templateUrl: './table-header-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderCheckboxComponent {
  public disabled = input<boolean>(false);

  public indeterminate = signal<boolean>(false);
  public fieldValue = signal<boolean>(false);

  public changeEvent = output<boolean>();

  /**
   * Input change handler
   *
   * @param event Event
   * @returns void
   */
  public onChange(event: Event): void {
    const { checked: isChecked } = event.target as HTMLInputElement;

    this.fieldValue.set(isChecked);
    this.changeEvent.emit(isChecked);
  }
}
