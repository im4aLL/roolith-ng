import { Component } from '@angular/core';
import { ButtonComponent, IMPORT_CARD } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-card',
  imports: [CodeBlock, DocPager, ...IMPORT_CARD, ButtonComponent],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  /**
   * Snippet for importing `IMPORT_CARD`.
   */
  protected readonly importSnippet = `import { IMPORT_CARD } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_CARD]
})`;

  /**
   * Snippet for importing `CardComponent` individually.
   *
   * Use this when you only need the base card without action or footer.
   */
  protected readonly importIndividualSnippet = `import { CardComponent } from '@im4all/roolith-ng';

@Component({
  imports: [CardComponent]
})`;

  /**
   * Snippet for importing `IMPORT_CARD` with `ButtonComponent`.
   *
   * Use this when you project a header action or footer with a button.
   */
  protected readonly importWithButtonSnippet = `import { ButtonComponent, IMPORT_CARD } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_CARD, ButtonComponent]
})`;

  /**
   * Snippet for importing card directives individually with `ButtonComponent`.
   *
   * Use this when you prefer individual imports over `IMPORT_CARD`.
   */
  protected readonly importIndividualWithButtonSnippet = `import { ButtonComponent, CardActionDirective, CardComponent, CardFooterDirective } from '@im4all/roolith-ng';

@Component({
  imports: [CardComponent, CardActionDirective, CardFooterDirective, ButtonComponent]
})`;

  /**
   * Basic usage markup - body only.
   */
  protected readonly basicSnippet = `<rng-card>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</rng-card>`;

  /**
   * With `header` and `subheader` markup.
   */
  protected readonly withHeaderSnippet = `<rng-card
  header="Card title"
  subheader="Card subtitle">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</rng-card>`;

  /**
   * With header action markup - projects a button via `[rngCardAction]`.
   *
   * Requires `CardActionDirective`.
   */
  protected readonly withActionSnippet = `<rng-card
  header="Card title"
  subheader="Card subtitle">
  Lorem ipsum dolor sit amet.

  <rng-button
    rngCardAction
    size="xsmall"
    variant="link">
    Open Action
  </rng-button>
</rng-card>`;

  /**
   * With footer markup - projects content via `[rngCardFooter]`.
   *
   * Requires `CardFooterDirective`.
   */
  protected readonly withFooterSnippet = `<rng-card
  header="Card title"
  subheader="Card subtitle">
  Lorem ipsum dolor sit amet.

  <ng-container rngCardFooter>
    <rng-button
      variant="dark"
      [block]="true">
      Action 1
    </rng-button>
    <rng-button [block]="true">Action 2</rng-button>
  </ng-container>
</rng-card>`;

  /**
   * Full example combining header, subheader, action and footer.
   */
  protected readonly fullSnippet = `<rng-card
  header="Card title"
  subheader="Card subtitle">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.

  <rng-button
    rngCardAction
    size="xsmall"
    variant="link">
    Open Action
  </rng-button>

  <ng-container rngCardFooter>
    <rng-button
      variant="dark"
      [block]="true">
      Action 1
    </rng-button>
    <rng-button [block]="true">Action 2</rng-button>
  </ng-container>
</rng-card>`;

  /**
   * Full example component snippet with `ButtonComponent` and `IMPORT_CARD`.
   */
  protected readonly fullComponentSnippet = `import { ButtonComponent, IMPORT_CARD } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_CARD, ButtonComponent]
})
export class ExampleComponent {}`;

  /**
   * Full template snippet for the combined example.
   */
  protected readonly fullTemplateSnippet = `<rng-card
  header="Card title"
  subheader="Card subtitle">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.

  <rng-button
    rngCardAction
    size="xsmall"
    variant="link">
    Open Action
  </rng-button>

  <ng-container rngCardFooter>
    <rng-button
      variant="dark"
      [block]="true">
      Action 1
    </rng-button>
    <rng-button [block]="true">Action 2</rng-button>
  </ng-container>
</rng-card>`;
}
