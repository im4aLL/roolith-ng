import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LoaderService } from './data-access/loader.service';

@Component({
  selector: 'rng-loader',
  imports: [],
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  private _loaderService = inject(LoaderService);

  public isNonBlocking = computed<boolean>(() => this._loaderService.isNonBlocking());
  public isShowLoader = computed<boolean>(() => this._loaderService.isLoading());
  public message = computed<string>(() => this._loaderService.message() || 'Processing...');
}
