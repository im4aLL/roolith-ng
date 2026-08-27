import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { ITabContent, ITabCustomTemplateData, ITabItem } from './data-access/tab.interface';
import { ToggleGroupComponent } from '../toggle-group/toggle-group.component';
import { NgTemplateOutlet } from '@angular/common';
import { TabContentOfDirective } from './directives/tab-content-of.directive';

@Component({
  selector: 'rng-tab',
  imports: [ToggleGroupComponent, NgTemplateOutlet],
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit {
  public items = input<ITabItem[]>([]);
  public contents = input<ITabContent[]>([]);
  public value = input<string | number | null>(null);
  public vertical = input<boolean>(false);
  public block = input<boolean>(false);
  public flip = input<boolean>(false);
  public changeEvent = output<ITabItem>();

  public selectedItem = signal<ITabItem | null>(null);
  private _customTemplates = contentChildren(TabContentOfDirective);

  public customTemplateData = computed<ITabCustomTemplateData>(() => {
    return this._customTemplates().reduce<ITabCustomTemplateData>((acc, directive) => {
      const fieldName = directive.rngTabContentOf();
      if (fieldName) {
        acc[fieldName] = directive.templateRef;
      }
      return acc;
    }, {});
  });

  ngOnInit(): void {
    this._setInitialSelectedItem();
  }

  /**
   * Set the initial selected item based on the provided value or default to the first item
   *
   * @returns void
   */
  private _setInitialSelectedItem(): void {
    if (this.items().length === 0) {
      this.selectedItem.set(null);
      return;
    }

    const value = this.value();

    if (value) {
      const initialItem = this.items().find((item) => item.value === value);

      if (initialItem) {
        this.selectedItem.set(initialItem);
        return;
      }
    }

    this.selectedItem.set(this.items()[0]);
  }

  /**
   * Handle tab change when a new tab is selected, update the selected item and emit the change event
   *
   * @param item ITabItem
   * @return void
   */
  public onTabChange(item: ITabItem): void {
    this.selectedItem.set(item);
    this.changeEvent.emit(item);
  }
}
