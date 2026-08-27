import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { componentCatalog, IDocNavLink } from '../../nav';

/**
 * Ordered doc routes for prev/next navigation.
 *
 * Guides first, then component catalog in presentation order.
 * Only routable catalog entries are included.
 */
const DOC_PAGER_ORDER: IDocNavLink[] = [
  { label: 'Getting Started', route: '/guide/getting-started' },
  { label: 'Theming', route: '/guide/theming' },
  { label: 'AI Ready', route: '/guide/ai-ready' },
  { label: 'Components', route: '/guide/components' },
  ...componentCatalog
    .filter((entry) => !!entry.route)
    .map((entry) => ({ label: entry.label, route: entry.route as string })),
];

@Component({
  selector: 'rng-doc-pager',
  imports: [RouterLink],
  templateUrl: './doc-pager.html',
  styleUrl: './doc-pager.scss',
})
export class DocPager {
  /**
   * Explicit override for the previous link.
   *
   * When `undefined` the component auto-resolves from the current route.
   * Pass `null` to hide the previous card.
   */
  readonly prev = input<IDocNavLink | null | undefined>(undefined);

  /**
   * Explicit override for the next link.
   *
   * When `undefined` the component auto-resolves from the current route.
   * Pass `null` to hide the next card.
   */
  readonly next = input<IDocNavLink | null | undefined>(undefined);

  private readonly router = inject(Router);

  private readonly currentPath = computed(() => {
    // eslint-disable-next-line prefer-destructuring
    const raw = this.router.url.split('?')[0].split('#')[0];
    const normalized = raw.replace(/\/$/, '') || '/';
    return normalized;
  });

  private readonly currentIndex = computed(() => DOC_PAGER_ORDER.findIndex((item) => item.route === this.currentPath()));

  /**
   * Resolved previous page link.
   */
  protected readonly prevLink = computed<IDocNavLink | null>(() => {
    const override = this.prev();
    if (override !== undefined) {
      return override;
    }

    const index = this.currentIndex();
    if (index <= 0) {
      return null;
    }

    return DOC_PAGER_ORDER[index - 1] ?? null;
  });

  /**
   * Resolved next page link.
   */
  protected readonly nextLink = computed<IDocNavLink | null>(() => {
    const override = this.next();
    if (override !== undefined) {
      return override;
    }

    const index = this.currentIndex();
    if (index === -1 || index >= DOC_PAGER_ORDER.length - 1) {
      return null;
    }

    return DOC_PAGER_ORDER[index + 1] ?? null;
  });

  /**
   * Whether at least one navigation card should be rendered.
   */
  protected readonly hasPager = computed(() => !!this.prevLink() || !!this.nextLink());
}
