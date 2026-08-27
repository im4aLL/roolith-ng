import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'rng-block-message',
  imports: [],
  templateUrl: './block-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockMessageComponent {
  public header = input<string | null>(null);
  public height = input<string | null>(null);
}
