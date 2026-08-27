import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { ITableSortChangeEvent, SortDirectionType } from '../data-access/table.interface';

@Component({
  selector: 'rng-table-sort',
  imports: [],
  templateUrl: './table-sort.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortComponent {
  public name = input.required<string>();
  public direction = input<SortDirectionType>('default');
  public sortChange = output<ITableSortChangeEvent>();

  public _sortDirection = signal<SortDirectionType>('default');
  private _sortDirectionIconMapping: Record<SortDirectionType, string> = {
    asc: 'rng-icon--sort-up',
    desc: 'rng-icon--sort-down',
    default: 'rng-icon--sort',
  };
  public sortDirectionIconClass = computed(() => this._sortDirectionIconMapping[this._sortDirection()]);
  public isSortApplied = computed(() => this._sortDirection() !== 'default');

  private _directionEffect = effect(() => {
    this._sortDirection.set(this.direction());
  });

  public onSort(): void {
    let newDirection: SortDirectionType = this._sortDirection();

    if (newDirection === 'default') {
      newDirection = 'asc';
    } else if (newDirection === 'asc') {
      newDirection = 'desc';
    } else {
      newDirection = 'default';
    }

    this._sortDirection.set(newDirection);
    this.sortChange.emit({ name: this.name(), direction: newDirection });
  }
}
