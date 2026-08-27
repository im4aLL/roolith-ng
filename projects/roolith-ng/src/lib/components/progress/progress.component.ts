import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { uniqueId } from '../../utils';

@Component({
  selector: 'rng-progress',
  imports: [],
  templateUrl: './progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {
  public value = input<number>(0);
  public max = input<number>(100);
  public label = input<string | null>(null);
  public showValue = input<boolean>(true);

  public id = signal<string>(uniqueId());

  public percentage = computed<number>(() => {
    const max = this.max();

    if (max === 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, Math.round((this.value() / max) * 100)));
  });
}
