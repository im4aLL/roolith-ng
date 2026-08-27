import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { topNavLinks } from '../../nav';
import packageJson from '../../../../../roolith-ng/package.json';

@Component({
  selector: 'rng-doc-topbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  protected readonly links = topNavLinks;
  protected readonly version = packageJson.version;
  readonly theme = input.required<'light' | 'dark'>();
  readonly isHome = input(false);
  readonly themeToggle = output<void>();
  readonly menuToggle = output<void>();
}
