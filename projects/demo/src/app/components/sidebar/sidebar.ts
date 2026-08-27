import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { docNav } from '../../nav';

@Component({
  selector: 'rng-doc-sidebar',
  host: { class: 'doc-sidebar' },
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly groups = docNav;
  protected readonly collapsed = new Set<string>();

  protected toggle(title: string): void {
    if (this.collapsed.has(title)) {
      this.collapsed.delete(title);
    } else {
      this.collapsed.add(title);
    }
  }

  protected isCollapsed(title: string): boolean {
    return this.collapsed.has(title);
  }
}
