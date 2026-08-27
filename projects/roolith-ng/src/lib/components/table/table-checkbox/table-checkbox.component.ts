import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'rng-table-checkbox',
  imports: [],
  templateUrl: './table-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCheckboxComponent {
  public disabled = input<boolean>(false);
  public value = input<unknown>(null);

  public fieldValue = signal<boolean>(false);

  /**
   * Input change handler
   *
   * @param event Event
   * @returns void
   */
  public onChange(event: Event): void {
    const { checked: isChecked } = event.target as HTMLInputElement;

    this.fieldValue.set(isChecked);
  }
}
