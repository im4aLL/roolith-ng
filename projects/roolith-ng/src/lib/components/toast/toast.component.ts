import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IToast } from './data-access/toast.interface';
import { ToastService } from './data-access/toast.service';

@Component({
  selector: 'rng-toast',
  imports: [ButtonComponent],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  private _toastService = inject(ToastService);

  public items = computed<IToast[]>(() => this._toastService.items());
  public hasItem = computed<boolean>(() => this.items().length > 0);

  public onClear(): void {
    this._toastService.clear();
  }
}
