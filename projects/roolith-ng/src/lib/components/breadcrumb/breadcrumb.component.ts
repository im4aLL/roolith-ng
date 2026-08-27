import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IBreadcrumbItem } from './data-access/breadcrumb.interface';

@Component({
  selector: 'rng-breadcrumb',
  imports: [],
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  public data = input<IBreadcrumbItem[]>([]);
  public clickEvent = output<IBreadcrumbItem>();

  /**
   * Handle click event on breadcrumb item
   *
   * @param event
   * @param item
   */
  public onClickHandler(event: MouseEvent, item: IBreadcrumbItem): void {
    event.preventDefault();

    this.clickEvent.emit(item);
  }
}
