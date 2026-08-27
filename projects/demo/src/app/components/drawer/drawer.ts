import { Component } from '@angular/core';
import { ButtonComponent, DrawerComponent, DrawerTargetDirective } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-drawer',
  imports: [CodeBlock, DocPager, ButtonComponent, DrawerComponent, DrawerTargetDirective],
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
})
export class Drawer {
  /**
   * Snippet for importing `IMPORT_DRAWER`.
   */
  protected readonly importSnippet = `import { IMPORT_DRAWER } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_DRAWER]
})`;

  /**
   * Snippet for importing `DrawerComponent` and `DrawerTargetDirective` individually.
   */
  protected readonly importIndividualSnippet = `import { DrawerComponent, DrawerTargetDirective } from '@im4all/roolith-ng';

@Component({
  imports: [DrawerComponent, DrawerTargetDirective]
})`;

  /**
   * Snippet for the trigger directive.
   */
  protected readonly directiveSnippet = `<rng-button rngDrawerTarget="myDrawer">Open Drawer</rng-button>`;

  /**
   * Basic usage markup.
   */
  protected readonly basicSnippet = `<rng-button rngDrawerTarget="drawer1">Open Drawer</rng-button>

<rng-drawer
  name="drawer1"
  header="Drawer title"
  #drawerEl>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.

  <ng-container rngDrawerAction>
    <rng-button
      variant="dark"
      [block]="true"
      (clickEvent)="drawerEl.close()">
      Action 1
    </rng-button>
    <rng-button
      [block]="true"
      (clickEvent)="drawerEl.close()">
      Action 2
    </rng-button>
  </ng-container>
</rng-drawer>`;

  /**
   * With header and subheader markup.
   */
  protected readonly headerSnippet = `<rng-drawer
  name="drawerHeader"
  header="Drawer title"
  subheader="Drawer subtitle">
  Drawer body content goes here.
</rng-drawer>`;

  /**
   * Body content projection markup.
   */
  protected readonly bodySnippet = `<rng-drawer name="drawerBody">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  <p>Any markup can be projected into the default slot - it renders inside <code>rng-drawer__body</code>.</p>
</rng-drawer>`;

  /**
   * Footer action slot markup.
   */
  protected readonly footerSnippet = `<rng-drawer name="drawerFooter" #drawerEl>
  Drawer body content.

  <ng-container rngDrawerAction>
    <rng-button variant="dark" [block]="true" (clickEvent)="drawerEl.close()">Confirm</rng-button>
    <rng-button [block]="true" (clickEvent)="drawerEl.close()">Cancel</rng-button>
  </ng-container>
</rng-drawer>`;

  /**
   * Programmatic open/close markup via template reference.
   */
  protected readonly programmaticSnippet = `<!-- Trigger via template reference -->
<rng-button (clickEvent)="myDrawer.open()">Open programmatically</rng-button>

<rng-drawer
  name="progDrawer"
  header="Programmatic control"
  #myDrawer>
  Use <code>myDrawer.open()</code> and <code>myDrawer.close()</code> from any button or component logic.

  <ng-container rngDrawerAction>
    <rng-button variant="dark" [block]="true" (clickEvent)="myDrawer.close()">Close</rng-button>
  </ng-container>
</rng-drawer>`;

  /**
   * Handler snippet for programmatic control via `viewChild`.
   */
  protected readonly programmaticTsSnippet = `import { Component, viewChild } from '@angular/core';
import { DrawerComponent } from '@im4all/roolith-ng';

@Component({ ... })
export class ExampleComponent {
  drawer = viewChild<DrawerComponent>('myDrawer');

  openDrawer(): void {
    this.drawer()?.open();
  }

  closeDrawer(): void {
    this.drawer()?.close();
  }
}`;

  /**
   * Events markup - `openEvent` and `closeEvent`.
   */
  protected readonly eventsSnippet = `<rng-drawer
  name="eventsDrawer"
  header="Events demo"
  (openEvent)="onDrawerOpen()"
  (closeEvent)="onDrawerClose()"
  #drawerEl>
  Body content.

  <ng-container rngDrawerAction>
    <rng-button [block]="true" (clickEvent)="drawerEl.close()">Close</rng-button>
  </ng-container>
</rng-drawer>`;

  /**
   * Handler for `openEvent` and `closeEvent`.
   */
  protected readonly eventsHandlerSnippet = `onDrawerOpen(): void {
  console.log('Drawer opened');
}

onDrawerClose(): void {
  console.log('Drawer closed - via X button, Escape or .close()');
}`;

  /**
   * Full example combining trigger, header, body and footer.
   */
  protected readonly fullSnippet = `<rng-button rngDrawerTarget="fullDrawer">Open Full Drawer</rng-button>

<rng-drawer
  name="fullDrawer"
  header="Drawer title"
  subheader="Drawer subtitle"
  (openEvent)="onOpen()"
  (closeEvent)="onClose()"
  #fullDrawerEl>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, eaque.

  <ng-container rngDrawerAction>
    <rng-button variant="dark" [block]="true" (clickEvent)="fullDrawerEl.close()">Action 1</rng-button>
    <rng-button [block]="true" (clickEvent)="fullDrawerEl.close()">Action 2</rng-button>
  </ng-container>
</rng-drawer>`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { IMPORT_DRAWER, ButtonComponent } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_DRAWER, ButtonComponent]
})
export class ExampleComponent {
  onOpen(): void {
    console.log('Drawer opened');
  }

  onClose(): void {
    console.log('Drawer closed');
  }
}`;

  protected lastEvent: 'open' | 'close' | null = null;

  protected eventsDrawerLastEvent: 'open' | 'close' | null = null;

  /**
   * Handles `openEvent` from the demo drawer.
   *
   * @returns void
   */
  protected onDemoOpen(): void {
    this.lastEvent = 'open';
  }

  /**
   * Handles `closeEvent` from the demo drawer.
   *
   * @returns void
   */
  protected onDemoClose(): void {
    this.lastEvent = 'close';
  }

  /**
   * Handles `openEvent` from the events demo drawer.
   *
   * @returns void
   */
  protected onEventsOpen(): void {
    this.eventsDrawerLastEvent = 'open';
  }

  /**
   * Handles `closeEvent` from the events demo drawer.
   *
   * @returns void
   */
  protected onEventsClose(): void {
    this.eventsDrawerLastEvent = 'close';
  }
}
