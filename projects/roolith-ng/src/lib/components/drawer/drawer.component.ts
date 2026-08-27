import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  OnDestroy,
  output,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'rng-drawer',
  imports: [ButtonComponent],
  templateUrl: './drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent implements OnDestroy {
  public name = input<string>('drawer');
  public header = input<string | null>(null);
  public subheader = input<string | null>(null);
  public closeEvent = output<void>();
  public openEvent = output<void>();

  private _drawerEl = viewChild<ElementRef<HTMLElement>>('drawerEl');

  private _afterNextRenderHandler = afterNextRender(() => {
    this._drawerEl()?.nativeElement?.addEventListener('toggle', this._onToggle);
  });

  private _onToggle = (event: Event): void => {
    const toggleEvent = event as ToggleEvent;

    if (toggleEvent.newState === 'closed') {
      this.closeEvent.emit();
    } else {
      this.openEvent.emit();
    }
  };

  public ngOnDestroy(): void {
    this._drawerEl()?.nativeElement?.removeEventListener('toggle', this._onToggle);
  }

  /**
   * Closes the drawer by hiding the popover element.
   *
   * @return void
   */
  public close(): void {
    this._drawerEl()?.nativeElement?.hidePopover();
  }

  /**
   * Opens the drawer by showing the popover element.
   *
   * @return void
   */
  public open(): void {
    this._drawerEl()?.nativeElement?.showPopover();
  }
}
