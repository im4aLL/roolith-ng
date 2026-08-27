import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { INav, INavClickEvent, INavGroup } from '../data-access/nav.interface';
import { NavComponent } from '../nav.component';

@Component({
  selector: 'rng-nav-group',
  imports: [NavComponent],
  templateUrl: './nav-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavGroupComponent {
  public data = input.required<INavGroup[]>();
  public clickEvent = output<INavClickEvent>();

  /**
   * Handles click event from nav item and emits the event with item and groupId
   *
   * @param item INav
   * @param groupId string
   * @return void
   */
  public onNavClick(item: INav, groupId: string): void {
    this.clickEvent.emit({ item, groupId });
  }
}
