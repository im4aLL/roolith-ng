import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  DropdownAlignment,
  DropdownPositionClass,
  IDropdownGroup,
  IDropdownItem,
} from './data-access/dropdown.interface';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'rng-dropdown',
  imports: [IconComponent],
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  public name = input<string>('');
  public groups = input<IDropdownGroup[]>([]);
  public alignment = input<DropdownAlignment | null>(null);

  public itemClick = output<IDropdownItem>();

  private _alignmentClassMap: Record<DropdownAlignment, DropdownPositionClass> = {
    right: 'rng-dropdown--right',
    top: 'rng-dropdown--top',
    'top-right': 'rng-dropdown--top-right',
  };

  private _dropdownEl = viewChild<ElementRef<HTMLElement>>('dropdownEl');
  private _positionClass = signal<DropdownPositionClass>(null);

  private _resolvedClass = computed<DropdownPositionClass>(() => {
    const alignment = this.alignment();

    return alignment ? this._alignmentClassMap[alignment] : this._positionClass();
  });

  public isAlignedRight = computed<boolean>(() => this._resolvedClass() === 'rng-dropdown--right');
  public isAlignedTop = computed<boolean>(() => this._resolvedClass() === 'rng-dropdown--top');
  public isAlignedTopRight = computed<boolean>(() => this._resolvedClass() === 'rng-dropdown--top-right');

  /**
   * Handle dropdown item click event, emit the clicked item and hide the popover.
   *
   * @param item IDropdownItem
   * @returns void
   */
  public onItemClick(item: IDropdownItem): void {
    if (item.isDisabled) {
      return;
    }

    this.itemClick.emit(item);
    this._dropdownEl()?.nativeElement.hidePopover();
  }

  /**
   * Handle the native popover toggle event to recalculate position on open.
   *
   * @param event ToggleEvent
   * @returns void
   */
  public onToggle(event: ToggleEvent): void {
    if (event.newState !== 'open') {
      this._positionClass.set(null);
      return;
    }

    if (this.alignment()) {
      return;
    }

    setTimeout(() => this._calculatePosition());
  }

  /**
   * Calculate the position of the dropdown to prevent overflow and set appropriate CSS class.
   * It checks if the dropdown overflows the right or bottom edge of the viewport and sets the position class accordingly.
   *
   * @returns void
   */
  private _calculatePosition(): void {
    const el = this._dropdownEl()?.nativeElement;

    if (!el) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const isOverflowRight = rect.right > window.innerWidth;
    const isOverflowBottom = rect.bottom > window.innerHeight;

    if (isOverflowBottom && isOverflowRight) {
      this._positionClass.set('rng-dropdown--top-right');
    } else if (isOverflowBottom) {
      this._positionClass.set('rng-dropdown--top');
    } else if (isOverflowRight) {
      this._positionClass.set('rng-dropdown--right');
    } else {
      this._positionClass.set(null);
    }
  }
}
