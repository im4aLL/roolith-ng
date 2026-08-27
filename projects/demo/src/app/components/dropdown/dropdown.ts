import { Component, signal } from '@angular/core';
import {
  ButtonComponent,
  DropdownComponent,
  DropdownTargetDirective,
  IDropdownGroup,
  IDropdownItem,
} from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-dropdown',
  imports: [CodeBlock, DocPager, ButtonComponent, DropdownComponent, DropdownTargetDirective],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown {
  /**
   * Snippet for importing `IMPORT_DROPDOWN`.
   */
  protected readonly importSnippet = `import { IMPORT_DROPDOWN } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_DROPDOWN]
})`;

  /**
   * Snippet for importing `DropdownComponent` and `DropdownTargetDirective` individually.
   */
  protected readonly importIndividualSnippet = `import { DropdownComponent, DropdownTargetDirective } from '@im4all/roolith-ng';

@Component({
  imports: [DropdownComponent, DropdownTargetDirective]
})`;

  /**
   * Snippet for the `rngDropdownTarget` directive and `rng-dropdown` linkage.
   */
  protected readonly targetSnippet = `<!-- Trigger - wrapper with rngDropdownTarget -->
<div rngDropdownTarget="user-menu">
  <rng-button icon="user">Account</rng-button>
</div>

<!-- Panel - name must match the target value -->
<rng-dropdown
  name="user-menu"
  [groups]="menuGroups()"
  (itemClick)="onMenuSelect($event)" />`;

  /**
   * Basic usage - `IDropdownGroup` data shape.
   */
  protected readonly basicTsSnippet = `import { signal } from '@angular/core';
import { IDropdownGroup } from '@im4all/roolith-ng';

menuGroups = signal<IDropdownGroup[]>([
  {
    headline: 'User Settings',
    items: [
      { label: 'Profile', value: 'profile', secondaryLabel: 'Ctrl + k' },
      { label: 'Account', value: 'account', secondaryLabel: 'Ctrl + j' },
    ],
  },
  {
    items: [
      { label: 'Logout', value: 'logout', icon: 'logout', isDanger: true },
    ],
  },
]);`;

  /**
   * Basic template markup.
   */
  protected readonly basicSnippet = `<div rngDropdownTarget="user-menu">
  <rng-button icon="user">Account</rng-button>
</div>

<rng-dropdown
  name="user-menu"
  [groups]="menuGroups()"
  (itemClick)="onMenuSelect($event)" />`;

  /**
   * Handler for `itemClick`.
   */
  protected readonly itemClickHandlerSnippet = `import { IDropdownItem } from '@im4all/roolith-ng';

onMenuSelect(item: IDropdownItem): void {
  console.log(item.label, item.value);
  // dropdown closes automatically via hidePopover()
}`;

  /**
   * With item `icon` markup.
   */
  protected readonly withIconSnippet = `fileGroups = signal<IDropdownGroup[]>([
  {
    items: [
      { label: 'Download', value: 'download', icon: 'download' },
      { label: 'Copy Link', value: 'copy', icon: 'clipboard' },
      { label: 'Delete', value: 'delete', icon: 'delete', isDanger: true },
    ],
  },
]);`;

  /**
   * Template for icon items.
   */
  protected readonly withIconTemplateSnippet = `<div rngDropdownTarget="file-menu">
  <rng-button icon="more-vertical">Actions</rng-button>
</div>

<rng-dropdown
  name="file-menu"
  [groups]="fileGroups()"
  (itemClick)="onAction($event)" />`;

  /**
   * With `secondaryLabel` and `secondaryIcon` markup.
   */
  protected readonly secondarySnippet = `actionGroups = signal<IDropdownGroup[]>([
  {
    items: [
      { label: 'Approved', value: 'approved', secondaryIcon: 'check' },
      { label: 'Export Report', value: 'export', secondaryLabel: 'CSV' },
      { label: 'Share', value: 'share', secondaryIcon: 'arrow-right' },
    ],
  },
]);`;

  /**
   * Template for secondary slot.
   */
  protected readonly secondaryTemplateSnippet = `<div rngDropdownTarget="actions">
  <rng-button>Actions</rng-button>
</div>

<rng-dropdown
  name="actions"
  [groups]="actionGroups()"
  (itemClick)="onAction($event)" />`;

  /**
   * Multiple groups with `headline` markup.
   */
  protected readonly headlineSnippet = `settingsGroups = signal<IDropdownGroup[]>([
  {
    headline: 'Account',
    items: [
      { label: 'Profile', value: 'profile' },
      { label: 'Billing', value: 'billing' },
    ],
  },
  {
    headline: 'Workspace',
    items: [
      { label: 'Settings', value: 'settings' },
      { label: 'Members', value: 'members' },
    ],
  },
  {
    items: [
      { label: 'Sign out', value: 'signout', isDanger: true },
    ],
  },
]);`;

  /**
   * Template for headline groups.
   */
  protected readonly headlineTemplateSnippet = `<div rngDropdownTarget="settings">
  <rng-button icon="settings">Settings</rng-button>
</div>

<rng-dropdown
  name="settings"
  [groups]="settingsGroups()"
  (itemClick)="onSettingsAction($event)" />`;

  /**
   * Disabled items markup.
   */
  protected readonly disabledSnippet = `exportGroups = signal<IDropdownGroup[]>([
  {
    items: [
      { label: 'Export as CSV', value: 'csv' },
      { label: 'Export as PDF', value: 'pdf', isDisabled: true },
      { label: 'Export as XLSX', value: 'xlsx' },
    ],
  },
]);`;

  /**
   * Template for disabled items.
   */
  protected readonly disabledTemplateSnippet = `<div rngDropdownTarget="export-menu">
  <rng-button>Export</rng-button>
</div>

<rng-dropdown
  name="export-menu"
  [groups]="exportGroups()"
  (itemClick)="onExport($event)" />`;

  /**
   * Fixed `alignment` markup.
   */
  protected readonly alignmentSnippet = `<!-- Always opens to the right -->
<rng-dropdown
  name="menu"
  alignment="right"
  [groups]="groups()" />

<!-- Always opens above -->
<rng-dropdown
  name="menu"
  alignment="top"
  [groups]="groups()" />

<!-- Always opens above and to the right -->
<rng-dropdown
  name="menu"
  alignment="top-right"
  [groups]="groups()" />`;

  /**
   * Custom content via `ng-content` markup.
   */
  protected readonly customSnippet = `<div rngDropdownTarget="custom">
  <rng-button>Custom</rng-button>
</div>

<rng-dropdown name="custom">
  <div class="rng-dropdown__body">
    <div class="rng-dropdown__group">
      <ul class="rng-dropdown__list">
        <li class="rng-dropdown__item">Custom item</li>
        <li class="rng-dropdown__item rng-dropdown__item--danger">Danger custom item</li>
      </ul>
    </div>
  </div>
</rng-dropdown>`;

  /**
   * Full example combining headlines, icons, secondary slots and handlers.
   */
  protected readonly fullSnippet = `import { IMPORT_DROPDOWN, ButtonComponent, IDropdownGroup } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_DROPDOWN, ButtonComponent]
})
export class ExampleComponent {
  menuGroups = signal<IDropdownGroup[]>([
    {
      headline: 'User Settings',
      items: [
        { label: 'Profile', value: 'profile', icon: 'user', secondaryLabel: 'Ctrl + k' },
        { label: 'Account', value: 'account', icon: 'settings', secondaryLabel: 'Ctrl + j' },
      ],
    },
    {
      items: [
        { label: 'Logout', value: 'logout', icon: 'logout', isDanger: true },
      ],
    },
  ]);

  onMenuSelect(item: IDropdownItem): void {
    console.log('Selected:', item.value);
  }
}`;

  /**
   * Full template snippet.
   */
  protected readonly fullTemplateSnippet = `<div rngDropdownTarget="user-menu">
  <rng-button icon="user">Account</rng-button>
</div>

<rng-dropdown
  name="user-menu"
  [groups]="menuGroups()"
  (itemClick)="onMenuSelect($event)" />`;

  protected readonly basicGroups = signal<IDropdownGroup[]>([
    {
      headline: 'User Settings',
      items: [
        { label: 'Profile', value: 'profile', secondaryLabel: 'Ctrl + k' },
        { label: 'Account', value: 'account', secondaryLabel: 'Ctrl + j' },
      ],
    },
    {
      items: [{ label: 'Logout', value: 'logout', icon: 'logout', isDanger: true }],
    },
  ]);

  protected readonly iconGroups = signal<IDropdownGroup[]>([
    {
      items: [
        { label: 'Download', value: 'download', icon: 'download' },
        { label: 'Copy Link', value: 'copy', icon: 'clipboard' },
        { label: 'Delete', value: 'delete', icon: 'delete', isDanger: true },
      ],
    },
  ]);

  protected readonly secondaryGroups = signal<IDropdownGroup[]>([
    {
      items: [
        { label: 'Approved', value: 'approved', secondaryIcon: 'check' },
        { label: 'Export Report', value: 'export', secondaryLabel: 'CSV' },
        { label: 'Share', value: 'share', secondaryIcon: 'arrow-right' },
      ],
    },
  ]);

  protected readonly headlineGroups = signal<IDropdownGroup[]>([
    {
      headline: 'Account',
      items: [
        { label: 'Profile', value: 'profile' },
        { label: 'Billing', value: 'billing' },
      ],
    },
    {
      headline: 'Workspace',
      items: [
        { label: 'Settings', value: 'settings' },
        { label: 'Members', value: 'members' },
      ],
    },
    {
      items: [{ label: 'Sign out', value: 'signout', isDanger: true }],
    },
  ]);

  protected readonly disabledGroups = signal<IDropdownGroup[]>([
    {
      items: [
        { label: 'Export as CSV', value: 'csv' },
        { label: 'Export as PDF', value: 'pdf', isDisabled: true },
        { label: 'Export as XLSX', value: 'xlsx' },
      ],
    },
  ]);

  protected readonly dangerGroups = signal<IDropdownGroup[]>([
    {
      items: [
        { label: 'Edit', value: 'edit', icon: 'edit' },
        { label: 'Duplicate', value: 'duplicate', icon: 'clipboard' },
        { label: 'Delete', value: 'delete', icon: 'delete', isDanger: true },
      ],
    },
  ]);

  protected lastClicked: IDropdownItem | null = null;
  protected lastClickedSource: string | null = null;

  /**
   * Handles `itemClick` from any `rng-dropdown` demo and stores the last clicked item.
   *
   * The dropdown closes automatically via `hidePopover()` - no manual close is needed.
   * Disabled items never emit because `onItemClick` returns early when `isDisabled` is true.
   *
   * @param item The dropdown item that was clicked.
   * @param source Label identifying which demo emitted the event.
   *
   * @returns void
   */
  protected onItemClick(item: IDropdownItem, source: string): void {
    this.lastClicked = item;
    this.lastClickedSource = source;
  }
}
