import { Component } from '@angular/core';
import { INav, INavClickEvent, INavGroup, NavGroupComponent, NavComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-nav',
  imports: [CodeBlock, DocPager, NavComponent, NavGroupComponent],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  /**
   * Snippet for importing `NavComponent` and `NavGroupComponent`.
   */
  protected readonly importSnippet = `import { NavComponent, NavGroupComponent } from '@im4all/roolith-ng';

@Component({
  imports: [NavComponent, NavGroupComponent]
})`;

  /**
   * Snippet for importing `NavComponent` individually.
   */
  protected readonly importNavSnippet = `import { NavComponent } from '@im4all/roolith-ng';

@Component({
  imports: [NavComponent]
})`;

  /**
   * Snippet for importing `NavGroupComponent` individually.
   */
  protected readonly importGroupSnippet = `import { NavGroupComponent } from '@im4all/roolith-ng';

@Component({
  imports: [NavGroupComponent]
})`;

  /**
   * Basic `INav` data shape with built-in `icon`.
   */
  protected readonly basicDataSnippet = `import { INav } from '@im4all/roolith-ng';

items: INav[] = [
  { id: '1', name: 'Item One', link: '#', isActive: true, icon: 'home' },
  { id: '2', name: 'Item Two', link: '#', isActive: false },
  { id: '3', name: 'Item Three', link: '#', isActive: false },
];

onNavClick(item: INav): void {
  console.log(item.link);
}`;

  /**
   * Basic template markup.
   */
  protected readonly basicSnippet = `<rng-nav
  [data]="items"
  (clickEvent)="onNavClick($event)" />`;

  /**
   * Data with `children` for submenu support.
   */
  protected readonly submenuDataSnippet = `items: INav[] = [
  {
    id: '1',
    name: 'Parent Item',
    link: '#',
    isActive: false,
    children: [
      { id: '1-1', name: 'Child Item One', link: '#', isActive: false },
      { id: '1-2', name: 'Child Item Two', link: '#', isActive: false },
    ],
  },
  { id: '2', name: 'Item Two', link: '#', isActive: false },
];`;

  /**
   * Submenu template markup - clicking a parent toggles `isOpen` instead of emitting.
   */
  protected readonly submenuSnippet = `<rng-nav
  [data]="items"
  (clickEvent)="onNavClick($event)" />`;

  /**
   * Badge count data.
   */
  protected readonly badgeDataSnippet = `items: INav[] = [
  { id: '1', name: 'Inbox', link: '#', isActive: false, count: 5 },
  { id: '2', name: 'Messages', link: '#', isActive: false, count: 12 },
  { id: '3', name: 'Archive', link: '#', isActive: false },
];`;

  /**
   * Badge template markup.
   */
  protected readonly badgeSnippet = `<rng-nav
  [data]="items"
  (clickEvent)="onNavClick($event)" />`;

  /**
   * With built-in `icon` markup (`IconNameType`).
   */
  protected readonly iconSnippet = `items: INav[] = [
  { id: '1', name: 'Dashboard', link: '#', isActive: true, icon: 'home' },
  { id: '2', name: 'Users', link: '#', isActive: false, icon: 'users' },
  { id: '3', name: 'Settings', link: '#', isActive: false, icon: 'settings' },
];`;

  /**
   * With custom vendor icon via `customIcon`.
   *
   * Use any class string such as Iconoir, Font Awesome, etc.
   */
  protected readonly customIconSnippet = `items: INav[] = [
  { id: '1', name: 'Dashboard', link: '#', isActive: true, customIcon: 'iconoir-home' },
  { id: '2', name: 'Inbox', link: '#', isActive: false, customIcon: 'iconoir-mail' },
  { id: '3', name: 'Notifications', link: '#', isActive: false, customIcon: 'iconoir-bell' },
];`;

  /**
   * Collapsed mode markup - compact icon-only with tooltip.
   */
  protected readonly collapsedSnippet = `<rng-nav
  [data]="items"
  [collapsed]="true"
  (clickEvent)="onNavClick($event)" />`;

  /**
   * `INavGroup` data shape for `rng-nav-group`.
   */
  protected readonly groupDataSnippet = `import { INavGroup, INavClickEvent } from '@im4all/roolith-ng';

groups: INavGroup[] = [
  {
    id: 'main',
    name: 'Main',
    items: [
      { id: '1', name: 'Item One', link: '#', isActive: true },
      { id: '2', name: 'Item Two', link: '#', isActive: false },
    ],
  },
  {
    id: 'admin',
    name: 'Administration',
    type: 'warning',
    items: [
      { id: '3', name: 'Item Three', link: '#', isActive: false },
    ],
  },
];

onGroupNavClick(event: INavClickEvent): void {
  console.log(event.groupId, event.item.link);
}`;

  /**
   * `rng-nav-group` template markup.
   */
  protected readonly groupSnippet = `<rng-nav-group
  [data]="groups"
  (clickEvent)="onGroupNavClick($event)" />`;

  /**
   * Handler for `clickEvent` from `rng-nav`.
   */
  protected readonly clickHandlerSnippet = `import { INav } from '@im4all/roolith-ng';

onNavClick(item: INav): void {
  // default navigation is prevented - handle routing yourself
  console.log(item.name, item.link);
}`;

  /**
   * Handler for `clickEvent` from `rng-nav-group`.
   */
  protected readonly groupClickHandlerSnippet = `import { INavClickEvent } from '@im4all/roolith-ng';

onGroupNavClick(event: INavClickEvent): void {
  console.log(event.groupId, event.item.link);
}`;

  /**
   * Full example combining built-in icons, custom icons, badges, submenu and group.
   */
  protected readonly fullSnippet = `import { INav, INavGroup, NavComponent, NavGroupComponent } from '@im4all/roolith-ng';

@Component({
  imports: [NavComponent, NavGroupComponent]
})
export class ExampleComponent {
  items: INav[] = [
    { id: '1', name: 'Dashboard', link: '#', isActive: true, icon: 'home' },
    {
      id: '2',
      name: 'Projects',
      link: '#',
      isActive: false,
      customIcon: 'iconoir-folder',
      children: [
        { id: '2-1', name: 'All Projects', link: '#', isActive: false },
        { id: '2-2', name: 'My Projects', link: '#', isActive: false },
      ],
    },
    { id: '3', name: 'Messages', link: '#', isActive: false, customIcon: 'iconoir-mail', count: 5 },
  ];

  groups: INavGroup[] = [
    { id: 'main', name: 'Main', items: this.items },
    { id: 'admin', name: 'Admin', type: 'warning', items: [
      { id: '4', name: 'Settings', link: '#', isActive: false, icon: 'settings' },
    ]},
  ];

  onNavClick(item: INav): void {
    console.log('Nav clicked:', item);
  }

  onGroupNavClick(event: INavClickEvent): void {
    console.log('Group:', event.groupId, 'Item:', event.item);
  }
}`;

  /**
   * Full template markup.
   */
  protected readonly fullTemplateSnippet = `<!-- standalone nav -->
<rng-nav
  [data]="items"
  (clickEvent)="onNavClick($event)" />

<!-- grouped nav -->
<rng-nav-group
  [data]="groups"
  (clickEvent)="onGroupNavClick($event)" />`;

  protected readonly basicItems: INav[] = [
    { id: '1', name: 'Dashboard', link: '#', isActive: true, icon: 'home' },
    { id: '2', name: 'Users', link: '#', isActive: false, icon: 'users' },
    { id: '3', name: 'Settings', link: '#', isActive: false, icon: 'settings' },
  ];

  protected readonly submenuItems: INav[] = [
    {
      id: '1',
      name: 'Projects',
      link: '#',
      isActive: false,
      icon: 'file',
      isOpen: true,
      children: [
        { id: '1-1', name: 'All Projects', link: '#', isActive: false },
        { id: '1-2', name: 'My Projects', link: '#', isActive: true },
        { id: '1-3', name: 'Archived', link: '#', isActive: false, count: 3 },
      ],
    },
    { id: '2', name: 'Analytics', link: '#', isActive: false, icon: 'bar-chart', children: [
      { id: '2-1', name: 'Traffic', link: '#', isActive: false },
      { id: '2-2', name: 'Revenue', link: '#', isActive: false },
    ]},
    { id: '3', name: 'Messages', link: '#', isActive: false, customIcon: 'iconoir-mail', count: 5 },
  ];

  protected readonly badgeItems: INav[] = [
    { id: '1', name: 'Inbox', link: '#', isActive: false, customIcon: 'iconoir-mail', count: 5 },
    { id: '2', name: 'Notifications', link: '#', isActive: true, customIcon: 'iconoir-bell', count: 12 },
    { id: '3', name: 'Tasks', link: '#', isActive: false, icon: 'task-list', count: 0 },
    { id: '4', name: 'Archive', link: '#', isActive: false, icon: 'file' },
  ];

  protected readonly iconItems: INav[] = [
    { id: '1', name: 'Dashboard', link: '#', isActive: true, icon: 'home' },
    { id: '2', name: 'Users', link: '#', isActive: false, icon: 'users' },
    { id: '3', name: 'Projects', link: '#', isActive: false, icon: 'file' },
    { id: '4', name: 'Analytics', link: '#', isActive: false, icon: 'bar-chart' },
    { id: '5', name: 'Settings', link: '#', isActive: false, icon: 'settings' },
  ];

  protected readonly customIconItems: INav[] = [
    { id: '1', name: 'Dashboard', link: '#', isActive: true, customIcon: 'iconoir-home' },
    { id: '2', name: 'Inbox', link: '#', isActive: false, customIcon: 'iconoir-mail' },
    { id: '3', name: 'Notifications', link: '#', isActive: false, customIcon: 'iconoir-bell' },
    { id: '4', name: 'Group', link: '#', isActive: false, customIcon: 'iconoir-group' },
    { id: '5', name: 'Archive', link: '#', isActive: false, customIcon: 'iconoir-archive' },
  ];

  protected readonly collapsedItems: INav[] = [
    { id: '1', name: 'Dashboard', link: '#', isActive: true, icon: 'home' },
    {
      id: '2',
      name: 'Projects',
      link: '#',
      isActive: false,
      icon: 'file',
      children: [
        { id: '2-1', name: 'All Projects', link: '#', isActive: false },
        { id: '2-2', name: 'My Projects', link: '#', isActive: false },
      ],
    },
    { id: '3', name: 'Messages', link: '#', isActive: false, customIcon: 'iconoir-mail', count: 3 },
    {
      id: '4',
      name: 'Analytics',
      link: '#',
      isActive: false,
      icon: 'bar-chart',
      children: [
        { id: '4-1', name: 'Traffic', link: '#', isActive: false },
        { id: '4-2', name: 'Revenue', link: '#', isActive: false },
      ],
    },
  ];

  protected readonly groupItems: INavGroup[] = [
    {
      id: 'main',
      name: 'Main',
      items: [
        { id: '1', name: 'Dashboard', link: '#', isActive: true, icon: 'home' },
        { id: '2', name: 'Analytics', link: '#', isActive: false, icon: 'bar-chart' },
      ],
    },
    {
      id: 'projects',
      name: 'Projects',
      items: [
        {
          id: '3',
          name: 'All Projects',
          link: '#',
          isActive: false,
          icon: 'file',
          children: [
            { id: '3-1', name: 'Active', link: '#', isActive: false },
            { id: '3-2', name: 'Archived', link: '#', isActive: false, count: 2 },
          ],
        },
        { id: '4', name: 'My Tasks', link: '#', isActive: false, customIcon: 'iconoir-list', count: 5 },
      ],
    },
    {
      id: 'admin',
      name: 'Administration',
      type: 'warning',
      items: [
        { id: '5', name: 'Users', link: '#', isActive: false, icon: 'users' },
        { id: '6', name: 'Settings', link: '#', isActive: false, icon: 'settings' },
      ],
    },
  ];

  protected lastClicked: INav | null = null;
  protected lastGroupClicked: INavClickEvent | null = null;
  protected isCollapsed = false;

  /**
   * Handles `clickEvent` from `rng-nav` and stores the last clicked item for the demo.
   *
   * @param item The nav item that was clicked.
   *
   * @returns void
   */
  protected onNavClick(item: INav): void {
    this.lastClicked = item;
  }

  /**
   * Handles `clickEvent` from `rng-nav-group` and stores the last clicked event.
   *
   * @param event The nav group click event payload.
   *
   * @returns void
   */
  protected onGroupNavClick(event: INavClickEvent): void {
    this.lastGroupClicked = event;
  }
}
