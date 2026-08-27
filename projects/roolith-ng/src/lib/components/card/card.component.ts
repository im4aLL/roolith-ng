import { ChangeDetectionStrategy, Component, computed, contentChild, input } from '@angular/core';
import { CardActionDirective } from './directives/card-action.directive';
import { CardFooterDirective } from './directives/card-footer.directive';

@Component({
  selector: 'rng-card',
  imports: [],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  public header = input<string | null>(null);
  public subheader = input<string | null>(null);

  protected footer = contentChild(CardFooterDirective);
  protected action = contentChild(CardActionDirective);

  protected hasFooter = computed(() => !!this.footer());
  protected hasAction = computed(() => !!this.action());
}
