import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { INav, NavType, NavVariationType } from './data-access/nav.interface';

@Component({
  selector: 'rng-nav',
  imports: [],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  public data = input.required<INav[]>();
  public type = input<NavType>('default');
  public collapsed = input<boolean>(false);
  public variation = input<NavVariationType>('default');
  public clickEvent = output<INav>();

  public items = signal<INav[]>([]);

  public typeClassName = computed<string>(() => {
    switch (this.type()) {
      case 'warning':
        return 'rng-nav--warning';
      case 'info':
        return 'rng-nav--info';
      default:
        return '';
    }
  });

  private _dataEffect = effect(() => {
    this.items.set(this.data());
  });

  /**
   * Toggle submenu open state, if the clicked item has children. If the menu is in collapsed mode, close other open submenus.
   *
   * @param item INav
   * @returns void
   */
  public toggleSubmenu(item: INav): void {
    if (!item.children?.length) {
      return;
    }

    const isCollapsed = this.collapsed();

    this.items.update((items) =>
      items.map((menuItem) => {
        if (menuItem.name === item.name) {
          menuItem.isOpen = !item.isOpen;
          return menuItem;
        }

        if (!isCollapsed) {
          return menuItem;
        }

        // close other open submenus when menu is in collapsed mode
        menuItem.isOpen = false;
        return menuItem;
      }),
    );
  }

  /**
   * Handle click event on menu item, if the clicked item has children,
   * toggle its submenu open state. Otherwise, emit click event with the clicked item data.
   *
   * @param event Event
   * @param item INav
   * @returns void
   */
  public menuItemClickHandler(event: Event, item: INav): void {
    event.preventDefault();

    if (item.children) {
      return;
    }

    this.items.update((items) =>
      items.map((menuItem) => {
        menuItem.isActive = menuItem.name === item.name;

        return menuItem;
      }),
    );

    this.clickEvent.emit(item);
  }

  /**
   * Handle click event on child menu item, emit click event with the clicked child item data.
   *
   * @param event Event
   * @param item INav
   * @returns void
   */
  public childMenuItemClickHandler(event: Event, item: INav): void {
    event.preventDefault();

    this.clickEvent.emit(item);
  }

  /**
   * Handle click event on child menu item, set active state to the clicked child and its parent item
   *
   * @param event Event
   * @param item INav
   * @param child INav
   * @returns void
   */
  public childItemClickHandler(event: Event, item: INav, child: INav): void {
    event.stopPropagation();

    this._resetActiveState();
    item.isActive = true;

    this.items.update((items) =>
      items.map((menuItem) => {
        if (menuItem.name !== item.name) {
          return menuItem;
        }

        menuItem.isActive = true;

        if (!menuItem.children?.length) {
          return menuItem;
        }

        for (const childItem of menuItem.children) {
          childItem.isActive = childItem.name === child.name;
        }

        return menuItem;
      }),
    );
  }

  /**
   * Remove active state from all menu items and their children
   *
   * @returns void
   */
  private _resetActiveState(): void {
    this.items.update((items) =>
      items.map((item) => {
        item.isActive = false;

        if (!item.children?.length) {
          return item;
        }

        for (const child of item.children) {
          child.isActive = false;
        }

        return item;
      }),
    );
  }
}
