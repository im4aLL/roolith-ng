import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { IToggleGroupItem } from './data-access/toggle-group.interface';

@Component({
  selector: 'rng-toggle-group',
  imports: [],
  templateUrl: './toggle-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleGroupComponent {
  public items = input<IToggleGroupItem[]>([]);
  public value = input<string | number | null>(null);
  public vertical = input<boolean>(false);
  public block = input<boolean>(false);
  public valueChange = output<IToggleGroupItem>();

  public containerClasses = computed(() => ({
    'rng-toggle-group': true,
    'rng-toggle-group--vertical': this.vertical(),
    'rng-toggle-group--block': this.block(),
  }));

  /**
   * Method to handle item selection and emit the selected item
   *
   * @param item IToggleGroupItem
   * @returns void
   */
  public selectItem(item: IToggleGroupItem): void {
    this.valueChange.emit(item);
  }
}
