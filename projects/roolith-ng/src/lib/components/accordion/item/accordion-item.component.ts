import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

@Component({
  selector: 'rng-accordion-item',
  imports: [],
  templateUrl: './accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent {
  public expanded = model<boolean>(false);
  public disabled = input<boolean>(false);
  public header = input<string>('');
  public changeEvent = output<boolean>();
  public lastChild = model<boolean>(false);

  /**
   * Handle click event on accordion item header
   *
   * @param $event MouseEvent
   * @returns void
   */
  public onClickHandler($event: MouseEvent): void {
    $event.preventDefault();

    if (this.disabled()) {
      return;
    }

    const isExpanded = this.expanded();
    this.expanded.set(!isExpanded);
    this.changeEvent.emit(!isExpanded);
  }
}
