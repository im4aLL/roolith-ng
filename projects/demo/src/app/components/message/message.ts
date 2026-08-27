import { Component, signal } from '@angular/core';
import { ButtonComponent, MessageComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-message',
  imports: [CodeBlock, DocPager, MessageComponent, ButtonComponent],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class Message {
  protected readonly showDismissible = signal(true);
  protected readonly closeCount = signal(0);
  protected readonly showFullExample = signal(true);

  /**
   * Snippet for importing `MessageComponent`.
   */
  protected readonly importSnippet = `import { MessageComponent } from '@im4all/roolith-ng';

@Component({
  imports: [MessageComponent]
})`;

  /**
   * Default message markup.
   */
  protected readonly basicSnippet = `<rng-message>
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>`;

  /**
   * Message with close button.
   */
  protected readonly closeSnippet = `<rng-message
  [showClose]="true"
  type="info">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>`;

  /**
   * All type variants markup.
   */
  protected readonly variantsSnippet = `<rng-message type="success">
  Success - your changes were saved successfully.
</rng-message>

<rng-message type="danger">
  Danger - there was a problem processing your request.
</rng-message>

<rng-message type="warning">
  Warning - please review the information before continuing.
</rng-message>

<rng-message type="info">
  Info - a new update is available for your workspace.
</rng-message>

<rng-message type="primary">
  Primary - welcome to the new dashboard experience.
</rng-message>

<rng-message>
  Default - this is a neutral contextual message.
</rng-message>`;

  /**
   * Success variant markup.
   */
  protected readonly successSnippet = `<rng-message type="success">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>`;

  /**
   * Danger variant markup.
   */
  protected readonly dangerSnippet = `<rng-message type="danger">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>`;

  /**
   * Warning variant markup.
   */
  protected readonly warningSnippet = `<rng-message type="warning">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>`;

  /**
   * Info variant markup.
   */
  protected readonly infoSnippet = `<rng-message type="info">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>`;

  /**
   * Primary variant markup.
   */
  protected readonly primarySnippet = `<rng-message type="primary">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>`;

  /**
   * Custom icon markup.
   */
  protected readonly customIconSnippet = `<rng-message
  type="warning"
  icon="clipboard">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>`;

  /**
   * Close event markup.
   */
  protected readonly closeEventSnippet = `<rng-message
  [showClose]="true"
  type="info"
  (closeEvent)="onMessageClose()">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>`;

  /**
   * Handler for `closeEvent`.
   */
  protected readonly closeEventTsSnippet = `onMessageClose(): void {
  console.log('Message was dismissed');
}`;

  /**
   * Full example combining type, icon, close button and event.
   */
  protected readonly fullSnippet = `<rng-message
  type="success"
  icon="check"
  [showClose]="true"
  (closeEvent)="onMessageClose()">
  Your profile has been updated successfully.
</rng-message>`;

  /**
   * Handles the `closeEvent` from the dismissible demo.
   *
   * Increments the close counter and hides the demo message via `showDismissible`.
   * The `rng-message` also hides itself with `is--hidden` but stays in the DOM - wrapping it with
   * `&#64;if` fully removes it so a fresh instance can be re-created on reset.
   *
   * @returns void
   */
  protected onDismissibleClose(): void {
    this.closeCount.update((count) => count + 1);
    this.showDismissible.set(false);
  }

  /**
   * Resets the dismissible demo by re-creating the `rng-message` instance.
   *
   * Toggling `showDismissible` destroys and re-creates the component, which resets its internal `isShow` signal.
   *
   * @returns void
   */
  protected resetDismissible(): void {
    this.showDismissible.set(false);

    setTimeout(() => this.showDismissible.set(true), 0);
  }

  /**
   * Handles the `closeEvent` from the full-example demo.
   *
   * Marks the full example as dismissed so the reset button can be shown.
   *
   * @returns void
   */
  protected onFullClose(): void {
    this.showFullExample.set(false);
  }

  /**
   * Resets the full-example demo.
   *
   * @returns void
   */
  protected resetFullExample(): void {
    this.showFullExample.set(false);

    setTimeout(() => this.showFullExample.set(true), 0);
  }
}
