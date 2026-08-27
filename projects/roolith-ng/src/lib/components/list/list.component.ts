import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IListItem } from './data-access/list.interface';

@Component({
  selector: 'rng-list',
  imports: [],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  public items = input<IListItem[], IListItem[]>([], {
    transform: (items) =>
      items.map((item, index) => {
        return {
          ...item,
          _trackBy: item.title ?? index,
        };
      }),
  });
}
