import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IDialogFooterButton } from '../data-access/dialog.interface';
import { DialogService } from '../data-access/dialog.service';
import { DialogComponent } from '../dialog.component';

@Component({
  selector: 'rng-dialog-host',
  imports: [DialogComponent],
  templateUrl: './dialog-host.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHostComponent {
  private _dialogService = inject(DialogService);

  public header = computed<string>(() => this._dialogService.config().header);
  public width = computed<number>(() => this._dialogService.config().width || 500);
  public subheader = computed<string | undefined>(() => this._dialogService.config().subheader || undefined);
  public content = computed<string>(() => this._dialogService.config().content);
  public footerButtons = computed<IDialogFooterButton[]>(() => this._dialogService.config().actionButtons || []);
  public isDialogOpen = computed<boolean>(() => this._dialogService.isOpen());

  /**
   * Handles the action event emitted by the dialog component and emits the value of the button clicked
   *
   * @param name string
   * @returns void
   */
  public onDialogActionEvent(name: string): void {
    this._dialogService.emitEvent(name);
  }

  /**
   * Handles the close event emitted by the dialog component and closes the dialog
   *
   * @returns void
   */
  public onDialogCloseEvent(): void {
    this._dialogService.close();
  }
}
