import { ChangeDetectionStrategy, Component, computed, HostListener, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IDialogFooterButton } from './data-access/dialog.interface';
import { reverse } from 'lodash-es';

@Component({
  selector: 'rng-dialog',
  imports: [ButtonComponent],
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  public header = input.required<string>();
  public width = input<number>();
  public subheader = input<string | undefined>();
  public footerButtons = input<IDialogFooterButton[]>([]);

  public closeEvent = output<void>();
  public actionEvent = output<string>();

  public buttons = computed<IDialogFooterButton[]>(() => {
    const buttons = this.footerButtons();

    if (buttons.length === 0) {
      return [];
    }

    const result = buttons.map((button) => ({
      ...button,
      variant: button.variant || 'default',
    }));

    return reverse(result);
  });

  public hasButtons = computed(() => this.footerButtons().length > 0);

  /**
   * Emits the close event when the close icon is clicked
   *
   * @returns void
   */
  public close(): void {
    this.closeEvent.emit();
  }

  /**
   * Emits the value of the button clicked in the footer
   *
   * @param value string
   * @returns void
   */
  public action(value: string): void {
    this.actionEvent.emit(value);
  }

  /**
   * Listen for keydown events to handle keyboard navigation
   *
   * @param event KeyboardEvent
   * @return void
   */
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      default:
        break;
    }
  }
}
