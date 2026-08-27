import { Component, contentChildren, effect, input, OnInit, output, OutputRefSubscription } from '@angular/core';
import { AccordionItemComponent } from './item/accordion-item.component';
import { IAccordionEvent } from './data-access/accordion.interface';

@Component({
  selector: 'rng-accordion',
  imports: [],
  templateUrl: './accordion.component.html',
})
export class AccordionComponent implements OnInit {
  public allowMultiple = input<boolean>(false);
  public bordered = input<boolean>(false);
  public changeEvent = output<IAccordionEvent>();

  public items = contentChildren(AccordionItemComponent);

  private _watchExpandedItem = effect((onCleanup) => {
    const subs: OutputRefSubscription[] = [];
    this.items().forEach((item, index) => {
      const sub = item.changeEvent.subscribe((isExpanded) => {
        this.changeEvent.emit({
          expanded: isExpanded,
          itemIndex: index,
          itemHeader: item.header(),
        });

        if (this.allowMultiple()) {
          return;
        }

        if (!isExpanded) {
          return;
        }

        this._collapseAllItemsExcept(item);
      });

      subs.push(sub);
    });

    onCleanup(() => {
      subs.forEach((sub) => sub.unsubscribe());
    });
  });

  ngOnInit(): void {
    this._init();
  }

  /**
   * Initialize the accordion by expanding the first item if no item is expanded
   *
   * @returns void
   */
  private _init(): void {
    if (this.items().length === 0) {
      return;
    }

    if (this._hasExpandedItem()) {
      return;
    }

    this._expandItem(this.items()[0]);
    this._updateLastChild();
  }

  /**
   * Check if any accordion item is expanded
   *
   * @returns boolean
   */
  private _hasExpandedItem(): boolean {
    return this.items().some((item) => item.expanded());
  }

  /**
   * Expand the provided accordion item
   *
   * @param item AccordionItemComponent
   * @returns void
   */
  private _expandItem(item: AccordionItemComponent): void {
    item.expanded.set(true);
  }

  /**
   * Collapse all accordion items except the provided item
   *
   * @param item AccordionItemComponent
   * @returns void
   */
  private _collapseAllItemsExcept(item: AccordionItemComponent): void {
    this.items().forEach((i) => {
      if (i !== item) {
        i.expanded.set(false);
      }
    });
  }

  /**
   * Update the lastChild property of each accordion item to apply correct border styles
   *
   * @returns void
   */
  private _updateLastChild(): void {
    const items = this.items();
    const lastIndex = items.length - 1;

    items.forEach((item, index) => {
      if (index === lastIndex) {
        item.lastChild.set(true);
      }
    });
  }
}
